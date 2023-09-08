import ReactApexChart from "react-apexcharts";

const PieChart = ({ data, type }) => {
  const graphData = {};
  const labels = Object.keys(data[0][type]);
  labels.map((i) => {
    graphData[i] = [];
  });

  data.map((i) => {
    Object.keys(i[type]).map((j) => {
      graphData[j].push(parseFloat(i[type][j]));
    });
  });

  const series = [];
  labels.map((i) => {
    series.push(
      parseFloat((
        graphData[i].reduce(function (x, y) {
          return x + y;
        }, 0) / labels.length
      ).toFixed(2))
    );
  });

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
    labels: labels,
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
