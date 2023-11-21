import ReactApexChart from "react-apexcharts";
import { indexWordMap } from "../../SinterFlame/Sinterflame";

const SpiderChart = ({ data }) => {
  let points = [];
  let labels = [];
  data.sort((a, b) => {
    const cameraIdA = a.cameraId.toLowerCase();
    const cameraIdB = b.cameraId.toLowerCase();

    if (cameraIdA < cameraIdB) {
      return -1;
    }
    if (cameraIdA > cameraIdB) {
      return 1;
    }
    return 0;
  });
  data.map((val) => {
    let avgValue;
    let total = 0;
    let sum = Object.values(val.freqDist).reduce(
      (accumulator, currentValue, idx) => {
        if (idx != 0) return accumulator + currentValue;
        return accumulator;
      },
      0
    );
    Object.keys(val.freqDist).map((id) => {
      if (id != 0) total += parseInt(id) * val.freqDist[id];
    });
    avgValue = sum != 0 ? total / sum : 0;
    points.push(avgValue);
    labels.push(val.cameraId);
  });
  const series = [
    {
      name: "Avg Flame Health",
      data: points,
    },
  ];
  console.log(series, "data points");
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
          return value;
        },
      },
      y: {
        show: true,
        formatter: function (value) {
          return indexWordMap[Math.round(value)];
        },
      },
      theme: "dark",
      fillSeriesColor: true,
      style: {
        fontSize: "16px",
      },
    },
    fill: {
      opacity: 0.1,
      type: "solid",
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          fontSize: "10px",
        },
        formatter: function (value) {
          return indexWordMap[value];
        },
      },
      min: 0,
      max: 5,
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
