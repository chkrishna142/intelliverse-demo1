const iconMap = {
  chock: "clamp.svg",
  safety: "helmet.svg",
  dipRod: "rod.svg",
  Flushing: "flushing.svg",
  Sampling: "sampling.svg",
  "Lids closed": "compartment.svg",
};

const getColor = (val, total) => {
  if (val == total) return "#CDEEBF";
  else if (val > 0.5 * total) return "#A7CAFF";
  else return "#EC928E";
};

const AlertCard = ({ parameter, count, total }) => {
  return (
    <div className="flex flex-col gap-0 justify-center rounded-lg shadow-md w-[195px]">
      <div
        className="px-3 py-2 flex gap-2 items-center self-start rounded-t-lg w-full h-[52px]"
        style={{ backgroundColor: getColor(count, total) }}
      >
        <img
          className="h-[40px] w-[40px]"
          src={`/WorkforceSafetyIcons/${iconMap[parameter]}`}
        />
        <p className="text-base text-[#605D64] whitespace-nowrap">
          {parameter}
        </p>
      </div>
      <div
        className="py-[10px] px-4 text-center text-2xl font-medium rounded-b-lg w-full h-[70px]"
        style={{ color: getColor(count, total) }}
      >
        {count + "/" + total}
      </div>
    </div>
  );
};

export default AlertCard;
