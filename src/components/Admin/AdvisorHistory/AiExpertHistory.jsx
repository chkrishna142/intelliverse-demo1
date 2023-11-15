import React, { useState, useEffect, useRef, useContext } from "react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { Spinner } from "@chakra-ui/react";
import Bargraph from "../../Charts/Admin/Bargraph";
import TransactionTable from "./TransactionTable";
import ReadMore from "./ReadMore";

const AiExpertHistory = () => {
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

  return (
    <div className="mt-[3vh] flex flex-col w-full gap-2">
      <div className="w-full flex gap-[8px]">
        <p className="text-[20px] sm:text-[20px] font-semibold text-[#024D87]">
          History
        </p>
      </div>
      {/* bottom white background part */}
      <div className="flex flex-col w-full h-full gap-[14px]  bg-white p-4 rounded-xl   ">
        <div className="w-full flex justify-between h-10 p-2">
          <p className="text-[#605D64] text-[18px] font-medium">Expert view</p>
          <div>select</div>
        </div>

        <div className="w-full flex justify-evenly">
          <div className="w-[380px] p-2 flex h-full">
            <div className="w-[50px] h-[50px]">logo</div>
            <div className="w-full h-full p-2">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[18px] ">New queries</p>
            </div>
          </div>

          <div>2</div>
          <div>3</div>
        </div>

        <div>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default AiExpertHistory;
