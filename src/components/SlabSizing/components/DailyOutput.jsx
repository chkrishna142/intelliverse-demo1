import SubDailyOutput from "./SubDailyOutput";

function DailyOutput() {
  const subDailyoutput = [0, 1, 2, 3];
  return (
    <div className="w-full  h-full">
      <div className="flex text-start w-full h-[22px]   items-center gap-3">
        <p className="text-[#CAC5CD] text-[15px]">Daily output</p>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-3  p-3">
        {/* You can create cells here */}
        {subDailyoutput.map((e) => {
          return <SubDailyOutput show={e} />;
        })}
      </div>
    </div>
  );
}

export default DailyOutput;
