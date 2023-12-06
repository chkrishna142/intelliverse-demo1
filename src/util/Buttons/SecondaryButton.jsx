const SecondaryButton = ({
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
          ? "flex items-center gap-1 justify-center text-[#AEA9B1] text-sm bg-[#EBEBEB] rounded"
          : "flex items-center gap-1 justify-center text-[#FFF] bg-[#6CA6FC] text-sm rounded hover:bg-[#447ED4] hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] focus:bg-[#447ED4] focus:outline-none focus:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] active:bg-[#447ED4]"
      }
      style={{
        width: width ? width : "100%",
        height: height ? height : "auto",
        padding: Icon ? "2px 12px 2px 6px" : "2px 12px 2px 12px",
      }}
      onClick={onClick}
      disabled={disable}
    >
      {Icon}
      {text}
    </button>
  );
};

export default SecondaryButton;
