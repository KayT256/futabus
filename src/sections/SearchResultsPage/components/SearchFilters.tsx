export const SearchFilters = () => {
  return (
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
  );
};
