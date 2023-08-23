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
            <div className="relative w-[20vw] object-cover text-center">
              <div className="bg-black rounded-md opacity-70 p-[2px] absolute top-2 left-2">
                <p className="text-white text-xs font-semibold">Camera 1</p>
              </div>
              <div className="flex gap-2 absolute top-2 right-2">
                <div className="bg-black rounded-md opacity-70 p-[2px]">
                  <p className="text-white text-xs font-semibold bg-black rounded-lg">
                    {new Date().toString().slice(3, 15)}
                  </p>
                </div>
                <div className="bg-black rounded-md opacity-70 p-[2px]">
                  <p className="text-white text-xs font-semibold bg-black rounded-lg">
                    {new Date().toTimeString().slice(0, 9)}
                  </p>
                </div>
              </div>
              <img
                className="rounded-lg"
                src="https://media.istockphoto.com/id/1166589188/photo/mine-supervisor-walking-beside-raw-coal-ore-being-moved-and-transported-on-a-conveyor-belt.jpg?s=612x612&w=0&k=20&c=3XcI1vG0M3C8p018r0jrlCDCdLJiT3iYUmrcjZIqW9o="
              />
              <div className="flex gap-4 absolute bottom-2 right-2 opacity-0 hover:opacity-75">
                <p className="text-black text-xs bg-white p-[2px] rounded-md">Share</p>
                <p className="text-black text-xs bg-white p-[2px] rounded-md">Download</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LibraryGrid;
