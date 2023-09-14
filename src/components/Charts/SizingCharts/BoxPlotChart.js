import ReactApexChart from "react-apexcharts";

const BoxPlotChart = ({ data }) => {
  let boxData = [];
  let outliersData = [];
  data.map((i) => {
    boxData.push({
      x: i.timestamp,
      y: i.plot,
    });
    i.outliers.map((j) => {
      outliersData.push({
        x: i.timestamp,
        y: j,
      });
    });
  });

  const series = [
    {
      name: "box",
      type: "boxPlot",
      data: boxData,
    },
    {
      name: "outliers",
      type: "scatter",
      data: outliersData,
    },
  ];
  const options = {
    chart: {
      type: "boxPlot",
    },
    colors: ["#008FFB", "#FEB019"],
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      labels: {
        show: true,
        formatter: function (value) {
          const date = new Date(value);

          // Get the day of the month with leading zero
          const dayOfMonth = String(date.getDate()).padStart(2, "0");

          // Get the abbreviated month name
          const monthsAbbreviated = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const monthAbbreviated = monthsAbbreviated[date.getMonth()];

          return `${dayOfMonth} ${monthAbbreviated}`;
        },
        style: {
          fontSize: "14px",
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
  };

  return (
    <ReactApexChart
      series={series}
      options={options}
      type="boxPlot"
      height="100%"
      width="100%"
    />
  );
};

export default BoxPlotChart;
