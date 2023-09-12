import ReactApexChart from "react-apexcharts";

const StackBarChart = ({ data, type }) => {
  let graphData = {};
  let times = [];
  data.map((i) => {
    times.push(i.timestamp);
  });
  const labels = Object.keys(data[0][type]);
  labels.map((i) => {
    graphData[i] = [];
  });

  data.map((i) => {
    Object.keys(i[type]).map((j) => {
      graphData[j].push(i[type][j].toFixed(2));
    });
  });

  const series = [];
  Object.keys(graphData).map((i) => {
    series.push({
      name: i,
      data: graphData[i],
    });
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
    colors: [
      "#ffc107",
      "#5193f6",
      "#ef6f12",
      "#1c56ac",
      "#e91e63",
      "#00bcd4",
      "#8bc34a",
      "#9c27b0",
    ],
    xaxis: {
      categories: times,
      labels: {
        show: true,
        formatter: function (value) {
          const date = new Date(value);

          // Get the day of the month with leading zero
          const dayOfMonth = String(date.getDate()).padStart(2, "0");

          // Get the abbreviated month name
          const monthsAbbreviated = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const monthAbbreviated = monthsAbbreviated[date.getMonth()];

          return `${dayOfMonth} ${monthAbbreviated}`;
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
      offsetX: -40,
      offsetY: 0,
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

export default StackBarChart;
