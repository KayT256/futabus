import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}đ`;

export const MobileHeader = () => {
  const { isLoggedIn, userName, login } = useAuth();
  const { balance } = useWallet();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (isLoggedIn) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      login();
    }
  };

  const handleNavigateToProgress = () => {
    setIsDropdownOpen(false);
    navigate('/trip-progress');
  };

  const handleNavigateToFutapay = () => {
    setIsDropdownOpen(false);
    navigate('/futapay');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          <div className="box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] mr-5 md:leading-6 md:min-h-0 md:min-w-0 relative">
            <div className="relative" ref={dropdownRef}>
              <img
                alt="avatar"
                src="https://futabus.vn/_next/static/media/person.abc5e83c.svg"
                className="text-transparent aspect-[auto_28_/_28] box-border leading-5 max-w-full outline-[3px] w-7 md:leading-6 cursor-pointer"
                onClick={handleClick}
              />
              
              {/* Dropdown Menu */}
              {isLoggedIn && isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  {/* FUTAPay row — brand-first, with live balance pulled from WalletContext. */}
                  <button
                    onClick={handleNavigateToFutapay}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center gap-3 border-b border-slate-100 mb-1 pb-3"
                  >
                    <img src="/futapay-logo.png" alt="FUTAPay" className="w-7 h-7 object-contain" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-slate-900 text-[13px]">Ví FUTAPay</div>
                      <div className="text-[11px] text-emerald-600 font-medium tabular-nums">{formatVND(balance)}</div>
                    </div>
                  </button>
                  <button
                    onClick={handleNavigateToProgress}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-3"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7" />
                    </svg>
                    Hành trình của bạn
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Lịch sử đặt vé
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Thông tin tài khoản
                  </button>
                  <div className="border-t border-slate-100 my-2"></div>
                  <button className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
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
            <button
              onClick={handleClick}
              className="text-orange-600 normal-nums bg-transparent caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center px-2 py-0 md:leading-6 md:min-h-0 md:min-w-0 cursor-pointer hover:text-orange-700"
            >
              {isLoggedIn ? userName : 'Đăng nhập/Đăng ký'}
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
