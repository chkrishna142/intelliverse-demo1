import React from "react";
import ReactApexChart from "react-apexcharts";

function RcawaterfallChart({series,options}) {
 

  return (
    <div id="chart" className="w-full">
      <ReactApexChart options={options} series={series} type="rangeBar" height={350} />
    </div>
  );
}

export default RcawaterfallChart;
