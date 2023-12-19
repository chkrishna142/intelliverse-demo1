import { useWindowSize } from "@uidotdev/usehooks";
import DailyOutput from "./DailyOutput";
import WeeklyOutput from "./WeeklyOutput";

function OverallOutput() {
  const size = useWindowSize();
  return (
    <div className="w-full h-full">
      <div
        className={`flex ${
          size.width < 768 ? "flex-col h-[80px]" : " h-[40px] "
        } text-start w-full  items-center gap-3`}
      >
        <p className="text-[#000] text-[20px]">Overall Output</p>
        <p className="text-[#CAC5CD] text-[15px]">
          {" "}
          A summary of the production
        </p>
      </div>
      <div className={`w-full flex ${size.width < 768 ? "flex-col" : ""}`}>
        <div className={` ${size.width < 768 ? "w-full" : "w-[30%] "}`}>
          <DailyOutput />
        </div>
        <div className={` ${size.width < 768 ? "w-full" : "w-[70%] "}`}>
          <WeeklyOutput />
        </div>
      </div>
    </div>
  );
}

export default OverallOutput;
