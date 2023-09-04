import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Linechart = ({chart}) => {

 
  

  return (
    <div id="chart" className="h-full w-full ">
      <ReactApexChart
        options={chart.options}
        series={chart.series}
        type="line"
        height={"100%"}
        // width={"100%"}
      />
    </div>
  );
};

export default Linechart;
