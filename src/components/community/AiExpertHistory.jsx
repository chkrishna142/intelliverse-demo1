import React, { useState, useEffect, useRef, useContext } from "react";
import { Select, Spinner } from "@chakra-ui/react";
import TransactionTable from "./TransactionTable";
import ReadMore from "./ReadMore";
import ExpertHistoryTable from "./ExpertHistoryTable";
import DownloadExcel from "./DownloadExcel";
import FloatingInput from "../../util/VisionUtils/FloatingInput";
import Paginator from "../../util/VisionUtils/Paginator";

const AiExpertHistory = () => {
  const [tableData, setTAbledata] = useState([
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation  can we take to reduce our environmental impact and comply with regulation  ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental What steps can we take to reduce our environmental impact and comply with regulation  can we take t impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Active",
    },
    {
      transactionType:
        "What steps can we take to reduce our What steps can we take to reduce our environmental impact and comply with regulation  can we take t environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation  can we take to reduce our environmental impact and comply with regulation  ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental What steps can we take to reduce our environmental impact and comply with regulation  can we take t impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Active",
    },
    {
      transactionType:
        "What steps can we take to reduce our What steps can we take to reduce our environmental impact and comply with regulation  can we take t environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation  can we take to reduce our environmental impact and comply with regulation  ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental What steps can we take to reduce our environmental impact and comply with regulation  can we take t impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Active",
    },
    {
      transactionType:
        "What steps can we take to reduce our What steps can we take to reduce our environmental impact and comply with regulation  can we take t environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation  can we take to reduce our environmental impact and comply with regulation  ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental What steps can we take to reduce our environmental impact and comply with regulation  can we take t impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Active",
    },
    {
      transactionType:
        "What steps can we take to reduce our What steps can we take to reduce our environmental impact and comply with regulation  can we take t environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation  can we take to reduce our environmental impact and comply with regulation  ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental What steps can we take to reduce our environmental impact and comply with regulation  can we take t impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Active",
    },
    {
      transactionType:
        "What steps can we take to reduce our What steps can we take to reduce our environmental impact and comply with regulation  can we take t environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation  can we take to reduce our environmental impact and comply with regulation  ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental What steps can we take to reduce our environmental impact and comply with regulation  can we take t impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Active",
    },
    {
      transactionType:
        "What steps can we take to reduce our What steps can we take to reduce our environmental impact and comply with regulation  can we take t environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation  can we take to reduce our environmental impact and comply with regulation  ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental What steps can we take to reduce our environmental impact and comply with regulation  can we take t impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Active",
    },
    {
      transactionType:
        "What steps can we take to reduce our What steps can we take to reduce our environmental impact and comply with regulation  can we take t environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation  can we take to reduce our environmental impact and comply with regulation  ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental What steps can we take to reduce our environmental impact and comply with regulation  can we take t impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Active",
    },
    {
      transactionType:
        "What steps can we take to reduce our What steps can we take to reduce our environmental impact and comply with regulation  can we take t environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation  can we take to reduce our environmental impact and comply with regulation  ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "New",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Active",
    },
    {
      transactionType:
        "What steps can we take to reduce our environmental impact and comply with regulation ?",
      enquirer: "Sudhanshu Kumar",

      date: "15 Nov 2023",
      time: "12:30 pm",
      status: "Answered",
    },
  ]);
  const [selectedRange, setSelectedRange] = useState(0);

  const [stateChanging, setStateChanging] = useState(false);
  const [changingbutton, setChangingbutton] = useState(0);

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

  const handleRangeSelect = (e) => {
    setSelectedRange(e.target.value);
    // for 7 days e=0
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
    // for this month e=1
    if (e.target.value == 1) {
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
    // for this quarter e=2
    if (e.target.value == 2) {
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
    // for previous quarter e=3
    if (e.target.value == 3) {
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
    // for this year e=4
    if (e.target.value == 4) {
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

  return (
    <div className="mt-[3vh] flex flex-col w-full gap-2">
      <div className="w-full flex gap-[8px]">
        <p className="text-[20px] sm:text-[20px] font-semibold text-[#024D87]">
          History
        </p>
      </div>
      {/* bottom white background part */}
      <div className="flex flex-col w-full h-full gap-[18px]  bg-white p-4 rounded-xl   ">
        <div className="w-full flex justify-between h-10 p-0 items-center">
          <p className="text-[#605D64] text-[18px] font-medium">Expert view</p>
          <div className="flex gap-2">
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
                  key="This Month"
                  value={1}
                  className="bg-white hover:bg-blue-200"
                >
                  This Month
                </option>
                <option
                  key="This Quarter"
                  value={2}
                  className="bg-white hover:bg-blue-200"
                >
                  This Quarter
                </option>
                <option
                  key="Previous Quarter"
                  value={3}
                  className="bg-white hover:bg-blue-200"
                >
                  Previous Quarter
                </option>
                <option
                  key="This Year"
                  value={4}
                  className="bg-white hover:bg-blue-200"
                >
                  This Year
                </option>
                <option
                  key="custom"
                  value={5}
                  className="bg-white hover:bg-blue-200"
                >
                  Custom
                </option>
              </Select>
            </div>
            {selectedRange == 5 && (
              <div className="w-[300px] gap-2 flex justify-end">
                <div className="min-w-[110px]">
                  <FloatingInput
                    text="From"
                    type="date"
                    setDateTime={setFromTime}
                    value={fromTime}
                  />
                </div>

                <div className="min-w-[110px]">
                  <FloatingInput
                    text="To"
                    type="date"
                    setDateTime={setToTime}
                    value={toTime}
                  />
                </div>
              </div>
            )}

            <button
              className="text-center py-2 px-4 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-full min-w-[80px]"
              onClick={handleClick}
            >
              Apply
            </button>
          </div>
        </div>

        <div className="w-full flex justify-evenly">
          {/* new querries */}
          <div className="w-[380px] p-0 flex h-full rounded-lg ">
            <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#FFFFC4] rounded-tl-lg  rounded-bl-lg">
              <img src="/advisor/yellowques.svg" alt="" />
            </div>
            <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[14px] ">New queries</p>
            </div>
          </div>
          {/* active querries */}
          <div className="w-[380px] p-0 flex h-full rounded-lg ">
            <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#CDEEBF] rounded-tl-lg  rounded-bl-lg">
              <img src="/advisor/greenques.svg" alt="" />
            </div>
            <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[14px] ">Active queries</p>
            </div>
          </div>
          {/* answered queries */}

          <div className="w-[380px] p-0 flex h-full rounded-lg ">
            <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#CBE3FB] rounded-tl-lg  rounded-bl-lg">
              <img src="/advisor/blueques.svg" alt="" />
            </div>
            <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[14px] ">Answered queries</p>
            </div>
          </div>
        </div>

        <div className="w-full h-[60px] flex justify-between p-1">
          {/* filter button */}
          <div className=" w-[400px]  flex gap-3 justify-start p-1">
            <button
              className={`w-[60px] flex justify-center items-center ${
                changingbutton == 0
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-2xl px-[16px] py-[8px] `}
              onClick={() => {
                setChangingbutton(0);
              }}
            >
              <p className="text-[#605D64]">All</p>
            </button>
            <button
              className={`w-[80px] flex justify-center items-center ${
                changingbutton == 1
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-2xl px-[16px] py-[8px] `}
              onClick={() => {
                setChangingbutton(1);
              }}
            >
              <p className="text-[#605D64]">New</p>
            </button>
            <button
              className={`w-[80px] flex justify-center items-center ${
                changingbutton == 2
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-2xl px-[16px] py-[8px] `}
              onClick={() => {
                setChangingbutton(2);
              }}
            >
              <p className="text-[#605D64]">Active</p>
            </button>
            <button
              className={`w-[100px] flex justify-center items-center ${
                changingbutton == 3
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-2xl px-[16px] py-[8px] `}
              onClick={() => {
                setChangingbutton(3);
              }}
            >
              <p className="text-[#605D64]"> Answered</p>
            </button>
          </div>
          {/* paginator */}
          <div className="w-[400px]  flex justify-evenly items-center p-2">
            <DownloadExcel data={tableData} />
            <div className="flex justify-end gap-3 ">
              {tableData && (
                <Paginator
                  data={tableData}
                  limit={15}
                  setDisplayData={setDisplayData}
                />
              )}
            </div>
          </div>
        </div>

        <div>
          <ExpertHistoryTable tableData={displayData} />
        </div>
      </div>
    </div>
  );
};

export default AiExpertHistory;
