import ReactApexChart from "react-apexcharts";

const DowntimeChart = ({ data }) => {
  const series = [
    {
      name: "No Flame",
      data: [44, 55, 41, 67, 22, 43, 56, 19],
    },
    {
      name: "Serve Down",
      data: [13, 23, 20, 8, 13, 27, 34, 12],
    },
    {
      name: "Camera Down",
      data: [11, 17, 15, 15, 21, 14, 34, 19],
    },
  ];

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "bar",
      stacked: true
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
    colors: ["#212529", "#343a40", "#6c757d"],
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

export default DowntimeChart;
