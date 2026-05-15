import { AppDownloadBanner } from "@/components/AppDownloadBanner";
import { Header } from "@/sections/Header";
import { HomeMain } from "@/sections/HomeMain";
import { Footer } from "@/sections/Footer";

export const MainLayout = () => {
  return (
    <main className="text-sm box-border caret-transparent grow leading-5 outline-[3px] md:text-base md:leading-6">
      <AppDownloadBanner />
      <Header />
      <HomeMain />
      <Footer />
    </main>
  );
};