import CustomSizingBar from "../../Charts/SizingCharts/CustomSizingBar";

const PlantCard = () => {
  return (
    <div className="flex flex-col gap-4 pt-1 pb-4 p-6">
      <div className="flex justify-between">
        <p className="p-1 pl-2 pr-2 text-sm text-[#525056] font-medium">
          Camera 1
        </p>
        <p className="p-1 pl-2 pr-2 text-sm text-[#DC362E]">1 alert</p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex h-full items-center">
          <img className="w-[20vw] rounded-lg" src="https://media.istockphoto.com/id/1166589188/photo/mine-supervisor-walking-beside-raw-coal-ore-being-moved-and-transported-on-a-conveyor-belt.jpg?s=612x612&w=0&k=20&c=3XcI1vG0M3C8p018r0jrlCDCdLJiT3iYUmrcjZIqW9o=" alt="no Support"/>
        </div>
        <CustomSizingBar />
      </div>
      <div className="flex justify-end">
        <div className="flex gap-4 items-center">
          <p className="text-xs text-[#938F96]">Last Update</p>
          <p className="text-sm text-[#79767D]">12:45 pm</p>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
