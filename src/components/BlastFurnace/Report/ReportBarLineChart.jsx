import ReactApexChart from "react-apexcharts";

const ReportBarLineChart = ({
  barGraphName1,
  barGraphName2,
  barGraphName3,
  barGraphData1,
  barGraphData2,
  barGraphData3,
 
  timeRange,
  name,
  appendValue,
}) => {
  const series = [
    {
      name: barGraphName1,
      type: "column",
      data: barGraphData1,
    },
    {
      name: barGraphName2,
      type: "column",
      data: barGraphData2,
    },
    {
      name: barGraphName3,
      type: "column",
      data: barGraphData3,
    },
  
  ];

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
     
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
        },

        autoSelected: "zoom",
      },
    },
    stroke: {
      width: [0, 0, 0],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
      },
    },
    colors:name == 'Thermal Stability' ? ["#CDEEBF","#6CA6FC","#EF6F12"] : ["#CDEEBF","#EF6F12","#6CA6FC"],

    // fill: {
    //   opacity: [0.8, 0.8, 0.8],
    //   gradient: {
    //     inverseColors: false,
    //     shade: "light",
    //     type: "vertical",
    //     opacityFrom: 0.85,
    //     opacityTo: 0.55,
    //     stops: [0, 100, 100, 100],
    //   },
    // },

    markers: {
      size: 0,
    },
    xaxis: {
      type: "category",
      categories: timeRange,
      // [
      //   "01/01/2003",
      //   "02/01/2003",
      //   "03/01/2003",
      //   "04/01/2003",
      //   "05/01/2003",
      //   "06/01/2003",
      //   "07/01/2003",
      // ],
      labels: {
        show: true,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: true,
        style: {
          
          fontSize: "12px",
          fontWeight: 300,
          cssClass: "apexcharts-xaxis-label",
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: [
      {
        // title: {
        //   text: barGraphName,
        // },
        labels: {
          formatter: function (y) {
            return y + appendValue;
          },
        },
      },

      // {
      //   opposite: true,
      //   title: {
      //     text: isfuelChecked?"Fuel":"",
      //   }
      // },

      // {
      //   opposite: true,
      //   title: {
      //     text: isProdChecked?"Production":"",
      //   }
      // }

      ,
    ],

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + "%";
          }
          return y;
        },
      },
    },
  };

 

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={280}
      />
    </div>
  );
};

export default ReportBarLineChart;
