import ReactApexCharts from "react-apexcharts";
import { useState, useEffect } from "react";

const MoistureChart = ({ data }) => {
  //manging x axis and y axis values
  const series = [];
  const times = [];
  let dummy = [];
  data.map((i) => {
    if(i.moisture != 0){
      dummy.push(i.moisture)
    }else dummy.push(null);
    times.push(i.timestamp);
  });
  series.push({
    name: "Moisture",
    data: dummy,
  });
  //chart options
  const options = {
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          return y;
        },
      },
      theme: "dark",
      fillSeriesColor: true,
      style: {
        fontSize: "16px",
      },
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetX: 0,
        offsetY: 0,
      },
    },
    chart: {
      type: "line",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
        },
      },
      animations: {
        enabled: false,
      },
    },
    xaxis: {
      categories: times,
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
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      title: {
        text: "",
        style: {
          fontSize: "16px",
          color: "#000000",
          fontWeight: 500,
          fontFamily: "Poppins",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },
    colors: ["#084298"],
    stroke: {
      curve: "smooth",
      width: [3, 3, 3, 3, 3, 3],
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#FAFAFA", "transparent"],
        opacity: 1,
      },
    },
  };

  return (
    <ReactApexCharts
      options={options}
      series={series}
      type="line"
      height="100%"
    />
  );
};

export default MoistureChart;
