import VideoInputForm from "./VideoInputForm";
import { useState,useRef } from "react";
import VideoHistoryDrawer from "./VideoHistoryDrawer";

const VideoGallery = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div className="relative flex p-10 rounded-xl gap-8 items-center justify-between">
      <img
        className="absolute top-3 right-3 cursor-pointer"
        src="/SizingIcons/Hamburger.svg"
        alt="no Support"
        onClick={()=>setIsDrawerOpen(true)}
      />
      {isDrawerOpen && <VideoHistoryDrawer isOpen={isDrawerOpen} onClose={closeDrawer}/>}
      <div className="flex flex-col gap-6 items-center">
        <img src="/SizingIcons/VideoPlayer.svg" alt="No support" />
        <div className="flex flex-col gap-2 items-center">
          <p className="text-[#1C56AC] text-2xl font-medium">Video Gallery</p>
          <p className="text-[#AEA9B1] text-base text-center">
            The Video gallery will create a continuous video frame of the
            captured pictures from your selected date and time range.
          </p>
        </div>
      </div>
      <VideoInputForm />
    </div>
  );
};

export default VideoGallery;
