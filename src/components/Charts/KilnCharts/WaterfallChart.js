import ReactApexChart from "react-apexcharts"

const WaterfallChart = () => {
  const series = [
    {
      data: [
        {
          x: "Current Value",
          y: [15, 25],
          fillColor: "#FFC107",
        },
        {
          x: "Oxygen Enrichment", // First instance of Oxygen Enrichment
          y: [25, 45],
          fillColor: "#605D64",
        },
        {
          x: "Cold Blast Volume",
          y: [30, 70],
        },
        {
          x: "Flame Temperature",
          y: [50, 80],
        },
        {
          x: "Stave Cooling I Heat Loss Total",
          y: [60, 80],
        },
        {
          x: "Stave Temperature Row 9 (TB)",
          y: [80, 45],
        },
        {
          x: "Final Value",
          y: [30, 15],
          fillColor: "#FFC107",
        },
      ],
    },
  ];

  const options = {
    chart: {
      type: "rangeBar",
      toolbar: {
        show: false, // Disabling the toolbar
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Vertical bars
      },
    },
    xaxis: {
      type: "category",
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        show: true, // Hide y-axis data labels
      },
    },
  };
  return <ReactApexChart options={options} series={series} type="rangeBar" height="100%" width="100%" />;
};

export default WaterfallChart;
