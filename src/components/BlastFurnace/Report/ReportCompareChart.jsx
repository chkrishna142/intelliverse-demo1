import ReactApexChart from "react-apexcharts";

const ReportCompareChart = ({
  lineData,
   selectedCategory,
   selectedCategoryBar,
  timeRange,
  name,
  appendValue,
}) => {
  const series = [
    {
      name: selectedCategory,
      type: "column",
      data: selectedCategoryBar,
    },
    {
      name: name,
      type: "line",
      data:lineData,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      
    },
    stroke: {
      width: [0, 2],
    },
    title: {
      // text: 'Traffic Sources'
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: timeRange,
    colors:["#6CA6FC","#FFC107"],
    yaxis: [{
      title: {
        text: selectedCategory,
      },
      labels: {
        formatter: function (y) {
          return y + appendValue;
        },
      },
      max:100,
      min:0,
      
    
    }, {
      opposite: true,
      title: {
        text: name
      }
    }]
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={310}
      />
    </div>
  );
};

export default ReportCompareChart;
