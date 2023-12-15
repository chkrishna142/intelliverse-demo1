import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopEnquirerChart = ({ data }) => {
  const chartOptions= {
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
      categories:
      data?.names && data?.names?.length > 0
          ? [...data?.names]
          : [],
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
      },
    },
    colors: ["#D9D9D9"],
    export: {
      enabled: false,
    },
  };

  const [seriesData, setSeriesData] = useState([
    {
      name: "Series 1",
      data:
      data?.questions && data?.questions?.length > 0
          ? [...data?.questions]
          : [],
    },
  ]);

  useEffect(() => {
    // Update seriesData based on conditions
    setSeriesData([
      {
        name: "Series 1",
        data:
        data?.questions && data?.questions?.length > 0
            ? [...data?.questions]    
            : [],
      },
    ]);
  }, [data]);

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
