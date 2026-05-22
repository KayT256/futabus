"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { trips } from "@/data/trips";
import { useJourney } from "@/contexts/JourneyContext";
import { PageShell } from "@/components/PageShell";

const quickTags = [
  { id: 1, label: "Lái xe an toàn" },
  { id: 2, label: "Nhiệt tình" },
  { id: 3, label: "Đúng giờ" },
  { id: 4, label: "Xe sạch sẽ" },
  { id: 5, label: "Thân thiện" },
  { id: 6, label: "Giá tốt" },
  { id: 7, label: "Dịch vụ tốt" },
  { id: 8, label: "Tiện nghi" },
];

const ratingLabels: Record<number, string> = {
  1: "Rất không hài lòng",
  2: "Không hài lòng",
  3: "Bình thường",
  4: "Hài lòng",
  5: "Tuyệt vời",
};

export const PostTripFeedback = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { activeJourney, endJourney } = useJourney();

  // Hooks must come before any early return to satisfy Rules of Hooks.
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [selectedDriverRating, setSelectedDriverRating] = useState<number | null>(null);
  const [hoveredDriverRating, setHoveredDriverRating] = useState<number | null>(null);
  const [selectedCrewRating, setSelectedCrewRating] = useState<number | null>(null);
  const [hoveredCrewRating, setHoveredCrewRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Source of truth for the trip: active journey (preferred) → fallback.
  // This keeps post-trip feedback usable both from the live journey flow and from
  // direct deep-links into the page.
  const trip = activeJourney?.booking.trip ?? trips[0];

  if (!trip || !trip.driver) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-sm w-full text-center">
          <p className="text-slate-500">Không tìm thấy thông tin chuyến đi</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-orange-500 underline"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  const handleTagToggle = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = () => {
    if (selectedRating) {
      // Active journey is now complete — clear localStorage so the home banner goes away
      // and prevent stale state if the user opens another booking later.
      if (activeJourney) endJourney();
      toast.success("Cảm ơn bạn đã đánh giá!", {
        description: "Phản hồi sẽ giúp đội ngũ FUTA cải thiện dịch vụ.",
      });
      setIsSubmitted(true);
      setTimeout(() => router.push('/'), 1800);
    }
  };

  const currentRating = hoveredRating || selectedRating;

  // Success Screen
  if (isSubmitted) {
    return (
      <PageShell title="Đánh giá chuyến đi" backTo="/" width="wide">
        <div className="max-w-sm mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Cảm ơn bạn!
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Đánh giá của bạn đã được ghi nhận. Chúng tôi sẽ tiếp tục cải thiện dịch vụ để mang lại trải nghiệm tốt nhất.
          </p>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Đánh giá chuyến đi" backTo="/" width="wide">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Trip Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Chuyến đi vừa hoàn thành</p>
            <p className="text-base font-bold text-slate-900 mb-1">
              {trip.route}
            </p>
            <p className="text-sm text-slate-500 font-medium">{trip.date} • {trip.departureTime}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100 shadow-sm shrink-0">
            {/* Professional SVG Bus Icon instead of Emoji */}
            <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
          </div>
        </div>

        {/* Professional Star Rating Question */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-lg font-bold text-slate-900 text-center mb-6">
            Bạn cảm thấy thế nào về chuyến đi?
          </h2>

          <div className="flex justify-center items-center gap-2 sm:gap-4 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setSelectedRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
                className="transform transition-transform duration-200 hover:scale-110 focus:outline-none"
              >
                <svg 
                  className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-200 ${
                    currentRating && star <= currentRating 
                      ? "text-yellow-400 fill-current drop-shadow-sm" 
                      : "text-slate-200 fill-current"
                  }`} 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
          
          {/* Dynamic Rating Label */}
          <div className="h-6 text-center">
            {currentRating && (
              <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                {ratingLabels[currentRating]}
              </span>
            )}
          </div>
        </div>

        {/* Driver Rating Section */}
        <div className={`transition-opacity duration-300 ${selectedRating ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500 shrink-0">
                <img src={trip.driver.photo} alt={trip.driver.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-900">{trip.driver.name}</h2>
                <p className="text-sm text-slate-500">Tài xế · {trip.driver.employeeCode}</p>
              </div>
            </div>
            
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Đánh giá tài xế
            </h3>

            <div className="flex justify-center items-center gap-2 sm:gap-4 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={`driver-${star}`}
                  onClick={() => setSelectedDriverRating(star)}
                  onMouseEnter={() => setHoveredDriverRating(star)}
                  onMouseLeave={() => setHoveredDriverRating(null)}
                  className="transform transition-transform duration-200 hover:scale-110 focus:outline-none"
                >
                  <svg 
                    className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-200 ${
                      (hoveredDriverRating || selectedDriverRating) && star <= (hoveredDriverRating || selectedDriverRating)!
                        ? "text-yellow-400 fill-current drop-shadow-sm"
                        : "text-slate-200 fill-current"
                    }`} 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            
            {/* Dynamic Driver Rating Label */}
            <div className="h-6 text-center">
              {(hoveredDriverRating || selectedDriverRating) && (
                <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  {ratingLabels[(hoveredDriverRating || selectedDriverRating)!]}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Crew (phụ xe) Rating Section — only show when this trip has crew metadata */}
        {trip.crew && (
          <div className={`transition-opacity duration-300 ${selectedRating ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500 shrink-0">
                  <img src={trip.crew.photo} alt={trip.crew.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-slate-900">{trip.crew.name}</h2>
                  <p className="text-sm text-slate-500">Phụ xe · {trip.crew.id}</p>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-4">
                Đánh giá phụ xe
              </h3>

              <div className="flex justify-center items-center gap-2 sm:gap-4 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={`crew-${star}`}
                    onClick={() => setSelectedCrewRating(star)}
                    onMouseEnter={() => setHoveredCrewRating(star)}
                    onMouseLeave={() => setHoveredCrewRating(null)}
                    className="transform transition-transform duration-200 hover:scale-110 focus:outline-none"
                  >
                    <svg
                      className={`w-10 h-10 sm:w-12 sm:h-12 transition-colors duration-200 ${
                        (hoveredCrewRating || selectedCrewRating) && star <= (hoveredCrewRating || selectedCrewRating)!
                          ? "text-yellow-400 fill-current drop-shadow-sm"
                          : "text-slate-200 fill-current"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>

              <div className="h-6 text-center">
                {(hoveredCrewRating || selectedCrewRating) && (
                  <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {ratingLabels[(hoveredCrewRating || selectedCrewRating)!]}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Tags (Clean, No Emojis) */}
        <div className={`transition-opacity duration-300 ${selectedRating ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Điểm nổi bật nhất?
            </h2>
            <p className="text-sm text-slate-500 mb-5">
              Chọn các tiêu chí phù hợp (có thể chọn nhiều)
            </p>

            <div className="flex flex-wrap gap-2.5">
              {quickTags.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    className={`px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 ${
                      isSelected
                        ? "bg-orange-50 border-orange-500 text-orange-700 font-bold"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 font-medium"
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comment Section */}
        <div className={`transition-opacity duration-300 ${selectedRating ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-base font-bold text-slate-900 mb-4">
              Góp thêm ý kiến <span className="text-slate-400 font-normal text-sm">(Tùy chọn)</span>
            </h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ thêm về trải nghiệm của bạn với tài xế và dịch vụ..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
              rows={4}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 pb-8 space-y-3">
          <button
            onClick={handleSubmit}
            disabled={!selectedRating}
            className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 ${
              selectedRating 
                ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md transform hover:-translate-y-0.5' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Gửi đánh giá
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full py-3 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Bỏ qua
          </button>
        </div>

      </div>
    </PageShell>
  );
};