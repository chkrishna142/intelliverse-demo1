import { saveAs } from "file-saver";
import Paginator from "../../../util/VisionUtils/Paginator";
import { useState } from "react";

const LibraryGrid = ({ plantName, img }) => {
  const [displayData,setDisplayData] = useState([]);
  const ImgDownload = (url, idx) => {
    const blob = new Blob([url], { type: 'image/jpeg' });
    saveAs(url, `image-${idx}.jpg`);
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between">
        <p className="text-[#3E3C42] font-medium text-xl capitalize">CU 1</p>
        {img.length != 0 && <Paginator data={img} limit={20} setDisplayData={setDisplayData}/>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 overflow-y-scroll h-[80vh]">
        {[...Array(10)].map((x, id) => {
          return (
            <div key={id} className="relative w-full object-cover text-center">
              <div className="bg-black rounded-md opacity-70 p-[2px] absolute top-2 left-2">
                <p className="text-white text-xs font-semibold">Cam</p>
              </div>
              <div className="flex gap-2 absolute top-2 right-2">
                <div className="bg-black rounded-md opacity-70 p-[2px]">
                  <p className="text-white text-xs font-semibold bg-black rounded-lg">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-black rounded-md opacity-70 p-[2px]">
                  <p className="text-white text-xs font-semibold bg-black rounded-lg">
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <img className="rounded-lg" src='/BlendComplianceIcons/images/hopper.jpg' />
              <div className="flex gap-4 absolute bottom-2 right-2 opacity-0 hover:opacity-75">
                {/* <img src="/SizingIcons/ShareIcon.svg" alt="" /> */}
                <img
                  className="cursor-pointer rounded-full"
                  src="/SizingIcons/DownloadIcon.svg"
                  alt=""
                  onClick={() => ImgDownload("" , "")}
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