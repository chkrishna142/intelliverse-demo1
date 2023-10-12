import ReactApexChart from "react-apexcharts";

let color = {
  size: [
    "#ffc107",
    "#5193f6",
    "#ef6f12",
    "#1c56ac",
    "#e91e63",
    "#00bcd4",
    "#8bc34a",
    "#9c27b0",
    "#673ab7",
    "#ff9800",
    "#4caf50",
    "#795548",
  ],
  color: ["#79767D", "#000000"],
};

const StackBarChart = () => {
  const series = [
    {
      name: "Index 1",
      data: [7, 8, 2, 1, 3, 7, 5, 6],
    },
    {
      name: "Index 2",
      data: [2, 7, 6, 2, 5, 8, 6, 4],
    },
    {
      name: "Index 3",
      data: [9, 6, 5, 1, 4, 9, 3, 6],
    },
    {
      name: "Index 4",
      data: [7, 2, 9, 3, 6, 8, 4, 5],
    },
    {
      name: "Index 5",
      data: [2, 1, 4, 3, 1, 7, 5, 2],
    },
    {
      name: "View obstructed",
      data: [7, 6, 8, 1, 5, 7, 4, 5],
    },
  ];

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
          return "Burner " + value;
        },
      },
      theme: "dark",
      fillSeriesColor: true,
      style: {
        fontSize: "16px",
      },
    },
    colors: color["size"],
    xaxis: {
      categories: ["1 (N)", "2", "3", "4", "5", "6", "7", "8 (S)"],
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
