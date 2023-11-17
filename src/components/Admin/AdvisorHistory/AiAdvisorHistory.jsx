import React, { useState, useEffect, useRef, useContext } from "react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { Spinner } from "@chakra-ui/react";
import Bargraph from "../../Charts/Admin/Bargraph";
import TransactionTable from "./TransactionTable";
import ReadMore from "./ReadMore";
import Paginator from "../../../util/VisionUtils/Paginator";
import { useWindowSize } from "@uidotdev/usehooks";

const AiAdvisorHistory = () => {
  const size = useWindowSize();
  const [tableData, setTAbleData] = useState([
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      summary: "Sustainable steel production practices",
      tokenUsed: 1,
    },
    {
      date: "14 Nov 2023",
      time: "01:30 pm",
      summary: "Sustainable steel production practices 2",
      tokenUsed: 2,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      summary: "Sustainable steel production practices",
      tokenUsed: 1,
    },
    {
      date: "14 Nov 2023",
      time: "01:30 pm",
      summary: "Sustainable steel production practices 2",
      tokenUsed: 2,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      summary: "Sustainable steel production practices",
      tokenUsed: 1,
    },
    {
      date: "14 Nov 2023",
      time: "01:30 pm",
      summary: "Sustainable steel production practices 2",
      tokenUsed: 2,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      summary: "Sustainable steel production practices",
      tokenUsed: 1,
    },
    {
      date: "14 Nov 2023",
      time: "01:30 pm",
      summary: "Sustainable steel production practices 2",
      tokenUsed: 2,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      summary: "Sustainable steel production practices",
      tokenUsed: 1,
    },
    {
      date: "14 Nov 2023",
      time: "01:30 pm",
      summary: "Sustainable steel production practices 2",
      tokenUsed: 2,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      summary: "Sustainable steel production practices",
      tokenUsed: 1,
    },
    {
      date: "14 Nov 2023",
      time: "01:30 pm",
      summary: "Sustainable steel production practices 2",
      tokenUsed: 2,
    },
  ]);

  const [stateChanging, setStateChanging] = useState(false);

  const [homebadge, setHomebadge] = useState({
    badgeLogo: "/advisor/batchok.svg",
    badgeTag: "Proficient Inquirer",
  });

  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  const handleClick = () => {
    setStateChanging(false);
    // apiCall();
  };

  const series = [
    {
      name: "Passed",
      type: "column",
      data: [10, 20, 10, 11, 12, 15, 16],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: false,
      // stackType: "100%",

      toolbar: {
        show: false,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          // reset: true | '<img src="/static/icons/reset.png" width="20">',
          reset: false,
        },

        // autoSelected: "zoom",
      },
    },
    stroke: {
      width: [0, 0, 0],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    colors: ["#CDEEBF", "#EF6F12", "#6CA6FC"],

    // fill: {
    //   opacity: [0.8, 0.8, 0.8],
    //   gradient: {
    //     inverseColors: false,
    //     shade: "light",
    //     type: "vertical",
    //     opacityFrom: 0.85,
    //     opacityTo: 0.55,
    //     stops: [0, 100, 100, 100],
    //   },
    // },

    markers: {
      size: 0,
    },
    xaxis: {
      type: "category",
      categories: [
        "01/01/2003",
        "02/01/2003",
        "03/01/2003",
        "04/01/2003",
        "05/01/2003",
        "06/01/2003",
        "07/01/2003",
      ],
      labels: {
        show: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: true,
        style: {
          fontSize: "12px",
          fontWeight: 300,
          cssClass: "apexcharts-xaxis-label",
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    grid: {
      strokeDashArray: 5,
    },
    yaxis: {
      tickAmount: 4,
      // labels: {
      //   formatter: function (y) {
      //     return y + "%";
      //   },
      // },
    },
  };
  const [displayData, setDisplayData] = useState([]);

  const totalTokenUsed = tableData?.reduce(
    (total, item) => total + item.tokenUsed,
    0
  );

  return (
    <div className="mt-[3vh] w-full flex flex-col gap-1">
      <div className="w-full flex gap-[8px]">
        <img src="/backtick.svg" alt="" />
        <p className="text-[20px] sm:text-[20px] font-semibold text-[#024D87]">
          Question history
        </p>
      </div>
      {/* bottom white background part */}
      <div className="flex flex-col w-full h-full gap-[8px]  bg-white p-4 rounded-xl   ">
        {/* batch */}
        <div
          className={`flex  ${
            size.width < 768 ? "lex-col" : "flex-row"
          } f justify-between w-full rounded-sm`}
          style={{
            boxShadow:
              "4px 4px 12px 0px rgba(0, 0, 0, 0.10), -4px -4px 12px 0px rgba(0, 0, 0, 0.10)",
          }}
        >
          {/* batch pic */}
          <div className="flex gap-2">
            <div
              className={`flex p-5  ${
                size.width < 768 ? "h-full w-full" : "h-[150px] w-[180px]"
              } bg-[#00cefe] bg-opacity-10`}
            >
              <img src={homebadge.badgeLogo} alt="Badge" />
            </div>
            <div className="flex flex-col p-2 w-full">
              <p
                className={`text-[#605D64] ${
                  size.width < 768 ? " text-[14px]" : " text-[20px]"
                }`}
              >
                Congratulations! You are now a{" "}
                <span className="font-semibold ">{homebadge.badgeTag}</span>
              </p>
              <ReadMore setHomebadge={setHomebadge} />
              {size.width < 768 && (
                <div className=" p-2 flex justify-end mt-[15px]">
                  <div className="flex justify-center gap-2 w-[230px] p-[8px] bg-[#FFFFD8] text-[16px]">
                    <p className="text-[#605D64]">Current Balance</p>
                    <div className="flex gap-1">
                      <p className="text-[#3E3C42] font-semibold ">2000</p>
                      {/* coin icons */}
                      <img src="/token.svg" alt="coins" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* current balance */}
          {size.width >= 768 && (
            <div className=" p-4">
              <div className="flex justify-center gap-2 w-[230px] p-[8px] bg-[#FFFFD8] text-[16px]">
                <p className="text-[#605D64]">Current Balance</p>
                <div className="flex gap-1">
                  <p className="text-[#3E3C42] font-semibold ">2000</p>
                  {/* coin icons */}
                  <img src="/token.svg" alt="coins" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* date picker */}
        <div className="p-2  gap-3 flex flex-col md:flex-row items-center justify-center md:justify-start">
          <div className="w-[350px] flex gap-2 justify-center">
            <div className="">
              <FloatingInput
                text="From"
                type="date"
                setDateTime={setFromTime}
                value={fromTime}
              />
            </div>
            <div>
              <FloatingInput
                text="To"
                type="date"
                setDateTime={setToTime}
                value={toTime}
              />
            </div>
          </div>
          <button
            className="text-center px-[16px] py-[10px] text-white text-xs md:text-base font-medium bg-[#084298] rounded-lg"
            onClick={handleClick}
          >
            {stateChanging ? <Spinner /> : "Show"}
          </button>
        </div>

        {/* graph and reports */}

        <div className="w-full flex gap-[25px] ">
          {/* report */}
          <div
            className={`flex ${
              size.width < 768 ? "flex-col" : "flex-row"
            }  w-full gap-[20px] h-full`}
          >
            <div
              className={` ${
                size.width < 768 ? "w-full" : "w-[80%]"
              } p-2 h-full`}
            >
              <p className="text-[#79767D] bg-[#f2f5f9] px-[16px] py-[8px] flex justify-center text-[14px] font-medium ">
                Queries resolved using AI advisor
              </p>
              <p className="flex justify-center bg-[#FAFAFA] text-[#3E3C42] text-[18px] px-[16px] py-[8px]">
                {tableData.length}
              </p>
            </div>
            <div
              className={` ${
                size.width < 768 ? "w-full" : "w-[80%]"
              } p-2 h-full`}
            >
              <p className="text-[#79767D] bg-[#f2f5f9] px-[16px] py-[8px] flex justify-center text-[14px] font-medium ">
                Tokens used
              </p>

              <p className="flex items-center gap-1 justify-center bg-[#FAFAFA] text-[#3E3C42] text-[18px] px-[16px] py-[8px] text-center">
                {totalTokenUsed}
                <span className="">
                  {" "}
                  <img src="/token.svg" alt="coins" />
                </span>
              </p>
            </div>
          </div>
          {/* paginator */}
          {size.width >= 768 && (
            <div className="w-[200px]  flex justify-end items-end">
              <Paginator
                data={tableData}
                limit={15}
                setDisplayData={setDisplayData}
              />
            </div>
          )}
        </div>

        {size.width < 768 && (
          <div className="w-full flex justify-end">
            <div className="w-[200px]  flex justify-end items-end">
              <Paginator
                data={tableData}
                limit={15}
                setDisplayData={setDisplayData}
              />
            </div>
          </div>
        )}

        <div className="w-full">
          <TransactionTable tableData={displayData} />
        </div>
      </div>
    </div>
  );
};

export default AiAdvisorHistory;
