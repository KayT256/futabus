import { BookingHero } from "@/sections/BookingHero";
import { PromotionsSection } from "@/sections/PromotionsSection";
import { PopularRoutesSection } from "@/sections/PopularRoutesSection";
import { QualitySection } from "@/sections/QualitySection";
import { NewsSection } from "@/sections/NewsSection";
import { FutaGroupSection } from "@/sections/FutaGroupSection";
import { ActiveJourneyBanner } from "@/components/ActiveJourneyBanner";

export const HomeMain = () => {
  return (
    <main className="text-sm box-border caret-transparent leading-5 outline-[3px] w-full md:text-base md:leading-6">
      <BookingHero />
      {/* Banner shows only when JourneyContext has an active journey — silent otherwise.
          Placed AFTER the hero so it never overlaps the absolute-positioned search form
          / promo image. Sits as the first card in the page-flow content. */}
      <ActiveJourneyBanner />
      <PromotionsSection />
      <PopularRoutesSection />
      <QualitySection />
      <NewsSection />
      <FutaGroupSection />
    </main>
  );
};