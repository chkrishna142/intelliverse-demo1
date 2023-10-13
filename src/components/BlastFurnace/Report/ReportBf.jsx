import { Button, CircularProgress, Select, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { BASE_URL_FOR_BF, clientIdbf } from "../BF_Components/urlforbf";
import Serverdown from "../BF_Components/Serverdown";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import ReportCommonContainer from "./ReportCommonContainer";
import ReportCompareContainer from "./ReportCompareContainer";

const ReportBf = () => {
  const size = useWindowSize();
  const [selectedRange, setSelectedRange] = useState(0);
  const [DataChanging, setDataChanging] = useState(false);
  const [selectedBasis, setSelectedBasis] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Stability");
  const [serverdown,setServerdown]=useState(false);
//   const [dummyData, setDummyData] = useState();
  const [dummyData,setDummyData]=useState(
    {
    dates: {
          timeSelected: [
            "2023-10-12"
          ]
        },

      timeSelected:[
        "01/01/2003",
        "02/01/2003",
        "03/01/2003",
        "04/01/2003",
        "05/01/2003",
        "06/01/2003",
        "07/01/2003",
      ],
      stability:{
        pieData:[12, 13, 14],
        pieLabels:["< 60%", "60% to 80%", "> 80%"],
        data1 :[43, 10, 60, 20, 20, 20, 20],//always get data in increasing order <60=data1 then 60-80=data2 then >80=data3
        data2 :[34, 10, 10, 20, 20, 20, 20],
        data3 :[23, 80, 30, 20, 20, 20, 20],

      },
      thermal:{
        pieData:[100, 320, 50],
        pieLabels: ["< -3", "-3 to 10", "> 10"],
        data1 : [23, 83, 53, 53, 53, 53, 53],//always get data in increasing order <-10=data1 then -10to10=data2 then >10=data3
        data2 :[53, 83, 53, 53, 53, 53, 53],
        data3 :[24, 83, 53, 53, 53, 53, 53],

      },
      pwi:{
        pieData:[30, 30, 60],
        pieLabels:["Low", "In Range", "High"],
        data1 : [10, 11, 11, 9, 9, 9, 9],//always get data in increasing order low=data1 then (in range) =data2 then high=data3
        data2 :[60, 11, 11, 9, 9, 9, 9],
        data3 :[30, 11, 11, 9, 9, 9, 9],

      },
      hotmetal:{
        pieData:[1400, 1300, 1500],
        pieLabels:["Low", "In Range", "High"],
        data1 : [25, 50, 50, 50, 40, 40, 40],//always get data in increasing order low=data1 then (in range) =data2 then high=data3
        data2 :[50, 50, 50, 50, 40, 40, 40],
        data3 :[25, 50, 50, 50, 40, 40, 40],

      },
      fuelLine:{
        data:[10,20,30,4000,10,20,30],
      },
      productionLine:{
        data:[1000,20,30,40,10,20,30],
      }

  })

  const [selectedCategoryBar, setSelectedCategoryBar] = useState(dummyData?.fuelLine?.data);

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
    if (e.target.value == 0) {
      setFromTime(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
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

  const apiCall = async () => {
    try {
      const response = await fetch(
        `${BASE_URL_FOR_BF}/reports/?client_id=${clientIdbf}&start_date=${fromTime}&end_date=${toTime}`
      );
      const json = await response.json();
      console.log("fetched data of report===>>>", json);
      setDummyData(json);
      setDataChanging(false);
      setServerdown(false);
      setSelectedCategoryBar(json?.stability?.data3);
    } catch (error) {
      setDataChanging(false);
      setServerdown(true);
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    setDataChanging(false);
    // apiCall();
    // console.log("date",fromTime,"--",toTime)
  };

  useEffect(() => {
    handleClick();
  }, []);

  const stabilityPieData = dummyData?.stability?.pieData;
  const stabilityPielabels = dummyData?.stability?.pieLabels;
  const stabilityBarData = dummyData?.stability?.data3; //always send optimize data at first in stability case >80%
  const stabilityBarData1 = dummyData?.stability?.data1;
  const stabilityBarData2 = dummyData?.stability?.data2;
  const stabilityTimeRange = dummyData?.dates?.timeSelected;

  const thermalPieData = dummyData?.thermal?.pieData;
  const thermalPielabels = dummyData?.thermal?.pieLabels;
  const thermalBarData = dummyData?.thermal?.data2; //send here optimized data in this case it is range for -10 to 10 which is data2
  const thermalBarData1 = dummyData?.thermal?.data1;
  const thermalBarData2 = dummyData?.thermal?.data3;
  const thermalTimeRange = dummyData?.dates?.timeSelected;

  const pwiPieData = dummyData?.pwi?.pieData;
  const pwiPielabels = dummyData?.pwi?.pieLabels;
  const pwiBarData = dummyData?.pwi?.data2;
  const pwiBarData1 = dummyData?.pwi?.data1;
  const pwiBarData2 = dummyData?.pwi?.data3;
  const pwiTimeRange = dummyData?.dates?.timeSelected;

  const hotmetalPieData = dummyData?.hotmetal?.pieData;
  const hotmetalPielabels = dummyData?.hotmetal?.pieLabels;
  const hotmetalBarData = dummyData?.hotmetal?.data2;
  const hotmetalBarData1 = dummyData?.hotmetal?.data1;
  const hotmetalBarData2 = dummyData?.hotmetal?.data3;
  const hotmetalTimeRange = dummyData?.dates?.timeSelected;

  const fuelLineData = dummyData?.fuelLine?.data;
  const fuelTimeRange = dummyData?.dates?.timeSelected;

  const prodLineData = dummyData?.productionLine?.data;
  const prodTimeRange = dummyData?.dates?.timeSelected;

  return (
    <div className="w-full bg-white h-full rounded-sm p-2 flex flex-col gap-4">
      {/* top */}
      <div className="w-full flex justify-between items-center mt-2">
        <div className="text-xl sm:text-xl font-semibold text-[#024D87]">
          Report
        </div>
        <div className="flex gap-2  ">
          {/* <div className="min-w-[110px]">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              variant="outline"
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              _focus={{ borderColor: "blue.500" }}
            >
              <option value="shift" className="bg-white hover:bg-blue-200">
                Shift
              </option>
              <option value="daily" className="bg-white hover:bg-blue-200">
                Daily
              </option>
            </Select>
          </div> */}
          <div className="flex min-w-[110px]  items-center">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              variant="outline"
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              _focus={{ borderColor: "blue.500" }}
              onChange={(e) => handleRangeSelect(e)}
              value={selectedRange}
            >
              <option
                key="Last 7 days"
                value={0}
                className="bg-white hover:bg-blue-200"
              >
                Last 7 Days
              </option>
              <option
                key="custom"
                value={1}
                className="bg-white hover:bg-blue-200"
              >
                Custom
              </option>
            </Select>
          </div>
          {selectedRange == 1 && (
            <div className="min-w-[110px]">
              <FloatingInput
                text="From"
                type="date"
                setDateTime={setFromTime}
                value={fromTime}
              />
            </div>
          )}
          {selectedRange == 1 && (
            <div className="min-w-[110px]">
              <FloatingInput
                text="To"
                type="date"
                setDateTime={setToTime}
                value={toTime}
              />
            </div>
          )}
          <button
            className="text-center py-2 px-4 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-full min-w-[80px]"
            onClick={handleClick}
          >
            {DataChanging ? <Spinner /> : "Apply"}
          </button>
        </div>
      </div>
      {
             serverdown && (
              <Serverdown/>
            )
          }
           {!dummyData &&  !serverdown &&(
            <div className=" flex justify-center">
              <CircularProgress isIndeterminate color="green.300" />
            </div>
          )}
          {dummyData  &&  !serverdown && (
            <div className="w-full h-full ">
            {/* stability */}
            {dummyData?.stability && (
              <ReportCommonContainer
                name={"Stability"}
                piechartdata={stabilityPieData}
                labelData={stabilityPielabels}
                barGraphName1={"> 80%"}
                barGraphName2={"< 60%"}
                barGraphName3={"60% to 80%"}
                appendValue={"%"}
                barGraphData1={stabilityBarData}
                barGraphData2={stabilityBarData1}
                barGraphData3={stabilityBarData2}
                timeRange={stabilityTimeRange}
              />
            )}
      
            {/* thermal stability */}
            {dummyData?.thermal && (
              <ReportCommonContainer
                name={"Thermal Stability"}
                piechartdata={thermalPieData}
                labelData={thermalPielabels}
                barGraphName1={"-3 to 10"}
                barGraphName2={"< -3"}
                barGraphName3={"> 10"}
                appendValue={""}
                barGraphData1={thermalBarData}
                barGraphData2={thermalBarData1}
                barGraphData3={thermalBarData2}
                timeRange={thermalTimeRange}
              />
            )}
      
            {/* Pwi */}
            {dummyData?.pwi && (
              <ReportCommonContainer
                name={"PWI"}
                piechartdata={pwiPieData}
                labelData={pwiPielabels}
                barGraphName1={"In Range"}
                barGraphName2={"Low"}
                barGraphName3={"High"}
                appendValue={""}
                barGraphData1={pwiBarData}
                barGraphData2={pwiBarData1}
                barGraphData3={pwiBarData2}
                timeRange={pwiTimeRange}
              />
            )}
      
            {/* hot metal */}
            {dummyData?.hotmetal && (
              <ReportCommonContainer
                name={"Hot Metal"}
                piechartdata={hotmetalPieData}
                labelData={hotmetalPielabels}
                barGraphName1={"In Range"}
                barGraphName2={"Low"}
                barGraphName3={"High"}
                appendValue={""}
                barGraphData1={hotmetalBarData}
                barGraphData2={hotmetalBarData1}
                barGraphData3={hotmetalBarData2}
                timeRange={hotmetalTimeRange}
              />
            )}
      {/* report compare chart */}
            <div className="flex gap-6 text-[#49454F] text-xs lg:text-base min-w-[445px] p-2 border-2 rounded-[10px]">
              <div
                className={`p-3 flex items-center gap-1 ${
                  selectedBasis == 0 ? "bg-[#e7effb] rounded-xl" : "bg-white"
                }`}
              >
                <input
                  value={0}
                  onChange={(e) => {
                    setSelectedBasis(e.target.value);
                    setSelectedCategory("Stability");
                    setSelectedCategoryBar(stabilityBarData);
                  }}
                  type="radio"
                  name="freq"
                  checked={selectedBasis == 0}
                  className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                />
                <p>Stability</p>
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
                    setSelectedCategory("Thermal Stability");
                    setSelectedCategoryBar(thermalBarData);
                  }}
                  type="radio"
                  name="freq"
                  checked={selectedBasis == 1}
                  className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                />
                <p>Thermal Stability</p>
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
                    setSelectedCategory("PWI");
                    setSelectedCategoryBar(pwiBarData);
                  }}
                  type="radio"
                  name="freq"
                  checked={selectedBasis == 2}
                  className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                />
                <p>PWI</p>
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
                    setSelectedCategory("Hot Metal");
                    setSelectedCategoryBar(hotmetalBarData);
                  }}
                  type="radio"
                  name="freq"
                  checked={selectedBasis == 3}
                  className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
                />
                <p>Hot Metal</p>
              </div>
            </div>
      
            <div className="w-full h-[380px] p-2 flex gap-2  overflow-x-auto mb-[10px]">
              <ReportCompareContainer
                name={"Fuel"}
                lineData={fuelLineData}
                timeRange={fuelTimeRange}
                appendValue="%"
                selectedCategory={selectedCategory}
                selectedCategoryBar={selectedCategoryBar}
              />
              <ReportCompareContainer
                name={"Production"}
                lineData={prodLineData}
                timeRange={prodTimeRange}
                appendValue="%"
                selectedCategory={selectedCategory}
                selectedCategoryBar={selectedCategoryBar}
              />
            </div>
          </div>
           
          )}
     
      
    </div>
  );
};

export default ReportBf;
