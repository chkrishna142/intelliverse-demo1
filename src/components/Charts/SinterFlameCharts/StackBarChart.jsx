import ReactApexChart from "react-apexcharts";

const map = {
  "Poor": 1,
  "Average": 2,
  "Good": 3,
  "Better": 4,
  "Excellent": 5,
  "No Flame": 0,
};

const StackBarChart = ({ data }) => {
  const series = [
    {
      name: "Poor",
      data: [],
    },
    {
      name: "Average",
      data: [],
    },
    {
      name: "Good",
      data: [],
    },
    {
      name: "Better",
      data: [],
    },
    {
      name: "Excellent",
      data: [],
    },
    {
      name: "No Flame",
      data: [],
    },
  ];

  const burners = [];

  data.map((val) => {
    burners.push(val.cameraId);
  });

  series.map((obj, idx) => {
    data.map((val) => {
      obj.data.push(val.freqDist[map[obj.name]]);
    });
  });

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "bar",
      stacked: true,
      stackType: "100%",
    },
    tooltip: {
      x: {
        show: true,
        formatter: function (value) {
          return value;
        },
      },
      theme: "dark",
      fillSeriesColor: true,
      style: {
        fontSize: "16px",
      },
    },
    colors: ["#FF006E", "#FB5607", "#FFBE0B", "#8338EC", "#3A86FF", "#000000"],
    xaxis: {
      // categories: ["1 (N)", "2", "3", "4", "5", "6", "7", "8 (S)"],
      categories: burners,
      labels: {
        show: true,
        formatter: function (value) {
          return value;
        },
        style: {
          fontSize: "14px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: -30,
      offsetY: 0,
      fontSize: "14px",
      labels: {
        colors: "#79767D",
      },
      markers: {
        width: 18,
        height: 18,
        radius: 12,
      },
      alignLabels: true,
      itemMargin: {
        horizontal: 0,
        vertical: 5,
      },
    },
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height="100%"
    />
  );
};

export default StackBarChart;
