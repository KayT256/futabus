// Derives all analytics panels from a live reviews array.
// Every value is computed via useMemo so adding a new review
// (from the comment form) triggers a full recalc automatically.

import { useMemo } from "react";
import type { Review, Sentiment } from "@/data/reviews";

// ─────────────────────────────────────────────────────────────────────────────
// Keyword extraction: count word frequency from comments of each sentiment.
// We filter stop-words and short tokens to surface meaningful terms — mirrors
// the notebook's underthesea word_tokenize + POS-filter pipeline.
// ─────────────────────────────────────────────────────────────────────────────

const VI_STOPWORDS = new Set([
  "và", "của", "là", "có", "được", "cho", "với", "các", "này", "đã",
  "không", "một", "trong", "đó", "thì", "mà", "hay", "cũng", "như",
  "về", "rất", "thật", "quá", "lắm", "hơn", "nữa", "vẫn", "bị", "bởi",
  "tại", "vì", "nên", "mình", "bạn", "cả", "khi", "đây", "lại", "ra",
  "vào", "lên", "xuống", "đến", "còn", "hôm", "ngày", "lúc", "buổi",
  "tôi", "mà", "nhưng", "dù", "nên", "nếu", "vậy", "thế", "đi", "xe",
  "chuyến", "đi", "lần", "sau", "trước", "đến", "điểm", "hành", "khách",
]);

function extractKeywords(reviews: Review[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const r of reviews) {
    const tokens = r.comment
      .toLowerCase()
      .replace(/[^\p{L}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !VI_STOPWORDS.has(w));
    for (const token of tokens) {
      freq.set(token, (freq.get(token) ?? 0) + 1);
    }
  }
  return freq;
}

function topN(freq: Map<string, number>, n: number): { word: string; count: number }[] {
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([word, count]) => ({ word, count }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Simulated BERTopic clusters — derived from the review tag pool, which
// already categorises comments by theme. In production this would come from
// a real NLP pipeline; here we bucket reviews by their tag keywords.
// ─────────────────────────────────────────────────────────────────────────────

const TOPIC_POSITIVE = [
  { id: "tp1", label: "🛡️ An toàn & Lái xe",      keywords: ["lái xe an toàn", "êm", "ổn định", "chắc tay"] },
  { id: "tp2", label: "😊 Thái độ phục vụ",         keywords: ["nhiệt tình", "thân thiện", "chu đáo", "lịch sự"] },
  { id: "tp3", label: "⏰ Đúng giờ & Tiện nghi",    keywords: ["đúng giờ", "xe sạch sẽ", "điều hòa", "chuyên nghiệp"] },
  { id: "tp4", label: "🧳 Hỗ trợ hành lý",          keywords: ["hỗ trợ hành lý", "hành lý"] },
  { id: "tp5", label: "🛋️ Không gian thoải mái",    keywords: ["thoải mái", "rộng rãi", "ghế"] },
];

const TOPIC_NEGATIVE = [
  { id: "tn1", label: "⏱️ Trễ giờ",                keywords: ["đến trễ", "không thông báo"] },
  { id: "tn2", label: "😠 Thái độ không tốt",       keywords: ["thái độ không tốt", "thô lỗ"] },
  { id: "tn3", label: "🌡️ Điều hòa & Xe cũ",        keywords: ["điều hòa hỏng", "xe cũ"] },
  { id: "tn4", label: "🚗 Lái xe nguy hiểm",         keywords: ["lái xe ẩu", "nguy hiểm", "lái xe không an toàn"] },
  { id: "tn5", label: "📦 Hành lý bị hỏng",          keywords: ["hành lý bị hỏng"] },
];

function bucketTopics(
  reviews: Review[],
  sentiment: Sentiment,
  topicDefs: typeof TOPIC_POSITIVE,
) {
  const pool = reviews.filter((r) => r.sentiment === sentiment);
  return topicDefs.map((td) => {
    const matching = pool.filter((r) =>
      r.tags.some((tag) =>
        td.keywords.some((kw) => tag.toLowerCase().includes(kw.toLowerCase()))
      )
    );
    // Pick most-helpful representative reviews to show as topic samples
    // (mirrors the notebook's `show_topic_samples` block).
    const samples = [...matching]
      .sort((a, b) => b.helpfulCount - a.helpfulCount)
      .slice(0, 3);
    return { ...td, count: matching.length, samples };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Monthly sentiment breakdown — groups reviews by calendar month (last 6).
// ─────────────────────────────────────────────────────────────────────────────

function buildMonthlyBreakdown(reviews: Review[]) {
  const months: { month: string; label: string; positive: number; neutral: number; negative: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const key = `${mm}/${yyyy}`;
    const label = `T${d.getMonth() + 1}`;
    const bucket = reviews.filter((r) => {
      const parts = r.date.split("/");
      return `${parts[1]}/${parts[2]}` === key;
    });
    months.push({
      month: key,
      label,
      positive: bucket.filter((r) => r.sentiment === "positive").length,
      neutral:  bucket.filter((r) => r.sentiment === "neutral").length,
      negative: bucket.filter((r) => r.sentiment === "negative").length,
    });
  }
  return months;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public hook
// ─────────────────────────────────────────────────────────────────────────────

export interface ReviewAnalytics {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  positivePct: number;
  neutralPct:  number;
  negativePct: number;
  healthScore: number;       // (pos - neg) / total * 100
  healthLabel: "TỐT" | "TRUNG BÌNH" | "YẾU";
  healthColor: "green" | "yellow" | "red";
  avgRating: number;
  topPosKeywords: { word: string; count: number }[];
  topNegKeywords: { word: string; count: number }[];
  allPosKeywords: { word: string; count: number }[];   // top 60 — feeds the word cloud
  allNegKeywords: { word: string; count: number }[];
  tagFrequency:   { tag: string; count: number }[];  // all tags
  posTopics:      { id: string; label: string; keywords: string[]; count: number; samples: Review[] }[];
  negTopics:      { id: string; label: string; keywords: string[]; count: number; samples: Review[] }[];
  monthlyBreakdown: { month: string; label: string; positive: number; neutral: number; negative: number }[];
}

export function useReviewAnalytics(reviews: Review[]): ReviewAnalytics {
  return useMemo(() => {
    const total    = reviews.length;
    const positive = reviews.filter((r) => r.sentiment === "positive").length;
    const neutral  = reviews.filter((r) => r.sentiment === "neutral").length;
    const negative = reviews.filter((r) => r.sentiment === "negative").length;

    const positivePct = total ? (positive / total) * 100 : 0;
    const neutralPct  = total ? (neutral  / total) * 100 : 0;
    const negativePct = total ? (negative / total) * 100 : 0;

    const healthScore = total ? ((positive - negative) / total) * 100 : 0;
    const healthLabel = healthScore >= 50 ? "TỐT" : healthScore >= 20 ? "TRUNG BÌNH" : "YẾU";
    const healthColor = healthScore >= 50 ? "green" : healthScore >= 20 ? "yellow" : "red";

    const avgRating = total
      ? parseFloat((reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(2))
      : 0;

    const posReviews = reviews.filter((r) => r.sentiment === "positive");
    const negReviews = reviews.filter((r) => r.sentiment === "negative");

    const posFreq = extractKeywords(posReviews);
    const negFreq = extractKeywords(negReviews);

    // Subtract words that appear in both groups so keywords are "exclusive" —
    // mirrors the notebook's `pos_only` / `neg_only` filtering.
    posFreq.forEach((_, w) => { if (negFreq.has(w)) { posFreq.delete(w); } });
    negFreq.forEach((_, w) => { if (posFreq.has(w)) { negFreq.delete(w); } });

    const topPosKeywords = topN(posFreq, 10);
    const topNegKeywords = topN(negFreq, 10);
    // Word cloud needs more than 10 — give it the top 60.
    const allPosKeywords = topN(posFreq, 60);
    const allNegKeywords = topN(negFreq, 60);

    // Tag frequency across all reviews.
    const tagMap = new Map<string, number>();
    for (const r of reviews) {
      for (const tag of r.tags) {
        tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
      }
    }
    const tagFrequency = [...tagMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));

    const posTopics = bucketTopics(reviews, "positive", TOPIC_POSITIVE);
    const negTopics = bucketTopics(reviews, "negative", TOPIC_NEGATIVE);
    const monthlyBreakdown = buildMonthlyBreakdown(reviews);

    return {
      total, positive, neutral, negative,
      positivePct, neutralPct, negativePct,
      healthScore: parseFloat(healthScore.toFixed(1)),
      healthLabel, healthColor,
      avgRating,
      topPosKeywords, topNegKeywords,
      allPosKeywords, allNegKeywords,
      tagFrequency,
      posTopics, negTopics, monthlyBreakdown,
    };
  }, [reviews]);
}
