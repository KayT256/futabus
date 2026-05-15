import { useNavigate } from "react-router-dom";
import { SearchForm } from "@/sections/SearchResultsPage/components/SearchForm";

export const SearchHero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-sm box-border caret-transparent leading-5 max-w-[1128px] outline-[3px] mx-auto pb-2 md:text-base md:leading-6 md:pb-8">
      <div className="text-sm box-border caret-transparent hidden leading-5 outline-[3px] md:text-base md:block md:leading-6">
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
            <SearchForm />
          </div>
          <div className="text-sm box-border caret-transparent hidden flex-col leading-5 outline-[3px] text-center mt-6 md:text-base md:leading-6 md:mt-32">
            <div className="text-sm box-border caret-transparent block leading-5 outline-[3px] md:text-base md:hidden md:leading-6">
              <div className="text-sm box-border caret-transparent flex flex-col leading-5 outline-[3px] mb-6 md:text-base md:leading-6">
                <div className="text-emerald-800 text-xl font-semibold box-border caret-transparent leading-5 outline-[3px] ml-0 mb-4 md:text-black md:text-sm md:font-medium md:ml-4 md:mb-3">
                  Tìm kiếm gần đây
                </div>
                <div className="text-sm box-border caret-transparent gap-x-6 flex leading-5 outline-[3px] gap-y-6 w-full overflow-auto pl-4 pb-1 md:text-base md:leading-6 md:pl-0">
                  <div className="text-sm items-start bg-gray-50 box-border caret-transparent flex flex-col h-16 justify-start leading-5 outline-[3px] text-nowrap border border-zinc-200 pt-2 px-5 rounded-lg border-solid md:text-base md:leading-6">
                    <span className="text-[15px] font-medium box-border caret-transparent block leading-5 outline-[3px] text-nowrap md:leading-6">
                      TP. Hồ Chí Minh - Bến xe Đà Lạt
                    </span>
                    <span className="text-gray-500 text-[13px] box-border caret-transparent block leading-5 outline-[3px] text-nowrap md:leading-6">
                      14/05/2026
                    </span>
                  </div>
                  <div className="text-sm items-start bg-gray-50 box-border caret-transparent flex flex-col h-16 justify-start leading-5 outline-[3px] text-nowrap border border-zinc-200 mr-4 pt-2 px-5 rounded-lg border-solid md:text-base md:leading-6 md:mr-0">
                    <span className="text-[15px] font-medium box-border caret-transparent block leading-5 outline-[3px] text-nowrap md:leading-6">
                      TP. Hồ Chí Minh - Cần Thơ
                    </span>
                    <span className="text-gray-500 text-[13px] box-border caret-transparent block leading-5 outline-[3px] text-nowrap md:leading-6">
                      17/05/2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="text-sm box-border caret-transparent gap-x-[normal] flex flex-col leading-5 min-h-[400px] outline-[3px] gap-y-[normal] pt-0 md:text-base md:gap-x-6 md:flex-row md:leading-6 md:gap-y-6 md:pt-36">
        <div className="sticky text-sm box-border caret-transparent hidden h-fit leading-5 min-h-0 min-w-0 outline-[3px] z-50 pt-2 top-0 md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
          <div className="text-[15px] font-medium bg-white shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px,rgba(0,0,0,0.2)_0px_3px_6px_0px] box-border caret-transparent flex flex-col leading-5 min-w-[360px] outline-[3px] w-[360px] rounded-none md:leading-6 md:rounded-xl">
            <div className="box-border caret-transparent flex justify-between leading-5 min-h-0 min-w-0 outline-[3px] p-4 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
              <span className="text-base box-border caret-transparent block leading-6 min-h-0 min-w-0 outline-[3px] uppercase md:min-h-[auto] md:min-w-[auto]">
                Bộ lọc tìm kiếm
              </span>
              <div className="text-red-600 box-border caret-transparent gap-x-2 flex leading-5 min-h-0 min-w-0 outline-[3px] gap-y-2 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                Bỏ lọc
                <img
                  src="https://futabus.vn/images/icons/delete.svg"
                  alt="delete"
                  className="aspect-[auto_22_/_22] box-border caret-transparent leading-5 max-w-full min-h-0 min-w-0 outline-[3px] w-[22px] md:leading-6 md:min-h-[auto] md:min-w-[auto]"
                />
              </div>
            </div>
            <div className="box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] p-4 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
              <span className="box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                Giờ đi
              </span>
              <div className="text-black/90 text-sm box-border caret-transparent inline-block leading-[22.001px] list-none max-h-[170px] outline-[3px] overflow-auto">
                <label className="text-[15px] font-normal items-baseline box-border caret-transparent inline-flex leading-[23.5725px] outline-[3px] ml-2.5 mt-2 after:accent-auto after:box-border after:caret-transparent after:text-black/90 after:block after:text-[15px] after:not-italic after:tabular-nums after:font-normal after:tracking-[normal] after:leading-[23.5725px] after:list-outside after:list-none after:min-h-0 after:min-w-0 after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-0 after:overflow-hidden after:border-separate after:font-intertight after:md:min-h-[auto] after:md:min-w-[auto]">
                  <span className="relative text-sm box-border caret-transparent block leading-[14px] min-h-0 min-w-0 outline-[3px] text-nowrap top-[2.8px] md:min-h-[auto] md:min-w-[auto]">
                    <span className="relative bg-neutral-100 box-border caret-transparent block h-4 outline-[3px] text-nowrap transform-none w-4 border border-zinc-300 rounded-sm border-solid left-0 top-0 md:scale-125"></span>
                  </span>
                  <span className="text-black/30 box-border caret-transparent block min-h-0 min-w-0 outline-[3px] px-2 md:min-h-[auto] md:min-w-[auto]">
                    <span className="box-border caret-transparent outline-[3px] ml-1">
                      Sáng sớm 00:00 - 06:00{" "}
                    </span>
                  </span>
                </label>
                <label className="text-[15px] font-normal items-baseline box-border caret-transparent inline-flex leading-[23.5725px] outline-[3px] ml-2.5 mt-2 after:accent-auto after:box-border after:caret-transparent after:text-black/90 after:block after:text-[15px] after:not-italic after:tabular-nums after:font-normal after:tracking-[normal] after:leading-[23.5725px] after:list-outside after:list-none after:min-h-0 after:min-w-0 after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-0 after:overflow-hidden after:border-separate after:font-intertight after:md:min-h-[auto] after:md:min-w-[auto]">
                  <span className="relative text-sm box-border caret-transparent block leading-[14px] min-h-0 min-w-0 outline-[3px] text-nowrap top-[2.8px] md:min-h-[auto] md:min-w-[auto]">
                    <span className="relative bg-neutral-100 box-border caret-transparent block h-4 outline-[3px] text-nowrap transform-none w-4 border border-zinc-300 rounded-sm border-solid left-0 top-0 md:scale-125"></span>
                  </span>
                  <span className="text-black/30 box-border caret-transparent block min-h-0 min-w-0 outline-[3px] px-2 md:min-h-[auto] md:min-w-[auto]">
                    <span className="box-border caret-transparent outline-[3px] ml-1">
                      Buổi sáng 06:00 - 12:00{" "}
                    </span>
                  </span>
                </label>
                <label className="text-[15px] font-normal items-baseline box-border caret-transparent inline-flex leading-[23.5725px] outline-[3px] ml-2.5 mt-2 after:accent-auto after:box-border after:caret-transparent after:text-black/90 after:block after:text-[15px] after:not-italic after:tabular-nums after:font-normal after:tracking-[normal] after:leading-[23.5725px] after:list-outside after:list-none after:min-h-0 after:min-w-0 after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-0 after:overflow-hidden after:border-separate after:font-intertight after:md:min-h-[auto] after:md:min-w-[auto]">
                  <span className="relative text-sm box-border caret-transparent block leading-[14px] min-h-0 min-w-0 outline-[3px] text-nowrap top-[2.8px] md:min-h-[auto] md:min-w-[auto]">
                    <span className="relative bg-neutral-100 box-border caret-transparent block h-4 outline-[3px] text-nowrap transform-none w-4 border border-zinc-300 rounded-sm border-solid left-0 top-0 md:scale-125"></span>
                  </span>
                  <span className="text-black/30 box-border caret-transparent block min-h-0 min-w-0 outline-[3px] px-2 md:min-h-[auto] md:min-w-[auto]">
                    <span className="box-border caret-transparent outline-[3px] ml-1">
                      Buổi chiều 12:00 - 18:00{" "}
                    </span>
                  </span>
                </label>
                <label className="text-[15px] font-normal items-baseline box-border caret-transparent inline-flex leading-[23.5725px] outline-[3px] ml-2.5 mt-2 after:accent-auto after:box-border after:caret-transparent after:text-black/90 after:block after:text-[15px] after:not-italic after:tabular-nums after:font-normal after:tracking-[normal] after:leading-[23.5725px] after:list-outside after:list-none after:min-h-0 after:min-w-0 after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-0 after:overflow-hidden after:border-separate after:font-intertight after:md:min-h-[auto] after:md:min-w-[auto]">
                  <span className="relative text-sm box-border caret-transparent block leading-[14px] min-h-0 min-w-0 outline-[3px] text-nowrap top-[2.8px] md:min-h-[auto] md:min-w-[auto]">
                    <span className="relative bg-neutral-100 box-border caret-transparent block h-4 outline-[3px] text-nowrap transform-none w-4 border border-zinc-300 rounded-sm border-solid left-0 top-0 md:scale-125"></span>
                  </span>
                  <span className="text-black/30 box-border caret-transparent block min-h-0 min-w-0 outline-[3px] px-2 md:min-h-[auto] md:min-w-[auto]">
                    <span className="box-border caret-transparent outline-[3px] ml-1">
                      Buổi tối 18:00 - 24:00{" "}
                    </span>
                  </span>
                </label>
              </div>
            </div>
            <div className="bg-black/10 box-border caret-transparent h-[0.5px] leading-5 min-h-0 min-w-0 outline-[3px] w-full md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
            <div className="box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] p-4 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
              <span className="box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                Loại xe
              </span>
              <div className="box-border caret-transparent gap-x-2 flex flex-wrap leading-5 outline-[3px] gap-y-2 mt-4 md:leading-6">
                <div className="text-sm font-normal bg-white box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] border border-zinc-200 px-3 py-1 rounded-md border-solid md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  Ghế
                </div>
                <div className="text-sm font-normal bg-white box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] border border-zinc-200 px-3 py-1 rounded-md border-solid md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  Giường
                </div>
                <div className="text-sm font-normal bg-white box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] border border-zinc-200 px-3 py-1 rounded-md border-solid md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  Limousine
                </div>
              </div>
            </div>
            <div className="bg-black/10 box-border caret-transparent h-[0.5px] leading-5 min-h-0 min-w-0 outline-[3px] w-full md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
            <div className="box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] p-4 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
              <span className="box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                Hàng ghế
              </span>
              <div className="box-border caret-transparent gap-x-2 flex flex-wrap leading-5 outline-[3px] gap-y-2 mt-4 md:leading-6">
                <div className="text-sm font-normal bg-white box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] border border-zinc-200 px-3 py-1 rounded-md border-solid md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  Hàng đầu
                </div>
                <div className="text-sm font-normal bg-white box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] border border-zinc-200 px-3 py-1 rounded-md border-solid md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  Hàng giữa
                </div>
                <div className="text-sm font-normal bg-white box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] border border-zinc-200 px-3 py-1 rounded-md border-solid md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  Hàng cuối
                </div>
              </div>
            </div>
            <div className="bg-black/10 box-border caret-transparent h-[0.5px] leading-5 min-h-0 min-w-0 outline-[3px] w-full md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
            <div className="box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] pt-4 pb-6 px-4 md:leading-6 md:min-h-[auto] md:min-w-[auto]">
              <span className="box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                Tầng
              </span>
              <div className="box-border caret-transparent gap-x-2 flex flex-wrap leading-5 outline-[3px] gap-y-2 mt-4 md:leading-6">
                <div className="text-sm font-normal bg-white box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] border border-zinc-200 px-3 py-1 rounded-md border-solid md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  Tầng trên
                </div>
                <div className="text-sm font-normal bg-white box-border caret-transparent leading-5 min-h-0 min-w-0 outline-[3px] border border-zinc-200 px-3 py-1 rounded-md border-solid md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  Tầng dưới
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] overflow-x-hidden overflow-y-auto w-full md:text-base md:leading-6">
          <div className="sticky text-sm bg-gray-100 box-border caret-transparent h-fit leading-5 min-h-[auto] min-w-[auto] outline-[3px] z-50 pt-2 top-0 md:text-base md:leading-6">
            <div className="text-xl font-medium box-border caret-transparent hidden leading-7 outline-[3px] md:block">
              TP. Hồ Chí Minh - Bến xe Đà Lạt
            </div>
            <div className="text-white text-sm bg-[linear-gradient(rgb(241,100,57),rgb(242,117,78))] box-border caret-transparent block leading-5 outline-[3px] md:text-neutral-900 md:text-base md:bg-none md:hidden md:leading-6">
              <div className="relative text-white text-[17px] font-medium items-center box-border caret-transparent flex h-14 leading-5 outline-[3px] w-full md:text-neutral-900 md:leading-6">
                <img
                  src="https://futabus.vn/images/icons/back.svg"
                  alt="back"
                  className="absolute text-white box-border caret-transparent leading-5 max-w-full outline-[3px] z-40 left-6 md:text-neutral-900 md:leading-6"
                />
                <span className="text-white box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center w-full md:text-neutral-900 md:leading-6 md:min-h-0 md:min-w-0">
                  TP. Hồ Chí Minh - Bến xe Đà Lạt
                  <br className="text-white box-border caret-transparent leading-5 outline-[3px] md:text-neutral-900 md:leading-6" />
                  <span className="text-white text-[13px] font-normal box-border caret-transparent leading-5 outline-[3px] md:text-neutral-900 md:leading-6">
                    Thứ 5, 14/05
                  </span>
                </span>
                <img
                  src="https://futabus.vn/images/icons/edit_filter.svg"
                  alt="open filter"
                  className="absolute text-white box-border caret-transparent leading-5 max-w-full outline-[3px] z-40 right-4 md:text-neutral-900 md:leading-6"
                />
              </div>
            </div>
            <div className="text-sm box-border caret-transparent block leading-5 outline-[3px] md:text-base md:hidden md:leading-6"></div>
            <div className="text-sm box-border caret-transparent gap-x-3 flex leading-5 outline-[3px] overflow-x-auto overflow-y-hidden gap-y-3 w-full p-3 md:text-base md:leading-6 md:px-0">
              <div className="text-orange-600 text-sm items-center bg-red-50 box-border caret-transparent gap-x-2 flex justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap border border-rose-200 px-4 py-1 rounded-md border-solid md:text-base md:leading-6">
                <img
                  src="https://futabus.vn/images/icons/save_money.svg"
                  alt="icon"
                  className="text-sm aspect-[auto_20_/_20] box-border caret-transparent invert-[0.47] sepia-[0.42] saturate-[63.73] hue-rotate-[349deg] brightness-[0.96] contrast-[0.94] leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-5 md:text-base md:leading-6"
                />
                Giá rẻ bất ngờ
              </div>
              <div className="text-orange-600 text-sm items-center bg-red-50 box-border caret-transparent gap-x-2 flex justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap border border-rose-200 px-4 py-1 rounded-md border-solid md:text-base md:leading-6">
                <img
                  src="https://futabus.vn/images/icons/clock.svg"
                  alt="icon"
                  className="text-sm aspect-[auto_20_/_20] box-border caret-transparent invert-[0.47] sepia-[0.42] saturate-[63.73] hue-rotate-[349deg] brightness-[0.96] contrast-[0.94] leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-5 md:text-base md:leading-6"
                />
                Giờ khởi hành
              </div>
              <div className="text-sm items-center bg-white box-border caret-transparent gap-x-2 flex justify-center leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 text-nowrap border border-zinc-200 px-4 py-1 rounded-md border-solid md:text-base md:leading-6">
                <img
                  src="https://futabus.vn/images/icons/seat.svg"
                  alt="icon"
                  className="text-sm aspect-[auto_20_/_20] box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] text-nowrap w-5 md:text-base md:leading-6"
                />
                Ghế trống
              </div>
            </div>
          </div>
          <div className="text-sm box-border caret-transparent leading-5 min-h-[1000px] min-w-[auto] outline-[3px] overflow-x-hidden overflow-y-auto pt-0 md:text-base md:leading-6 md:pt-6">
            <div className="text-sm box-border caret-transparent leading-5 outline-[3px] overflow-x-hidden overflow-y-auto w-full md:text-base md:leading-6">
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:30
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            08:35 h - 320Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          08:05
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Tây
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        12 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      12 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm [align-items:normal] box-border caret-transparent flex flex-col leading-5 outline-[3px] mb-6 mx-0 rounded-xl md:text-base md:items-start md:leading-6 md:mx-6">
                <div className="relative text-sm bg-white shadow-[rgba(0,0,0,0.16)_0px_3px_6px_0px,rgba(0,0,0,0.2)_0px_3px_6px_0px] box-border caret-transparent leading-5 max-w-none min-h-[auto] min-w-[auto] outline-[3px] w-full rounded-xl md:text-base md:leading-6 md:max-w-[700px]">
                  <div className="relative text-sm box-border caret-transparent leading-5 outline-[3px] overflow-hidden md:text-base md:leading-6">
                    <div className="relative text-sm box-border caret-transparent leading-5 outline-[3px] w-[969px] mx-auto left-0 top-0 md:text-base md:leading-6 before:accent-auto before:box-border before:caret-transparent before:text-neutral-900 before:table before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-5 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:font-intertight before:md:text-base before:md:leading-6 after:accent-auto after:box-border after:caret-transparent after:clear-both after:text-neutral-900 after:table after:text-sm after:not-italic after:tabular-nums after:font-normal after:tracking-[normal] after:leading-5 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:border-separate after:font-intertight after:md:text-base after:md:leading-6">
                      <div className="text-sm box-border caret-transparent float-left h-full leading-5 min-h-px outline-[3px] w-[969px] md:text-base md:leading-6">
                        <div className="text-sm box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6">
                          <div className="text-sm items-center box-border caret-transparent gap-x-3 flex h-40 justify-between leading-5 outline-[3px] gap-y-3 px-6 py-4 md:text-base md:leading-6">
                            <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6">
                              <div className="text-[15px] font-semibold box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                                Đăng nhập ngay để nhận được nhiều quyền lợi dành
                                cho thành viên
                              </div>
                              <div className="text-gray-500 text-[13px] box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                                Khi đăng nhập và tải App, bạn sẽ dễ dàng quản lý
                                đặt chỗ, hoặc nhận thông tin khuyến mãi khi mua
                                vé, và còn nhiều ưu đãi khác .v.v...
                              </div>
                              <a
                                href="https://futabus.vn/dang-nhap"
                                className="text-blue-400 text-[15px] font-semibold box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] underline decoration-2 underline-offset-[3px] mt-4 md:leading-6"
                              >
                                Đăng nhập ngay
                              </a>
                            </div>
                            <img
                              src="https://futabus.vn/images/banners/login_promo.svg"
                              alt="login promo"
                              className="text-sm box-border caret-transparent hidden leading-5 max-w-full min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:31
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            08:35 h - 320Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          08:06
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Tây
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        13 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      13 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:32
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            08:40 h - 304Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          08:12
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            An Sương
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        4 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      4 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:35
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            07:30 h - 280Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          07:05
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Đông Mới
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        13 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      13 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:36
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            07:30 h - 280Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          07:06
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Đông Mới
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        10 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      10 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:37
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            07:30 h - 280Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          07:07
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Đông Mới
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        12 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      12 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:40
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            08:35 h - 320Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          08:15
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Tây
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        16 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      16 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:41
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            08:35 h - 320Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          08:16
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Tây
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        18 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      18 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:46
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            07:30 h - 280Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          07:16
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Đông Mới
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        15 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      15 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:47
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            07:30 h - 280Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          07:17
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Đông Mới
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        13 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      13 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6"></div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:50
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            08:35 h - 320Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          08:25
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Tây
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        11 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      11 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:51
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            08:35 h - 320Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          08:26
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Tây
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        13 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      13 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:56
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            07:30 h - 280Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          07:26
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Đông Mới
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        8 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      8 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
              <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
                <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
                  <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
                    <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                      <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          23:57
                        </span>
                        <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                          <img
                            src="https://futabus.vn/images/icons/pickup.svg"
                            alt="pickup"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                            07:30 h - 280Km{" "}
                            <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                            <span className="text-[13px] box-border caret-transparent outline-[3px]">
                              (Asian/Ho Chi Minh)
                            </span>
                          </span>
                          <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                          <img
                            src="https://futabus.vn/images/icons/station.svg"
                            alt="station"
                            className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                          />
                        </div>
                        <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                          07:27
                        </span>
                      </div>
                      <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Miền Đông Mới
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                        <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                          <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                            Liên tỉnh Đà Lạt
                          </span>
                          <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                          <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        Limousine
                      </span>
                      <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
                      <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                        6 chỗ trống
                      </span>
                      <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
                        290.000đ
                      </span>
                    </div>
                  </div>
                  <div className="text-yellow-500 text-[13px] box-border caret-transparent flex leading-5 outline-[3px] md:leading-6">
                    <span className="box-border caret-transparent block leading-5 min-h-[auto] min-w-10 outline-[3px] underline md:leading-6">
                      Lưu ý:
                    </span>
                    <div className="box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                      ....
                    </div>
                  </div>
                  <div className="text-sm bg-black/10 box-border caret-transparent h-[0.5px] leading-5 outline-[3px] w-full my-3 md:text-base md:leading-6 md:my-4"></div>
                </div>
                <div className="relative text-sm box-border caret-transparent hidden leading-5 min-h-0 min-w-0 outline-[3px] w-full md:text-base md:flex md:leading-6 md:min-h-[auto] md:min-w-[auto]">
                  <div className="text-black/90 text-sm box-border caret-transparent flex flex-col leading-[22.001px] list-none min-h-0 min-w-0 outline-[3px] w-full md:min-h-[auto] md:min-w-[auto]">
                    <div
                      role="tablist"
                      className="relative items-center box-border caret-transparent flex shrink-0 min-h-0 min-w-0 outline-[3px] ml-4 mb-4 md:min-h-[auto] md:min-w-[auto] before:accent-auto before:box-border before:caret-transparent before:text-black/90 before:block before:text-sm before:not-italic before:tabular-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-none before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:bottom-0 before:inset-x-0 before:font-intertight"
                    >
                      <div className="relative self-stretch box-border caret-transparent flex grow min-h-0 min-w-0 outline-[3px] text-nowrap overflow-hidden md:min-h-[auto] md:min-w-[auto]">
                        <div className="relative box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chọn ghế
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Lịch trình
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Trung chuyển
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="relative items-center box-border caret-transparent flex min-h-0 min-w-0 outline-[3px] text-nowrap ml-8 pb-1 md:min-h-[auto] md:min-w-[auto]">
                            <div
                              role="tab"
                              className="box-border caret-transparent min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]"
                            >
                              <div className="text-[15px] font-medium box-border caret-transparent gap-x-3 flex justify-center leading-[23.5725px] outline-[3px] gap-y-3 text-nowrap">
                                <span className="box-border caret-transparent block min-h-0 min-w-0 outline-[3px] text-nowrap md:min-h-[auto] md:min-w-[auto]">
                                  Chính sách
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="absolute bg-orange-600 box-border caret-transparent h-0.5 outline-[3px] pointer-events-none text-nowrap bottom-0"></div>
                        </div>
                      </div>
                    </div>
                    <div className="box-border caret-transparent grow outline-[3px] w-[calc(100%_-_2px)] m-auto">
                      <div className="box-border caret-transparent flex outline-[3px] w-full">
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                        <div
                          role="tabpanel"
                          className="box-border caret-transparent hidden shrink-0 outline-[3px] w-full"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/booking')}
                    className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
                  >
                    <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
                      Chọn chuyến
                    </span>
                  </button>
                </div>
                <div className="text-gray-500 text-sm items-center box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] pb-2 px-2 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0">
                  <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      Limousine
                    </span>
                    <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
                    <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
                      6 chỗ trống
                    </span>
                  </div>
                  <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
                    290.000đ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
