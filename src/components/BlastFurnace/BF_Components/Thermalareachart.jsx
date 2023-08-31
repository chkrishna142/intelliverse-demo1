import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Thermalareachart = () => {

    const [state,setState]=useState({
          
        series: [
           
         
        
          {
            
            type: 'rangeArea',
            name: 'Optimal Range',
            data: [
              {
                x: 'T01 +41807 R6',
                y: [30, 34]
              },
              {
                x: 'T02 +41807 R6',
                y: [42, 52]
              },
              {
                x: 'T03 +41807 R7',
                y: [39, 49]
              },
              {
                x: 'T04 +41807 R7',
                y: [34, 39]
              },
              {
                x: 'T05 +41807 R8',
                y: [51, 59]
              },
              {
                x: 'T06 +41807 R8',
                y: [54, 67]
              },
              {
                x: 'T07 +41807 R9',
                y: [43, 46]
              },
              {
                x: 'T08 +41807 R9',
                y: [21, 29]
              },
              {
                x: 'T09 +41807 R10',
                y: [41, 49]
              },
              {
                x: 'T10 +41807 R10',
                y: [31, 39]
              },
              {
                x: 'T11 +41807 R11',
                y: [61, 69]
              },
              {
                x: 'T12 +41807 R11',
                y: [41, 50]
              },
              {
                x: 'T13 +41807 R11',
                y: [31, 20]
              },
              {
                x: 'T14 +41807 R11',
                y: [41, 30]
              },
              {
                x: 'T15 +41807 R12',
                y: [51, 30]
              },
              {
                x: 'T16 +41807 R13',
                y: [61, 55]
              },
              {
                x: 'T17 +41807 R14',
                y: [61, 45]
              },
              {
                x: 'T18 +41807 R15',
                y: [21, 29]
              },
              
            ]
          },
        
         
          {
            
            type: 'line',
            name: 'Current Temperature',
            data: [
              {
                x: 'T01 +41807 R6',
                y: 33
              },
              {
                x: 'T02 +41807 R6',
                y: 49
              },
              {
                x: 'T03 +41807 R7',
                y: 43
              },
              {
                x: 'T04 +41807 R7',
                y: 37
              },
              {
                x: 'T05 +41807 R8',
                y: 55
              },
              {
                x: 'T06 +41807 R8',
                y: 59
              },
              {
                x: 'T07 +41807 R9',
                y: 45
              },
              {
                x: 'T08 +41807 R9',
                y: 24
              },
              {
                x: 'T09 +41807 R10',
                y: 21
              },
              {
                x: 'T10 +41807 R10',
                y: 15
              },
              {
                x: 'T11 +41807 R11',
                y: 31
              },
              {
                x: 'T12 +41807 R11',
                y: 21
              },
              {
                x: 'T13 +41807 R11',
                y: 41
              },
              {
                x: 'T14 +41807 R11',
                y: 22
              },
              {
                x: 'T15 +41807 R12',
                y: 46
              },
              {
                x: 'T16 +41807 R13',
                y: 48
              },
              {
                x: 'T17 +41807 R14',
                y: 78
              },
              {
                x: 'T18 +41807 R15',
                y:66
              },
            ]
          }
        ],
        options: {
            chart: {
            
              type: "rangeArea",
              animations: {
                speed: 500,
              },
              toolbar: {
                show: false,
              },
              
            },
            
            colors: ["rgba(105, 176, 75, 0.28)", "#6CA6FC"],
            dataLabels: {
              enabled: false,
            },
            fill: {
              opacity: [0.24, 1],
            },
            stroke: {
              curve: "straight",
              width: [0, 2],
            },
            xaxis: {
              tickPlacement: 'on',
           
              // position:"left",
              labels: {
                show: true,
                minWidth: 120,
          maxWidth: 260,
          offsetX: 15,
          offsetY: 10,
                // rotate: 265,
                // rotateAlways: true,
                style: {
                  colors: [],
                  
                  fontSize: '10px',
                  
              },
               
              
              }
            },
            yaxis: {

              opposite:true,

            },
            legend: {
              show: false,
              customLegendItems: ["Optimal Range", "Current Temperature"],
              inverseOrder: true,
              position: "top",
              showForSingleSeries: false,
              showForNullSeries: true,
              showForZeroSeries: true,
              horizontalAlign: "left",
              labels: {
                colors: undefined,
                useSeriesColors: false,
              },
            },
           
          },
        });
  

  return (
    
    // <div id="chart-container" className="">
      <div id="chart"
      className=" w-full h-full" 
      // className="transform rotate-90  w-full h-full"
      >

        <ReactApexChart
          options={state.options}
          series={state.series}
          type="rangeArea"
          height="100%"
          width="100%"
        
        
        />
      </div>
    //  </div>

  );
};

export default Thermalareachart;
