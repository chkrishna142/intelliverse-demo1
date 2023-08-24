const CustomSizingBar = ({size}) => {
  let binData = Object.values(size);
  let sum = binData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  let vals = [];
  binData.map(item => {
    let x = ((item/sum)*100);
    if(x!==0)vals.push(x.toFixed(2))
  });
  console.log(vals,'types')
  const labels = Object.keys(size);
  const colors = [
    "#ef6f12",
    "#5193f6",
    "#ffc107",
    "#27ae60",
    "#e74c3c",
    "#8e44ad",
  ];
  let isSmall;
  if (typeof window !== "undefined") {
    if (window.innerWidth > 1024) isSmall = false;
    else isSmall = true;
  }
  return (
    <div className="flex flex-col gap-4 min-w-[13vw]">
      <p className="text-base text-black">Size Distribution</p>
      <div className="flex flex-col h-[30vh]">
        {vals.map((x, idx) => {
          return (
            <div style={{ height: `${x}%` }} className="flex gap-3">
              <div
                className={`w-[50%] lg:w-[6vw] ${
                  idx === 0 && "rounded-tr-md rounded-tl-md"
                } ${
                  idx === vals.length - 1 && "rounded-bl-md rounded-br-md"
                } text-white flex justify-center text-xs items-center`}
                style={{ backgroundColor: colors[idx] }}
              >
                {isSmall ? `${x}%` : ""}
              </div>
              {!isSmall && (
                <div className="flex gap-2 items-center">
                  <p className='font-medium ' style={{ color: colors[idx] }}>{x}%</p>
                  <div className="flex gap-1 items-center">
                    <p className="text-black font-medium text-xs">
                      {labels[idx]}
                    </p>
                    {/* <p className="text-gray-300 text-xs">0-6mm</p> */}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomSizingBar;
