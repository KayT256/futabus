export const DesktopHeader = () => {
  return (
    <div className="box-border caret-transparent hidden h-20 leading-5 max-w-none outline-[3px] mx-0 md:flex md:leading-6 md:max-w-[1128px] md:mx-auto">
      <div className="items-start box-border caret-transparent flex basis-[0%] grow leading-5 min-h-0 min-w-0 outline-[3px] mt-4 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
        <div className="items-center box-border caret-transparent flex leading-5 min-h-0 min-w-0 outline-[3px] md:leading-6 md:min-h-[auto] md:min-w-[auto]">
          <img
            src="https://futabus.vn/images/icons/vietnam.svg"
            alt="language icon"
            className="box-border caret-transparent leading-5 max-w-full min-h-0 min-w-0 outline-[3px] w-[26px] md:leading-6 md:min-h-[auto] md:min-w-[auto]"
          />
          <span className="text-white box-border caret-transparent block leading-5 min-h-0 min-w-0 outline-[3px] uppercase mx-2 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
            vi
          </span>
          <img
            src="https://futabus.vn/images/icons/icon_form_droplist.svg"
            alt="icon_form_droplist"
            className="box-border caret-transparent leading-5 max-w-full min-h-0 min-w-0 outline-[3px] md:leading-6 md:min-h-[auto] md:min-w-[auto]"
          />
        </div>
        <div className="box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] border-gray-200 ml-4 pl-4 border-l border-solid md:leading-6 md:min-h-[auto] md:min-w-[auto]">
          <div className="items-center box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
            <img
              src="https://futabus.vn/images/icons/download_app.svg"
              alt="download app icon"
              className="box-border caret-transparent leading-5 max-w-full min-h-0 min-w-0 outline-[3px] w-[26px] md:leading-6 md:min-h-[auto] md:min-w-[auto]"
            />
            <span className="text-white box-border caret-transparent block leading-5 min-h-0 min-w-0 outline-[3px] mx-2 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
              Tải ứng dụng
            </span>
            <img
              src="https://futabus.vn/images/icons/icon_form_droplist.svg"
              alt="icon_form_droplist"
              className="box-border caret-transparent leading-5 max-w-full min-h-0 min-w-0 outline-[3px] md:leading-6 md:min-h-[auto] md:min-w-[auto]"
            />
          </div>
        </div>
      </div>
      <div className="box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] z-10 mx-20 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
        <a
          href="https://futabus.vn/"
          className="box-border caret-transparent leading-5 outline-[3px] md:leading-6 hover:text-orange-400 hover:outline-0"
        >
          <img
            alt="logo_banner"
            src="https://futabus.vn/_next/static/media/logo_new.8a0251b8.svg"
            className="text-transparent aspect-[auto_295_/_60] box-border leading-5 max-w-full outline-[3px] w-[295px] mb-6 md:leading-6"
          />
        </a>
      </div>
      <div className="box-border caret-transparent flex basis-[0%] grow justify-end leading-5 min-h-0 min-w-0 outline-[3px] mt-4 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
        <div className="text-sm font-medium items-start box-border caret-transparent gap-x-4 flex leading-5 min-h-0 min-w-0 outline-[3px] gap-y-4 text-center md:min-h-[auto] md:min-w-[auto]">
          <a className="text-black items-center bg-white box-border caret-transparent gap-x-3 flex h-8 min-h-0 min-w-0 outline-[3px] gap-y-3 w-44 p-2 rounded-2xl md:min-h-[auto] md:min-w-[auto] hover:outline-0">
            <img
              src="https://futabus.vn/images/icons/person.svg"
              alt="person"
              className="aspect-[auto_20_/_20] box-border caret-transparent max-w-full min-h-0 min-w-0 outline-[3px] w-5 md:min-h-[auto] md:min-w-[auto]"
            />
            Đăng nhập/Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
};