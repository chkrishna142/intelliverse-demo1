import React, { useEffect, useState } from "react";
import Linechart from "../../Charts/BF_Charts/Linechart";
import BurdenDistributionChart from "../../Charts/BF_Charts/BurdenDistributionChart";
import BottomIndicator from "../BF_Components/BottomIndicator";
import Mymodal from "../BF_Components/Mymodal";
import { useWindowSize } from "@uidotdev/usehooks";
import RecommendationTable from "../../Charts/BF_Charts/RecommendationTable";
import { BASE_URL_FOR_BF, clientIdbf } from "../BF_Components/urlforbf";
import FeedbackBf from "../BF_Components/FeedbackBf";

// import Linechart from "../Charts/Linechart";
// import BurdenDistributionChart from "../Charts/BurdenDistributionChart";
// import BottomIndicator from "../Charts/BottomIndicator";

function Recommendations({
  isExpanded4,
  handleToggle4,
  recommendationFetcheddata,
  client,
  timeForChart,
  actualRatioChartData,
  minoptiomalChartValue,
  maxoptiomalChartValue,
  callApi,
  setParentSnooze,
}) {
  const size = useWindowSize();

  const [recommendForMatrix, setRecommendForMatrix] = useState();
  const [recommendForMatrixfail, setRecommendForMatrixfail] = useState(false);
  const [feedback, setFeedback] = useState(true);

  const raftLineChart = {
    series: [
      {
        name: "Actual Ratio",
        data: actualRatioChartData,
        // [10.8, 10.6, 10.4, 10.2, 10, 9.2, 9.8],
      },
    ],

    options: {
      // ... (other options you have defined)

      chart: {
        // height: 250,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },

      stroke: {
        curve: "smooth",
      },

      grid: {
        borderColor: "#e7e7e7",
        strokeDashArray: 5,
        // padding: {
        //   top: 0,
        //   right: 10,
        //   bottom: 0,
        //   left: 20,
        // },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: timeForChart,
        //  [
        //   "10 Aug 11:00 ",
        //   "10 Aug 15:00",
        //   "10 Aug 19:00",
        //   "10 Aug 23:00",
        //   "10 Aug 3:00",
        //   "10 Aug 07:00",
        //   "10 Aug 11:00",
        // ],
        // title: {
        //   text: "Month",
        // },
        tickAmount: 7,
        labels: {
          show: true,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: true,
          style: {
            colors: [],
            fontSize: "9px",
            fontWeight: 300,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        tickPlacement: "on",
      },

      yaxis: {
        // title: {
        //   text: "Temperature",
        // },
        min:
          Math.min(
            ...recommendationFetcheddata.values,
            recommendationFetcheddata.optimal_range[0]
          ) - 0.03,
        max:
          Math.max(
            ...recommendationFetcheddata.values,
            recommendationFetcheddata.optimal_range[1]
          ) + 0.03,

        tickAmount: 4,
      },

      colors: ["#6CA6FC", "#69B04B"], // Set the colors for the first and second series
      dataLabels: {
        enabled: [true, false], // Enable for Series 1, disable for Series 2
        enabledOnSeries: [0],
        style: {
          fontSize: 14,
          colors: ["#EDF4FE"],
        },
        background: {
          enabled: true,
          foreColor: "#6CA6FC",
        },
      },
      stroke: {
        curve: "straight",
        width: [1, 2],
        // width: [1, 3, 3, 1],
        dashArray: [0, 6],
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },

      // Adding the annotations for y-axis range
      annotations: {
        yaxis: [
          {
            y: minoptiomalChartValue,
            y2: maxoptiomalChartValue,
            borderColor: "#000",
            fillColor: "rgba(105, 176, 75, 0.16)",
            label: {
              text: "Y-axis range",
            },
          },
        ],
      },
    },
  };

  const hotMetalChart = {
    series: [
      {
        name: "Actual Ratio",
        data: recommendationFetcheddata.hot_metal_data.values,
        // [10.8, 10.6, 10.4, 10.2, 10, 9.2, 9.8],
      },
    ],

    options: {
      // ... (other options you have defined)

      chart: {
        // height: 250,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },

      stroke: {
        curve: "smooth",
      },

      grid: {
        borderColor: "#e7e7e7",
        strokeDashArray: 5,
        // padding: {
        //   top: 0,
        //   right: 10,
        //   bottom: 0,
        //   left: 20,
        // },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: recommendationFetcheddata.hot_metal_data.times,
        //  [
        //   "10 Aug 11:00 ",
        //   "10 Aug 15:00",
        //   "10 Aug 19:00",
        //   "10 Aug 23:00",
        //   "10 Aug 3:00",
        //   "10 Aug 07:00",
        //   "10 Aug 11:00",
        // ],
        // title: {
        //   text: "Month",
        // },
        tickAmount: 7,
        labels: {
          show: true,
          hideOverlappingLabels: true,
          showDuplicates: false,
          trim: true,
          style: {
            colors: [],
            fontSize: "9px",
            fontWeight: 300,
            cssClass: "apexcharts-xaxis-label",
          },
        },
        tickPlacement: "on",
      },

      yaxis: {
        // title: {
        //   text: "Temperature",
        // },
        min:
          Math.min(
            ...recommendationFetcheddata.hot_metal_data.values,
            recommendationFetcheddata.hot_metal_data.optimal_range[0]
          ) - 2,
        max:
          Math.max(
            ...recommendationFetcheddata.hot_metal_data.values,
            recommendationFetcheddata.hot_metal_data.optimal_range[1]
          ) + 2,
        tickAmount: 5,
      },

      colors: ["#6CA6FC", "#69B04B"], // Set the colors for the first and second series
      dataLabels: {
        enabled: [true, false], // Enable for Series 1, disable for Series 2
        enabledOnSeries: [0],
        style: {
          fontSize: 14,
          colors: ["#EDF4FE"],
        },
        background: {
          enabled: true,
          foreColor: "#6CA6FC",
        },
      },
      stroke: {
        curve: "straight",
        width: [1, 2],
        // width: [1, 3, 3, 1],
        dashArray: [0, 6],
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },

      // Adding the annotations for y-axis range
      annotations: {
        yaxis: [
          {
            y: recommendationFetcheddata.hot_metal_data.optimal_range[0],
            y2: recommendationFetcheddata.hot_metal_data.optimal_range[1],
            borderColor: "#000",
            fillColor: "rgba(105, 176, 75, 0.16)",
            label: {
              text: "Y-axis range",
            },
          },
        ],
      },
    },
  };

  const apicall = async () => {
    try {
      const response = await fetch(
        ` ${BASE_URL_FOR_BF}/recommendations/?client_id=${clientIdbf}`
      );
      const json = await response.json();
      // console.log("fetched data of recomm===>>>", json);
      setRecommendForMatrix(json);
      setRecommendForMatrixfail(false);
    } catch (error) {
      setRecommendForMatrixfail(true);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // apicall();
  }, [callApi,feedback]);

  const raftLineChart24hrsrolling =
    recommendForMatrix?.rolling_means.last_24hrs.pwi.toFixed(2);
  const raftLineChart8hrsrolling =
    recommendForMatrix?.rolling_means.last_8hrs.pwi.toFixed(2);
  const raftLineChart1hrsrolling =
    recommendForMatrix?.rolling_means.last_1hrs.pwi.toFixed(2);
  const raftLineChartCurrentrolling =
    recommendForMatrix?.rolling_means.current.pwi.toFixed(2);

  const hotmetalOptimalMin =
    recommendationFetcheddata.hot_metal_data.optimal_range[0];
  const hotmetalOptimalMax =
    recommendationFetcheddata.hot_metal_data.optimal_range[1];

  const hotMetalChart24hrsrolling =
    recommendForMatrix?.rolling_means.last_24hrs.hot_metal.toFixed(1);
  const hotMetalChart8hrsrolling =
    recommendForMatrix?.rolling_means.last_8hrs.hot_metal.toFixed(1);
  const hotMetalChart1hrsrolling =
    recommendForMatrix?.rolling_means.last_1hrs.hot_metal.toFixed(1);
  const hotMetalChartCurrentrolling =
    recommendForMatrix?.rolling_means.current.hot_metal.toFixed(1);

  const snooze = recommendForMatrix?.snooze;
  setParentSnooze(recommendForMatrix?.snooze);
  // const snooze = false;


  return (
    <div className="flex flex-col w-full h-full bg-white p-4 rounded-xl  shadow-md ">
      {/* top */}
      <div class="flex justify-between w-full ">
        <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
          <div className="flex items-center gap-[8px]">
            {" "}
            <div class=" font-roboto text-[22px] text-[#DC362E] font-medium">
              <p className="!text-base  sm:!text-base md:!text-base lg:!text-[24px]  font-semibold">
                Recommendations
              </p>
            </div>
            <div className="">
              <Mymodal
                imageone={"/Bficons/recomendationTop.svg"}
                imageTwo={"/Bficons/recomendationBottom.svg"}
              />
            </div>
          </div>
        </div>
        <div onClick={handleToggle4}>
          <img src="/dropicon.svg" alt="" />
        </div>
      </div>
      {/* bottom */}
      {isExpanded4 && (
        <div className={`flex gap-[18px] h-auto w-full  `}>
          <div
            className={`flex-1 flex flex-col gap-[18px]  h-auto  w-[1200px] overflow-x-auto`}
          >
            {/* RAFT/Tuyere Velocity Trend*/}
            <div className="flex gap-[18px] items-center">
              <div class="flex-1 flex flex-col w-[420px] h-full p-4  gap-3 items-center  bg-white  rounded-xl  ">
                {/* top*/}
                <div class="w-full">
                  <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
                    <div className="flex items-center gap-[8px]">
                      {" "}
                      <div class=" font-roboto text-[22px] text-[#605D64] font-medium">
                        <p class="text-[18px] text-left  w-full font-semibold text-[#3E3C42]">
                          Peripheral Working Index
                        </p>
                      </div>
                      <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
                    </div>
                    <div
                      className={`flex items-start gap-[2%] w-[80%]  ${
                        size.width <= 768 ? "flex-col" : ""
                      }`}
                    >
                      {/* svg legends */}
                      <div
                        className={`flex   gap-[2px] items-center justify-center`}
                      >
                        <div className="flex gap-[2px] ">
                          <img src="/darkbluedot.svg" alt="" />
                        </div>
                        <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                          {" "}
                          Actual
                        </div>
                      </div>
                      <div className="flex gap-[2px] ">
                        <div>
                          <img src="/lightgreendot.svg" alt="" />
                        </div>
                        <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                          Optimal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full h-[300px] ">
                  <Linechart chart={raftLineChart} />
                </div>
                {/* rolling */}
                {recommendForMatrixfail ? (
                  <div className="w-full h-[50px] mt-[50px] bg-red-100 rounded-md flex items-center justify-center text-[17px] font-bold">
                    Server Feed Down For Rolling
                  </div>
                ) : (
                  <div className="grid grid-cols-4 grid-rows-2 gap-2">
                    <div className="bg-blue-50 p-2 text-[13px] text-center font-semibold">
                      24Hrs Avg
                    </div>
                    <div className="bg-blue-50 p-2 text-[13px] text-center font-semibold">
                      8Hrs Avg
                    </div>
                    <div className="bg-blue-50 p-2 text-[13px] text-center font-semibold">
                      1Hrs Avg
                    </div>
                    <div className="bg-blue-50 p-2 text-[13px] text-center font-semibold">
                      Current
                    </div>
                    {/* 24hrs */}
                    {raftLineChart24hrsrolling < minoptiomalChartValue ? (
                      <div className="flex  border-[1px]  border-[#6CA6FC] p-2 bg-[#E2EDFE] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChart24hrsrolling}
                      </div>
                    ) : raftLineChart24hrsrolling >= minoptiomalChartValue &&
                      raftLineChart24hrsrolling <= maxoptiomalChartValue ? (
                      <div className="flex  border-[1px] border-[#69B04B] p-2 bg-[#CDEEBF66] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChart24hrsrolling}
                      </div>
                    ) : (
                      <div className="flex  border-[1px] border-[#EC928E] p-2 bg-[#F9DEDC] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChart24hrsrolling}
                      </div>
                    )}
                    {/* 8hrs */}
                    {raftLineChart8hrsrolling < minoptiomalChartValue ? (
                      <div className="flex  border-[1px]  border-[#6CA6FC] p-2 bg-[#E2EDFE] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChart8hrsrolling}
                      </div>
                    ) : raftLineChart8hrsrolling >= minoptiomalChartValue &&
                      raftLineChart8hrsrolling <= maxoptiomalChartValue ? (
                      <div className="flex  border-[1px] border-[#69B04B] p-2 bg-[#CDEEBF66] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChart8hrsrolling}
                      </div>
                    ) : (
                      <div className="flex  border-[1px] border-[#EC928E] p-2 bg-[#F9DEDC] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChart8hrsrolling}
                      </div>
                    )}
                    {/* 1hr */}
                    {raftLineChart1hrsrolling < minoptiomalChartValue ? (
                      <div className="flex  border-[1px]  border-[#6CA6FC] p-2 bg-[#E2EDFE] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChart1hrsrolling}
                      </div>
                    ) : raftLineChart1hrsrolling >= minoptiomalChartValue &&
                      raftLineChart1hrsrolling <= maxoptiomalChartValue ? (
                      <div className="flex  border-[1px] border-[#69B04B] p-2 bg-[#CDEEBF66] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChart1hrsrolling}
                      </div>
                    ) : (
                      <div className="flex  border-[1px] border-[#EC928E] p-2 bg-[#F9DEDC] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChart1hrsrolling}
                      </div>
                    )}
                    {/* current */}
                    {raftLineChartCurrentrolling < minoptiomalChartValue ? (
                      <div className="flex  border-[1px]  border-[#6CA6FC] p-2 bg-[#E2EDFE] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChartCurrentrolling}
                      </div>
                    ) : raftLineChartCurrentrolling >= minoptiomalChartValue &&
                      raftLineChartCurrentrolling <= maxoptiomalChartValue ? (
                      <div className="flex border-[1px] border-[#69B04B] p-2 bg-[#CDEEBF66] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChartCurrentrolling}
                      </div>
                    ) : (
                      <div className="flex  border-[1px] border-[#EC928E] p-2 bg-[#F9DEDC] text-[#605D64] justify-center items-center font-semibold ">
                        {raftLineChartCurrentrolling}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div class="flex-1 flex flex-col w-[420px] h-full p-4  gap-3 items-center  bg-white  rounded-xl  ">
                {/* top*/}
                <div class="w-full">
                  <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
                    <div className="flex items-center gap-[8px]">
                      {" "}
                      <div class=" font-roboto text-[22px] text-[#605D64] font-medium">
                        <p class="text-[18px] text-left  w-full font-semibold text-[#3E3C42]">
                          Hot Metal Temp
                        </p>
                      </div>
                      <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
                    </div>
                    <div
                      className={`flex items-start gap-[2%] w-[80%]  ${
                        size.width <= 768 ? "flex-col" : ""
                      }`}
                    >
                      {/* svg legends */}
                      <div
                        className={`flex   gap-[2px] items-center justify-center`}
                      >
                        <div className="flex gap-[2px] ">
                          <img src="/darkbluedot.svg" alt="" />
                        </div>
                        <div class="text-gray-600 mt-[-9px] text-center font-roboto text-xs font-normal leading-normal">
                          {" "}
                          Actual
                        </div>
                      </div>
                      <div className="flex gap-[2px] ">
                        <div>
                          <img src="/lightgreendot.svg" alt="" />
                        </div>
                        <div class="text-gray-600 text-center font-roboto text-xs font-normal leading-normal">
                          Optimal
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-full h-[300px] ">
                  <Linechart chart={hotMetalChart} />
                </div>

                {/* rolling */}
                {recommendForMatrixfail ? (
                  <div className="w-full h-[50px] mt-[50px] bg-red-100 rounded-md flex items-center justify-center text-[17px] font-bold">
                    Server Feed Down For Rolling
                  </div>
                ) : (
                  <div className="grid grid-cols-4 grid-rows-2 gap-2">
                    <div className="bg-blue-50 p-2 text-[13px] text-center font-semibold">
                      24Hrs Avg
                    </div>
                    <div className="bg-blue-50 p-2 text-[13px] text-center font-semibold">
                      8Hrs Avg
                    </div>
                    <div className="bg-blue-50 p-2 text-[13px] text-center font-semibold">
                      1Hrs Avg
                    </div>
                    <div className="bg-blue-50 p-2 text-[13px] text-center font-semibold">
                      Current
                    </div>
                    {/* 24hrs */}
                    {hotMetalChart24hrsrolling < hotmetalOptimalMin ? (
                      <div className="flex  border-[1px]  border-[#6CA6FC] p-2 bg-[#E2EDFE] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChart24hrsrolling}
                      </div>
                    ) : hotMetalChart24hrsrolling >= hotmetalOptimalMin &&
                      hotMetalChart24hrsrolling <= hotmetalOptimalMax ? (
                      <div className="flex  border-[1px] border-[#69B04B] p-2 bg-[#CDEEBF66] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChart24hrsrolling}
                      </div>
                    ) : (
                      <div className="flex  border-[1px] border-[#EC928E] p-2 bg-[#F9DEDC] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChart24hrsrolling}
                      </div>
                    )}
                    {/* 8hrs */}
                    {hotMetalChart8hrsrolling < hotmetalOptimalMin ? (
                      <div className="flex  border-[1px]  border-[#6CA6FC] p-2 bg-[#E2EDFE] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChart8hrsrolling}
                      </div>
                    ) : hotMetalChart8hrsrolling >= hotmetalOptimalMin &&
                      hotMetalChart8hrsrolling <= hotmetalOptimalMax ? (
                      <div className="flex  border-[1px] border-[#69B04B] p-2 bg-[#CDEEBF66] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChart8hrsrolling}
                      </div>
                    ) : (
                      <div className="flex  border-[1px] border-[#EC928E] p-2 bg-[#F9DEDC] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChart8hrsrolling}
                      </div>
                    )}
                    {/* 1hr */}
                    {hotMetalChart1hrsrolling < hotmetalOptimalMin ? (
                      <div className="flex  border-[1px]  border-[#6CA6FC] p-2 bg-[#E2EDFE] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChart1hrsrolling}
                      </div>
                    ) : hotMetalChart1hrsrolling >= hotmetalOptimalMin &&
                      hotMetalChart1hrsrolling <= hotmetalOptimalMax ? (
                      <div className="flex  border-[1px] border-[#69B04B] p-2 bg-[#CDEEBF66] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChart1hrsrolling}
                      </div>
                    ) : (
                      <div className="flex  border-[1px] border-[#EC928E] p-2 bg-[#F9DEDC] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChart1hrsrolling}
                      </div>
                    )}
                    {/* current */}
                    {hotMetalChartCurrentrolling < hotmetalOptimalMin ? (
                      <div className="flex  border-[1px]  border-[#6CA6FC] p-2 bg-[#E2EDFE] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChartCurrentrolling}
                      </div>
                    ) : hotMetalChartCurrentrolling >= hotmetalOptimalMin &&
                      hotMetalChartCurrentrolling <= hotmetalOptimalMax ? (
                      <div className="flex border-[1px] border-[#69B04B] p-2 bg-[#CDEEBF66] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChartCurrentrolling}
                      </div>
                    ) : (
                      <div className="flex  border-[1px] border-[#EC928E] p-2 bg-[#F9DEDC] text-[#605D64] justify-center items-center font-semibold ">
                        {hotMetalChartCurrentrolling}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 self-start w-[80%]">
              <RecommendationTable data={recommendForMatrix} />
            </div>

            <div className="flex gap-[18px] p-4 items-center">
              <div className="flex-1 flex flex-col gap-2 text-black text-xl items-center">
                <p className="font-semibold">Recommendation</p>
                {snooze ? (
                  <div
                    className={`text-[#FAFAFA] text-[16px]  font-bold bg-[#6CA6FC] font-poppins w-full h-auto p-4 flex items-center justify-center  rounded-xl `}
                  >
                    <p
                      className={`text-text-[#605D64] !text-base sm:!text-base font-bold`}
                    >
                      Action Taken Monitoring For Impact
                    </p>
                  </div>
                ) : (
                  <div
                    className={`text-[#FAFAFA] text-[16px]  font-bold bg-[${
                      recommendForMatrix?.recommendation ==
                      "Optimized Functioning"
                        ? "#69B04B"
                        : "#DC362E"
                    }] font-poppins w-full h-auto p-4 flex items-center justify-center  rounded-xl `}
                  >
                    <div className="w-full ">
                      <p
                        className={`text-white  !text-base sm:!text-base font-bold`}
                      >
                        {recommendForMatrix?.recommendation}
                      </p>
                    </div>
                    <div className="w-[70px]  flex justify-between">
                      <FeedbackBf name={"tick"} setFeedback={setFeedback} feedback={feedback}  recommendation={recommendForMatrix?.recommendation} idx={recommendForMatrix?.id}/>
                      <FeedbackBf name={"cross"} setFeedback={setFeedback} feedback={feedback} recommendation={recommendForMatrix?.recommendation} idx={recommendForMatrix?.id}/>
                      {/* <div
                        className="bg-white rounded-md cursor-pointer"
                        onClick={() => {
                          setFeedback(true);
                        }}
                      >
                        <img src="/Bficons/tickMark.svg" alt="tick" />
                      </div>
                      <div
                        className="bg-white rounded-md cursor-pointer"
                        onClick={() => {
                          setFeedback(false);
                        }}
                      >
                        <img src="/Bficons/crossMark.svg" alt="cross" />
                      </div> */}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Burden distribution ore-coke ratio */}
            <div
              class={`self-center p-4 w-full h-[100%] opacity-${
                recommendForMatrix?.show_burden ? "100" : "0"
              } transition-all ease-in duration-300`}
            >
              {/* top */}
              <div class="w-full">
                <div class="flex flex-col items-start justify-center gap-[12px] w-[572px]">
                  <div className="flex items-center gap-[8px]">
                    {" "}
                    <div class=" font-roboto text-[22px] text-[#605D64] font-medium">
                      <p className="!text-base  sm:!text-base md:!text-base lg:!text-[22px] ">
                        Burden Distribution
                      </p>
                    </div>
                    <div class="text-neutral-n-80 text-[#CAC5CD] font-roboto text-[16px] font-normal leading-normal"></div>
                  </div>
                </div>
              </div>
              {/* chart */}
              <div class="w-full ">
                <BurdenDistributionChart
                  m_i={recommendationFetcheddata.m_i}
                  // m_i={"P4"}

                  m_r1={recommendationFetcheddata.m_r1}
                  // m_r1={"P4"}

                  m_r2={recommendationFetcheddata.m_r2}
                  // m_r2={"P4"}

                  fetcheddata={recommendationFetcheddata.burden}
                  recommendation={recommendForMatrix?.recommendation}
                />
              </div>
              <div class="w-full mt-[50px]">{/* <BottomIndicator/> */}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
