import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopClientsChart = ({top3clients}) => {

  // const [names,setNames]=useState([...top3clients?.names])
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      toolbar: { show: false },
    },

    xaxis: {
      categories: [...top3clients?.names],

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
        // barHeight: '30%',
      },
    },
    export: {
      enabled: false,
    },
  });

  const [seriesData, setSeriesData] = useState([
    {
      name: "Series 1",
      data: [...top3clients?.questions],
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
