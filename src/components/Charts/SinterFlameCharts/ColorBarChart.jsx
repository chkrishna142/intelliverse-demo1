import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

let color = {
  size: [
    "#ffc107",
    "#5193f6",
    "#ef6f12",
    "#1c56ac",
    "#e91e63",
    "#00bcd4",
    "#8bc34a",
    "#9c27b0",
    "#673ab7",
    "#ff9800",
    "#4caf50",
    "#795548",
  ],
  color: ["#79767D", "#000000"],
};

const ColorBarChart = ({ rgb, timestamp }) => {
  const [color, setColor] = useState([]);
  const [series, setSeries] = useState([{
    name: "Color",
    data: [],
  }]);
  const [time, SetTimes] = useState([]);

  useEffect(() => {
    setColor((prev) => [...prev, `rgb(${rgb.r},${rgb.g},${rgb.b})`]);
    SetTimes((prev) => [...prev, timestamp]);
    setSeries((prev) => {
      const old = [...prev];
      old[0].data.push(old[0].data.length + 1);
      setSeries(old);
    });
  }, [color, timestamp]);

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "bar",
      stacked: true,
      stackType: "100%",
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 12,
        borderRadiusApplication: "end",
      },
    },
    tooltip: {
      x: {
        show: true,
        formatter: function (value) {
          return value;
        },
      },
      y: {
        formatter: function (value) {
          return color[value - 1];
        },
      },
      theme: "dark",
      fillSeriesColor: true,
      style: {
        fontSize: "16px",
      },
    },
    stroke: {
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    colors: color,
    xaxis: {
      categories: time,
      type: "datetime",
      labels: {
        show: true,
        formatter: function (value) {
          const date = new Date(value);
          const hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const ampm = hours >= 12 ? "PM" : "AM";
          const formattedHours = hours === 0 || hours === 12 ? 12 : hours % 12;

          return `${formattedHours}:${minutes} ${ampm}`;
        },
        style: {
          fontSize: "14px",
        },
      },
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 0.5,
    },
    legend: {
      show: false,
      position: "right",
      offsetX: -30,
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
        vertical: 5,
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

export default ColorBarChart;
