const iconMap = {
  clamp: "clamp.svg",
  chock: "chock.svg",
  safety: "helmet.svg",
  dipRod: "rod.svg",
  flushing: "flushing.svg",
  sampling: "sampling.svg",
  lidInspection: "compartment.svg",
  sideSampling: 'samplerContainer.svg',
  weighment: 'Weighment.svg'
};

const getColor = (val, total) => {
  if (val == total) return "#CDEEBF";
  else if (val > 0.5 * total) return "#A7CAFF";
  else return "#EC928E";
};

const Capitalize = (str) => {
  const arr = str.split("");
  let str2 = "";
  for (var i = 0; i < arr.length; i++) {
    str2 += arr[i] == arr[i].toUpperCase() ? " " + arr[i] : arr[i];
  }
  return str2;
};

const AlertCard = ({ parameter, count, total, setFilterData }) => {
  const handleClick = () => {
    setFilterData((prev) => {
      // Check if the value already exists in the filter data
      const existingIndex = prev.items.findIndex(
        (item) => item.value === parameter
      );

      if (existingIndex !== -1) {
        // If the value already exists, remove it from the filter data
        return { items: [] };
      } else {
        // If the value doesn't exist, add it to the filter data
        return {
          items: [{ field: "event", operator: "is", value: parameter }],
        };
      }
    });
  };

  return (
    <div
      className="flex flex-col gap-0 justify-center rounded-lg shadow-md w-[195px] cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="px-3 py-2 flex gap-2 items-center self-start rounded-t-lg w-full h-[52px]"
        style={{ backgroundColor: getColor(count, total) }}
      >
        <img
          className="h-[40px] w-[40px]"
          src={`/WorkforceSafetyIcons/${iconMap[parameter]}`}
        />
        <p className="text-base text-[#605D64] whitespace-nowrap capitalize">
          {Capitalize(parameter)}
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
