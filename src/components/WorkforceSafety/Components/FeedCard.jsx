const FeedCard = ({ parameter, reasons, codes, bgcode }) => {
  const colors = ["#CDEEBF", "#EC928E"];

  const urls = [
    "/WorkforceSafetyIcons/tick.svg",
    "/WorkforceSafetyIcons/alert.svg",
  ];
  const icons = ["hat2.svg", "person.svg"];
  const idx2 = Math.floor(Math.random() * 2);

  return (
    <div className="flex flex-col gap-0 w-full h-[250px] shadow-md rounded-lg">
      <div
        className="py-4 pl-4 text-[#525056] text-base font-medium w-full rounded-t-lg"
        style={{ backgroundColor: colors[bgcode] }}
      >
        {parameter}
      </div>
      {reasons.map((val,idx) => {
        return (
          <div className={`pt-3 pl-3 flex items-center rounded ${codes[idx] == 1 ? 'border-2 border-[#E46962]' : 'border-0'}`}>
            <img src={`/WorkforceSafetyIcons/${icons[idx2]}`} />
            <div className="py-[10px] px-4 flex justify-between items-center w-full">
              <p className="text-[#79767D] text-base">{val}</p>
              <img src={urls[codes[idx]]} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeedCard;
