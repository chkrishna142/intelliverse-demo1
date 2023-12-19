import Bargraph from "./Bargraph";

function WeeklyOutput() {
  const series = [
    {
      name: "Passed",
      type: "column",
      data: [10, 20, 10, 11, 12, 15, 16],
    },
    {
      name: "Rejected",
      type: "column",
      data: [2, 4, 5, 1, 3, 4, 5],
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
    <div className="w-full  h-full">
      <div className="flex text-start w-full h-[22px]   items-center gap-3">
        <p className="text-[#CAC5CD] text-[15px]">Weekly output</p>
      </div>

      <div className="">
        <Bargraph series={series} options={options} />
      </div>
    </div>
  );
}

export default WeeklyOutput;
