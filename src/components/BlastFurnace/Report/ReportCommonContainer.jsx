import ReportBarLineChart from "./ReportBarLineChart";
import ReportPiechart from "./ReportPiechart";

const ReportCommonContainer = ({ name,timeRange,  piechartdata, labelData,barGraphName1,barGraphName2,barGraphName3,barGraphData1,barGraphData2,barGraphData3 , appendValue}) => {
  return (
   
    <div className="w-full ">
      <p className="text-[#3E3C42] font-medium text-xl">{name}</p>

      <div className="flex gap-1 sm:gap-[40px] items-center overflow-x-auto min-h-[280px] ">
        <div className=" sm:ml-0 min-w-[280px] w-[25vw] ">
          <ReportPiechart piechartdata={piechartdata} labelData={labelData} name={name} />
        </div>
        <div className=" sm:ml-0 h-[35vh] min-w-[680px] flex-grow ">
          <ReportBarLineChart
            name={name}
            barGraphName1={barGraphName1}
            barGraphName2={barGraphName2}
            barGraphName3={barGraphName3}
            barGraphData1={barGraphData1}
            barGraphData2={barGraphData2}
            barGraphData3={barGraphData3}
            timeRange={timeRange}
            
            appendValue={appendValue}
           
          />
        </div>
      </div>
    </div>
  );
};

export default ReportCommonContainer;
