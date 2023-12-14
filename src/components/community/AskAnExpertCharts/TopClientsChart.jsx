import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopClientsChart = ({ top3clients, top3experts }) => {
  // const [names,setNames]=useState([...top3clients?.names])
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: top3clients
        ? [...top3clients?.names]
        : ["Luc", "John", "Sam"],

      showLines: false,
      labels: {
        show: false,
        style: {
          fontSize: "14px",
          colors: ["#605D64"],
        },
      },
      title: {
        text: "",
        offsetY: -30,
        style: {
          fontSize: "14px",
          fontWeight: 400,
          colors: ["#605D64"],
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 400,
          colors: ["#605D64"],
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        // barHeight: '30%',
      },
    },
    colors: ["#D9D9D9"],
    export: {
      enabled: false,
    },
  });

  const [seriesData, setSeriesData] = useState([
    {
      name: "Series 1",
      data: top3clients ? [...top3clients?.questions] : [23, 20, 12],
    },
  ]);

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        type="bar"
        height={130}
      />
    </div>
  );
};

export default TopClientsChart;
