import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

function LineAreaChart({Lineareachart}) {
  // const [state, setState] = useState({
  //   series: [
  //     {
  //       type: "rangeArea",
  //       name: "Optimal Range Area",
       

  //       data: [
  //         {
  //           x: "PMStack Press1",
  //           y: [2.6, 3.0],
  //         },
  //         {
  //           x: "PMStack Press2",
  //           y: [2.5, 2.6],
  //         },
  //         {
  //           x: "PMStack Press3",
  //           y: [2.7, 2.9],
  //         },
  //         {
  //           x: "PMStack Press5",
  //           y: [2.0, 3.0],
  //         },
          
         
  //       ],
  //     },
  //     {
  //       type: "line",
  //       name: "Current Stack Pressure",
  //       data: [
  //         {
  //           x: "PMStack Press1",
  //           y: 2.8,
  //         },
  //         {
  //           x: "PMStack Press2",
  //           y: 2.7,
  //         },
  //         {
  //           x: "PMStack Press3",
  //           y: 2.9,
  //         },
  //         {
  //           x: "PMStack Press5",
  //           y: 2.9,
  //         },
          
  //       ],
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       toolbar: {
  //         show: false,
  //       },
  //       // height: 350,
  //       type: "rangeArea",
  //       animations: {
  //         speed: 100,
  //       },
  //     },
  //     colors: ["rgba(105, 176, 75, 0.28)", "#3A74CA"],
  //     dataLabels: {
  //       enabled: false,
  //     },
     
  //     fill: {
  //       // opacity: [0.24, 0.24, 1, 1],
  //     },
  //     forecastDataPoints: {
  //       count: 0,
  //     },
  //     stroke: {
  //       show: true,
  //       curve: "smooth",
  //       lineCap: "butt",
  //       width: [0, 2], // Width for the rangeArea and line series
  //     },
  //     legend: {
  //       show: false,
  //       customLegendItems: ["Team B", "Team A"],
  //       inverseOrder: true,
  //     },

  //     markers: {
  //       hover: {
  //         sizeOffset: 5,
  //       },
  //     },
  //   },
  // });

  return (
    <div id="chart">
      <ReactApexChart
        options={Lineareachart.options}
        series={Lineareachart.series}
        type="rangeArea"
        height={350}
      />
    </div>
  );
}

export default LineAreaChart;
