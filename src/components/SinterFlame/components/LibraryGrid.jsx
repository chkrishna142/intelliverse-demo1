import { saveAs } from "file-saver";
import Paginator from "../../../util/VisionUtils/Paginator";
import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { indexWordMap } from "../Sinterflame";

const LibraryGrid = ({ plantName, img }) => {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const size = useWindowSize();
  const ImgDownload = (url, idx) => {
    const blob = new Blob([url], { type: "image/jpeg" });
    saveAs(url, `image-${idx}.jpg`);
  };

  const handleChange = (val) => {
    setSelectedPoints((prev) => {
      let updatedData = [...prev];
      let idx = updatedData.findIndex((item) => item.id === val.id);

      if (idx !== -1) {
        // If the item is found, remove it from the array
        updatedData.splice(idx, 1);
      } else {
        // If the item is not found, add it to the array
        updatedData.push(val);
      }

      return updatedData;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 items-baseline">
          <p className="text-[#3E3C42] font-medium text-xl capitalize">
            {plantName}
          </p>
          <p className="text-sm text-[#3E3C42]">
            {size.width <= 600
              ? `(${selectedPoints.length}/4)`
              : `(${selectedPoints.length} prediction selected out of 4)`}
          </p>
        </div>
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
              <div className="flex flex-col items-center gap-2 absolute top-[40px] right-2 opacity-50 hover:opacity-100">
                {/* <img src="/SizingIcons/ShareIcon.svg" alt="" /> */}
                <img
                  className="cursor-pointer rounded-full"
                  src="/SizingIcons/DownloadIcon.svg"
                  alt=""
                  onClick={() => ImgDownload(x.originalImage, x.id)}
                />
                <p className="text-white text-xs p-1 font-semibold bg-black rounded-lg">
                  {x.healthIndex + "/5"}
                </p>
                <p className="text-white text-xs p-1 font-semibold bg-black rounded-lg">
                  {indexWordMap[x.healthIndex]}
                </p>
                <Checkbox
                  isChecked={selectedPoints.some((item) => item.id == x.id)}
                  isDisabled={
                    !selectedPoints.some((item) => item.id == x.id) &&
                    selectedPoints.length == 4
                  }
                  onChange={() => handleChange(x)}
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
