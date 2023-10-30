import { useWindowSize } from "@uidotdev/usehooks";
import { useState } from "react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";

const DownloadReportBf = ({capture,setCapture,pageshift,handleTabChange}) => {
  const size = useWindowSize();
  const [selectedBasis, setSelectedBasis] = useState(0);
  const [selectedcategory, setSelectedCategory] = useState("Yesterday");
  const [selectedRange, setSelectedRange] = useState(0);

  const handleDownload = () => {
    // Send a message to Tab 2
  
        pageshift("Stability & Thermal Performance");
        handleTabChange(2);
    
    setCapture(true)
  
  };

  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 6 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() - 1 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  const handleRangeSelect = (e) => {
    setSelectedRange(e.target.value);
    if(e.target.value==0){
      console.log("1 days");
    }
    if(e.target.value==1){
      console.log("7 days");
    }
    if(e.target.value==2){
      console.log("14 days");
    }
    if(e.target.value==3){
      console.log("30 days");
    }
    if (e.target.value == 4) {
      console.log("custom days");
      setFromTime(
        new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
      setToTime(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    }
  };

  return (
    <div className="flex  w-full h-full justify-center ">
      <div
        className={`${
          size.width >= 768 ? "w-[40%]" : "w-[80%]"
        } flex flex-col  bg-white h-full p-4 rounded-lg border-[1px] gap-4 `}
      >
        {/* Top */}
        <div className="w-full flex flex-col justify-center gap-4">
          <div className=" w-[100%] flex justify-center ">
            <img
              src="/Bficons/downloadreport.svg"
              alt="Download"
              style={{ width: "60%" }}
            />
          </div>
          <p
            className={` flex justify-center text-[#1C56AC] font-semibold ${
              size.width >= 420 ? "[18px]" : "[10px]"
            } `}
          >
            Download Report
          </p>
          <p className="text-[#AEA9B1] flex justify-center !text-xs sm:!text-sm">
            This feature helps you download the report of the Blast furnace.
          </p>
        </div>
        {/* bottom */}
        <div className=" w-full">
          <p className="text-[#605D64] !text-sm sm:!text-sm font-medium">
            Select date range
          </p>
          <div className="flex flex-col gap-2 text-[#49454F] text-xs lg:text-base w-full p-2  rounded-[10px]">
            <div
              className={`p-3 flex items-center gap-1  ${
                selectedBasis == 0 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={0}
                onChange={(e) => {
                  setSelectedBasis(e.target.value);
                  setSelectedCategory("Yesterday");
                }}
                type="radio"
                name="freq"
                onClick={(e) => handleRangeSelect(e)}

                checked={selectedBasis == 0}
                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Yesterday</p>
            </div>
            <div
              className={`p-3 flex items-center gap-1 ${
                selectedBasis == 1 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={1}
                onChange={(e) => {
                  setSelectedBasis(e.target.value);
                  setSelectedCategory("Last Week");
                }}
                type="radio"
                name="freq"
                checked={selectedBasis == 1}
                onClick={(e) => handleRangeSelect(e)}

                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Last Week</p>
            </div>
            <div
              className={`p-3 flex items-center gap-1 ${
                selectedBasis == 2 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={2}
                onChange={(e) => {
                  setSelectedBasis(e.target.value);
                  setSelectedCategory("Last quarter (14 days)");
                }}
                type="radio"
                name="freq"
                onClick={(e) => handleRangeSelect(e)}
                checked={selectedBasis == 2}
                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Last quarter (14 days)</p>
            </div>
            <div
              className={`p-3 flex items-center gap-1 ${
                selectedBasis == 3 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={3}
                onChange={(e) => {
                  setSelectedBasis(e.target.value);
                  setSelectedCategory("Last month");
                }}
                type="radio"
                name="freq"
                onClick={(e) => handleRangeSelect(e)}
                checked={selectedBasis == 3}
                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Last month</p>
            </div>
            <div
              className={`p-3 flex items-center gap-1 w-full ${
                selectedBasis == 4 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={4}
                onChange={(e) => {
                  setSelectedBasis(e.target.value);
                  setSelectedCategory("Custom date range");
                }}
                type="radio"
                name="freq"
                checked={selectedBasis == 4}
                onClick={(e) => handleRangeSelect(e)}
                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Custom date range</p>
            </div>
            
            {selectedRange == 4 ? (
              <div className="min-w-[110px] mt-2">
                <FloatingInput
                  text="From"
                  type="date"
                  setDateTime={setFromTime}
                  value={fromTime}
                />
              </div>
            ):""}
            {selectedRange == 4 ? (
              <div className="min-w-[110px]">
                <FloatingInput
                  text="To"
                  type="date"
                  setDateTime={setToTime}
                  value={toTime}
                />
              </div>
            ):""}
          </div>
          <p className="text-[#605D64] !text-sm sm:!text-sm font-medium">
          Select frequency
          </p>
          <div className="flex flex-col gap-2 text-[#49454F] text-xs lg:text-base w-full p-2  rounded-[10px]">
          <div
              className={`p-3 flex items-center gap-2  ${
                selectedBasis == 5 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={5}
                onChange={(e) => {
                  setSelectedBasis(e.target.value);
                  setSelectedCategory("Daily Basis");
                }}
                type="radio"
                name="freq"
                onClick={(e) => handleRangeSelect(e)}

                checked={selectedBasis == 5}
                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Daily Basis</p>
            </div>
            <div
              className={`p-3 flex items-center gap-1  ${
                selectedBasis == 6 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={6}
                onChange={(e) => {
                  setSelectedBasis(e.target.value);
                  setSelectedCategory("Hourly basis");
                }}
                type="radio"
                name="freq"
                onClick={(e) => handleRangeSelect(e)}

                checked={selectedBasis == 6}
                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Hourly basis</p>
            </div>
            </div>
            <div className="flex justify-center">
            <button className="w-[200px] border-2 h-[50px] bg-[#024D87] text-white rounded-[15px]" onClick={handleDownload} >Download Report</button>
            </div>
        </div>
           
      </div>
  
    </div>
  );
};

export default DownloadReportBf;