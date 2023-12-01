const StatusTooltip = () => {
  return (
    <div
      className="rounded-md py-2 px-4 flex flex-col gap-3 absolute top-0 left-[-210px] bg-white w-[215px] h-auto leading-normal"
      style={{
        boxShadow:
          "0px 4px 4px 0px rgba(226, 240, 220, 0.51), 4px 0px 4px 0px rgba(226, 240, 220, 0.51)",
        zIndex: 1000,
      }}
    >
      <div className="flex justify-between items-center relative">
        <div className="flex gap-2 items-center justify-center text-sm">
          <img src="/BlendComplianceIcons/dot.svg" alt="no support" />
          <p className="font-medium text-[#3E3C42]">Bay 2</p>
          <p className="text-[#605D64]">Section 3</p>
        </div>
        <img src="/BlendComplianceIcons/videoCam.svg" alt="no support" />
        <img
          src="/BlendComplianceIcons/tooltipArrow.svg"
          alt="no support"
          className="absolute right-[-40px] transform scale-x-[-1]"
        />
      </div>
      <div className="flex flex-col gap-[6px]">
        <div className="flex gap-2 items-center">
          <p className="text-[#938F96] text-sm w-[80px] text-start">
            Concentrate
          </p>
          <p className="text-[#2660B6] text-base font-medium">MCP 75</p>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-[#938F96] text-sm w-[80px] text-start">Amount</p>
          <p className="text-[#2660B6] text-base font-medium">26 MT/32 MT</p>
        </div>
      </div>
      <div className="flex gap-[10px] justify-end">
        <p className="text-[#CAC5CD] text-[11px]">Last updated</p>
        <p className="text-[#AEA9B1] text-[11px]">25 April 2023</p>
      </div>
    </div>
  );
};

export default StatusTooltip;
