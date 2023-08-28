import ReactApexChart from "react-apexcharts";

const StackBarChart = () => {
  const series = [
    {
      name: "0-2 mm",
      data: [44, 55, 41, 67, 22, 43, 21, 49],
    },
    {
      name: "2-6 mm",
      data: [13, 23, 20, 8, 13, 27, 33, 12],
    },
    {
      name: "6-8 mm",
      data: [11, 17, 15, 15, 21, 14, 15, 13],
    },
    {
      name: "8+ mm",
      data: [11, 17, 15, 15, 21, 14, 15, 13],
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
    colors: [
      "#ffc107",
      "#5193f6",
      "#ef6f12",
      "#1c56ac",
      "#e91e63",
      "#00bcd4",
      "#8bc34a",
      "#9c27b0",
    ],
    xaxis: {
      categories: [
        "2011 Q1",
        "2011 Q2",
        "2011 Q3",
        "2011 Q4",
        "2012 Q1",
        "2012 Q2",
        "2012 Q3",
        "2012 Q4",
      ],
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: -40,
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
        vertical: 15,
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
