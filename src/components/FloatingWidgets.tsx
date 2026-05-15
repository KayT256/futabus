export type FloatingWidgetsProps = {
  containerClassName: string;
  variant: "empty" | "singleFrame" | "multiFrame";
  singleFrameClassName: string;
  firstFrameSrc: string;
  firstFrameClassName: string;
  secondFrameSrc: string;
  secondFrameClassName: string;
  thirdFrameSrc: string;
  thirdFrameClassName: string;
  fourthFrameSrc: string;
  fourthFrameClassName: string;
};

export const FloatingWidgets = (props: FloatingWidgetsProps) => {
  return (
    <div className={props.containerClassName}>
      {props.variant === "singleFrame" && (
        <iframe className={props.singleFrameClassName}></iframe>
      )}
      {props.variant === "multiFrame" && (
        <>
          <iframe
            src={props.firstFrameSrc}
            className={props.firstFrameClassName}
          ></iframe>
          <iframe
            src={props.secondFrameSrc}
            className={props.secondFrameClassName}
          ></iframe>
          <iframe
            src={props.thirdFrameSrc}
            className={props.thirdFrameClassName}
          ></iframe>
          <iframe
            src={props.fourthFrameSrc}
            className={props.fourthFrameClassName}
          ></iframe>
          <div className="text-sm box-border caret-transparent leading-5 outline-[3px] md:text-base md:leading-6"></div>
        </>
      )}
    </div>
  );
};