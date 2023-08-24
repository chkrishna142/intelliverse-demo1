import React from "react";
import ReactApexChart from "react-apexcharts";

function RcawaterfallChart() {
  const series = [
    {
      data: [
        {
          x: 'Current Value',
          y: [15, 25],
          fillColor:  "#FFC107",
        },
        {
          x: 'Oxygen Enrichment', // First instance of Oxygen Enrichment
          y: [25, 45],
          seriesIndex: 1 // Unique identifier
        },
        {
          x: 'Cold Blast Volume',
          y: [30, 70]
        },
        {
          x: 'Flame Temperature',
          y: [50, 80]
        },
        {
          x: 'Stave Cooling I Heat Loss Total',
          y: [60, 80]
        },
        {
          x: 'Stave Temperature Row 9 (TB)',
          y: [80, 45]
        },
        // {
        //   x: 'Oxygen Enrichmen', // Second instance of Oxygen Enrichment
        //   y: [45, 30],
        //   seriesIndex: 2 // Unique identifier
        // },
        {
          x: 'Final Value',
          y: [30, 15],
          fillColor:  "#FFC107",
        }
      ]
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'rangeBar',
      toolbar: {
        show: false // Disabling the toolbar
      }
    },
    plotOptions: {
      bar: {
        horizontal: false // Vertical bars
      }
    },
    xaxis: {
      type: 'category' // Using categories for x-axis labels,
    //   labels: {
    //     formatter: function (value, timestamp, index) {
    //       // Replace with your own logic for line breaks
    //       // For example, break at "Oxygen Enrichment"
    //       return value? value.split(" ").join("\n") : "";
    //     },
    //   },
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        show: false // Hide y-axis data labels
      }
    },
   
  };

  return (
    <div id="chart" className="w-full">
      <ReactApexChart options={options} series={series} type="rangeBar" height={350} />
    </div>
  );
}

export default RcawaterfallChart;
