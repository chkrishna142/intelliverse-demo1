const TonalButton = ({
  disable = false,
  onClick = null,
  text,
  width = null,
  height = null,
  Icon = null,
}) => {
  return (
    <button
      className={
        disable
          ? "flex items-center justify-center gap-1 text-[#AEA9B1] text-sm rounded bg-[#EBEBEB]"
          : "flex items-center justify-center gap-1 text-[#3A74CA] text-sm rounded bg-[#DEF] hover:bg-[#CFE7FF] hover:shadow-[0px_2px_6px_2px_rgba(0,0,0,0.10),0px_1px_2px_0px_rgba(0,0,0,0.10)] focus:bg-[#CFE7FF] focus:shadow-[0px_2px_6px_2px_rgba(0,0,0,0.10),0px_1px_2px_0px_rgba(0,0,0,0.10)] focus:outline-none active:bg-[#CFE7FF]"
      }
      style={{
        width: width ? width : "100%",
        height: height ? height : "auto",
        padding: Icon ? "6px 16px 6px 8px" : "8px 16px 8px 16px",
      }}
      onClick={onClick}
      disabled={disable}
    >
      {Icon}
      {text}
    </button>
  );
};

export default TonalButton;
