import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopEnquirerChart = ({top3Enquirers}) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      toolbar: { show: false },
    },

    xaxis: {
      categories: [...top3Enquirers?.names],
      showLines: false,
      labels: {
        style: {
          fontSize: "15px",
        },
        show: false,
      },
      title: {
        text: "Number of Questions",
        offsetY: -30,
        style: {
          fontSize: "15px",
          fontWeight: 200,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "15px",
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
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
