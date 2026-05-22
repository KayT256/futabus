"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { TripCard } from "./TripCard";
import { trips } from "@/data/trips";

export const ResultsPanel = () => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  
  return (
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
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} isLoggedIn={isLoggedIn} />
          ))}
        </div>
      </div>
    </div>
  );
};
