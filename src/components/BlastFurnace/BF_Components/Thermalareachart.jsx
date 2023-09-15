import { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Thermalareachart = ({fetcheddata}) => {

// console.log("thermal area-->",fetcheddata)
const [rangeAreaData,setRangeAreaData]=useState( fetcheddata.map((item) => ({
  x: item.x,
  y: item.y,
})))

const [lineAreaData,setLineAreaData]=useState(fetcheddata.map((item) => ({
  x: item.x,
  y: item.z,
})))







  const [state, setState] = useState({

    series: [
       {

        type: 'rangeArea',
        name: 'Optimal Range',
        data: rangeAreaData,
        // [
        //   {
        //     x: 'T18 +41807 R15',
        //     y: [21, 29]
           
        //   },
        //   {
        //     x: 'T17 +41807 R14',
        //     y: [61, 45]
           
        //   },
        //   {
        //     x: 'T16 +41807 R13',
        //     y: [61, 55]
           
        //   },
        //   {
        //     x: 'T15 +41807 R12',
        //     y: [51, 30]
        //   },
        //   {
        //     x: 'T14 +41807 R11',
        //     y: [41, 30]
        //   },
        //   {
        //     x: 'T13 +41807 R11',
        //     y: [31, 20]
        //   },
        //   {
        //     x: 'T12 +41807 R11',
        //     y: [41, 50]
        //   },
        //   {
        //     x: 'T11 +41807 R11',
        //     y: [61, 69]
        //   },
        //   {
        //     x: 'T09 +41807 R10',
        //     y: [41, 49]
        //   },
        //   {
            
           
        //     x: 'T10 +41807 R10',
        //     y: [31, 39]
        //   },
        //   {
            
            
        //     x: 'T08 +41807 R9',
        //     y: [21, 29]
        //   },
        //   {
        //     x: 'T07 +41807 R9',
        //     y: [43, 46]
        //   },
        //   {
            
        //     x: 'T06 +41807 R8',
        //     y: [54, 67]
        //   },
        //   {
            
        //     x: 'T05 +41807 R8',
        //     y: [51, 59]
        //   },
        //   {
           
        //     x: 'T04 +41807 R7',
        //     y: [34, 39]
        //   },
        //   {
        //     x: 'T03 +41807 R7',
        //     y: [39, 49]
            
        //   },
        //   {
            
        //     x: 'T02 +41807 R6',
        //     y: [42, 52]
        //   },
        //   {
            
        //     x: 'T01 +41807 R6',
        //     y: [30, 34]
        //   },

        // ],
        // tooltip: {
        //   headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>', // Customize the tooltip header
        //   pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y[0]} - {point.y[1]}</b><br/>' // Customize the tooltip content
        // }
      },


      {

        type: 'line',
        name: 'Current Temperature',
        data: lineAreaData,
        // [
        //   {
        //     x: 'T18 +41807 R15',
        //     y: 21,
           
        //   },
        //   {
        //     x: 'T17 +41807 R14',
        //     y: 61,
           
        //   },
        //   {
        //     x: 'T16 +41807 R13',
        //     y: 71
           
        //   },
        //   {
        //     x: 'T15 +41807 R12',
        //     y: 51
        //   },
        //   {
        //     x: 'T14 +41807 R11',
        //     y: 41
        //   },
        //   {
        //     x: 'T13 +41807 R11',
        //     y: 31
        //   },
        //   {
        //     x: 'T12 +41807 R11',
        //     y: 41
        //   },
          
        //   {
        //     x: 'T11 +41807 R11',
        //     y: 61
        //   },
        //   {
        //     x: 'T09 +41807 R10',
        //     y:41,
        //   },
        //   {
            
           
        //     x: 'T10 +41807 R10',
        //     y: 31
        //   },
        //   {
            
            
        //     x: 'T08 +41807 R9',
        //     y: 21
        //   },
        //   {
        //     x: 'T07 +41807 R9',
        //     y: 43
        //   },
        //   {
            
        //     x: 'T06 +41807 R8',
        //     y: 54
        //   },
        //   {
            
        //     x: 'T05 +41807 R8',
        //     y: 51
        //   },
        //   {
           
        //     x: 'T04 +41807 R7',
        //     y: 34
        //   },
        //   {
        //     x: 'T03 +41807 R7',
        //     y: 39
            
        //   },
        //   {
            
        //     x: 'T02 +41807 R6',
        //     y: 42
        //   },
        //   {
            
        //     x: 'T01 +41807 R6',
        //     y: 30
        //   },
        // ],
        // tooltip: {
        //   headerFormat: '<span style="font-size: 12px">{point.key}</span><br/>', // Customize the tooltip header
        //   pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>' // Customize the tooltip content
        // }
      }
    ],
    options: {
      chart: {
        parentHeightOffset: 0,

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
          
         // offsetX: -15,
          offsetY: -0,
          rotate: -90,
          //rotateAlways: true,
          style: {
            colors: [],  
            fontSize: '10px',

          },


        },
        tooltip: {
          enabled: false,
        },
        
      },
      
      yaxis: {

        opposite: true,
        labels:{
          rotate: -90,
        }

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
      grid: {
        show: true,
        borderColor: '#EBEBEB',
        strokeDashArray: 4,
        width:4,
        position: 'back',
        xaxis: {
            lines: {
                show: true,

            }
        }, 
        yaxis: {
          lines: {
              show: false
          }
      }, 
        padding: {
          bottom: 50,
        },
      },
      tooltip: {
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          var data1 = w.globals.initialSeries[0].data[dataPointIndex];
          var data2 = w.globals.initialSeries[1].data[dataPointIndex];
         
          return '<div class="relative bg-white border border-gray-300  shadow-md rounded-md flex p-9 flex-col gap-[15px] h-[200px] w-[120px]" >' +
          '<p class="absolute bottom-[29%] left-[-40px] font-bold mb-2 rotate-[-90deg] mt-4"> ' + data1.x +':'+ '</p>' + 
          '<p  class="absolute bottom-[43%] left-[14px] font-normal rotate-[-90deg]"> Optimal Range: '+"[" + data1.y[0]+"-"+ data1.y[1]+ "]"+'</p>' +
          '<p class="absolute bottom-[20%] left-[7px] font-normal mb-2 rotate-[-90deg] bg-green-200 p-2"> Current: '+  data2.y+'</p>' +
          
          '</div>';
        },
        fixed: {
          enabled: true,
          position: "bottomLeft",
          offsetX: 0,
          offsetY: 0,
        },
      }
      
        
     

    },
  });





  return (

    // <div id="chart-container" className="">
    // <div id="chart"
    //   className=" w-full h-full flex justify-center -mt-10 items-center "
    // >
    <div id="chart" className="w-full h-full flex justify-end -mt-10 items-center space-x-4  rotate-90">

      <ReactApexChart
        options={state.options}
        series={state.series}
        type="rangeArea"
        height="100%"  
        width="125%"   
        // className="rotate-90"
      />
    </div>
    //  </div>

  );
};

export default Thermalareachart;
