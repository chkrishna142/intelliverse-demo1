import { saveAs } from "file-saver";
import Paginator from "../../../util/VisionUtils/Paginator";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Checkbox } from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import { indexWordMap } from "../Sinterflame";
import CompareModal from "./CompareModal";

const LibraryGrid = ({ plantName, img }) => {
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
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

  useEffect(() => {
    if (img.length == 0) setDisplayData([]);
  }, [img]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-baseline">
        <div className="flex gap-2 items-baseline">
          <p className="text-[#3E3C42] font-medium text-xl capitalize">
            {plantName}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 items-center">
          <Button
            onClick={() => setOpenModal(true)}
            isDisabled={selectedPoints.length < 2}
            size="sm"
            colorScheme="facebook"
          >
            {`Compare (${selectedPoints.length}/4)`}
          </Button>
          {img.length != 0 && (
            <Paginator data={img} limit={20} setDisplayData={setDisplayData} />
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1750px]:grid-cols-5 min-[2200px]:grid-cols-6 gap-1 overflow-y-scroll h-[80vh]">
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
                <Checkbox
                  isChecked={selectedPoints.some((item) => item.id == x.id)}
                  isDisabled={
                    !selectedPoints.some((item) => item.id == x.id) &&
                    selectedPoints.length == 4
                  }
                  onChange={() => handleChange(x)}
                />
              </div>
              <img className="rounded-lg" src={x.annotatedImage} />
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
              </div>
            </div>
          );
        })}
      </div>
      {openModal && (
        <CompareModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          data={selectedPoints}
          setData={setSelectedPoints}
        />
      )}
    </div>
  );
};

export default LibraryGrid;
