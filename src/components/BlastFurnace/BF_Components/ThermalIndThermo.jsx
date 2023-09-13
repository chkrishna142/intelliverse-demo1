import React from "react";
import Thermometer from "react-thermometer-ecotropy";

function ThermalIndThermo({ temperature, maxTemperature }) {
  //   const temperature = 600; // Example temperature point (adjust as needed)
  //   const maxTemperature = 1000; // Max temperature value

  // const heightPercent=(temperature/maxTemperature)*100;

  // const temperaturePercentage = (temperature / maxTemperature) * 100;
  // let markHeight = "50px"; // Default mark height

  // if((heightPercent >= 0 && heightPercent <= 5)|| (heightPercent > 95 && heightPercent <= 100))
  // {
  //   markHeight = "92px"; // Adjust for the specific temperature range
  // }
  // else if((heightPercent > 5 && heightPercent <= 10)||  (heightPercent > 90 && heightPercent <= 95) )
  // {
  //   markHeight = "74px"; // Adjust for the specific temperature range
  // }
  // else if((heightPercent >10 && heightPercent <= 15) )
  // {
  //   markHeight = "62px"; // Adjust for the specific temperature range
  // }
  // else if((heightPercent >15 && heightPercent <= 20) || (heightPercent >80 && heightPercent <= 85)  )
  // {
  //   markHeight = "60px"; // Adjust for the specific temperature range
  // }
  // else if((heightPercent >20 && heightPercent <= 25)|| (heightPercent > 75 && heightPercent <= 80)  )
  // {
  //   markHeight = "50px"; // Adjust for the specific temperature range
  // }
  // else if ((heightPercent >25 && heightPercent <= 30) ||  (heightPercent > 70 && heightPercent <= 75) ){
  //   markHeight = "47px"; // Adjust for the specific temperature range
  // }
  // else if ((heightPercent > 30 && heightPercent <= 35) || (heightPercent > 65 && heightPercent <= 70) ){
  //   markHeight = "40px"; // Adjust for the specific temperature range
  // }
  // else if ((heightPercent > 35 && heightPercent <= 40) || (heightPercent > 60 && heightPercent <= 65)) {
  //   markHeight = "35px"; // Adjust for the specific temperature range
  // }
  // else if ((heightPercent >40 && heightPercent <= 45) || (heightPercent > 55 && heightPercent <= 60)) {
  //   markHeight = "30px"; // Adjust for the specific temperature range
  // }
  // else if (heightPercent > 45 &&  heightPercent <= 55) {
  //   markHeight = "30px"; // Adjust for the specific temperature range
  // }
  // else if( (heightPercent >85 && heightPercent <= 90) )
  // {
  //   markHeight = "70px"; // Adjust for the specific temperature range
  // }

  // const lineStyle = {
  //   position: "absolute",
  //   bottom: "0",
  //   left: temperature > maxTemperature ? "100%" : `${temperaturePercentage}%`,
  //   height:temperature > maxTemperature ? "90px" : `${markHeight}`,
  //   width: "5px",
  //   background: "black",
  // };

  const temp = temperature;
  if (temperature > maxTemperature) {
    maxTemperature = temperature
  }

  return (
    <div className="w-full h-full relative  flex justify-center items-center">
      {/* <img src="/Bficons/thermalindicator.svg" alt="" style={{ width: "100%" }} />
      <div style={lineStyle}></div> */}
      <Thermometer
        theme="light"
        value={temperature}
        max={maxTemperature}
        steps=""
        format="°C"
        size="normal"
        height="250"
        reverseGradient={true}
      />
      
    </div>
  );
}

export default ThermalIndThermo;
