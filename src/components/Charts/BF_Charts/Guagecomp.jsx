import GaugeChart from "react-gauge-chart";

function Guagecomp() {


    // const customNeedle = (
    //     <circle cx="50%" cy="50%" r="12%" fill="red" stroke="#464A4F" strokeWidth="2" />
    //   );

      const customNeedle = (
        <rect x="48.5%" y="5%" width="3%" height="50%" fill="green" />
      );


  return (
    <div style={{ position: 'relative'}} className="w-full ">
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={10}
        animate={false}
        arcsLength={[0.25, 0.25, 0.25, 0.25]}
        colors={[
          "rgba(105, 176, 75, 0.20)",
          "#BDD9B1",
          "rgba(105, 176, 75, 0.60)",
          "#69B04B",
        ]}
        needleCustom={customNeedle}
        
        percent={0.94}
        arcPadding={0.03}
        arcWidth={0.45}
        textColor={"#000"}
        hideText={true}
        needleColor={"#BDD9B1"}
        needleBaseColor	={"#464A4F"}
      />
      <div
        
        className="absolute  top-[160%] left-[40%]  text-center text-2xl font-semibold"
      >
        94%
        <p className="text-[18px] text-[#938F96]">Current</p>
      </div>
    </div>
  );
}

export default Guagecomp;
