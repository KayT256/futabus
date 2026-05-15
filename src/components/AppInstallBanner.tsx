export const AppInstallBanner = () => {
  return (
    <div className="text-sm bg-white box-border caret-transparent gap-x-4 hidden leading-5 outline-[3px] gap-y-4 w-full p-4 md:text-base md:leading-6">
      <img
        src="https://futabus.vn/images/icons/close.svg"
        alt="ic_close"
        className="text-sm box-border caret-transparent leading-5 max-w-full outline-[3px] w-4 md:text-base md:leading-6"
      />
      <img
        src="https://futabus.vn/images/logo_square.svg"
        alt="ic_logo_square"
        className="text-sm aspect-[auto_32_/_32] box-border caret-transparent leading-5 max-w-full outline-[3px] w-8 md:text-base md:leading-6"
      />
      <span className="text-sm box-border caret-transparent basis-[0%] grow leading-5 outline-[3px] md:text-base md:leading-6">
        Nhận thông báo về
        <br className="text-sm box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6" />
        chuyến đi của bạn
      </span>
      <a className="text-orange-600 text-sm font-medium box-border caret-transparent leading-5 outline-[3px] border border-gray-200 px-4 py-2 rounded-[20px] border-solid">
        Mở App
      </a>
    </div>
  );
};