import ReactApexChart from "react-apexcharts";

const SpiderChart = () => {
  let points = [1.0, 1.4, 1.9, 2.3, 2.8, 3.2, 3.7, 4.1];
  let labels = ["1 (N)", "2", "3", "4", "5", "6", "7", "8 (S)"];
  const series = [
    {
      name: "Avg health index",
      data: points,
    },
  ];
  const options = {
    chart: {
      type: "radar",
      toolbar: {
        show: false,
      },
    },
    colors: ["#FF0000"],
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
