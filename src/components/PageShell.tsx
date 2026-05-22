import { ReactNode } from "react";
import { useRouter } from "next/navigation";

// Shared shell for every "secondary" page (anything that isn't home/search/booking).
// Centralises the back-button header + gray body background so individual pages can
// focus on content. Mirrors the visual contract of the existing BookingPage header
// (white bar + back chevron + max-w-[1200px] rail) so the entire app feels like one
// product, not a stitched-together prototype.

interface Props {
  // Optional page title rendered next to the back button — keeps the user oriented.
  title?: string;
  // If omitted, the back button calls router.push(-1) (browser back).
  backTo?: string;
  // Right-side header slot — useful for action buttons (e.g. "Đặt lại", filter chips).
  headerRight?: ReactNode;
  // Mobile pages stay narrow (max-w-md), desktop-friendly ones go up to 1200px.
  // Default to "wide" so anything content-heavy reuses the booking-page rail.
  width?: "narrow" | "wide";
  children: ReactNode;
  // Optional extra padding-bottom for screens that pin a sticky bar to the viewport.
  bottomPadding?: "default" | "sticky";
}

export const PageShell = ({
  title,
  backTo,
  headerRight,
  width = "wide",
  children,
  bottomPadding = "default",
}: Props) => {
  const router = useRouter();
  const railClass = width === "narrow" ? "max-w-md mx-auto" : "max-w-[1200px] mx-auto";
  const padBottom = bottomPadding === "sticky" ? "pb-28" : "pb-10";

  return (
    <main className={`w-full bg-[#f3f3f5] min-h-screen ${padBottom}`}>
      {/* Back-button header — matches BookingPage exactly so users feel at home. */}
      <div className="bg-white border-b border-zinc-200 sticky top-0 z-30">
        <div className={`${railClass} px-4 py-3 flex items-center gap-3`}>
          <button
            onClick={() => (backTo ? router.push(backTo) : router.back())}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition shrink-0"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Quay lại</span>
          </button>
          {title && (
            <>
              <span className="text-zinc-300">|</span>
              <h1 className="text-sm md:text-base font-semibold text-zinc-900 truncate">{title}</h1>
            </>
          )}
          {headerRight && <div className="ml-auto">{headerRight}</div>}
        </div>
      </div>

      <div className={`${railClass} px-4 pt-4 md:pt-6`}>{children}</div>
    </main>
  );
};
