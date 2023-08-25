import ReactApexCharts from "react-apexcharts";
import { useState, useEffect } from "react";

const LineChart = ({ data, timeStamps, labels }) => {
  //manging x axis and y axis values
  const [times, setTimes] = useState([]);
  const [series, setSeries] = useState([]);

  // update the series each time new points come
  const updateSeries = (newNames, newData) => {
    setSeries((prevSeries) => {
      const updatedSeries = [...prevSeries];

      newNames.forEach((newName, index) => {
        const existingIndex = updatedSeries.findIndex(
          (item) => item.name === newName
        );

        if (existingIndex !== -1) {
          updatedSeries[existingIndex].data.push(newData[index].toFixed(2));
        } else {
          updatedSeries.push({
            name: newName,
            data: [newData[index].toFixed(2)],
          });
        }
      });

      return updatedSeries;
    });
  };

  useEffect(() => {
    updateSeries(labels, data);
    setTimes((prev) => [...prev, timeStamps]);
  }, [timeStamps, data, labels]);

  //chart options
  const options = {
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          return y;
        },
      },
      theme: "dark",
      fillSeriesColor: true,
      style: {
        fontSize: "16px",
      },
    },
    chart: {
      type: "line",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: false,
          selection: false,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: true,
        },
      },
      animations: {
        enabled: false,
      },
      //   events: {
      //     markerClick: function (
      //       event,
      //       chartContext,
      //       { seriesIndex, dataPointIndex, config }
      //     ) {
      //       // console.log(props.idData, dataPointIndex, "data point values");
      //       setUseIndex(props.idData[dataPointIndex]);
      //       const requestData = JSON.stringify({
      //         id: props.idData[dataPointIndex],
      //         clientId: clientId,
      //       });
      //       apiCallDataPoint(props.idData[dataPointIndex], requestData);
      //       setModalIsOpen(true);
      //     },
      //   },
    },
    xaxis: {
      categories: times,
      type: "datetime",
      labels: {
        show: true,
        formatter: function (value) {
          return new Date(value).toLocaleString("en-GB", {
            //   hour: "2-digit",
            //   minute: "2-digit",
            //   second: "2-digit",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
        },
        style: {
          fontSize: "14px",
        },
      },
    },
    yaxis: {
      title: {
        text: "",
        style: {
          fontSize: "16px",
          color: "#000000",
          fontWeight: 500,
          fontFamily: "Poppins",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
        },
      },
    },
    colors: [
      "#084298",
      "#ffc107",
      "#4adcdc",
      "#5193F6",
      "#e91e63",
      "#00bcd4",
      "#8bc34a",
      "#9c27b0",
    ],
    stroke: {
      curve: "smooth",
      width: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#FAFAFA", "transparent"],
        opacity: 1,
      },
    },
    legend: {
      show: true,
      offsetY: 15,
      offsetX: 0,
      position: "top",
      fontSize: "12px",
    },
  };

  return (
    <ReactApexCharts
      options={options}
      series={series}
      type="line"
      height="100%"
      width="100%"
    />
  );
};

export default LineChart;
