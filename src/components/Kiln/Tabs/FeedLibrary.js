import { useState } from "react";
import PhotoGallery from "../KilnComponents/PhotoGallery";
import VideoGallery from "../KilnComponents/VideoGallery";

const FeedLibrary = ({ plantId, cameraId, disable, plantCamMap }) => {
  const [page, setPage] = useState("photo gallery");
  return (
    <div className="flex flex-col gap-0">
      <div className="flex gap-0 w-full">
        <div
          className={`flex items-center justify-center w-full p-2 cursor-pointer ${
            page === "photo gallery" && "bg-white rounded-tl-xl"
          }`}
          onClick={() => setPage("photo gallery")}
        >
          <p
            className={
              page === "photo gallery"
                ? "text-[#2660B6] text-base font-medium"
                : "text-[#605D64] text-base"
            }
          >
            Photo Gallery
          </p>
        </div>
        <div
          className={`flex items-center justify-center w-full p-2 cursor-pointer ${
            page === "video gallery" && "bg-white rounded-tr-xl"
          }`}
          onClick={() => setPage("video gallery")}
        >
          <p
            className={
              page === "video gallery"
                ? "text-[#2660B6] text-base font-medium"
                : "text-[#605D64] text-base"
            }
          >
            Video Gallery
          </p>
        </div>
      </div>
      {page === "photo gallery" &&
        (disable || Object.keys(plantCamMap).length != 0) && (
          <PhotoGallery
            plantId={disable ? plantId : Object.keys(plantCamMap)[0]}
            cameraId={
              disable ? cameraId : plantCamMap[Object.keys(plantCamMap)[0]][0]
            }
            disable={disable}
            plantCamMap={plantCamMap}
          />
        )}
      {page === "video gallery" && (
        <VideoGallery
          plantId={plantId}
          cameraId={cameraId}
          disable={disable}
          plantCamMap={plantCamMap}
        />
      )}
    </div>
  );
};

export default FeedLibrary;
