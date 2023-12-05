import { saveAs } from "file-saver";
import Paginator from "../../../util/VisionUtils/Paginator";
import { useState, useEffect } from "react";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const LibraryGrid = ({ plantName, img }) => {
  const [displayData, setDisplayData] = useState([]);
  const ImgDownload = (url, idx) => {
    const blob = new Blob([url], { type: "image/jpeg" });
    saveAs(url, `image-${idx}.jpg`);
  };
  useEffect(() => {
    if (img.length == 0) setDisplayData([]);
  }, [img]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p className="text-[#3E3C42] font-medium text-xl">
          {Capitalize(plantName)}
        </p>
        {/* <button className="text-white text-sm font-medium bg-[#447ED4] p-3 pt-1 pb-1 rounded-full">
          Download all
        </button> */}
        {img.length != 0 && (
          <Paginator data={img} limit={20} setDisplayData={setDisplayData} />
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 overflow-y-scroll h-[80vh]">
        {displayData.map((x, id) => {
          return (
            <div key={id} className="relative w-full object-cover text-center">
              <div className="bg-black rounded-md opacity-70 p-[2px] absolute top-2 left-2">
                <p className="text-white text-xs font-semibold">{x.cameraId}</p>
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
              <img className="rounded-lg" src={x.originalImage} />
              <div className="flex gap-4 absolute bottom-2 right-2 opacity-0 hover:opacity-75">
                {/* <img src="/SizingIcons/ShareIcon.svg" alt="" /> */}
                <img
                  className="cursor-pointer rounded-full"
                  src="/SizingIcons/DownloadIcon.svg"
                  alt=""
                  onClick={() => ImgDownload(x.originalImage, x.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LibraryGrid;
