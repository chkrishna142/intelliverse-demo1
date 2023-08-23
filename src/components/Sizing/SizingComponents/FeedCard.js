import PlantCard from "./PlantCard";

const FeedCard = () => {
  return (
    <div className="flex flex-col bg-white rounded-xl pt-4 gap-1">
      <div className="flex justify-between pl-6 pr-6">
        <p className="text-xl font-medium">Plant Name</p>
        <div className="flex gap-4 items-center">
          <p className="rounded-lg border-2 text-xs border-red-400 pl-2 pr-2 pt-1 pb-1 bg-[#F9DEDC]">
            4 alerts
          </p>
          <p className="text-[#DC362E] text-sm font-medium cursor-pointer">
            See Detail
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2">
          <PlantCard />
          <PlantCard />
        </div>
    </div>
  );
};

export default FeedCard;
