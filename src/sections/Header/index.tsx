import { DesktopHeader } from "@/sections/Header/components/DesktopHeader";
import { DesktopNavigation } from "@/sections/Header/components/DesktopNavigation";
import { MobileHeader } from "@/sections/Header/components/MobileHeader";

export const Header = () => {
  return (
    <header className="relative text-[13px] bg-white bg-[url('https://futabus.vn/images/banners/home_banner.png')] bg-cover box-border caret-transparent h-[220px] leading-5 min-h-[70px] outline-[3px] w-full mx-auto md:leading-6 md:min-h-[220px]">
      <DesktopHeader />
      <DesktopNavigation />
      <MobileHeader />
    </header>
  );
};