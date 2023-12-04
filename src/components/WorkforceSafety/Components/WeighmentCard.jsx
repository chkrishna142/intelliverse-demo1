const urls = [
  "/WorkforceSafetyIcons/tick.svg",
  "/WorkforceSafetyIcons/alert.svg",
];

const BgColorHandler = (data) => {
  return Object.values(data).some((reasons) => reasons === 1);
};

const WeighmentCard = ({ reason, num }) => {
  return (
    <div className="flex flex-col gap-1 w-full items-center">
      <p className="text-[#3E3C42] text-base font-bold self-start">Truck {num}</p>
      <div className="flex flex-col gap-0 min-w-[240px] w-full h-[120px] shadow-md rounded-lg">
        <div
          className="py-3 pl-2 text-[#605D64] text-sm font-medium w-full rounded-t-lg capitalize flex gap-3 items-center"
          style={{
            backgroundColor: reason ? "#EC928E" : "#CDEEBF",
          }}
        >
          Truck no. <p className="text-[#3E3C42] text-base">MH04KU6382</p>
        </div>
        <div
          className={`p-3 flex items-center h-full justify-between rounded ${
            reason == 1 ? "border-2 border-[#E46962]" : "border-0"
          }`}
        >
          <div className="flex items-center gap-[10px]">
            <img
              className="h-[50px] w-[50px]"
              src="/WorkforceSafetyIcons/weighment.svg"
            />
            <p className="text-[#79767D] text-base">Clearance</p>
          </div>
          {reason != -1 ? (
            <img src={urls[reason]} />
          ) : (
            <div className="flex">
              <div className="animate-beatloader-item animate-delay-0"></div>
              <div className="animate-beatloader-item animate-delay-1000"></div>
              <div className="animate-beatloader-item animate-delay-2000"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeighmentCard;
