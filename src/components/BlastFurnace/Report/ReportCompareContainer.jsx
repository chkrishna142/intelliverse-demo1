import ReportBarLineChart from "./ReportBarLineChart";
import ReportCompareChart from "./ReportCompareChart";
import ReportPiechart from "./ReportPiechart";

const ReportCompareContainer = ({ name,lineData,timeRange,selectedCategory, selectedCategoryBar, appendValue}) => {
 
  return (
    <div className="w-full h-full ">
      <p className="text-[#3E3C42] font-medium text-xl">{name}</p>

      <div className="flex gap-1 sm:gap-[40px] items-center min-h-[280px] ">
       
        <div className=" sm:ml-0 min-h-[280px] min-w-[700px] flex-grow ">
         <ReportCompareChart appendValue={appendValue} lineData={lineData} timeRange={timeRange} selectedCategory={selectedCategory} name={name} selectedCategoryBar={selectedCategoryBar}/>
        </div>
      </div>
    </div>
  );
};

export default ReportCompareContainer;
