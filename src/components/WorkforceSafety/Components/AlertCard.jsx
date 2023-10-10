const AlertCard = ({ parameter, count, total }) => {
  const colors = ["#A7CAFF", "#CDEEBF", "#EC928E"];
  const idx = Math.floor(Math.random() * 3);

  return (
    <div className="flex flex-col gap-0 justify-center rounded-lg shadow-md w-[195px]">
      <div
        className="px-3 py-2 flex gap-2 items-center self-start rounded-t-lg w-full h-[52px]"
        style={{ backgroundColor: colors[idx] }}
      >
        <img src="/WorkforceSafetyIcons/hat.svg"/>
        <p className="text-base text-[#605D64] whitespace-nowrap">{parameter}</p>
      </div>
      <div
        className="py-[10px] px-4 text-center text-2xl font-medium rounded-b-lg w-full h-[70px]"
        style={{ color: colors[idx] }}
      >
        {count + "/" + total}
      </div>
    </div>
  );
};

export default AlertCard;
