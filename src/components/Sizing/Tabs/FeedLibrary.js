import { useState } from "react";
import PhotoGallery from "../SizingComponents/PhotoGallery";
import VideoGallery from "../SizingComponents/VideoGallery";

const FeedLibrary = () => {
  const [page, setPage] = useState("photo gallery");
  return (
    <div className="flex flex-col gap-0">
      <div className="flex gap-0 w-full">
        <div
          className={`flex items-center justify-center w-full p-2 cursor-pointer ${
            page === "photo gallery" && "bg-[#e1e9f6]"
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
            page === "video gallery" && "bg-[#e1e9f6]"
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
      {page==='photo gallery' && <PhotoGallery/>}
      {page==='video gallery' && <VideoGallery/>}
    </div>
  );
};

export default FeedLibrary;
