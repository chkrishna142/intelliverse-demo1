import React, { useEffect, useState } from "react";

import ReactApexChart from "react-apexcharts";


function Thermalheatmap() {

   

   
 
  
  
   
    const [state,setState]=useState(
        {
          
        series: [
            {
            name: 'T01 +41807 R6',
            data: [60,50,60,80]
          },
          {
            name: 'T02 +41807 R6',
            data: [60,50,60,80]
          },
          {
            name: 'T03 +41807 R7',
            data: [60,50,60,80]
          },
          {
            name: 'T04 +41807 R7',
            data: [60,50,60,80]
          },
          {
            name: 'T05 +41807 R8',
            data: [60,50,60,80]
          },
          {
            name: 'T06 +41807 R8',
            data: [60,50,60,80]
          },
          {
            name: 'T07 +41807 R9',
            data: [60,50,60,80]
          },
          {
            name: 'T08 +41807 R9',
            data: [60,50,60,80]
          },
          {
            name: 'T09 +41807 R10',
            data: [60,50,60,80]
          },
          {
            name: 'T10 +41807 R10',
            data: [60,50,60,80]
          },
          {
            name: 'T11 +41807 R11',
            data: [60,10,60,80]
          },
          {
            name: 'T12 +41807 R11',
            data: [60,50,60,80]
          },
          {
            name: 'T13 +41807 R11',
            data: [60,50,60,80]
          },
          {
            name: 'T14 +41807 R11',
            data: [60,50,60,80]
          },
          {
            name: 'T15 +41807 R12',
            data: [60,50,60,80]
          },
          {
            name: 'T16 +41807 R13',
            data: [60,50,60,10]
          },
          {
            name: 'T17 +41807 R14',
            data: [60,50,60,80]
          },
          {
            name: 'T18 +41807 R15',
            data: [60,50,60,80]
          }

          ],
        options: {
          chart: {
            height: 450,
            type: 'heatmap',
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ["#A6D96A"]
        },
          xaxis: {
            type: 'category',
            categories: ['Quadrant 1', 'Quadrant 2', 'Quadrant 3', 'Quadrant 4',]
          },
         
          grid: {
            padding: {
              right: 20
            }
          }
        },
      
      
      )

    //   const coloredSeries = state.series.data.map(series => ({
    //     name: series.name,
    //     data: series.data,
    //     colors: generateColors(series.data, min, max)
    //   }));




  return (
  
    <div id="chart" className="w-full h-full">
    <ReactApexChart options={state.options} series={state.series} type="heatmap" height={450} />
  </div>
  );
}

export default Thermalheatmap;




