import { FooterContact } from "@/sections/Footer/components/FooterContact";
import { FooterLinks } from "@/sections/Footer/components/FooterLinks";
import { FooterCertifications } from "@/sections/Footer/components/FooterCertifications";
import { FooterCopyright } from "@/sections/Footer/components/FooterCopyright";

export const Footer = () => {
  return (
    <footer className="text-[15px] bg-red-50 box-border caret-transparent leading-5 outline-[3px] w-full mx-auto md:leading-6">
      <div className="box-border caret-transparent leading-5 outline-[3px] p-4 md:leading-6 md:pt-12">
        <div className="text-black box-border caret-transparent gap-x-4 flex flex-wrap leading-5 max-w-[1128px] outline-[3px] gap-y-4 mx-auto md:gap-x-14 md:leading-6 md:gap-y-14">
          <FooterContact />
          <FooterLinks />
        </div>
      </div>
      <FooterCertifications />
      <FooterCopyright />
    </footer>
  );
};