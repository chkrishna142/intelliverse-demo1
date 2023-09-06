const KilnHealthCard = () => {
  return (
    <div className="flex justify-center items-center h-full min-w-[15vw]">
      <div className="flex flex-col gap-6 pt-5 pl-4 pr-6 pb-6 rounded bg-[#fffcf2] w-[12vw]">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[#605D64]">Health:</p>
          <div className="flex gap-3 items-center">
            <img src="/KilnIcons/dusty.svg" />
            <p className="text-[#3E3C42] font-medium text-lg">Dusty</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <p className="text-[#605D64] text-sm">Kiln Index</p>
            <img src="/KilnIcons/info.svg" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-[#3E3C42] text-lg font-medium">6</p>
            <p className="p-2 rounded-[34px] bg-[#F9DEDC] text-[#DC362E] text-xs font-medium">
              Critical
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KilnHealthCard;
