// SVG word cloud — Archimedean-spiral placement with collision avoidance.
// Mirrors the matplotlib WordCloud output from the notebook (YlGn / OrRd
// colormaps on a dark navy background).
//
// We compute placements deterministically (hash-seeded rotation) so renders
// are stable across reloads and sentiment recomputation.

import { useMemo } from "react";

type Word = { word: string; count: number };

interface Placement {
  word: string;
  count: number;
  x: number;
  y: number;
  fontSize: number;
  rotation: 0 | -90;
  color: string;
  width: number;
  height: number;
}

// ── Color helpers ─────────────────────────────────────────────────────────────
function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace("#", ""), 16);
  return [(v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff];
}
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}
function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex(lerp(ar, br, t), lerp(ag, bg, t), lerp(ab, bb, t));
}

// Approximate matplotlib YlGn / OrRd colormaps with a 4-stop gradient.
function ylgn(t: number): string {
  // light yellow → dark green
  if (t < 0.33) return lerpColor("#f7fcb9", "#addd8e", t / 0.33);
  if (t < 0.66) return lerpColor("#addd8e", "#41ab5d", (t - 0.33) / 0.33);
  return lerpColor("#41ab5d", "#005a32", (t - 0.66) / 0.34);
}
function orrd(t: number): string {
  // light cream → dark red
  if (t < 0.33) return lerpColor("#fee8c8", "#fdbb84", t / 0.33);
  if (t < 0.66) return lerpColor("#fdbb84", "#e34a33", (t - 0.33) / 0.33);
  return lerpColor("#e34a33", "#7f0000", (t - 0.66) / 0.34);
}

const PALETTES = { ylgn, orrd };
export type Palette = keyof typeof PALETTES;

// ── Hashing ──────────────────────────────────────────────────────────────────
function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// ── Layout ───────────────────────────────────────────────────────────────────
function layoutWords(
  words: Word[],
  width: number,
  height: number,
  palette: (t: number) => string,
): Placement[] {
  if (words.length === 0) return [];

  const sorted = [...words].sort((a, b) => b.count - a.count).slice(0, 60);
  const maxCount = sorted[0].count;
  const minCount = sorted[sorted.length - 1].count;
  const range = Math.max(1, maxCount - minCount);

  const placements: Placement[] = [];
  const cx = width / 2;
  const cy = height / 2;

  for (const { word, count } of sorted) {
    const intensity = (count - minCount) / range;
    // Font size: 14px (rare) → 70px (most frequent), exponential to emphasise tail.
    const fontSize = Math.round(14 + Math.pow(count / maxCount, 0.55) * 56);
    const rotation: 0 | -90 = (hashStr(word) >> 4) & 1 ? -90 : 0;

    // Approximate text bounding box (sans-serif Bold, glyph width ~0.55em).
    const textW = word.length * fontSize * 0.55;
    const textH = fontSize * 1.1;
    const w = rotation === 0 ? textW : textH;
    const h = rotation === 0 ? textH : textW;

    const seed = hashStr(word);
    let placed = false;

    // Archimedean spiral: r = a*θ. Start with seed-based phase so identical
    // counts don't all stack on the same trajectory.
    for (let t = 0; t < 1500 && !placed; t++) {
      const angle = t * 0.32 + (seed % 13) * 0.5;
      const radius = 4.5 * Math.sqrt(t);
      const px = cx + radius * Math.cos(angle) - w / 2;
      const py = cy + radius * Math.sin(angle) - h / 2;

      if (px < 6 || py < 6 || px + w > width - 6 || py + h > height - 6) continue;

      // 2px breathing room between bounding boxes for readability.
      const pad = 2;
      const collides = placements.some(
        (p) =>
          px < p.x + p.width + pad &&
          px + w + pad > p.x &&
          py < p.y + p.height + pad &&
          py + h + pad > p.y
      );
      if (collides) continue;

      placements.push({
        word,
        count,
        x: px,
        y: py,
        fontSize,
        rotation,
        color: palette(intensity),
        width: w,
        height: h,
      });
      placed = true;
    }
    // If no slot found after 1500 spiral steps, silently drop the word —
    // happens only when the cloud is saturated.
  }

  return placements;
}

// ── Component ────────────────────────────────────────────────────────────────
interface WordCloudProps {
  words: Word[];
  palette: Palette;
  title?: string;
  titleColor?: string;
  width?: number;
  height?: number;
}

export const WordCloud = ({
  words,
  palette,
  title,
  titleColor = "#22c55e",
  width = 720,
  height = 360,
}: WordCloudProps) => {
  const placements = useMemo(
    () => layoutWords(words, width, height, PALETTES[palette]),
    [words, palette, width, height]
  );

  if (words.length === 0) {
    return (
      <div className="rounded-2xl bg-[#1a1a2e] flex items-center justify-center text-slate-400 text-sm" style={{ height }}>
        Chưa có dữ liệu
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden bg-[#1a1a2e] shadow-inner">
      {title && (
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 text-base font-extrabold tracking-wide z-10"
          style={{ color: titleColor }}
        >
          {title}
        </div>
      )}
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
        <rect width={width} height={height} fill="#1a1a2e" />
        {placements.map((p) => {
          const centerX = p.x + p.width / 2;
          const centerY = p.y + p.height / 2;
          return (
            <text
              key={p.word}
              x={centerX}
              y={centerY}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={p.fontSize}
              fontWeight={700}
              fontFamily="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Inter, sans-serif"
              fill={p.color}
              transform={p.rotation === 0 ? undefined : `rotate(${p.rotation}, ${centerX}, ${centerY})`}
            >
              <title>{`${p.word} (${p.count} lần)`}</title>
              {p.word}
            </text>
          );
        })}
      </svg>
    </div>
  );
};
