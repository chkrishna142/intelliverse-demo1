import { useEffect, useState } from "react";
import Paginator from "../../../util/VisionUtils/Paginator";

const ImageLibrary = ({ img }) => {
  console.log("imglib", img);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (img.length == 0) setDisplayData([]);
  }, [img]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        {/* <button className="text-white text-sm font-medium bg-[#447ED4] p-3 pt-1 pb-1 rounded-full">
        Download all
      </button> */}
        {img.length != 0 && (
          <Paginator data={img} limit={6} setDisplayData={setDisplayData} />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-1 overflow-y-scroll h-[80vh]">
        {displayData.map((x, id) => {
          return (
            <div
              key={id}
              className="relative w-full object-cover text-center p-2"
            >
              <div className="bg-black rounded-md opacity-70 p-[2px] absolute top-2 left-2">
                <p className="text-white text-xs font-semibold">
                  {x.cameraId} {x.view}
                </p>
              </div>
              <div className="flex gap-2 absolute top-2 right-2">
                <div className="bg-black rounded-md opacity-70 p-[2px]">
                  <p className="text-white text-xs font-semibold bg-black rounded-lg">
                    {new Date(x.timestamp).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-black rounded-md opacity-70 p-[2px]">
                  <p className="text-white text-xs font-semibold bg-black rounded-lg">
                    {new Date(x.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <img
                className="rounded-lg w-full h-[280px]"
                src={x.originalImage}
              />
              <div className="flex gap-4 absolute bottom-2 right-2 opacity-0 hover:opacity-75">
                {/* <img src="/SizingIcons/ShareIcon.svg" alt="" /> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageLibrary;
