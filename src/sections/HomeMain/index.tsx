import { BookingHero } from "@/sections/BookingHero";
import { PromotionsSection } from "@/sections/PromotionsSection";
import { PopularRoutesSection } from "@/sections/PopularRoutesSection";
import { QualitySection } from "@/sections/QualitySection";
import { NewsSection } from "@/sections/NewsSection";
import { FutaGroupSection } from "@/sections/FutaGroupSection";

export const HomeMain = () => {
  return (
    <main className="text-sm box-border caret-transparent leading-5 outline-[3px] w-full md:text-base md:leading-6">
      <BookingHero />
      <PromotionsSection />
      <PopularRoutesSection />
      <QualitySection />
      <NewsSection />
      <FutaGroupSection />
    </main>
  );
};