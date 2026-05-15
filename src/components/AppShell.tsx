import { MainLayout } from "@/components/layout/MainLayout";

export const AppShell = () => {
  return (
    <div className="text-sm box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6">
      <MainLayout />
    </div>
  );
};