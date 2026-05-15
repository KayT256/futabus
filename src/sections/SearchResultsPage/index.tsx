import { Header } from "@/sections/Header";
import { Footer } from "@/sections/Footer";
import { SearchHero } from "@/sections/SearchResultsPage/components/SearchHero";

export const SearchResultsPage = () => {
  return (
    <main className="text-sm bg-gray-100 box-border caret-transparent leading-5 min-h-screen outline-[3px] w-full md:text-base md:leading-6">
      <Header />
      <SearchHero />
      <Footer />
    </main>
  );
};