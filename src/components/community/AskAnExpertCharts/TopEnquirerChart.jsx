import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopEnquirerChart = ({ top3Enquirers }) => {
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
      categories: [...top3Enquirers?.names],
      showLines: false,
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 400,
          color: "#605D64",
        },
        show: false,
      },
      title: {
        text: "",
        offsetY: -30,
        style: {
          fontSize: "14px",
          fontWeight: 400,
          color: "#605D64",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: top3Enquirers ? "" : "45%",
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
      data: [...top3Enquirers?.questions],
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

export default TopEnquirerChart;
