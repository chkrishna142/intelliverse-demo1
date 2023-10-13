const ColorCard = ({ r, g, b }) => {
  return (
    <div className="flex justify-start items-center w-full h-full min-w-[15vw]">
      <div
        className="flex justify-start flex-col gap-6 pt-5 pl-4 pr-6 pb-6 rounded w-full sm:w-[15vw] min-w-[190px]"
        style={{ backgroundColor: `rgb(${r},${g},${b},0.6)` }}
      >
        <div className="flex flex-row sm:flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className="text-[#605D64] text-sm whitespace-nowrap">
                Red Value
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[#3E3C42] text-lg font-medium">{r}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className="text-[#605D64] text-sm whitespace-nowrap">
                Green Value
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[#3E3C42] text-lg font-medium">{g}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className="text-[#605D64] text-sm whitespace-nowrap">
                Blue Value
              </p>
              <img src="/KilnIcons/info.svg" />
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[#3E3C42] text-lg font-medium">{b}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorCard;
