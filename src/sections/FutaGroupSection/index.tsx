export const FutaGroupSection = () => {
  return (
    <section className="text-sm items-center box-border caret-transparent flex flex-col leading-5 outline-[3px] text-center px-4 py-6 md:text-base md:leading-6 md:p-10">
      <span className="text-emerald-800 text-xl font-semibold box-border caret-transparent block leading-[33px] min-h-[auto] min-w-[auto] outline-[3px] md:text-[28px]">
        KẾT NỐI FUTA GROUP
      </span>
      <span className="text-neutral-600 text-sm box-border caret-transparent block leading-[21px] max-w-2xl min-h-[auto] min-w-[auto] outline-[3px] mt-0 md:text-base md:mt-2">
        Kết nối đa dạng hệ sinh thái FUTA Group qua App FUTA: mua vé Xe Phương
        Trang, Xe Buýt, Xe Hợp Đồng, Giao Hàng,...
      </span>
      <div className="text-sm box-border caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] mt-10 mb-4 md:text-base md:leading-6">
        <div className="relative text-sm box-border caret-transparent hidden h-auto leading-5 max-w-4xl outline-[3px] w-screen md:text-base md:block md:h-36 md:leading-6">
          <div className="relative text-sm box-border caret-transparent inline-block leading-5 outline-[3px] md:text-base md:leading-6">
            <img
              alt="futa connect"
              src="https://cdn.futabus.vn/futa-busline-cms-dev/1_ketnoi_3c401512ac/1_ketnoi_3c401512ac.svg"
              className="relative text-sm box-border caret-transparent hidden h-auto leading-5 max-w-4xl outline-[3px] w-screen md:text-base md:block md:h-36 md:leading-6"
            />
          </div>
        </div>
        <div className="relative text-sm aspect-[13_/_7] box-border caret-transparent block leading-5 outline-[3px] w-[360px] md:text-base md:hidden md:leading-6 md:w-[1228.8px]">
          <div className="relative text-sm box-border caret-transparent inline-block leading-5 outline-[3px] md:text-base md:leading-6">
            <img
              alt="futa connect"
              src="https://cdn.futabus.vn/futa-busline-web-cms-prod/Mobile_8c827bf843/Mobile_8c827bf843.png"
              className="relative text-sm aspect-[13_/_7] box-border caret-transparent block leading-5 max-w-full outline-[3px] w-[360px] md:text-base md:hidden md:leading-6 md:w-[1228.8px]"
            />
            <div className="absolute text-sm box-border caret-transparent leading-5 outline-[3px] inset-0 md:text-base md:leading-6">
              blur
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};