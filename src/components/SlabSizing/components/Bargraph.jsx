import ReactApexChart from "react-apexcharts";

const Bargraph = ({ series, options }) => {
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={250}
      />
    </div>
  );
};

export default Bargraph;
