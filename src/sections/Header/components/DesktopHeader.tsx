import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useWallet } from "@/contexts/WalletContext";

// Format helper kept local — the dropdown is the only place in this file that needs it.
const formatVND = (n: number) => `${n.toLocaleString("vi-VN")}đ`;

export const DesktopHeader = () => {
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
    navigate("/trip-progress");
  };

  const handleNavigateToFutapay = () => {
    navigate("/futapay");
  };

  const handleNavigateToVouchers = () => {
    navigate("/vouchers");
  };

  const handleNavigateToMiniGames = () => {
    setIsDropdownOpen(false);
    navigate('/mini-games');
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
      <div className="box-border caret-transparent flex basis-[0%] grow justify-end leading-5 min-h-0 min-w-0 outline-[3px] mt-4 md:leading-6 md:min-h-[auto] md:min-w-[auto] relative">
        <div className="text-xs font-medium items-start box-border caret-transparent gap-x-2 flex leading-5 min-h-0 min-w-0 outline-[3px] gap-y-4 text-center md:min-h-[auto] md:min-w-[auto]">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleClick}
              className="text-black items-center bg-white box-border caret-transparent gap-x-2 flex h-8 min-h-0 min-w-0 outline-[3px] gap-y-3 w-40 p-2 rounded-2xl md:min-h-[auto] md:min-w-[auto] hover:outline-0 cursor-pointer hover:bg-orange-50 transition-colors"
            >
              <img
                src="https://futabus.vn/images/icons/person.svg"
                alt="person"
                className="aspect-[auto_20_/_20] box-border caret-transparent max-w-full min-h-0 min-w-0 outline-[3px] w-5 md:min-h-[auto] md:min-w-[auto]"
              />
              {isLoggedIn ? userName : 'Đăng nhập/Đăng ký'}
            </button>
            
            {/* Dropdown Menu */}
            {isLoggedIn && isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                {/* FUTAPay row — brand-first, with live balance pulled from WalletContext.
                    Uses a slightly taller layout to give the brand mark and balance breathing room. */}
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
                <button
                  onClick={handleNavigateToVouchers}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Kho Voucher
                </button>
                <button
                  onClick={handleNavigateToMiniGames}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Trò chơi & Voucher
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
  );
};