// Pre-canned issue categories for the on-board Quick Report feature.
// "urgent" priority forces the report straight to the dispatch hotline + on-board phụ xe;
// "normal" goes to the standard support queue.

export type QuickReportPriority = "normal" | "urgent";

export interface QuickReportIssue {
  id: string;
  icon: string;
  title: string;
  priority: QuickReportPriority;
}

export const quickReportIssues: QuickReportIssue[] = [
  { id: "ac", icon: "❄️", title: "Điều hòa quá lạnh / quá nóng", priority: "normal" },
  { id: "seat", icon: "💺", title: "Ghế bị lỗi / không ngả được", priority: "normal" },
  { id: "noise", icon: "🔊", title: "Tiếng ồn / nhạc quá to", priority: "normal" },
  { id: "smell", icon: "👃", title: "Mùi khó chịu / mất vệ sinh", priority: "normal" },
  { id: "drive", icon: "🚨", title: "Tài xế lái nguy hiểm", priority: "urgent" },
  { id: "health", icon: "🏥", title: "Hành khách gặp vấn đề sức khỏe", priority: "urgent" },
  { id: "lost", icon: "🎒", title: "Mất / bỏ quên đồ", priority: "normal" },
  { id: "other", icon: "💬", title: "Vấn đề khác", priority: "normal" },
];
