import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trips } from "@/data/trips";
import { ALL_REVIEWS } from "@/data/reviews";
import { useReviewAnalytics } from "@/hooks/useReviewAnalytics";

const mockStaffData = trips.map(trip => trip.driver);

const monthlyTrendData = [
  { month: "T1", avgScore: 4.5, totalRatings: 12456 },
  { month: "T2", avgScore: 4.55, totalRatings: 13234 },
  { month: "T3", avgScore: 4.6, totalRatings: 14567 },
  { month: "T4", avgScore: 4.62, totalRatings: 15123 },
  { month: "T5", avgScore: 4.65, totalRatings: 15890 },
  { month: "T6", avgScore: 4.68, totalRatings: 16234 },
];

export const CrewScoreDashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "quarter">("month");
  const [analyticsTab, setAnalyticsTab] = useState<"sentiment" | "keywords" | "topics">("sentiment");

  // All reviews across every driver — analytics recompute whenever this changes.
  const nlp = useReviewAnalytics(ALL_REVIEWS);

  const excellentStaff = mockStaffData.filter((s) => s.status === "excellent");
  const needsAttention = mockStaffData.filter((s) => s.crewScore < 4.5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-700 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "average":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "excellent":
        return "Xuất sắc";
      case "good":
        return "Tốt";
      case "average":
        return "Trung bình";
      default:
        return "Khác";
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f5] font-sans text-slate-900">
      {/* Clean, Modern Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại
            </button>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">Dashboard Chất Lượng Crew Score</h1>
              <p className="text-xs text-slate-500 hidden md:block">Quản lý và theo dõi chất lượng nhân viên</p>
            </div>
          </div>
          <div className="flex items-center">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 outline-none transition-all"
            >
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Overview Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat Card 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm font-medium">Điểm trung bình</span>
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">4.65</span>
              <span className="text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">+0.03</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">so với tháng trước</p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm font-medium">Tổng đánh giá</span>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {monthlyTrendData[monthlyTrendData.length - 1].totalRatings.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full">
                +{((monthlyTrendData[monthlyTrendData.length - 1].totalRatings - monthlyTrendData[monthlyTrendData.length - 2].totalRatings) / monthlyTrendData[monthlyTrendData.length - 2].totalRatings * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">so với tháng trước</p>
          </div>

          {/* Stat Card 3 - Improved Trophy Icon */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm font-medium">Nhân viên xuất sắc</span>
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47 .98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47 .98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{excellentStaff.length}</span>
              <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full">
                {((excellentStaff.length / mockStaffData.length) * 100).toFixed(0)}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">tổng nhân viên</p>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-500 text-sm font-medium">Cần chú ý</span>
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">{needsAttention.length}</span>
              <span className="text-xs font-semibold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                &lt; 4.5 Điểm
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">điểm số thấp</p>
          </div>
        </div>

        {/* Chart & Top Staff Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Trend Chart - Fixed Scale */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Xu hướng điểm số trung bình</h2>
                <p className="text-sm text-slate-500">6 tháng gần nhất</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 rounded-full bg-slate-900 text-white text-sm font-medium transition-all shadow-sm">
                  Tháng
                </button>
                <button className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm font-medium transition-all">
                  Tuần
                </button>
              </div>
            </div>

            <div className="h-64 flex items-end justify-between gap-4 px-2">
              {monthlyTrendData.map((data) => {
                // Modified logic to make variations much clearer. Baseline is 4.4, Max is 4.8.
                const scaledHeight = Math.max(15, ((data.avgScore - 4.4) / 0.4) * 100);

                return (
                  <div key={data.month} className="flex flex-col items-center flex-1 group h-full justify-end">
                    <div className="w-full relative flex items-end justify-center h-full">
                      <div
                        className="w-full max-w-[3rem] bg-orange-400 rounded-t-lg transition-all duration-300 group-hover:bg-orange-500 relative"
                        style={{ height: `${scaledHeight}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-bold px-2.5 py-1.5 rounded shadow-lg pointer-events-none">
                          {data.avgScore}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500 mt-4 font-medium">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Excellent Staff Leaderboard */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Nhân viên xuất sắc</h2>
                <p className="text-sm text-slate-500">Top 5 tháng này</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {excellentStaff.slice(0, 5).map((staff, index) => (
                <div key={staff.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-slate-200 text-slate-700' : index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
                    {index + 1}
                  </div>
                  <img src={staff.photo} alt={staff.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{staff.name}</p>
                    <p className="text-xs text-slate-500 truncate">{staff.employeeCode}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-orange-500">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-base font-bold text-slate-900">{staff.crewScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── NLP Analytics Section ──────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Section header + tab switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Phân tích Cảm xúc Khách hàng</h2>
              <p className="text-sm text-slate-500">
                Mô phỏng pipeline NLP ViSoBERT + BERTopic • {nlp.total.toLocaleString()} đánh giá
              </p>
            </div>
            <div className="inline-flex items-center bg-slate-100 rounded-full p-0.5 text-sm font-semibold shrink-0">
              {(["sentiment", "keywords", "topics"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAnalyticsTab(tab)}
                  className={`px-4 py-1.5 rounded-full transition ${analyticsTab === tab ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                >
                  {tab === "sentiment" ? "Sentiment" : tab === "keywords" ? "Từ khoá" : "Topic Model"}
                </button>
              ))}
            </div>
          </div>

          {analyticsTab === "sentiment" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sentiment donut + bar */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-bold text-slate-900">Tỷ lệ Tích cực / Trung lập / Tiêu cực</h3>
                    <p className="text-sm text-slate-500">Phân loại tự động bằng 5CD-AI/Vietnamese-Sentiment-visobert</p>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${nlp.healthColor === "green" ? "bg-green-50 text-green-700 border-green-200" : nlp.healthColor === "yellow" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                    🏥 Sức khỏe: {nlp.healthLabel}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* SVG Donut */}
                  <div className="relative shrink-0">
                    <svg viewBox="0 0 160 160" className="w-40 h-40 -rotate-90">
                      {(() => {
                        const r = 60, cx = 80, cy = 80;
                        const circ = 2 * Math.PI * r;
                        const segments = [
                          { pct: nlp.positivePct / 100, color: "#22c55e" },
                          { pct: nlp.neutralPct / 100,  color: "#f59e0b" },
                          { pct: nlp.negativePct / 100, color: "#ef4444" },
                        ];
                        let offset = 0;
                        return segments.map((seg, i) => {
                          const dash = seg.pct * circ;
                          const gap  = circ - dash;
                          const el = (
                            <circle
                              key={i}
                              cx={cx} cy={cy} r={r}
                              fill="none"
                              stroke={seg.color}
                              strokeWidth="28"
                              strokeDasharray={`${dash} ${gap}`}
                              strokeDashoffset={-offset * circ}
                            />
                          );
                          offset += seg.pct;
                          return el;
                        });
                      })()}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-extrabold text-slate-900">{nlp.positivePct.toFixed(0)}%</span>
                      <span className="text-xs text-slate-500 font-medium">Tích cực</span>
                    </div>
                  </div>
                  {/* Bar breakdown */}
                  <div className="flex-1 w-full space-y-4">
                    {[
                      { label: "😊 Tích cực", count: nlp.positive, pct: nlp.positivePct, color: "bg-green-500" },
                      { label: "😐 Trung lập", count: nlp.neutral,  pct: nlp.neutralPct,  color: "bg-amber-400" },
                      { label: "😠 Tiêu cực", count: nlp.negative, pct: nlp.negativePct, color: "bg-red-500" },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-sm font-semibold text-slate-700">{row.label}</span>
                          <span className="text-sm font-bold text-slate-900">{row.count.toLocaleString()} <span className="text-slate-400 font-normal">({row.pct.toFixed(1)}%)</span></span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${row.color} rounded-full transition-all duration-500`} style={{ width: `${row.pct}%` }} />
                        </div>
                      </div>
                    ))}
                    <div className={`mt-4 p-3 rounded-xl text-sm font-medium border ${nlp.healthColor === "green" ? "bg-green-50 text-green-800 border-green-200" : nlp.healthColor === "yellow" ? "bg-yellow-50 text-yellow-800 border-yellow-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                      {nlp.healthColor === "green" && "🟢 TỐT — Khách hàng phản hồi rất tích cực!"}
                      {nlp.healthColor === "yellow" && "🟡 TRUNG BÌNH — Cần cải thiện một số điểm."}
                      {nlp.healthColor === "red" && "🔴 YẾU — Cần xem xét lại chất lượng dịch vụ!"}
                      <span className="ml-2 font-bold">Điểm sức khỏe: {nlp.healthScore.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly sentiment stacked bars */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-1">Xu hướng Sentiment theo tháng</h3>
                <p className="text-xs text-slate-500 mb-5">6 tháng gần nhất</p>
                <div className="flex items-end justify-between gap-2 h-48">
                  {nlp.monthlyBreakdown.map((m) => {
                    const total = m.positive + m.neutral + m.negative || 1;
                    const posH = (m.positive / total) * 100;
                    const neuH = (m.neutral  / total) * 100;
                    const negH = (m.negative / total) * 100;
                    return (
                      <div key={m.month} className="flex flex-col items-center flex-1 gap-1 h-full justify-end group">
                        <div className="relative w-full flex flex-col justify-end overflow-hidden rounded-t-md" style={{ height: "85%" }}>
                          <div className="w-full bg-red-400"    style={{ height: `${negH}%` }} title={`${m.negative} tiêu cực`} />
                          <div className="w-full bg-amber-300"  style={{ height: `${neuH}%` }} title={`${m.neutral} trung lập`} />
                          <div className="w-full bg-green-400"  style={{ height: `${posH}%` }} title={`${m.positive} tích cực`} />
                        </div>
                        <span className="text-xs text-slate-500 font-medium">{m.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-green-400 inline-block" /> Tích cực</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-300 inline-block" /> Trung lập</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-400   inline-block" /> Tiêu cực</span>
                </div>
              </div>
            </div>
          )}

          {analyticsTab === "keywords" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Positive keywords */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="text-green-500">😊</span> Từ khóa Tích cực (độc quyền)
                </h3>
                <p className="text-xs text-slate-500 mb-5">Từ xuất hiện chỉ trong review tích cực</p>
                <div className="space-y-3">
                  {nlp.topPosKeywords.map((kw, i) => {
                    const max = nlp.topPosKeywords[0]?.count || 1;
                    return (
                      <div key={kw.word} className="flex items-center gap-3">
                        <span className="w-5 text-xs text-slate-400 text-right shrink-0">{i + 1}</span>
                        <span className="text-sm font-semibold text-slate-800 w-28 shrink-0 truncate">{kw.word}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-400 rounded-full" style={{ width: `${(kw.count / max) * 100}%` }} />
                        </div>
                        <span className="text-sm font-bold text-green-700 w-8 text-right shrink-0">{kw.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Negative keywords */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="text-red-500">😠</span> Từ khóa Tiêu cực (độc quyền)
                </h3>
                <p className="text-xs text-slate-500 mb-5">Từ xuất hiện chỉ trong review tiêu cực</p>
                <div className="space-y-3">
                  {nlp.topNegKeywords.map((kw, i) => {
                    const max = nlp.topNegKeywords[0]?.count || 1;
                    return (
                      <div key={kw.word} className="flex items-center gap-3">
                        <span className="w-5 text-xs text-slate-400 text-right shrink-0">{i + 1}</span>
                        <span className="text-sm font-semibold text-slate-800 w-28 shrink-0 truncate">{kw.word}</span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-400 rounded-full" style={{ width: `${(kw.count / max) * 100}%` }} />
                        </div>
                        <span className="text-sm font-bold text-red-700 w-8 text-right shrink-0">{kw.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Tag cloud (word-cloud simulation) */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-1">Tag Cloud — Pain Points</h3>
                <p className="text-xs text-slate-500 mb-5">Kích thước tag tỷ lệ thuận với tần suất xuất hiện</p>
                <div className="flex flex-wrap gap-2 items-center">
                  {nlp.tagFrequency.map((t) => {
                    const max = nlp.tagFrequency[0]?.count || 1;
                    const scale = 0.6 + (t.count / max) * 1.4;
                    const isPos = ["Lái xe an toàn","Đúng giờ","Nhiệt tình","Thân thiện","Xe sạch sẽ","Chu đáo","Chuyên nghiệp","Hỗ trợ hành lý","Điều hòa tốt"].includes(t.tag);
                    return (
                      <span
                        key={t.tag}
                        title={`${t.count} lần`}
                        className={`px-3 py-1.5 rounded-full font-semibold border cursor-default select-none transition-transform hover:scale-105 ${isPos ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}
                        style={{ fontSize: `${Math.round(11 * scale)}px` }}
                      >
                        {t.tag}
                        <span className="ml-1 opacity-60 text-[10px]">×{t.count}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {analyticsTab === "topics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Positive topics */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="text-green-500">😊</span> Topics Tích cực
                </h3>
                <p className="text-xs text-slate-500 mb-5">BERTopic + Qwen3-Embedding-0.6B + HDBSCAN clustering</p>
                <div className="space-y-4">
                  {nlp.posTopics.map((t, i) => {
                    const maxC = Math.max(...nlp.posTopics.map((x) => x.count), 1);
                    return (
                      <div key={t.id} className="border border-green-100 rounded-xl p-4 bg-green-50/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-slate-900">{t.label}</span>
                          <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{t.count} reviews</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {t.keywords.map((kw) => (
                            <span key={kw} className="text-xs bg-white border border-green-200 text-green-700 px-2 py-0.5 rounded-md">{kw}</span>
                          ))}
                        </div>
                        <div className="h-1.5 bg-green-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-400 rounded-full" style={{ width: `${maxC ? (t.count / maxC) * 100 : 0}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* Negative topics */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <span className="text-red-500">😠</span> Topics Tiêu cực
                </h3>
                <p className="text-xs text-slate-500 mb-5">Phân cụm với min_cluster_size=6, nr_topics=5</p>
                <div className="space-y-4">
                  {nlp.negTopics.map((t) => {
                    const maxC = Math.max(...nlp.negTopics.map((x) => x.count), 1);
                    return (
                      <div key={t.id} className="border border-red-100 rounded-xl p-4 bg-red-50/40">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-slate-900">{t.label}</span>
                          <span className="text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">{t.count} reviews</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {t.keywords.map((kw) => (
                            <span key={kw} className="text-xs bg-white border border-red-200 text-red-700 px-2 py-0.5 rounded-md">{kw}</span>
                          ))}
                        </div>
                        <div className="h-1.5 bg-red-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-400 rounded-full" style={{ width: `${maxC ? (t.count / maxC) * 100 : 0}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Staff Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Table Toolbar */}
          <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Danh sách nhân viên</h2>
              <p className="text-sm text-slate-500">Tất cả {mockStaffData.length} nhân viên</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5 outline-none transition-all"
                />
                <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 p-2.5 outline-none transition-all hidden sm:block">
                <option value="">Tất cả trạng thái</option>
                <option value="excellent">Xuất sắc</option>
                <option value="good">Tốt</option>
                <option value="average">Trung bình</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-4">Nhân viên</th>
                  <th scope="col" className="px-6 py-4">Mã NV</th>
                  <th scope="col" className="px-6 py-4">Crew Score</th>
                  <th scope="col" className="px-6 py-4">Chuyến đi</th>
                  <th scope="col" className="px-6 py-4">Đánh giá</th>
                  <th scope="col" className="px-6 py-4">Trạng thái</th>
                  <th scope="col" className="px-6 py-4 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockStaffData.map((staff) => (
                  <tr key={staff.id} className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src={staff.photo} alt={staff.name} className="w-10 h-10 rounded-full object-cover" />
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${staff.crewScore >= 4.7 ? 'bg-green-500' : staff.crewScore >= 4.5 ? 'bg-blue-500' : staff.crewScore >= 4.0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{staff.name}</p>
                          <p className="text-xs text-slate-500">{staff.employeeCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-500">
                      {staff.employeeCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-orange-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-bold text-slate-900">{staff.crewScore}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {staff.totalTrips.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {staff.totalRatings.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(staff.status)}`}>
                        {getStatusLabel(staff.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => navigate(`/crew-score/${staff.id}?from=dashboard`)}
                        className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-medium px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};