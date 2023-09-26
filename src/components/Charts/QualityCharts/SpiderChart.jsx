import ReactApexChart from "react-apexcharts";

const SpiderChart = ({points,labels}) => {

  const series = [
    {
      name: "Series 1",
      data: points,
    },
  ];
  const options = {
    chart: {
      type: "radar",
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
