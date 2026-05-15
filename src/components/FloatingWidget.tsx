export const FloatingWidget = () => {
  return (
    <div className="fixed text-sm box-border caret-transparent leading-5 outline-[3px] z-[2000000000] right-0 bottom-0 md:text-base md:leading-6">
      <iframe
        src="cid://frame-E7832F41D39681EA9F90A5537BA7A61A@mhtml.blink"
        className="fixed text-sm box-border caret-transparent h-[60px] leading-5 max-h-[60px] max-w-16 min-h-[60px] min-w-16 outline-[3px] w-16 z-[1000003] right-5 bottom-5 md:text-base md:leading-6"
      ></iframe>
      <iframe
        src="cid://frame-2E91146AEE7ED12521608FF7DF2C5B7E@mhtml.blink"
        className="fixed text-sm box-border caret-transparent hidden h-[600px] leading-5 max-h-[600px] max-w-[340px] min-h-[600px] min-w-[340px] outline-[3px] w-[340px] z-[1000003] rounded-[18px] right-5 bottom-[98px] md:text-base md:leading-6"
      ></iframe>
      <iframe
        src="cid://frame-BB41546FB98F4E5524DA7D70BBC58B84@mhtml.blink"
        className="fixed text-sm box-border caret-transparent hidden h-[45px] leading-5 max-h-[45px] max-w-[340px] min-h-[45px] min-w-[340px] outline-[3px] w-[340px] z-[1000002] right-5 bottom-[30px] md:text-base md:leading-6"
      ></iframe>
      <iframe
        src="cid://frame-0CE889185D9643CF6D66BCE88B116610@mhtml.blink"
        className="fixed text-sm box-border caret-transparent hidden h-[45px] leading-5 max-h-[45px] max-w-[360px] min-h-[45px] min-w-[360px] outline-[3px] w-[360px] right-5 bottom-[90px] md:text-base md:leading-6"
      ></iframe>
      <div className="text-sm box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6"></div>
    </div>
  );
};