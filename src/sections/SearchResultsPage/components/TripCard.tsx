import { useNavigate } from "react-router-dom";
import { Trip } from "@/data/trips";

interface TripCardProps {
  trip: Trip;
  isLoggedIn: boolean;
}

export const TripCard = ({ trip, isLoggedIn }: TripCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="text-sm bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] box-border caret-transparent flex flex-col leading-5 outline-[3px] w-full border border-zinc-200 mb-2 pt-3 rounded-none border-solid md:text-base md:leading-6 md:mb-6 md:pt-6 md:rounded-xl">
      <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] px-3 md:text-base md:leading-6 md:px-6">
        <div className="text-sm items-start box-border caret-transparent gap-x-10 flex leading-5 outline-[3px] gap-y-10 md:text-base md:leading-6">
          <div className="text-sm box-border caret-transparent flex flex-col leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
            <div className="text-sm items-center box-border caret-transparent gap-x-4 flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 md:text-base md:leading-6">
              <span className="text-2xl font-medium box-border caret-transparent block leading-8 min-h-[auto] min-w-[auto] outline-[3px]">
                {trip.departureTime}
              </span>
              <div className="text-sm items-center box-border caret-transparent flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-full md:text-base md:leading-6">
                <img
                  src="https://futabus.vn/images/icons/pickup.svg"
                  alt="pickup"
                  className="text-sm box-border caret-transparent leading-5 max-w-full min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6"
                />
                <span className="text-sm box-border caret-transparent block basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] border-gray-200 border-b-2 border-dotted md:text-base md:leading-6"></span>
                <span className="text-gray-500 text-sm box-border caret-transparent block leading-4 min-h-[auto] min-w-[auto] outline-[3px] text-center md:text-base">
                  {trip.duration} - {trip.distance}{" "}
                  <br className="text-sm box-border caret-transparent outline-[3px] md:text-base" />
                  <span className="text-[13px] box-border caret-transparent outline-[3px]">
                    ({trip.timezone})
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
                {trip.arrivalTime}
              </span>
            </div>
            <div className="text-[13px] box-border caret-transparent flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-3 md:leading-6">
              <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:leading-6">
                <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                  {trip.pickupStation}
                </span>
                <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
              </div>
              <div className="box-border caret-transparent basis-[0%] grow leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-right md:leading-6">
                <span className="text-[15px] font-medium box-border caret-transparent leading-5 outline-[3px] md:leading-6">
                  {trip.dropoffStation}
                </span>
                <br className="box-border caret-transparent leading-5 outline-[3px] md:leading-6" />
                <span className="text-gray-500 box-border caret-transparent leading-5 outline-[3px] mt-2 md:leading-6"></span>
              </div>
            </div>
          </div>
          <div className="text-gray-500 text-sm items-center box-border caret-transparent gap-x-2 hidden flex-wrap leading-5 min-h-0 min-w-[200px] outline-[3px] gap-y-2 md:text-base md:flex md:leading-6 md:min-h-[auto]">
            <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
            <span className="text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
              {trip.busType}
            </span>
            <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-0 min-w-0 outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-[auto] md:min-w-[auto]"></div>
            <span className="text-emerald-800 text-sm box-border caret-transparent inline leading-5 min-h-0 min-w-0 outline-[3px] md:text-base md:block md:leading-6 md:min-h-[auto] md:min-w-[auto]">
              {trip.availableSeats} chỗ trống
            </span>
            <span className="text-orange-600 text-lg font-semibold box-border caret-transparent inline leading-7 min-h-0 min-w-0 outline-[3px] text-end w-full mt-2 md:block md:min-h-[auto] md:min-w-[auto]">
              {trip.price.toLocaleString('vi-VN')}đ
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
          onClick={() => navigate('/booking', { state: { trip } })}
          className="absolute text-orange-600 text-sm normal-nums bg-orange-600/20 shadow-[rgba(0,0,0,0.016)_0px_2px_0px_0px] caret-transparent hidden h-8 leading-[22.001px] text-center text-nowrap z-10 px-5 py-0 rounded-[32px] right-5 md:block before:accent-auto before:bg-white before:box-border before:caret-transparent before:text-orange-600 before:hidden before:text-sm before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[22.001px] before:list-outside before:list-disc before:opacity-35 before:outline-[3px] before:pointer-events-none before:absolute before:text-center before:no-underline before:indent-[0px] before:normal-case before:text-nowrap before:visible before:z-[1] before:rounded-[32px] before:border-separate before:-inset-px before:font-intertight cursor-pointer hover:bg-orange-600/30"
        >
          <span className="box-border caret-transparent inline-block outline-[3px] text-nowrap">
            Chọn chuyến
          </span>
        </button>
      </div>
      <div onClick={() => navigate('/booking', { state: { trip } })} className="text-gray-500 text-sm items-center box-border caret-transparent cursor-pointer flex justify-between leading-5 min-h-[auto] min-w-[auto] outline-[3px] py-2 px-3 md:text-base md:hidden md:leading-6 md:min-h-0 md:min-w-0 active:bg-orange-50">
        <div className="text-sm items-center box-border caret-transparent gap-x-2 flex leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 w-full md:text-base md:leading-6 md:min-h-0 md:min-w-0">
          <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
          <span className="text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
            {trip.busType}
          </span>
          <div className="text-sm bg-neutral-300 box-border caret-transparent h-1.5 leading-5 min-h-[auto] min-w-[auto] outline-[3px] w-1.5 rounded-full md:text-base md:leading-6 md:min-h-0 md:min-w-0"></div>
          <span className="text-emerald-800 text-sm box-border caret-transparent block leading-5 min-h-[auto] min-w-[auto] outline-[3px] md:text-base md:leading-6 md:min-h-0 md:min-w-0">
            {trip.availableSeats} chỗ trống
          </span>
        </div>
        <span className="text-orange-600 text-lg font-semibold box-border caret-transparent block leading-7 min-h-[auto] min-w-[auto] outline-[3px] text-end md:inline md:min-h-0 md:min-w-0">
          {trip.price.toLocaleString('vi-VN')}đ
        </span>
        <span className="shrink-0 text-orange-600 text-xs font-semibold border border-orange-300 px-3 py-1 rounded-full bg-white">
          Chọn →</span>
      </div>
    </div>
  );
};
