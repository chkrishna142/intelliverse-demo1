  const getColor = (val, total) => {
    if (val == total) return "#CDEEBF";
    else if (val > 0.9 * total) return "#A7CAFF";
    else return "#EC928E";
  };
  
  const AlertCard = ({ parameter, count, total, setFilterData }) => {
    const handleClick = () => {
      let val = parameter.split(' ')[1];
      setFilterData((prev) => {
        // Check if the value already exists in the filter data
        const existingIndex = prev.items.findIndex(
          (item) => item.value === val
        );
  
        if (existingIndex !== -1) {
          // If the value already exists, remove it from the filter data
          return { items: [] };
        } else {
          // If the value doesn't exist, add it to the filter data
          return {
            items: [{ field: "loaderID", operator: "contains", value: val }],
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
          <p className="text-base text-[#605D64] whitespace-nowrap capitalize">
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
  