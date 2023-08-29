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
                x: 'Jan',
                y: [3100, 3400]
              },
              {
                x: 'Feb',
                y: [4200, 5200]
              },
              {
                x: 'Mar',
                y: [3900, 4900]
              },
              {
                x: 'Apr',
                y: [3400, 3900]
              },
              {
                x: 'May',
                y: [5100, 5900]
              },
              {
                x: 'Jun',
                y: [5400, 6700]
              },
              {
                x: 'Jul',
                y: [4300, 4600]
              },
              {
                x: 'Aug',
                y: [2100, 2900]
              },
              {
                x: 'Sep',
                y: [2100, 2900]
              },
              {
                x: 'Oct',
                y: [2100, 2900]
              }
            ]
          },
        
         
          {
            
            type: 'line',
            name: 'Current Temperature',
            data: [
              {
                x: 'Jan',
                y: 3300
              },
              {
                x: 'Feb',
                y: 4900
              },
              {
                x: 'Mar',
                y: 4300
              },
              {
                x: 'Apr',
                y: 3700
              },
              {
                x: 'May',
                y: 5500
              },
              {
                x: 'Jun',
                y: 5900
              },
              {
                x: 'Jul',
                y: 4500
              },
              {
                x: 'Aug',
                y: 2400
              },
              {
                x: 'Sep',
                y: 2100
              },
              {
                x: 'Oct',
                y: 1500
              }
            ]
          }
        ],
        options: {
            chart: {
              height: 350,
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
              type: "category", // Use 'category' type for textual labels
              categories: [
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
              ],
            },
            yaxis: {
              position: "bottom", // Change the position of y-axis to bottom
            },
            legend: {
              show: true,
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
            title: {
              text: "Target Ranges for Stave Temperature",
              style: {
                fontSize: "18px",
                fontWeight: "semibold",
                color: "#605D64",
              },
            },
            markers: {
              hover: {
                sizeOffset: 5,
              },
            },
          },
        });
  

  return (
    <div id="chart">
  <ReactApexChart options={state.options} series={state.series} type="rangeArea" height={350} />
</div>
  );
};

export default Thermalareachart;
