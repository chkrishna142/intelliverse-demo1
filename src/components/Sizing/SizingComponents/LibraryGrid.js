const LibraryGrid = () => {
  const img = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1,
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p className="text-[#3E3C42] font-medium text-xl">Jaffrabad</p>
        <button className="text-white text-sm font-medium bg-[#447ED4] p-1 pl-3 pr-3 rounded-full">
          Download all
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1">
        {img.map((x) => {
          return (
            <div className="w-[20vw] object-cover text-center">
              <img
                className="rounded-lg"
                src="https://media.istockphoto.com/id/1166589188/photo/mine-supervisor-walking-beside-raw-coal-ore-being-moved-and-transported-on-a-conveyor-belt.jpg?s=612x612&w=0&k=20&c=3XcI1vG0M3C8p018r0jrlCDCdLJiT3iYUmrcjZIqW9o="
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LibraryGrid;
