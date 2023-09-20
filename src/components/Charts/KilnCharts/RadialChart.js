import ReactApexCharts from "react-apexcharts";

const RadialChart = () => {
  const series = [20, 80];

  const options = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "50%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#FFFF00", "#FF0000"],
    labels: ["Dusty Index", "Hot Index"],
    legend: {
      show: true,
      floating: true,
      fontSize: "12px",
      position: "left",
      offsetX: 0,
      offsetY: 0,
      labels: {
        useSeriesColors: false,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + (opts.w.globals.series[opts.seriesIndex]/20);
      },
      itemMargin: {
        vertical: 0,
      },
    },
  };
  return (
    <ReactApexCharts
      options={options}
      series={series}
      type="radialBar"
      height="100%"
    />
  );
};

export default RadialChart;
