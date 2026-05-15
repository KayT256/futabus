export const MobileHeader = () => {
  return (
    <div className="box-border caret-transparent flex flex-col leading-5 outline-[3px] md:hidden md:leading-6">
      <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6 md:min-h-0 md:min-w-0">
        <input
          type="checkbox"
          className="appearance-none text-white normal-nums bg-origin-border box-border caret-transparent hidden shrink-0 h-4 leading-5 outline-[3px] align-middle w-4 border border-gray-500 overflow-visible p-0 border-solid md:leading-6"
        />
        <div className="items-center box-border caret-transparent flex basis-[0%] grow justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pt-4 md:leading-6 md:min-h-0 md:min-w-0">
          <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6 md:min-h-0 md:min-w-0">
            <label className="box-border caret-transparent block float-right leading-5 min-h-[auto] min-w-[auto] outline-[3px] mr-5 pl-5 py-5 md:hidden md:leading-6 md:min-h-0 md:min-w-0">
              <span className="relative bg-white box-border caret-transparent block h-0.5 leading-5 outline-[3px] w-6 md:leading-6 before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-neutral-900 before:block before:text-[13px] before:not-italic before:tabular-nums before:font-normal before:h-full before:tracking-[normal] before:leading-5 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:border-separate before:top-[5px] before:font-intertight before:md:leading-6 after:accent-auto after:bg-white after:box-border after:caret-transparent after:text-neutral-900 after:block after:text-[13px] after:not-italic after:tabular-nums after:font-normal after:h-full after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:top-[-5px] after:visible after:w-full after:border-separate after:font-intertight after:md:leading-6"></span>
            </label>
            <div className="items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6 md:min-h-0 md:min-w-0">
              <img
                src="https://futabus.vn/images/icons/vietnam.svg"
                alt="language icon"
                className="box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] w-[26px] md:leading-6 md:min-h-0 md:min-w-0"
              />
            </div>
          </div>
          <a
            href="https://futabus.vn/"
            className="box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6 md:min-h-0 md:min-w-0 hover:text-orange-400 hover:outline-0"
          >
            <img
              alt="logo_banner"
              src="https://futabus.vn/_next/static/media/logo_banner_mb.6e0db6f9.svg"
              className="text-transparent aspect-[auto_115_/_36] box-border leading-5 max-w-full outline-[3px] w-[115px] md:leading-6"
            />
          </a>
          <div className="box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] mr-5 md:leading-6 md:min-h-0 md:min-w-0">
            <img
              alt="avatar"
              src="https://futabus.vn/_next/static/media/person.abc5e83c.svg"
              className="text-transparent aspect-[auto_28_/_28] box-border leading-5 max-w-full outline-[3px] w-7 md:leading-6"
            />
          </div>
        </div>
      </div>
      <div className="box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:hidden md:leading-6 md:min-h-0 md:min-w-0">
        <div className="fixed bg-black/40 box-border caret-transparent hidden h-full leading-5 outline-[3px] w-full z-50 left-0 top-0 md:leading-6"></div>
        <div className="fixed bg-white box-border caret-transparent h-full left-[-60%] leading-5 outline-[3px] w-3/5 z-50 overflow-auto p-2 top-0 md:leading-6">
          <div className="box-border caret-transparent leading-5 outline-[3px] w-full mb-4 md:leading-6">
            <a
              href="https://futabus.vn/"
              className="box-border caret-transparent block leading-5 outline-[3px] pl-1 md:leading-6 hover:text-orange-400 hover:outline-0"
            ></a>
          </div>
          <a className="box-border caret-transparent flex leading-5 outline-[3px] mb-3 md:leading-6 hover:text-orange-400 hover:outline-0">
            <button className="text-orange-600 normal-nums bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center px-2 py-0 md:leading-6 md:min-h-0 md:min-w-0">
              Đăng nhập/Đăng ký
            </button>
          </a>
          <nav className="static box-border caret-transparent float-none leading-5 outline-[3px] w-auto overflow-hidden top-auto md:relative md:float-right md:leading-6 md:w-fit md:top-0">
            <ul className="box-border caret-transparent leading-5 list-none outline-[3px] pl-0 md:leading-6">
              <li className="text-orange-600 text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Trang chủ
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/lich-trinh"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Lịch trình
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/tra-cuu-ve"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Tra cứu vé
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/tin-tuc"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Tin tức
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://hoadon.futabus.vn/#/tracuuhoadon/tracuu"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Hóa đơn
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/lien-he"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Liên hệ
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/ve-chung-toi"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Về chúng tôi
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://vieclam.futabus.vn/"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Tuyển dụng
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/danh-sach-chi-nhanh"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Mạng lưới văn phòng
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/dieu-khoan-su-dung"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Điều khoản sử dụng
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/hoi-dap"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Câu hỏi thường gặp
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/huong-dan-dat-ve-tren-web"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Hướng dẫn đặt vé trên Web
                </a>
              </li>
              <li className="text-xs box-border caret-transparent leading-4 outline-[3px] border-slate-200 px-2 py-3 border-t border-solid">
                <a
                  href="https://futabus.vn/huong-dan-nap-tien-tren-app"
                  className="box-border caret-transparent outline-[3px] hover:text-orange-400 hover:outline-0"
                >
                  Hướng dẫn nạp tiền trên App
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
