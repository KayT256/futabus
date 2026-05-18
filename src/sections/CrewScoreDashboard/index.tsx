import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ArrowLeft,
  TrendingUp,
  Star,
  Trophy,
  AlertOctagon,
  Search,
  ChevronRight,
  Activity,
  ShieldCheck,
  Smile,
  Clock,
  Luggage,
  Armchair,
  TimerOff,
  Frown,
  Thermometer,
  AlertTriangle,
  PackageX,
  Sparkles,
  Brain,
  Network,
  SpellCheck,
  Eraser,
  ArrowRight,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { trips } from "@/data/trips";
import { ALL_REVIEWS } from "@/data/reviews";
import { useReviewAnalytics } from "@/hooks/useReviewAnalytics";
import { WordCloud } from "@/components/WordCloud";

// Resolves the icon-name string emitted by `useReviewAnalytics` (kept as a
// plain string there so the hook stays presentation-agnostic) into a Lucide
// component. Centralising the mapping here means the data layer never imports
// React and we get a single audit point for adding new topic categories.
const TOPIC_ICONS: Record<string, LucideIcon> = {
  "shield-check":   ShieldCheck,
  "smile":          Smile,
  "clock":          Clock,
  "luggage":        Luggage,
  "armchair":       Armchair,
  "timer-off":      TimerOff,
  "frown":          Frown,
  "thermometer":    Thermometer,
  "alert-triangle": AlertTriangle,
  "package-x":      PackageX,
};

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
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm"
            >
              <ArrowLeft size={18} />
              Quay lại
            </button>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 grid place-items-center shadow-sm">
                <Activity size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-tight">Crew Score Dashboard</h1>
                <p className="text-[11px] text-slate-500 hidden md:block">Quản lý & theo dõi chất lượng nhân viên</p>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block w-full px-3 py-2 outline-none transition-all font-medium"
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
          <StatCard
            label="Điểm trung bình"
            value="4.65"
            delta="+0.03"
            deltaTone="green"
            footer="so với tháng trước"
            icon={TrendingUp}
            iconTone="green"
          />
          <StatCard
            label="Tổng đánh giá"
            value={monthlyTrendData[monthlyTrendData.length - 1].totalRatings.toLocaleString()}
            delta={`+${(((monthlyTrendData[monthlyTrendData.length - 1].totalRatings - monthlyTrendData[monthlyTrendData.length - 2].totalRatings) / monthlyTrendData[monthlyTrendData.length - 2].totalRatings) * 100).toFixed(1)}%`}
            deltaTone="blue"
            footer="so với tháng trước"
            icon={Star}
            iconTone="blue"
          />
          <StatCard
            label="Nhân viên xuất sắc"
            value={`${excellentStaff.length}`}
            delta={`${((excellentStaff.length / mockStaffData.length) * 100).toFixed(0)}%`}
            deltaTone="orange"
            footer="tổng nhân viên"
            icon={Trophy}
            iconTone="orange"
          />
          <StatCard
            label="Cần chú ý"
            value={`${needsAttention.length}`}
            delta="< 4.5 điểm"
            deltaTone="red"
            footer="điểm số thấp"
            icon={AlertOctagon}
            iconTone="red"
          />
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
                    <div className="flex items-center justify-end gap-1">
                      <Star size={14} className="text-orange-500 fill-orange-500" />
                      <span className="text-base font-bold text-slate-900">{staff.crewScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── NLP Pipeline (mirrors the 5 notebook stages) ───────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pipeline Phân tích NLP</h2>
              <p className="text-sm text-slate-500">5 giai đoạn theo notebook Phân_tích_cảm_xúc_tiếng_Việt.ipynb</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Đã chạy xong • {nlp.total.toLocaleString()} reviews
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { num: 1, Icon: Eraser,     title: "Text Cleaning",      desc: "Loại URL, mention, hashtag, ký tự đặc biệt", model: "regex + lang_detect", count: `${nlp.total} → ${nlp.total} VI` },
              { num: 2, Icon: Sparkles,   title: "Teen Code",          desc: "Chuẩn hoá tiếng lóng & viết tắt",            model: "teencode dictionary", count: "831 từ slang" },
              { num: 3, Icon: SpellCheck, title: "Spell Correction",   desc: "Sửa lỗi chính tả & dấu câu",                  model: "protonx-legal-tc",    count: "Seq2Seq • beam=10" },
              { num: 4, Icon: Brain,      title: "Sentiment Analysis", desc: "Phân loại POS / NEU / NEG",                    model: "5CD-AI/ViSoBERT",     count: `${nlp.positive}/${nlp.neutral}/${nlp.negative}` },
              { num: 5, Icon: Network,    title: "Topic Modeling",     desc: "Phân cụm chủ đề tự động",                      model: "BERTopic + Qwen3 + HDBSCAN", count: `${nlp.posTopics.length + nlp.negTopics.length} topics` },
            ].map((step, i, arr) => (
              <div key={step.num} className="relative">
                <div className="border border-slate-200 rounded-xl p-4 bg-gradient-to-br from-slate-50 to-white h-full hover:border-orange-200 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">{step.num}</span>
                    <div className="w-9 h-9 rounded-lg bg-orange-50 grid place-items-center text-orange-600">
                      <step.Icon size={18} />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-500 mb-2 leading-snug">{step.desc}</p>
                  <p className="text-[10px] font-mono text-slate-400 truncate" title={step.model}>{step.model}</p>
                  <div className="mt-2 inline-block text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-md px-2 py-0.5">
                    {step.count}
                  </div>
                </div>
                {/* Arrow between cards (desktop only) */}
                {i < arr.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-2.5 -translate-y-1/2 w-5 h-5 bg-white rounded-full items-center justify-center text-slate-300 z-10">
                    <ChevronRight size={14} />
                  </div>
                )}
              </div>
            ))}
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
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${nlp.healthColor === "green" ? "bg-green-50 text-green-700 border-green-200" : nlp.healthColor === "yellow" ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"}`}>
                    <HeartPulse size={13} /> Sức khỏe: {nlp.healthLabel}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Recharts Donut */}
                  <div className="relative shrink-0 w-40 h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Tích cực", value: nlp.positive, color: "#22c55e" },
                            { name: "Trung lập", value: nlp.neutral, color: "#f59e0b" },
                            { name: "Tiêu cực", value: nlp.negative, color: "#ef4444" },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                          startAngle={90}
                          endAngle={-270}
                        >
                          <Cell fill="#22c55e" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#ef4444" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-2xl font-extrabold text-slate-900">{nlp.positivePct.toFixed(0)}%</span>
                      <span className="text-xs text-slate-500 font-medium">Tích cực</span>
                    </div>
                  </div>
                  {/* Bar breakdown */}
                  <div className="flex-1 w-full space-y-4">
                    {[
                      { Icon: Smile, label: "Tích cực", count: nlp.positive, pct: nlp.positivePct, color: "bg-green-500",  toneText: "text-green-700" },
                      { Icon: null,  label: "Trung lập", count: nlp.neutral,  pct: nlp.neutralPct,  color: "bg-amber-400", toneText: "text-amber-700" },
                      { Icon: Frown, label: "Tiêu cực", count: nlp.negative, pct: nlp.negativePct, color: "bg-red-500",    toneText: "text-red-700" },
                    ].map((row) => (
                      <div key={row.label}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className={`text-sm font-semibold inline-flex items-center gap-1.5 ${row.toneText}`}>
                            {row.Icon ? <row.Icon size={14} /> : <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />}
                            {row.label}
                          </span>
                          <span className="text-sm font-bold text-slate-900">{row.count.toLocaleString()} <span className="text-slate-400 font-normal">({row.pct.toFixed(1)}%)</span></span>
                        </div>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${row.color} rounded-full transition-all duration-500`} style={{ width: `${row.pct}%` }} />
                        </div>
                      </div>
                    ))}
                    <div className={`mt-4 p-3 rounded-xl text-sm font-medium border flex items-start gap-2 ${nlp.healthColor === "green" ? "bg-green-50 text-green-800 border-green-200" : nlp.healthColor === "yellow" ? "bg-yellow-50 text-yellow-800 border-yellow-200" : "bg-red-50 text-red-800 border-red-200"}`}>
                      <HeartPulse size={16} className="shrink-0 mt-0.5" />
                      <div>
                        {nlp.healthColor === "green" && "TỐT — Khách hàng phản hồi rất tích cực."}
                        {nlp.healthColor === "yellow" && "TRUNG BÌNH — Cần cải thiện một số điểm."}
                        {nlp.healthColor === "red" && "YẾU — Cần xem xét lại chất lượng dịch vụ."}
                        <span className="ml-2 font-bold">Điểm sức khỏe: {nlp.healthScore.toFixed(1)}</span>
                      </div>
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
                  <Smile size={18} className="text-green-600" /> Từ khóa Tích cực (độc quyền)
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
                  <Frown size={18} className="text-red-600" /> Từ khóa Tiêu cực (độc quyền)
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
              {/* Side-by-side keyword table (mirrors notebook df_keywords) */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-1">TOP 10 Từ khóa Độc quyền — Bảng Đối chiếu</h3>
                <p className="text-xs text-slate-500 mb-4">Tích cực vs Tiêu cực, sắp xếp theo tần suất giảm dần</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-2 font-semibold text-slate-500 w-8">#</th>
                        <th className="text-left py-2 px-2 font-bold text-green-700"><span className="inline-flex items-center gap-1.5"><Smile size={14} /> Từ khóa Tích cực</span></th>
                        <th className="text-right py-2 px-2 font-semibold text-slate-500 w-20">Tần suất</th>
                        <th className="text-left py-2 px-2 font-bold text-red-700"><span className="inline-flex items-center gap-1.5"><Frown size={14} /> Từ khóa Tiêu cực</span></th>
                        <th className="text-right py-2 px-2 font-semibold text-slate-500 w-20">Tần suất</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: 10 }).map((_, i) => {
                        const pos = nlp.topPosKeywords[i];
                        const neg = nlp.topNegKeywords[i];
                        return (
                          <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                            <td className="py-2 px-2 text-slate-400 text-xs">{i}</td>
                            <td className="py-2 px-2 text-slate-800">{pos?.word ?? "—"}</td>
                            <td className="py-2 px-2 text-right font-bold text-green-700">{pos?.count ?? "—"}</td>
                            <td className="py-2 px-2 text-slate-800">{neg?.word ?? "—"}</td>
                            <td className="py-2 px-2 text-right font-bold text-red-700">{neg?.count ?? "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Word cloud — full notebook reproduction (YlGn + OrRd colormap, dark bg) */}
              <div className="lg:col-span-2 bg-[#1a1a2e] rounded-2xl shadow-sm border border-slate-800 p-6">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-extrabold text-white tracking-wide">WORD CLOUD — PHÂN TÍCH CẢM XÚC KHÁCH HÀNG</h3>
                  <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">wordcloud + DejaVuSans-Bold</span>
                </div>
                <p className="text-xs text-slate-400 mb-5">Kích thước từ tỷ lệ thuận với tần suất • bố cục Archimedean spiral</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <WordCloud
                    words={nlp.allPosKeywords}
                    palette="ylgn"
                    title="PAIN POINT TÍCH CỰC"
                    titleColor="#2ecc71"
                    width={720}
                    height={360}
                  />
                  <WordCloud
                    words={nlp.allNegKeywords}
                    palette="orrd"
                    title="PAIN POINT TIÊU CỰC"
                    titleColor="#e74c3c"
                    width={720}
                    height={360}
                  />
                </div>
              </div>
            </div>
          )}

          {analyticsTab === "topics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopicColumn
                title="Topics Tích cực"
                subtitle="BERTopic + Qwen3-Embedding-0.6B + HDBSCAN clustering"
                topics={nlp.posTopics}
                tone="positive"
                HeaderIcon={Smile}
              />
              <TopicColumn
                title="Topics Tiêu cực"
                subtitle="Phân cụm với min_cluster_size=6, nr_topics=5"
                topics={nlp.negTopics}
                tone="negative"
                HeaderIcon={Frown}
              />
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
                  className="bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 block w-full pl-10 px-3 py-2 outline-none transition-all"
                />
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
              <select className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 px-3 py-2 outline-none transition-all hidden sm:block">
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
                      <div className="flex items-center gap-1.5">
                        <Star size={14} className="text-orange-500 fill-orange-500" />
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
                        className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-medium px-3 py-1.5 rounded-lg transition-colors text-sm"
                      >
                        Chi tiết <ChevronRight size={14} />
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

// ─────────────────────────────────────────────────────────────────────────────
// Internal sub-components — kept in this file because they're tightly coupled
// to the dashboard's visual rhythm (consistent card chrome, tone tokens) and
// don't need to be shared elsewhere.
// ─────────────────────────────────────────────────────────────────────────────

// Tone tokens applied to both the icon chip and the delta pill. Centralised so
// adding a new stat tone is a one-line change.
const TONE_TOKENS = {
  green:  { bg: "bg-green-50",  fg: "text-green-600",  pill: "bg-green-100  text-green-700" },
  blue:   { bg: "bg-blue-50",   fg: "text-blue-600",   pill: "bg-blue-100   text-blue-700" },
  orange: { bg: "bg-orange-50", fg: "text-orange-600", pill: "bg-orange-100 text-orange-700" },
  red:    { bg: "bg-red-50",    fg: "text-red-600",    pill: "bg-red-100    text-red-700" },
} as const;
type Tone = keyof typeof TONE_TOKENS;

const StatCard = ({
  label,
  value,
  delta,
  deltaTone,
  footer,
  icon: Icon,
  iconTone,
}: {
  label: string;
  value: string;
  delta: string;
  deltaTone: Tone;
  footer: string;
  icon: LucideIcon;
  iconTone: Tone;
}) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-slate-300 transition-all">
    <div className="flex items-center justify-between mb-4">
      <span className="text-slate-500 text-sm font-medium">{label}</span>
      <div className={`w-10 h-10 rounded-full grid place-items-center ${TONE_TOKENS[iconTone].bg} ${TONE_TOKENS[iconTone].fg}`}>
        <Icon size={20} strokeWidth={2.25} />
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-slate-900">{value}</span>
      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${TONE_TOKENS[deltaTone].pill}`}>
        {delta}
      </span>
    </div>
    <p className="text-xs text-slate-400 mt-2">{footer}</p>
  </div>
);

// Renders a single column of topic cards (positive or negative). Pulls the
// per-topic Lucide icon from the `TOPIC_ICONS` map keyed off the icon-name
// string emitted by the analytics hook.
const TopicColumn = ({
  title,
  subtitle,
  topics,
  tone,
  HeaderIcon,
}: {
  title: string;
  subtitle: string;
  topics: { id: string; icon: string; label: string; keywords: string[]; count: number; samples: { id: string | number; comment: string }[] }[];
  tone: "positive" | "negative";
  HeaderIcon: LucideIcon;
}) => {
  const palette = tone === "positive"
    ? { headerFg: "text-green-600", border: "border-green-100", bg: "bg-green-50/40", pill: "bg-green-100 text-green-700", chipBorder: "border-green-200", chipText: "text-green-700", barBg: "bg-green-100", barFill: "bg-green-400", iconBg: "bg-green-100 text-green-700", sampleAccent: "text-green-700", sampleBorder: "border-green-100" }
    : { headerFg: "text-red-600",   border: "border-red-100",   bg: "bg-red-50/40",   pill: "bg-red-100 text-red-700",     chipBorder: "border-red-200",   chipText: "text-red-700",   barBg: "bg-red-100",   barFill: "bg-red-400",   iconBg: "bg-red-100 text-red-700",   sampleAccent: "text-red-700",   sampleBorder: "border-red-100" };

  const maxC = Math.max(...topics.map((x) => x.count), 1);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
        <HeaderIcon size={18} className={palette.headerFg} /> {title}
      </h3>
      <p className="text-xs text-slate-500 mb-5">{subtitle}</p>
      <div className="space-y-4">
        {topics.map((t) => {
          const TopicIcon = TOPIC_ICONS[t.icon] ?? Activity;
          return (
            <div key={t.id} className={`border ${palette.border} rounded-xl p-4 ${palette.bg}`}>
              <div className="flex items-center justify-between mb-2 gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${palette.iconBg}`}>
                    <TopicIcon size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-900 truncate">{t.label}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${palette.pill}`}>
                  {t.count} reviews
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {t.keywords.map((kw) => (
                  <span key={kw} className={`text-xs bg-white border ${palette.chipBorder} ${palette.chipText} px-2 py-0.5 rounded-md`}>
                    {kw}
                  </span>
                ))}
              </div>
              <div className={`h-1.5 ${palette.barBg} rounded-full overflow-hidden mb-3`}>
                <div className={`h-full ${palette.barFill} rounded-full transition-all duration-500`} style={{ width: `${(t.count / maxC) * 100}%` }} />
              </div>
              {t.samples.length > 0 && (
                <div className={`border-t ${palette.sampleBorder} pt-2 mt-1`}>
                  <p className={`text-[10px] font-bold uppercase tracking-wide ${palette.sampleAccent} mb-1.5`}>Review mẫu</p>
                  <div className="space-y-1.5">
                    {t.samples.map((s, idx) => (
                      <div key={s.id} className="text-xs text-slate-600 italic leading-snug">
                        <span className={`font-bold ${palette.sampleAccent}`}>[{idx + 1}]</span>{" "}
                        "{s.comment.length > 110 ? s.comment.slice(0, 110) + "…" : s.comment}"
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};