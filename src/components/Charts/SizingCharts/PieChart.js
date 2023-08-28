import ReactApexChart from "react-apexcharts";

const PieChart = () => {
  const series = [44, 55, 13, 43];
  const options = {
    chart: {
      type: "pie",
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
    labels: ["0-2 mm", "2-6 mm", "6-8 mm", "8+ mm"],
    legend: {
      show: false,
      position: "right",
      fontSize: "12px",
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      background: {
        enabled: true,
        foreColor: "#000",
      },
      dropShadow: {
        enabled: false,
      },
    },
  };
  return <ReactApexChart options={options} series={series} type="pie" />;
};

export default PieChart;
