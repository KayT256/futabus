import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { NextRouteAnnouncer } from "@/components/NextRouteAnnouncer";
import { EmbeddedFrame } from "@/components/EmbeddedFrame";
import { FloatingWidget } from "@/components/FloatingWidget";
import { MainLayout } from "@/components/layout/MainLayout";
import { SearchResultsPage } from "@/sections/SearchResultsPage";
import { BookingPage } from "@/sections/BookingPage";
import { PaymentPage } from "@/sections/PaymentPage";
import { TicketDetail } from "@/sections/TicketDetail";
import { FutaRada } from "@/sections/FutaRada";
import { TerminalMap } from "@/sections/TerminalMap";
import { QuickReport } from "@/sections/QuickReport";
import { SmartStop } from "@/sections/SmartStop";
import { CrewScoreDetail } from "@/sections/CrewScoreDetail";
import { PostTripFeedback } from "@/sections/PostTripFeedback";
import { CrewScoreDashboard } from "@/sections/CrewScoreDashboard";
import { TripProgress } from "@/sections/TripProgress";
import { AuthProvider } from "@/contexts/AuthContext";
import { JourneyProvider } from "@/contexts/JourneyContext";

export const App = () => {
  return (
    <AuthProvider>
      <JourneyProvider>
        <body className="text-neutral-900 text-sm not-italic tabular-nums font-normal accent-auto bg-white box-border caret-transparent block h-full tracking-[normal] leading-5 list-outside list-disc outline-[3px] pointer-events-auto text-start indent-[0px] normal-case visible w-full overflow-auto border-separate font-intertight md:text-base md:leading-6">
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/ticket" element={<TicketDetail />} />
            <Route path="/futa-rada" element={<FutaRada />} />
            <Route path="/terminal-map" element={<TerminalMap />} />
            <Route path="/quick-report" element={<QuickReport />} />
            <Route path="/smart-stop" element={<SmartStop />} />
            <Route path="/crew-score/:id" element={<CrewScoreDetail />} />
            <Route path="/post-trip-feedback" element={<PostTripFeedback />} />
            <Route path="/crew-score-dashboard" element={<CrewScoreDashboard />} />
            <Route path="/trip-progress" element={<TripProgress />} />
          </Routes>
          <NextRouteAnnouncer />
          <EmbeddedFrame />
          <FloatingWidget />
          {/* Sonner top-center matches the prototype's toast placement and looks good on mobile. */}
          <Toaster position="top-center" richColors closeButton />
        </body>
      </JourneyProvider>
    </AuthProvider>
  );
};