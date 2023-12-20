import Bargraph from "./Bargraph";

function HistoryCharts({ fromTime, toTime }) {
  const historyChartData = {
    passed: {
      data: [80, 90, 70, 40, 50, 60, 50],
    },
    rejected: {
      data: [20, 10, 30, 60, 50, 40, 50],
    },
    timeStamp: [
      "01/01/2003",
      "02/01/2003",
      "03/01/2003",
      "04/01/2003",
      "05/01/2003",
      "06/01/2003",
      "07/01/2003",
    ],
  };
  const series = [
    {
      name: "Passed",
      type: "column",
      data: historyChartData.passed.data,
    },
    {
      name: "Rejected",
      type: "column",
      data: historyChartData.rejected.data,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",

      toolbar: {
        show: true,
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

        autoSelected: "zoom",
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
      categories: historyChartData.timeStamp,
      // [
      //   "01/01/2003",
      //   "02/01/2003",
      //   "03/01/2003",
      //   "04/01/2003",
      //   "05/01/2003",
      //   "06/01/2003",
      //   "07/01/2003",
      // ],
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
    yaxis: {
      tickAmount: 4,
      labels: {
        formatter: function (y) {
          return y + "%";
        },
      },
    },

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + "%";
          }
          return y;
        },
      },
    },
  };

  return (
    <div className="w-full h-full ">
      <div className="w-full h-full flex gap-2 p-2 text-[#605D64] text-[16px]">
        <p>{fromTime}</p>
        <p>-</p>
        <p>{toTime}</p>
      </div>
      <div className="w-full h-full">
        <Bargraph series={series} options={options} />
      </div>
    </div>
  );
}

export default HistoryCharts;
