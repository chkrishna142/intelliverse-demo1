import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopEnquirerChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      toolbar: { show:false },
    },
    
    xaxis: {
      categories: ["John", "Luc", "Fabian"],
    //   show: false,
    showLines: false,
    labels: {
        style: {
        //   colors: "#fff", // Y-axis label color
        fontSize: "15px",
        },
      },
    },
    yaxis: {
        labels: {
          style: {
            // colors: "#fff", // Y-axis label color
            fontSize: "15px",
          },
        },
      },
    plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      export: {
        enabled: false,
      },

  });

  const [seriesData, setSeriesData] = useState([
    {
      name: "Series 1",
      data: [6, 3, 2],
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
