const CustomSizingBar = () => {
  let a = 13;
  let b = 36;
  let isSmall;
  if (typeof window !== "undefined") {
    if (window.innerWidth > 1024) isSmall = false;
    else isSmall = true;
  }
  return (
    <div className="flex flex-col gap-4 min-w-[13vw]">
      <p className="text-base text-black">Size Distribution</p>
      <div className="flex flex-col h-[30vh]">
        <div style={{ height: `${a}%` }} className="flex gap-3">
          <div className="w-[50%] lg:w-[6vw] bg-[#ef6f12] rounded-tr-md rounded-tl-md text-white flex justify-center text-xs items-center">
            {isSmall ? `${a}%` : ""}
          </div>
          {!isSmall && (
            <div className="flex gap-2 items-center">
              <p className="font-medium text-[#ef6f12]">{a}%</p>
              <div className="flex gap-1 items-center">
                <p className="text-black font-medium text-xs">Small</p>
                <p className="text-gray-300 text-xs">0-6mm</p>
              </div>
            </div>
          )}
        </div>
        <div style={{ height: `${b}%` }} className="flex gap-3">
          <div className="w-[50%] lg:w-[6vw] bg-[#5193f6] text-white flex justify-center text-xs items-center">
            {isSmall ? `${b}%` : ""}
          </div>
          {!isSmall && (
            <div className="flex gap-2 items-center">
              <p className="font-medium text-[#5193f6]">{b}%</p>
              <div className="flex gap-1 items-center">
                <p className="text-black font-medium text-xs">Good</p>
                <p className="text-gray-300 text-xs">0-6mm</p>
              </div>
            </div>
          )}
        </div>
        <div style={{ height: `${100 - a - b}%` }} className="flex gap-3">
          <div className="w-[50%] lg:w-[6vw] bg-[#ffc107] rounded-br-md rounded-bl-md text-white flex justify-center text-xs items-center">
            {isSmall ? `${100 - a - b}%` : ""}
          </div>
          {!isSmall && (
            <div className="flex gap-2 items-center">
              <p className="font-medium text-[#FFC107]">{100 - a - b}%</p>
              <div className="flex gap-1 items-center">
                <p className="text-black font-medium text-xs">Large</p>
                <p className="text-gray-300 text-xs">0-6mm</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomSizingBar;
