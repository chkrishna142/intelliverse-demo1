import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopClientsChart = ({ data, role }) => {
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
      enabled: true,
    },

    xaxis: {
      position: "top",
      categories: data?.names && data?.names.length > 0 ? [...data?.names] : [],
      labels: {
        show: false,
        style: {
          fontSize: "14px",
          colors: ["#605D64"],
        },
        floating: true,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show:false
      },
      title: {
        text: "Number of questions",
        offsetY: -60,
        style: {
          fontSize: "14px",
          fontWeight: 400,
          colors: ["#605D64"],
          textAlign: "left",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        maxWidth: 200,
        style: {
          fontSize: "14px",
          fontWeight: 400,
          colors: ["#605D64"],
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show:false
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        // barHeight:data?.questions && data?.questions?.length < 3 ? "30%" : undefined,
      },
    },
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
