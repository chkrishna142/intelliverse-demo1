import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";

const DonutChart = ({ data, labels }) => {
  const [series, setSeries] = useState([]);
  const customLabels = labels;
  const [customLegendItems, setCustomLegendItems] = useState([]);

  useEffect(() => {
    const newData = data.map((x) => {
      return parseFloat(x.toFixed(2));
    });
    const newlegends = labels.map((item, idx) => {
      return item + " " + newData[idx].toFixed(2).bold() + "%";
    });
    setSeries(newData);
    setCustomLegendItems(newlegends);
  }, [data]);

  const options = {
    chart: {
      type: "donut",
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
    labels: customLabels,
    legend: {
      position: "bottom",
      fontSize: "12px",
      customLegendItems: customLegendItems,
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      background: {
        enabled: true,
        foreColor: "#000",
      },
      dropShadow: {
        enabled: false,
      },
    },
  };

  return <ReactApexChart options={options} series={series} type="donut" height="100%" width="100%"/>;
};

export default DonutChart;
