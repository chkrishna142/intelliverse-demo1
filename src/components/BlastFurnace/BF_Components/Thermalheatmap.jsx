import React, { useEffect, useState } from "react";

import ReactApexChart from "react-apexcharts";

function Thermalheatmap({fetcheddata}) {
  console.log("heatmap data",fetcheddata)


  const [heatMapDataWithoutName,setheatMapDataWithoutName]=useState( fetcheddata.map((item) => ({
   
      name: "",
      data: item.data,

  })))


  const [state, setState] = useState({
    series: heatMapDataWithoutName
    // [
    //   {
    //     // name: "T01 +41807 R6",
    //     name: "",

    //     data: [50, 50, 50, 50],
    //   },
    //   {
    //     // name: "T02 +41807 R6",
    //     name: "",
    //     data: [50, 50, 20, 50],
    //   },
    //   {
    //     // name: "T03 +41807 R7",
    //     name: "",
    //     data: [50, 50, 20, 20],
    //   },
    //   {
    //     // name: "T04 +41807 R7",
    //     name: "",
    //     data: [50, 50, 20, 20],
    //   },
    //   {
    //     // name: "T05 +41807 R8",
    //     name: "",
    //     data: [50, 50, 50, 20],
    //   },
    //   {
    //     // name: "T06 +41807 R8",
    //     name: "",
    //     data: [50, 50, 50, 50],
    //   },
    //   {
    //     // name: "T07 +41807 R9",
    //     name: "",
    //     data: [50, 50, 50, 50],
    //   },
    //   {
    //     // name: "T08 +41807 R9",
    //     name: "",
    //     data: [50, 50, 50, 50],
    //   },
    //   {
    //     // name: "T09 +41807 R10",
    //     name: "",
    //     data: [50, 50, 50, 50],
    //   },
    //   {
    //     // name: "T10 +41807 R10",
    //     name: "",
    //     data: [50, 50, 50, 50],
    //   },
    //   {
    //     // name: "T11 +41807 R11",
    //     name: "",
    //     data: [50, 61, 50, 50],
    //   },
    //   {
    //     // name: "T12 +41807 R11",
    //     name: "",
    //     data: [61, 65, 61, 50],
    //   },
    //   {
    //     // name: "T13 +41807 R11",
    //     name: "",
    //     data: [70, 90, 70, 50],
    //   },
    //   {
    //     // name: "T14 +41807 R11",
    //     name: "",
    //     data: [61, 65, 61, 50],
    //   },
    //   {
    //     // name: "T15 +41807 R12",
    //     name: "",
    //     data: [50, 61, 50, 50],
    //   },
    //   {
    //     // name: "T16 +41807 R13",
    //     name: "",
    //     data: [50, 50, 50, 50],
    //   },
    //   {
    //     // name: "T17 +41807 R14",
    //     name: "",
    //     data: [50, 50, 50, 50],
    //   },
    //   {
    //     // name: "T18 +41807 R15",
    //     name: "",
    //     data: [50, 50, 50, 50],
    //   },
    // ]
    ,
    options: {
      chart: {
        height: 450,
        type: "heatmap",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.2,
          radius: 2,
          useFillColorAsStroke: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 30,
                // name: 'Stave temperature is lower than Lower limit',
                
                color: "#D9EF8B",
              },
              {
                from: 30,
                to: 60,
                // name: 'Stave temperature is in range',
                color: "#A6D96A",
              },
              {
                from: 61,
                to: 64,
                // name: 'Stave temperature is 1-5% higher than Upper limit temp',
                color: "#FEE08B",
              },
              {
                from: 65,
                to: 70,
                // name: 'Stave temperature is 5-10% higher than Upper limit temp',
                color: "#F46D43",
              },
              {
                from: 71,
                to: 100,
                // name: 'Stave temperature is 10% higher than Upper limit temp',
                color: "#F11308",
              },
            ],
          },

         
        },
      },
      dataLabels: {
        enabled: false,
      },
     
      legend:{
        show: false,
      }
    },
   
  });

  return (
    <div id="chart" className="w-full h-[400px]">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="heatmap"
        height="100%"
      />
    </div>
  );
}

export default Thermalheatmap;
