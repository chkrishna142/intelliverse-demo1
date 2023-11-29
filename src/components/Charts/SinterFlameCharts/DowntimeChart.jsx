import ReactApexChart from "react-apexcharts";

const DowntimeChart = ({ data }) => {
  const series = [];
  const labels = [];
  const sortedData = data.sort((a, b) => a.cameraId.localeCompare(b.cameraId));
  // Extract unique keys other than cameraId
  const uniqueKeys = [
    ...new Set(
      sortedData.flatMap((obj) =>
        Object.keys(obj).filter((key) => key !== "cameraId")
      )
    ),
  ];
  uniqueKeys.map((key) => {
    series.push({
      name: key,
      data: [],
    });
  });

  sortedData.forEach((item) => {
    uniqueKeys.forEach((key) => {
      series.find((s) => s.name === key).data.push(item[key]);
    });
    labels.push(item.cameraId);
  });

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      type: "bar",
      stacked: true,
      stackType: "100%",
    },
    tooltip: {
      x: {
        show: true,
        formatter: function (value) {
          return value;
        },
      },
      theme: "dark",
      fillSeriesColor: true,
      style: {
        fontSize: "16px",
      },
    },
    colors: ["#274c77", "#212529", "#343a40", "#6c757d"],
    xaxis: {
      categories: labels,
      labels: {
        show: true,
        formatter: function (value) {
          return value;
        },
        style: {
          fontSize: "14px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      fontSize: "14px",
      labels: {
        colors: "#79767D",
      },
      markers: {
        width: 18,
        height: 18,
        radius: 12,
      },
      alignLabels: true,
      itemMargin: {
        horizontal: 0,
        vertical: 5,
      },
    },
  };
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height="100%"
    />
  );
};

export default DowntimeChart;
