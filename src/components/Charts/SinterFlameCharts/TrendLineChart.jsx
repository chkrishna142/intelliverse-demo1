import ReactApexCharts from "react-apexcharts";
import { indexWordMap } from "../../SinterFlame/Sinterflame";

const TrendLineChart = ({ data, camId, color }) => {
  const times = [];
  const series = [
    {
      name: camId,
      data: [],
    },
  ];
  data
    .filter((item) => {
      return item.healthIndex != 0;
    })
    .reverse()
    .map((item) => {
      times.push(item.timestamp);
      series[0].data.push(item.healthIndex);
    });
  //chart options
  const options = {
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          return indexWordMap[y];
        },
      },
      theme: "dark",
      fillSeriesColor: true,
      style: {
        fontSize: "16px",
      },
    },
    chart: {
      type: "line",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
        },
      },
      animations: {
        enabled: false,
      },
    },
    xaxis: {
      categories: times,
      type: "datetime",
      labels: {
        show: true,
        formatter: function (value) {
          const date = new Date(value);
          const hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const ampm = hours >= 12 ? "PM" : "AM";
          const formattedHours = hours === 0 || hours === 12 ? 12 : hours % 12;

          return `${formattedHours}:${minutes} ${ampm}`;
        },
        style: {
          fontSize: "14px",
        },
      },
    },
    yaxis: {
      title: {
        text: "",
        style: {
          fontSize: "12px",
          color: "#000000",
          fontWeight: 500,
          fontFamily: "Poppins",
        },
      },
      tickAmount: 5,
      labels: {
        style: {
          fontSize: "14px",
        },
        formatter: function (value) {
          return indexWordMap[value];
        },
      },
      min: 0,
      max: 5,
    },
    colors: color,
    stroke: {
      curve: "straight",
      width: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#FAFAFA", "transparent"],
        opacity: 1,
      },
    },
    legend: {
      show: true,
      offsetY: 15,
      offsetX: 0,
      position: "right",
      fontSize: "12px",
    },
  };

  return (
    <ReactApexCharts
      options={options}
      series={series}
      type="line"
      height="100%"
      width="100%"
    />
  );
};

export default TrendLineChart;
