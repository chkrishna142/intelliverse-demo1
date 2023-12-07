import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopClientsChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      toolbar: { show: false },
    },

    xaxis: {
      categories: ["Client 1", "Client 2", "Client 3"],

      showLines: false,
      labels: {
        show: false,
        style: {
          fontSize: "15px",
        },
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
      data: [30, 23, 15],
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
