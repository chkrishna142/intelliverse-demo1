import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopClientsChart = ({ data }) => {
  // const [names,setNames]=useState([...top3clients?.names])
  const chartOptions = {
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
      data?.names && data?.names.length > 0
          ? [...data?.names]
          : [],

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
  };

  const [seriesData, setSeriesData] = useState([]);
  useEffect(() => {
    // Update seriesData based on conditions
    setSeriesData([
      {
        name: "Series 1",
        data:
          data?.questions && data?.questions.length > 0
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

export default TopClientsChart;
