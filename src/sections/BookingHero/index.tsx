"use client";

import { useRouter } from "next/navigation";

export const BookingHero = () => {
  const router = useRouter();
  
  return (
    <section className="relative text-sm box-border caret-transparent flex flex-col leading-5 max-w-[1128px] outline-[3px] mx-auto pt-48 md:text-base md:leading-6 md:pt-[448px]">
      <div className="absolute text-sm box-border caret-transparent leading-5 min-h-[250px] outline-[3px] z-20 -top-40 inset-x-0 md:text-base md:leading-6 md:-top-20">
        <div className="text-sm box-border caret-transparent leading-5 outline-[3px] mb-10 md:text-base md:leading-6">
          <div className="relative text-sm shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px,rgba(0,0,0,0.2)_0px_3px_6px_0px] box-border caret-transparent hidden h-[250px] leading-5 object-cover outline-[3px] w-full mb-10 mx-auto rounded-xl md:text-base md:flex md:leading-6">
            <div className="relative text-sm box-border caret-transparent inline-block leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
              <img
                alt=""
                src="https://cdn.futabus.vn/futa-busline-web-cms-prod/2258_x_500_px_5240214978/2258_x_500_px_5240214978.jpg"
                className="relative text-sm shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px,rgba(0,0,0,0.2)_0px_3px_6px_0px] box-border caret-transparent hidden h-[250px] leading-5 max-w-full object-cover outline-[3px] w-full mb-10 mx-auto rounded-xl md:text-base md:flex md:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="text-sm font-medium bg-white box-border caret-transparent leading-5 max-w-[1128px] outline-orange-800/10 outline outline-8 w-auto border border-orange-600/60 m-2 pt-3 pb-6 px-4 rounded-2xl border-solid md:text-base md:leading-6 md:w-[1128px] md:m-auto md:pt-6 md:px-6">
          <div className="text-[15px] items-center box-border caret-transparent flex justify-between leading-5 outline-[3px] md:leading-6">
            <div className="text-black/90 text-[0px] box-border caret-transparent leading-[0px] list-none min-h-[auto] min-w-[auto] outline-[3px]">
              <label className="relative text-orange-600 text-[15px] items-baseline box-border caret-transparent inline-flex leading-[23.5725px] outline-[3px] mr-5 after:accent-auto after:box-border after:caret-transparent after:text-orange-600 after:block after:text-[15px] after:not-italic after:tabular-nums after:font-medium after:tracking-[normal] after:leading-[23.5725px] after:list-outside after:list-none after:min-h-[auto] after:min-w-[auto] after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-0 after:overflow-hidden after:border-separate after:font-intertight">
                <span className="relative text-black/90 text-sm box-border caret-transparent block leading-[22.001px] min-h-[auto] min-w-[auto] outline-[3px] top-[2.8px]">
                  <span className="relative bg-white box-border caret-transparent block h-4 outline-[3px] w-4 border border-orange-600 rounded-[50%] border-solid left-0 top-0 after:accent-auto after:bg-orange-600 after:box-border after:caret-transparent after:text-black/90 after:block after:text-sm after:not-italic after:tabular-nums after:font-medium after:h-4 after:tracking-[normal] after:leading-[22.001px] after:list-outside after:list-none after:outline-[3px] after:pointer-events-auto after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-4 after:-ml-2 after:-mt-2 after:rounded-2xl after:border-separate after:scale-50 after:left-2/4 after:top-2/4 after:font-intertight"></span>
                </span>
                <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] px-2">
                  Một chiều
                </span>
              </label>
              <label className="relative text-[15px] font-normal items-baseline box-border caret-transparent inline-flex leading-[23.5725px] outline-[3px] mr-5 after:accent-auto after:box-border after:caret-transparent after:text-black/90 after:block after:text-[15px] after:not-italic after:tabular-nums after:font-normal after:tracking-[normal] after:leading-[23.5725px] after:list-outside after:list-none after:min-h-[auto] after:min-w-[auto] after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-0 after:overflow-hidden after:border-separate after:font-intertight">
                <span className="relative text-sm box-border caret-transparent block leading-[22.001px] min-h-[auto] min-w-[auto] outline-[3px] top-[2.8px]">
                  <span className="relative bg-white box-border caret-transparent block h-4 outline-[3px] w-4 border border-zinc-300 rounded-[50%] border-solid left-0 top-0"></span>
                </span>
                <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] px-2">
                  Khứ hồi
                </span>
              </label>
            </div>
            <span className="text-orange-600 box-border caret-transparent hidden leading-5 outline-[3px] md:contents md:leading-6">
              <a
                href="https://futabus.vn/huong-dan-dat-ve-tren-web"
                className="box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:block md:leading-6 md:min-h-[auto] md:min-w-[auto] hover:text-orange-400 hover:outline-0"
              >
                Hướng dẫn mua vé
              </a>
            </span>
          </div>
          <div className="text-sm box-border caret-transparent gap-x-[normal] grid grid-cols-[repeat(1,minmax(0px,1fr))] leading-5 outline-[3px] gap-y-[normal] py-4 md:text-base md:gap-x-4 md:grid-cols-[repeat(2,minmax(0px,1fr))] md:leading-6 md:gap-y-4">
            <div className="relative text-sm box-border caret-transparent gap-x-[normal] flex justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-[normal] md:text-base md:gap-x-4 md:leading-6 md:gap-y-4">
              <div className="text-sm box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6">
                <label className="text-sm box-border caret-transparent leading-5 outline-[3px] ml-0 md:leading-6 md:ml-5">
                  Điểm đi
                </label>
                <div className="text-base [align-items:normal] box-border caret-transparent flex h-14 leading-6 outline-[3px] w-full border-neutral-900 mt-1 p-0 rounded-lg border-0 border-none md:text-lg md:items-center md:h-[67px] md:leading-7 md:border md:border-zinc-200 md:px-5 md:py-3 md:border-solid">
                  <span className="text-base box-border caret-transparent block leading-6 max-w-[140px] min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden md:text-lg md:leading-7 md:max-w-[220px]">
                    TP. Hồ Chí Minh
                    <div className="text-neutral-600 text-[13px] font-normal box-border caret-transparent leading-[15px] outline-[3px] text-nowrap"></div>
                  </span>
                </div>
              </div>
              <img
                src="https://futabus.vn/images/icons/switch_location.svg"
                alt="switch location icon"
                className="absolute text-sm box-border caret-transparent h-8 leading-5 max-w-full object-contain outline-[3px] w-8 z-10 bottom-6 md:text-base md:h-10 md:leading-6 md:w-10 md:bottom-3"
              />
              <div className="text-sm box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:text-base md:leading-6 md:text-left">
                <label className="text-sm box-border caret-transparent leading-5 outline-[3px] text-right ml-0 md:leading-6 md:text-left md:ml-5">
                  Điểm đến
                </label>
                <div className="text-base [align-items:normal] box-border caret-transparent flex h-14 justify-end leading-6 outline-[3px] text-right w-full border-neutral-900 mt-1 p-0 rounded-lg border-0 border-none md:text-lg md:items-center md:h-[67px] md:justify-start md:leading-7 md:text-left md:border md:border-zinc-200 md:px-5 md:py-3 md:border-solid">
                  <span className="text-base box-border caret-transparent block leading-6 max-w-[140px] min-h-[auto] min-w-[auto] outline-[3px] text-right text-ellipsis text-nowrap overflow-hidden md:text-lg md:leading-7 md:max-w-[220px] md:text-left">
                    Bến xe Đà Lạt
                    <div className="text-neutral-600 text-[13px] font-normal box-border caret-transparent leading-[15px] outline-[3px] text-right text-nowrap md:text-left"></div>
                  </span>
                </div>
              </div>
            </div>
            <div className="text-sm bg-black/10 box-border caret-transparent block h-[0.5px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full my-3 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0"></div>
            <div className="text-sm box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6">
              <div className="text-sm box-border caret-transparent flex basis-[0%] flex-col grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] mr-4 md:text-base md:leading-6">
                <label className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] ml-0 md:leading-6 md:ml-5">
                  Ngày đi
                </label>
                <div className="text-base [align-items:normal] box-border caret-transparent flex h-14 leading-6 min-h-[auto] min-w-[auto] outline-[3px] w-full border-neutral-900 mt-1 p-0 rounded-lg border-0 border-none md:text-lg md:items-center md:h-[67px] md:leading-7 md:border md:border-zinc-200 md:px-5 md:py-3 md:border-solid">
                  <span className="text-base box-border caret-transparent block leading-6 max-w-[140px] min-h-[auto] min-w-[auto] outline-[3px] text-ellipsis text-nowrap overflow-hidden md:text-lg md:leading-7 md:max-w-[220px]">
                    14/05/2026
                    <div className="text-neutral-600 text-[13px] font-normal box-border caret-transparent leading-[15px] outline-[3px] text-nowrap">
                      <span className="box-border caret-transparent outline-[3px] text-nowrap">
                        Thứ 5
                      </span>
                    </div>
                  </span>
                </div>
              </div>
              <div className="text-sm box-border caret-transparent flex basis-[0%] flex-col grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6">
                <label className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] ml-0 md:leading-6 md:ml-5">
                  Số vé
                </label>
                <div className="relative text-black/90 text-sm box-border caret-transparent hidden leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] mt-1 md:block md:min-h-[auto] md:min-w-[auto]">
                  <div className="relative bg-white box-border caret-transparent flex h-[67px] outline-[3px] w-full border border-zinc-300 px-5 py-3 rounded-lg border-solid after:accent-auto after:box-border after:caret-transparent after:text-black/90 after:block after:text-sm after:not-italic after:tabular-nums after:font-medium after:tracking-[normal] after:leading-[30px] after:list-outside after:list-none after:min-h-0 after:min-w-0 after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:invisible after:w-0 after:border-separate after:font-intertight after:md:min-h-[auto] after:md:min-w-[auto]">
                    <span className="absolute box-border caret-transparent block outline-[3px] left-[11px] right-[25px] inset-y-0">
                      <input
                        type="search"
                        role="combobox"
                        value=""
                        className="appearance-none text-base normal-nums bg-transparent box-border caret-transparent h-[30px] leading-6 opacity-0 -outline-offset-2 outline-[3px] w-full p-0"
                      />
                    </span>
                    <span className="relative font-normal box-border caret-transparent block basis-[0%] grow leading-[30px] min-h-0 min-w-0 outline-[3px] text-ellipsis text-nowrap overflow-hidden m-auto pr-[18px] md:min-h-[auto] md:min-w-[auto] after:accent-auto after:box-border after:caret-transparent after:text-black/90 after:inline-block after:text-sm after:not-italic after:tabular-nums after:font-normal after:tracking-[normal] after:leading-[30px] after:list-outside after:list-none after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:invisible after:w-0 after:border-separate after:font-intertight">
                      <div className="text-lg items-center box-border caret-transparent flex justify-between leading-7 outline-[3px] text-nowrap my-1">
                        1
                        <img
                          src="https://futabus.vn/images/icons/circle_checkbox_checked.svg"
                          alt="circle checkbox"
                          className="box-border caret-transparent hidden max-w-full outline-[3px] text-nowrap"
                        />
                      </div>
                    </span>
                  </div>
                  <span className="absolute text-black/30 text-xs items-center box-border caret-transparent flex h-3 leading-3 outline-[3px] pointer-events-none text-center -mt-1.5 right-[11px] top-2/4">
                    <img
                      alt=""
                      src="https://futabus.vn/images/icons/arrow_down_select.svg"
                      className="aspect-[auto_32_/_32] box-border caret-transparent max-w-full min-h-0 min-w-0 outline-[3px] w-8 md:min-h-[auto] md:min-w-[auto]"
                    />
                  </span>
                </div>
                <div className="text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-14 mt-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:inline md:leading-6 md:min-h-0 md:min-w-0">
                    1
                  </span>
                  <img
                    alt=""
                    src="https://futabus.vn/images/icons/arrow_down_select.svg"
                    className="text-sm aspect-[auto_32_/_32] box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] w-8 md:text-base md:leading-6 md:min-h-0 md:min-w-0"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm box-border caret-transparent hidden leading-5 outline-[3px] md:text-base md:contents md:leading-6">
            <div className="text-sm box-border caret-transparent flex flex-col leading-5 outline-[3px] mb-6 md:text-base md:leading-6">
              <div className="text-emerald-800 text-xl font-semibold box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] ml-0 mb-4 md:text-black md:text-sm md:font-medium md:min-h-[auto] md:min-w-[auto] md:ml-4 md:mb-3">
                Tìm kiếm gần đây
              </div>
              <div className="text-sm box-border caret-transparent gap-x-6 flex leading-5 min-h-0 min-w-0 outline-[3px] gap-y-6 w-full overflow-auto pl-4 pb-1 md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto] md:pl-0">
                <div className="text-sm items-start bg-gray-50 box-border caret-transparent flex flex-col h-16 justify-start leading-5 min-h-0 min-w-0 outline-[3px] text-nowrap border border-zinc-200 mr-4 pt-2 px-5 rounded-lg border-solid md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto] md:mr-0">
                  <span className="text-[15px] box-border caret-transparent block leading-5 min-h-0 min-w-0 outline-[3px] text-nowrap md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                    TP. Hồ Chí Minh - Bến xe Đà Lạt
                  </span>
                  <span className="text-gray-500 text-[13px] box-border caret-transparent block leading-5 min-h-0 min-w-0 outline-[3px] text-nowrap md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                    14/05/2026
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative text-sm box-border caret-transparent flex justify-center leading-5 outline-[3px] w-full md:text-base md:leading-6">
            <button 
              onClick={() => router.push('/search')}
              className="absolute text-white text-base normal-nums bg-orange-600 caret-transparent block h-12 leading-6 outline-[3px] text-center z-10 px-20 py-0 rounded-full cursor-pointer hover:bg-orange-700 transition-colors"
            >
              Tìm chuyến xe
            </button>
          </div>
        </div>
      </div>
      <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center mt-6 md:text-base md:leading-6 md:mt-32">
        <div className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
          <div className="text-sm box-border caret-transparent flex flex-col leading-5 outline-[3px] mb-6 md:text-base md:leading-6">
            <div className="text-emerald-800 text-xl font-semibold box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] ml-0 mb-4 md:text-black md:text-sm md:font-medium md:min-h-0 md:min-w-0 md:ml-4 md:mb-3">
              Tìm kiếm gần đây
            </div>
            <div className="text-sm box-border caret-transparent gap-x-6 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 w-full overflow-auto pl-4 pb-1 md:text-base md:leading-6 md:min-h-0 md:min-w-0 md:pl-0">
              <div className="text-sm items-start bg-gray-50 box-border caret-transparent flex flex-col h-16 justify-start leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap border border-zinc-200 mr-4 pt-2 px-5 rounded-lg border-solid md:text-base md:leading-6 md:min-h-0 md:min-w-0 md:mr-0">
                <span className="text-[15px] font-medium box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap md:leading-6 md:min-h-0 md:min-w-0">
                  TP. Hồ Chí Minh - Bến xe Đà Lạt
                </span>
                <span className="text-gray-500 text-[13px] box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-nowrap md:leading-6 md:min-h-0 md:min-w-0">
                  14/05/2026
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
