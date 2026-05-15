import { SearchFilters } from "@/sections/SearchResultsPage/components/SearchFilters";
import { ResultsPanel } from "@/sections/SearchResultsPage/components/ResultsPanel";

export const ResultsLayout = () => {
  return (
    <div className="text-sm box-border caret-transparent gap-x-[normal] flex flex-col leading-5 min-h-[400px] outline-[3px] gap-y-[normal] pt-0 md:text-base md:gap-x-6 md:flex-row md:leading-6 md:gap-y-6 md:pt-36">
      <SearchFilters />
      <ResultsPanel />
    </div>
  );
};