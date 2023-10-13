import ReactApexChart from "react-apexcharts";

const ReportPiechart = ({piechartdata,labelData,name}) => {
   

    const series = piechartdata;
   
  
    const options = {
      chart: {
        type: "pie",
      },
      colors: [`${name=="Thermal Stability"?"#6CA6FC":"#EF6F12"}`,`${name=="Stability"?"#6CA6FC":"#CDEEBF"}`,`${name=="Stability"?"#CDEEBF":  (name=="Thermal Stability"?"#EF6F12":"#6CA6FC" )  }` ],
      labels: labelData,
      legend: {
        show: true,
        position: "bottom",
        fontSize: "16px",
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
        },
        background: {
          enabled: true,
          foreColor: "#000",
        },
        dropShadow: {
          enabled: false,
        },
      },
    };
    return <ReactApexChart options={options} series={series} type="pie" />;
  };
  export default ReportPiechart;