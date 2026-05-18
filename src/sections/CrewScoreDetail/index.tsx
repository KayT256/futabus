import { useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { getDriverReviews, type Review, type Sentiment } from "@/data/reviews";
import { useReviewAnalytics } from "@/hooks/useReviewAnalytics";
import { trips } from "@/data/trips";

const getDriverData = (driverId: string) => {
  const driver = trips.find(t => t.driver.id === driverId)?.driver;
  if (!driver) return null;

  const scoreToFiveStarPercent = (score: number) => {
    if (score >= 4.8) return 0.92;
    if (score >= 4.7) return 0.88;
    if (score >= 4.6) return 0.82;
    if (score >= 4.5) return 0.75;
    if (score >= 4.4) return 0.68;
    return 0.60;
  };

  const fiveStarPercent = scoreToFiveStarPercent(driver.crewScore);
  const remainingPercent = 1 - fiveStarPercent;
  const fourStarPercent = remainingPercent * 0.7;
  const threeStarPercent = remainingPercent * 0.2;
  const twoStarPercent = remainingPercent * 0.08;
  const oneStarPercent = remainingPercent * 0.02;

  return {
    id: driver.id,
    name: driver.name,
    photo: driver.photo,
    crewScore: driver.crewScore,
    totalTrips: driver.totalTrips,
    totalRatings: driver.totalRatings,
    employeeCode: driver.employeeCode,
    experience: `${Math.floor(driver.totalTrips / 500)} năm`,
    tags: [
      { label: "Lái xe an toàn", count: Math.floor(driver.totalRatings * 0.88) },
      { label: "Nhiệt tình", count: Math.floor(driver.totalRatings * 0.81) },
      { label: "Đúng giờ", count: Math.floor(driver.totalRatings * 0.76) },
      { label: "Xe sạch sẽ", count: Math.floor(driver.totalRatings * 0.68) },
      { label: "Thân thiện", count: Math.floor(driver.totalRatings * 0.57) },
    ],
    ratingBreakdown: {
      fiveStars: Math.floor(driver.totalRatings * fiveStarPercent),
      fourStars: Math.floor(driver.totalRatings * fourStarPercent),
      threeStars: Math.floor(driver.totalRatings * threeStarPercent),
      twoStars: Math.floor(driver.totalRatings * twoStarPercent),
      oneStar: Math.floor(driver.totalRatings * oneStarPercent),
    },
    recentReviews: driver.recentReviews,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// Predefined tag pool for the new-review form.
// ─────────────────────────────────────────────────────────────────────────────
const ALL_SELECTABLE_TAGS = [
  "Lái xe an toàn", "Đúng giờ", "Nhiệt tình", "Thân thiện",
  "Xe sạch sẽ", "Điều hòa tốt", "Chuyên nghiệp", "Hỗ trợ hành lý",
  "Đến trễ", "Thái độ không tốt", "Lái xe ẩu", "Điều hòa hỏng",
];

// Client-side sentiment classifier: mirrors the notebook's approach but
// simplified to rating + tag signals (no transformer model in browser).
function classifyNewReview(rating: number, tags: string[]): { sentiment: Sentiment; sentimentScore: number } {
  const negTags = ["Đến trễ", "Thái độ không tốt", "Lái xe ẩu", "Điều hòa hỏng"];
  const hasNegTag = tags.some((t) => negTags.includes(t));
  if (rating <= 2 || (rating === 3 && hasNegTag))
    return { sentiment: "negative", sentimentScore: parseFloat((0.82 + Math.random() * 0.15).toFixed(3)) };
  if (rating === 3)
    return { sentiment: "neutral",  sentimentScore: parseFloat((0.70 + Math.random() * 0.20).toFixed(3)) };
  return { sentiment: "positive", sentimentScore: parseFloat((0.80 + Math.random() * 0.18).toFixed(3)) };
}

function formatDateNow(): string {
  const d = new Date();
  return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Star picker sub-component.
// ─────────────────────────────────────────────────────────────────────────────
const StarPicker = ({ value, onChange }: { value: number; onChange: (n: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          className="focus:outline-none"
          aria-label={`${n} sao`}
        >
          <svg className={`w-7 h-7 transition-colors ${n <= (hovered || value) ? "text-orange-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Single review card.
// ─────────────────────────────────────────────────────────────────────────────
const ReviewCard = ({ review, onHelpful }: { review: Review; onHelpful: (id: string) => void }) => {
  const sentimentStyle = {
    positive: "bg-green-50 text-green-700 border-green-200",
    neutral:  "bg-amber-50 text-amber-700 border-amber-200",
    negative: "bg-red-50 text-red-700 border-red-200",
  }[review.sentiment];
  const sentimentLabel = { positive: "Tích cực", neutral: "Trung lập", negative: "Tiêu cực" }[review.sentiment];
  const sentimentEmoji = { positive: "😊", neutral: "😐", negative: "😠" }[review.sentiment];

  return (
    <div className="border border-slate-100 rounded-2xl p-5 hover:border-slate-200 hover:shadow-sm transition-all bg-white">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={`https://i.pravatar.cc/40?img=${review.avatarSeed}`}
            alt={review.customer}
            className="w-10 h-10 rounded-full object-cover border border-slate-100 shrink-0"
          />
          <div>
            <p className="text-sm font-bold text-slate-900">{review.customer}</p>
            <p className="text-xs text-slate-400">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-orange-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full border ${sentimentStyle}`}>
            {sentimentEmoji} {sentimentLabel}
          </span>
        </div>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed mb-3">"{review.comment}"</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {review.tags.map((tag) => (
            <span key={tag} className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">{tag}</span>
          ))}
        </div>
        <button
          onClick={() => onHelpful(review.id)}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors shrink-0 ml-2"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
          </svg>
          Hữu ích ({review.helpfulCount})
        </button>
      </div>
    </div>
  );
};

export const CrewScoreDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tripId = searchParams.get('tripId');
  const from = searchParams.get('from');
  const { id } = useParams<{ id: string }>();

  // ── Review state (seeded from data, extended by new submissions) ──
  const driverId = id || "TX001";
  const [reviews, setReviews] = useState<Review[]>(() => getDriverReviews(driverId));

  // ── New-review form state ──
  const [formOpen, setFormOpen] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formName, setFormName]   = useState("");
  const [formComment, setFormComment] = useState("");
  const [formTags, setFormTags]   = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // ── Filter & sort state ──
  const [filterStar, setFilterStar]     = useState<number | null>(null);
  const [filterSentiment, setFilterSentiment] = useState<Sentiment | "all">("all");
  const [sortBy, setSortBy]             = useState<"newest" | "oldest" | "highest" | "lowest" | "helpful">("newest");
  const [showAll, setShowAll]           = useState(false);
  const PAGE_SIZE = 10;

  // ── Live analytics from current reviews state ──
  const nlp = useReviewAnalytics(reviews);

  // ── Filtered + sorted view ──
  const filteredReviews = useMemo(() => {
    let r = [...reviews];
    if (filterStar !== null) r = r.filter((x) => x.rating === filterStar);
    if (filterSentiment !== "all") r = r.filter((x) => x.sentiment === filterSentiment);
    switch (sortBy) {
      case "oldest":  r.sort((a, b) => a.date.split("/").reverse().join("").localeCompare(b.date.split("/").reverse().join(""))); break;
      case "newest":  r.sort((a, b) => b.date.split("/").reverse().join("").localeCompare(a.date.split("/").reverse().join(""))); break;
      case "highest": r.sort((a, b) => b.rating - a.rating); break;
      case "lowest":  r.sort((a, b) => a.rating - b.rating); break;
      case "helpful": r.sort((a, b) => b.helpfulCount - a.helpfulCount); break;
    }
    return r;
  }, [reviews, filterStar, filterSentiment, sortBy]);

  const visibleReviews = showAll ? filteredReviews : filteredReviews.slice(0, PAGE_SIZE);

  // ── Handlers ──
  const handleHelpful = (reviewId: string) => {
    setReviews((prev) => prev.map((r) => r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim() || formRating === 0) {
      toast.error("Vui lòng điền đầy đủ tên, nhận xét và số sao.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const { sentiment, sentimentScore } = classifyNewReview(formRating, formTags);
      const newReview: Review = {
        id: `NEW-${Date.now()}`,
        driverId,
        customer: formName.trim(),
        avatarSeed: 1 + Math.floor(Math.random() * 99),
        rating: formRating,
        comment: formComment.trim(),
        tags: formTags,
        date: formatDateNow(),
        sentiment,
        sentimentScore,
        helpfulCount: 0,
      };
      setReviews((prev) => [newReview, ...prev]);
      setFormOpen(false);
      setFormRating(5);
      setFormName("");
      setFormComment("");
      setFormTags([]);
      setSubmitting(false);
      toast.success("Đánh giá của bạn đã được ghi nhận!", {
        description: `Phân loại cảm xúc: ${sentiment === "positive" ? "😊 Tích cực" : sentiment === "neutral" ? "😐 Trung lập" : "😠 Tiêu cực"} (${(sentimentScore * 100).toFixed(0)}%)`,
      });
    }, 600);
  };

  const mockDriverData = getDriverData(id || "TX001") || {
    id: "TX001",
    name: "Nguyễn Văn Minh",
    photo: "https://i.pravatar.cc/150?img=68",
    crewScore: 4.8,
    totalTrips: 2847,
    totalRatings: 2156,
    employeeCode: "FUTA-TX-00123",
    experience: "5 năm",
    tags: [
      { label: "Lái xe an toàn", count: 1892 },
      { label: "Nhiệt tình", count: 1756 },
      { label: "Đúng giờ", count: 1634 },
      { label: "Xe sạch sẽ", count: 1456 },
      { label: "Thân thiện", count: 1234 },
    ],
    ratingBreakdown: {
      fiveStars: 1856,
      fourStars: 234,
      threeStars: 56,
      twoStars: 8,
      oneStar: 2,
    },
    recentReviews: trips[0].driver.recentReviews,
  };

  const ratingPercentages = {
    fiveStars: (mockDriverData.ratingBreakdown.fiveStars / mockDriverData.totalRatings) * 100,
    fourStars: (mockDriverData.ratingBreakdown.fourStars / mockDriverData.totalRatings) * 100,
    threeStars: (mockDriverData.ratingBreakdown.threeStars / mockDriverData.totalRatings) * 100,
    twoStars: (mockDriverData.ratingBreakdown.twoStars / mockDriverData.totalRatings) * 100,
    oneStar: (mockDriverData.ratingBreakdown.oneStar / mockDriverData.totalRatings) * 100,
  };

  return (
    <div className="min-h-screen bg-[#f3f3f5] font-sans text-slate-900">
      {/* Clean, Modern Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => from === 'dashboard' ? navigate('/crew-score-dashboard') : navigate(tripId ? `/booking?tripId=${tripId}` : '/booking')}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại
            </button>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Hồ sơ Crew Score</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Driver Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Driver Photo */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white ring-4 ring-orange-50 shadow-lg bg-slate-100">
                <img
                  src={mockDriverData.photo}
                  alt={mockDriverData.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Driver Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-slate-900 mb-1">
                    {mockDriverData.name}
                  </h1>
                  <p className="text-slate-500 text-sm font-medium mb-3">
                    {mockDriverData.employeeCode} • {mockDriverData.experience} kinh nghiệm
                  </p>
                  
                  {/* Crew Score Badge */}
                  <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-bold text-orange-700">
                      Crew Score: {mockDriverData.crewScore}/5
                    </span>
                  </div>
                </div>

                <div className="text-center md:text-right bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="flex items-baseline justify-center md:justify-end gap-1">
                    <span className="text-4xl font-extrabold text-slate-900">
                      {mockDriverData.crewScore}
                    </span>
                    <span className="text-lg text-slate-400 font-medium">/5</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 font-medium">
                    {mockDriverData.totalRatings.toLocaleString()} đánh giá
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                  <p className="text-2xl font-bold text-slate-900">
                    {mockDriverData.totalTrips.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Chuyến đi</p>
                </div>
                <div className="text-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                  <p className="text-2xl font-bold text-slate-900">
                    {mockDriverData.totalRatings.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Lượt đánh giá</p>
                </div>
                <div className="text-center p-4 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors">
                  <p className="text-2xl font-bold text-green-700">
                    {ratingPercentages.fiveStars.toFixed(1)}%
                  </p>
                  <p className="text-xs text-green-600 font-medium mt-1">Tỉ lệ 5 sao</p>
                </div>
                <div className="text-center p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                  <p className="text-2xl font-bold text-slate-900">
                    {mockDriverData.experience}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Kinh nghiệm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Tags & Breakdown */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Validated Tags */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Điểm nổi bật
              </h2>
              <div className="flex flex-wrap gap-2">
                {mockDriverData.tags.map((tag) => (
                  <div key={tag.label} className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1.5">
                    <span className="text-sm font-semibold text-emerald-700">
                      {tag.label}
                    </span>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                      {tag.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-base font-bold text-slate-900 mb-4">
                Chi tiết đánh giá
              </h2>
              <div className="space-y-3">
                {[
                  { stars: 5, count: mockDriverData.ratingBreakdown.fiveStars },
                  { stars: 4, count: mockDriverData.ratingBreakdown.fourStars },
                  { stars: 3, count: mockDriverData.ratingBreakdown.threeStars },
                  { stars: 2, count: mockDriverData.ratingBreakdown.twoStars },
                  { stars: 1, count: mockDriverData.ratingBreakdown.oneStar },
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-600 w-12 flex items-center gap-1">
                      {rating.stars}
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${rating.stars >= 4 ? 'bg-green-500' : rating.stars === 3 ? 'bg-yellow-400' : 'bg-orange-500'}`}
                        style={{ width: `${(rating.count / mockDriverData.totalRatings) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-500 w-12 text-right">
                      {rating.count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Full Review System */}
          <div className="lg:col-span-2 space-y-5">

            {/* ── Analytics mini-panel ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Phân tích cảm xúc</h2>
                  <p className="text-xs text-slate-500">{nlp.total} đánh giá • ViSoBERT pipeline</p>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold border ${nlp.healthColor === "green" ? "bg-green-50 text-green-700 border-green-200" : nlp.healthColor === "yellow" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                  🏥 {nlp.healthLabel} · {nlp.healthScore}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* mini donut */}
                <div className="relative shrink-0">
                  <svg viewBox="0 0 80 80" className="w-16 h-16 -rotate-90">
                    {(() => {
                      const r = 28, cx = 40, cy = 40, circ = 2 * Math.PI * r;
                      const segs = [
                        { pct: nlp.positivePct / 100, color: "#22c55e" },
                        { pct: nlp.neutralPct  / 100, color: "#f59e0b" },
                        { pct: nlp.negativePct / 100, color: "#ef4444" },
                      ];
                      let off = 0;
                      return segs.map((s, i) => {
                        const dash = s.pct * circ;
                        const el = <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth="13" strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-off * circ} />;
                        off += s.pct;
                        return el;
                      });
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-extrabold text-slate-900">{nlp.positivePct.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-2">
                  {[
                    { label: "😊 Tích cực", count: nlp.positive, pct: nlp.positivePct, bar: "bg-green-400" },
                    { label: "😐 Trung lập", count: nlp.neutral,  pct: nlp.neutralPct,  bar: "bg-amber-400" },
                    { label: "😠 Tiêu cực", count: nlp.negative, pct: nlp.negativePct, bar: "bg-red-400"   },
                  ].map((row) => (
                    <div key={row.label} className="text-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-xs text-slate-500 mb-0.5">{row.label}</p>
                      <p className="text-lg font-extrabold text-slate-900">{row.count}</p>
                      <p className="text-xs text-slate-400">{row.pct.toFixed(1)}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── New comment form ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setFormOpen((v) => !v)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center gap-2 font-bold text-slate-900">
                  <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Viết đánh giá của bạn
                </span>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${formOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {formOpen && (
                <form onSubmit={handleSubmit} className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Điểm đánh giá</label>
                    <StarPicker value={formRating} onChange={setFormRating} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Tên của bạn</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Nguyễn Thị Lan..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Nhận xét</label>
                    <textarea
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                      rows={3}
                      placeholder="Chia sẻ trải nghiệm của bạn về tài xế..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-2 block">Gắn thẻ (tuỳ chọn)</label>
                    <div className="flex flex-wrap gap-2">
                      {ALL_SELECTABLE_TAGS.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setFormTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag])}
                          className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${formTags.includes(tag) ? "bg-orange-500 text-white border-orange-500" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-2.5 rounded-xl transition-colors"
                  >
                    {submitting ? "Đang gửi..." : "Gửi đánh giá"}
                  </button>
                </form>
              )}
            </div>

            {/* ── Filter + sort bar ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Star filter chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[null, 5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star ?? "all"}
                      onClick={() => { setFilterStar(star); setShowAll(false); }}
                      className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${filterStar === star ? "bg-orange-500 text-white border-orange-500" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"}`}
                    >
                      {star === null ? "Tất cả ★" : `${star}★`}
                    </button>
                  ))}
                </div>
                {/* Sentiment filter */}
                <div className="flex items-center gap-1.5 sm:ml-2">
                  {(["all", "positive", "neutral", "negative"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => { setFilterSentiment(s); setShowAll(false); }}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-all ${filterSentiment === s ? "bg-slate-900 text-white border-slate-900" : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"}`}
                    >
                      {s === "all" ? "Tất cả" : s === "positive" ? "😊" : s === "neutral" ? "😐" : "😠"}
                    </button>
                  ))}
                </div>
                {/* Sort */}
                <div className="sm:ml-auto shrink-0">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="oldest">Cũ nhất</option>
                    <option value="highest">Điểm cao nhất</option>
                    <option value="lowest">Điểm thấp nhất</option>
                    <option value="helpful">Hữu ích nhất</option>
                  </select>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3">
                Hiển thị {visibleReviews.length} / {filteredReviews.length} đánh giá
                {(filterStar !== null || filterSentiment !== "all") && (
                  <button
                    onClick={() => { setFilterStar(null); setFilterSentiment("all"); setShowAll(false); }}
                    className="ml-2 text-orange-500 hover:text-orange-600 font-semibold"
                  >
                    Xoá bộ lọc ×
                  </button>
                )}
              </p>
            </div>

            {/* ── Review list ── */}
            <div className="space-y-3">
              {visibleReviews.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400 text-sm">
                  Không có đánh giá nào phù hợp với bộ lọc đã chọn.
                </div>
              ) : (
                visibleReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} onHelpful={handleHelpful} />
                ))
              )}
            </div>

            {/* Show more / show less */}
            {filteredReviews.length > PAGE_SIZE && (
              <div className="text-center">
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="px-6 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  {showAll
                    ? "Thu gọn"
                    : `Xem tất cả ${filteredReviews.length} đánh giá`}
                </button>
              </div>
            )}

          </div>
          
        </div>
      </main>
    </div>
  );
};