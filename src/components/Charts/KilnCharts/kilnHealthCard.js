const colors = {
  dusty: "#fffcf2",
  healthy: "#DDF7EA",
  hot: "#ffecec",
  hot_Dusty: "#FFEDCC",
  negative: "#F4F4F4",
};

const tagColor = {
  dusty: "#fee179",
  healthy: "#59d79a",
  hot: "#ff6460",
  hot_Dusty: "#ef6f12",
  negative: "#000000",
};

const tagName = {
  dusty: "Dusty",
  healthy: "Healthy",
  hot: "Hot",
  hot_Dusty: "Hot & Dusty",
  negative: "Negative",
};

// fffcf2

const KilnHealthCard = ({ index, health }) => {
  return (
    <div className="flex justify-start items-center w-full h-full min-w-[15vw]">
      <div
        className="flex justify-start flex-col gap-6 pt-5 pl-4 pr-6 pb-6 rounded w-full sm:w-[15vw] min-w-[190px]"
        style={{ backgroundColor: colors[health] }}
      >
        <div className="relative flex flex-col gap-1">
          <p className="text-sm text-[#605D64]">Health:</p>
          <div className="flex gap-3 items-center">
            {/* <img src={`/KilnIcons/${health}.svg`} /> */}
            <div
              className="w-[5px] h-[20px]"
              style={{ backgroundColor: tagColor[health] }}
            ></div>
            <p className="text-[#3E3C42] font-medium text-lg">
              {tagName[health]}
            </p>
          </div>
          {health != "healthy" && (
            <p className="absolute right-0 top-[-5px] p-2 rounded-[34px] bg-[#F9DEDC] text-[#DC362E] text-xs font-medium">
              Critical
            </p>
          )}
        </div>
        <div className="flex flex-row sm:flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className="text-[#605D64] text-sm whitespace-nowrap">
                Dusty index
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[#3E3C42] text-lg font-medium">{index}</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <p className="text-[#605D64] text-sm whitespace-nowrap">
                Hot index
              </p>
              <img src="/KilnIcons/info.svg" />
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[#3E3C42] text-lg font-medium">{index}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KilnHealthCard;
