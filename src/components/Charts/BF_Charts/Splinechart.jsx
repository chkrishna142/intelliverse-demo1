import ReactApexChart from "react-apexcharts";

const Splinechart = ({chart}) => {
  

  return (
    <div id="chart" className="h-full w-full ">
      
        <ReactApexChart options={chart.options}
        series={chart.series}
      
        height={"100%"} type="area" />

    </div>
  );
};

export default Splinechart;
