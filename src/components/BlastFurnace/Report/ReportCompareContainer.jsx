import { useWindowSize } from "@uidotdev/usehooks";
import ReportBarLineChart from "./ReportBarLineChart";
import ReportCompareChart from "./ReportCompareChart";
import ReportPiechart from "./ReportPiechart";

const ReportCompareContainer = ({ name,lineData,timeRange,selectedCategory, selectedCategoryBar, appendValue}) => {
 
  const size=useWindowSize();
  return (
    <div className="w-full h-full ">
      <p className="text-[#3E3C42] font-medium text-xl">{name}</p>

      <div className="flex gap-1 sm:gap-[40px] items-center min-h-[280px] ">
       
        <div className={`sm:ml-0 min-h-[280px]x ${size.width<1024?"w-full":" w-[50%]"} flex-grow `} >
         <ReportCompareChart appendValue={appendValue} lineData={lineData} timeRange={timeRange} selectedCategory={selectedCategory} name={name} selectedCategoryBar={selectedCategoryBar}/>
        </div>
      </div>
    </div>
  );
};

export default ReportCompareContainer;
