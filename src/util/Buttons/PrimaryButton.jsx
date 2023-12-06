const PrimaryButton = ({
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
          ? "flex items-center gap-1 justify-center text-[#AEA9B1] text-sm font-medium rounded bg-[#EBEBEB]"
          : "flex items-center gap-1 justify-center text-[#FFF] text-sm font-medium rounded bg-[#084298] hover:bg-[#3A74CA] hover:shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.30)] focus:bg-[#3A74CA] focus:shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.30)] focus:outline-none active:bg-[#3A74CA]"
      }
      style={{
        width: width ? width : "100%",
        height: height ? height : "auto",
        padding: Icon ? '6px 16px 6px 8px' : '8px 16px 8px 16px'
      }}
      onClick={onClick}
      disabled={disable}
    >
      {Icon}
      {text}
    </button>
  );
};

export default PrimaryButton;
