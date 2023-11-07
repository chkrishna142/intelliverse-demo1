const CustomSizingBar = ({ size }) => {
  let binData = Object.values(size);
  let sum = binData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  let vals = [];
  let binSizes = Object.keys(size);
  let labels = [];
  binData.map((item, idx) => {
    let x = (item / sum) * 100;
    if (x !== 0) {
      vals.push(x.toFixed(2));
      labels.push(binSizes[idx]);
    }
  });
  const colors = [
    "#ffc107",
    "#5193f6",
    "#ef6f12",
    "#1c56ac",
    "#e91e63",
    "#00bcd4",
    "#8bc34a",
    "#9c27b0",
    "#673ab7",
    "#ff9800",
    "#4caf50",
    "#795548",
  ];
  let isSmall;
  if (typeof window !== "undefined") {
    if (window.innerWidth > 1024) isSmall = false;
    else isSmall = true;
  }
  return (
    <div className="flex flex-col gap-4 min-w-[15vw]">
      {/* <p className="text-base text-black">Size Distribution</p> */}
      <div className="flex flex-col h-[30vh]">
        {vals.map((x, idx) => {
          return (
            <div style={{ height: `${x}%` }} className="flex gap-3">
              <div
                className={`w-[50%] lg:w-[6vw] ${
                  idx === 0 && "rounded-tr-md rounded-tl-md"
                } ${
                  idx === vals.length - 1 && "rounded-bl-md rounded-br-md"
                } text-white flex justify-center text-[8px] sm:text-xs items-center`}
                style={{ backgroundColor: colors[idx] }}
              >
                {isSmall ? `${x}%` : ""}
              </div>
              {x > 4 &&
                (!isSmall ? (
                  <div className="flex gap-2 items-center min-w-[125px]">
                    <p className="font-medium " style={{ color: colors[idx] }}>
                      {x}%
                    </p>
                    <div className="flex gap-1 items-center">
                      <p className="text-black font-medium text-xs whitespace-nowrap">
                        {labels[idx]}
                      </p>
                      {/* <p className="text-gray-300 text-xs">0-6mm</p> */}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center whitespace-nowrap mr-[-50px]">
                    <p className="text-black font-medium text-xs">
                      {labels[idx]}
                    </p>
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomSizingBar;
