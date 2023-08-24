import CustomSizingBar from "../../Charts/SizingCharts/CustomSizingBar";

const PlantCard = ({ cameraName, data, alert }) => {
  return (
    <div className="flex flex-col gap-4 pt-1 pb-4 p-6">
      <div className="flex justify-between">
        <p className="p-1 pl-2 pr-2 text-sm text-[#525056] font-medium">
          {cameraName}
        </p>
        {alert !== 0 && (
          <p className="p-1 pl-2 pr-2 text-sm text-[#DC362E]">{alert} alert</p>
        )}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex h-full items-center">
          <img
            className="w-[20vw] rounded-lg"
            src={data.originalImage}
            alt="no Support"
          />
        </div>
        {data.noCoal !== 1 ? <CustomSizingBar size={data.size}/> : <div className="flex items-center justify-center text-black font-bold text-center text-2xl"><p>No Sinter on Belt</p></div>}
      </div>
      <div className="flex justify-end">
        <div className="flex gap-4 items-center">
          <p className="text-xs text-[#938F96]">Last Update</p>
          <p className="text-sm text-[#79767D]">
            {data.timestamp.slice(10, 19)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
