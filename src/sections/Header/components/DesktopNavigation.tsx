export const DesktopNavigation = () => {
  return (
    <div className="items-center box-border caret-transparent hidden justify-center leading-5 outline-[3px] z-20 md:flex md:leading-6">
      <a
        href="/"
        className="text-white text-sm font-bold border-l-gray-200 border-r-gray-200 border-t-gray-200 box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] text-center uppercase w-32 mx-2 pb-3 border-b-white border-b-4 border-solid md:block md:min-h-[auto] md:min-w-[auto] hover:outline-0"
      >
        Trang chủ
      </a>
      <a
        href="/search"
        className="text-white text-sm font-medium box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] text-center uppercase w-32 mx-2 pb-3 md:block md:min-h-[auto] md:min-w-[auto] hover:outline-0"
      >
        Lịch trình
      </a>
      <a
        href="/ticket"
        className="text-white text-sm font-medium box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] text-center uppercase w-32 mx-2 pb-3 md:block md:min-h-[auto] md:min-w-[auto] hover:outline-0"
      >
        Tra cứu vé
      </a>
      <a
        href="/"
        className="text-white text-sm font-medium box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] text-center uppercase w-32 mx-2 pb-3 md:block md:min-h-[auto] md:min-w-[auto] hover:outline-0"
      >
        Tin tức
      </a>
      <a
        href="https://hoadon.futabus.vn/#/tracuuhoadon/tracuu"
        className="text-white text-sm font-medium box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] text-center uppercase w-32 mx-2 pb-3 md:block md:min-h-[auto] md:min-w-[auto] hover:outline-0"
      >
        Hóa đơn
      </a>
      <a
        href="/"
        className="text-white text-sm font-medium box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] text-center uppercase w-32 mx-2 pb-3 md:block md:min-h-[auto] md:min-w-[auto] hover:outline-0"
      >
        Liên hệ
      </a>
      <a
        href="/"
        className="text-white text-sm font-medium box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] text-center uppercase w-32 mx-2 pb-3 md:block md:min-h-[auto] md:min-w-[auto] hover:outline-0"
      >
        Về chúng tôi
      </a>
    </div>
  );
};