import ReactApexChart from "react-apexcharts";

const SpiderChart = ({ points, labels }) => {
  const series = [
    {
      name: "Gap width",
      data: points,
    },
  ];
  const options = {
    chart: {
      type: "radar",
    },
    tooltip: {
      x: {
        show: true,
        formatter: function (value) {
          return "Partition " + value;
        },
      },
      theme: "dark",
      fillSeriesColor: true,
      style: {
        fontSize: "16px",
      },
    },
    xaxis: {
      categories: labels,
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="radar"
      height="100%"
      width="100%"
    />
  );
};

export default SpiderChart;
