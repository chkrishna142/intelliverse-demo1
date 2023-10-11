import VideoInputForm from "./VideoInputForm";
import { useState, useRef } from "react";
import saveAs from "file-saver";

const VideoGallery = ({ plantId, cameraId, disable, plantCamMap }) => {
  const [isVideo, setIsVideo] = useState("");
  const VidDownload = async (url, idx) => {
    const response = await fetch(url);
    const videoData = await response.blob();
    saveAs(videoData, `video-${idx}.mp4`);
  };
  return (
    <div className="bg-white relative flex flex-col xl:flex-row p-10 rounded-xl gap-8 items-center justify-between">
      {isVideo == "" ? (
        <div className="flex flex-col gap-6 items-center h-full">
          <img src="/SizingIcons/VideoPlayer.svg" alt="No support" />
          <div className="flex flex-col gap-2 items-center">
            <p className="text-[#1C56AC] text-2xl font-medium">Video Gallery</p>
            <p className="text-[#AEA9B1] text-base text-center">
              The Video gallery will create a continuous video frame of the
              captured pictures from your selected date and time range.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex relative items-center">
          <video
            crossOrigin="anonymous"
            controls
            muted
            autoPlay
            className="rounded-lg w-[45vw]"
          >
            <source src={isVideo} type="video/mp4" />
          </video>
          <div className="flex gap-4 absolute top-2 right-2 opacity-40 hover:opacity-90">
            {/* <img src="/SizingIcons/ShareIcon.svg" alt="" /> */}
            <img
              className="cursor-pointer rounded-full"
              src="/SizingIcons/DownloadIcon.svg"
              alt=""
              onClick={() => VidDownload(isVideo, "sample")}
            />
          </div>
        </div>
      )}
      <VideoInputForm
        setIsVideo={setIsVideo}
        plantId={plantId}
        cameraId={cameraId}
        disable={disable}
        plantCamMap={plantCamMap}
      />
    </div>
  );
};

export default VideoGallery;