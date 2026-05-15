import { useNavigate } from "react-router-dom";

const mockDriverData = {
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
  recentReviews: [
    {
      id: 1,
      customer: "Trần Thị Lan",
      rating: 5,
      date: "14/05/2026",
      comment: "Tài xế rất nhiệt tình, lái xe an toàn, đúng giờ.",
      tags: ["Lái xe an toàn", "Nhiệt tình"],
    },
    {
      id: 2,
      customer: "Lê Văn Hùng",
      rating: 5,
      date: "13/05/2026",
      comment: "Xe sạch sẽ, tài xế thân thiện, sẽ tiếp tục ủng hộ.",
      tags: ["Xe sạch sẽ", "Thân thiện"],
    },
    {
      id: 3,
      customer: "Phạm Thị Mai",
      rating: 5,
      date: "12/05/2026",
      comment: "Đúng giờ tuyệt đối, dịch vụ rất tốt.",
      tags: ["Đúng giờ", "Nhiệt tình"],
    },
  ],
};

export const CrewScoreDetail = () => {
  const navigate = useNavigate();

  const ratingPercentages = {
    fiveStars: (mockDriverData.ratingBreakdown.fiveStars / mockDriverData.totalRatings) * 100,
    fourStars: (mockDriverData.ratingBreakdown.fourStars / mockDriverData.totalRatings) * 100,
    threeStars: (mockDriverData.ratingBreakdown.threeStars / mockDriverData.totalRatings) * 100,
    twoStars: (mockDriverData.ratingBreakdown.twoStars / mockDriverData.totalRatings) * 100,
    oneStar: (mockDriverData.ratingBreakdown.oneStar / mockDriverData.totalRatings) * 100,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Clean, Modern Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/booking')}
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

          {/* Right Column: Recent Reviews */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Đánh giá gần đây
              </h2>
              <button className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors">
                Xem tất cả
              </button>
            </div>

            <div className="space-y-6">
              {mockDriverData.recentReviews.map((review) => (
                <div key={review.id} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                        <span className="text-sm font-bold text-slate-600">
                          {review.customer.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {review.customer}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-orange-400' : 'text-slate-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    "{review.comment}"
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {review.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
};