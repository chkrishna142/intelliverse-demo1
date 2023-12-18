import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopEnquirerChart = ({ data,role }) => {
  const chartOptions= {
    chart: {
      type: "bar",
      toolbar: { show: false },
     width:"200%"
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },

    xaxis: {
      position: "top",
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
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show:false
      },
      title: {
        text: role === "EXPERT" ? "Number of questions" : "",
        offsetY: -60,
        style: {
          fontSize: "14px",
          fontWeight: 400,
          colors: ["#605D64"],
        },
      },
    },
    yaxis: {
      labels: {
        maxWidth: 200,
        style: {
          fontSize: "14px",
        },
      },
      axisBorder: {
        show: false,
    }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        // barHeight:role !== "EXPERT" ? "47%":""
      },
    },
    // colors: ["#D9D9D9"],
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
        height={role !=="EXPERT" ? 105 : 130}
      />
    </div>
  );
};

export default TopEnquirerChart;
