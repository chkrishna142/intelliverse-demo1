const TextButton = ({
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
            ? "flex items-center gap-1 justify-center text-[#AEA9B1] text-sm font-medium rounded"
            : "flex items-center gap-1 justify-center text-[#447ED4] text-sm font-medium rounded hover:bg-[rgba(58,116,202,0.10)] focus:bg-[rgba(58,116,202,0.10)] focus:outline-none active:bg-[rgba(58,116,202,0.10)]"
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
  
  export default TextButton;