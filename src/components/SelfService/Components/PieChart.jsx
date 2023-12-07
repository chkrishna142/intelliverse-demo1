import ReactApexChart from "react-apexcharts";

const PieChart = ({ series, labels, hide }) => {

  const options = {
    chart: {
      type: "pie",
    },
    colors: ['#8FCE00','#BCBCBC'],
    labels: labels,
    legend: {
      show: !hide,
      position: "top",
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
