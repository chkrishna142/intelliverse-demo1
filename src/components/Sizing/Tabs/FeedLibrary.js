import { useState } from "react";
import { Select } from "@chakra-ui/react";
import LibraryGrid from "../SizingComponents/LibraryGrid";

const FeedLibrary = () => {
  const [page, setPage] = useState("photo gallery");
  const [showType, setShowType] = useState("today");
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
      <div className="bg-white pl-6 pr-6 flex flex-col gap-6">
        <div className="flex flex-col pt-5 gap-4 items-start">
          <div>
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              placeholder="Jaffrabad"
              variant="outline"
              className="!rounded-full"
            />
          </div>
          <div className="flex gap-2 items-center">
            <p
              className={
                showType === "today"
                  ? "text-[#525056] rounded-full bg-blue-100 text-sm p-1 pl-2 pr-2"
                  : "text-[#605D64] font-medium text-sm p-1 pl-2 pr-2 cursor-pointer"
              }
              onClick={() => setShowType("today")}
            >
              Today
            </p>
            <p
              className={
                showType === "yesterday"
                  ? "text-[#525056] rounded-full bg-blue-100 text-sm p-1 pl-2 pr-2"
                  : "text-[#605D64] font-medium text-sm p-1 pl-2 pr-2 cursor-pointer"
              }
              onClick={() => setShowType("yesterday")}
            >
              Yesterday
            </p>
            <p
              className={
                showType === "custom"
                  ? "text-[#525056] rounded-full bg-blue-100 text-sm p-1 pl-2 pr-2"
                  : "text-[#605D64] font-medium text-sm p-1 pl-2 pr-2 cursor-pointer"
              }
              onClick={() => setShowType("custom")}
            >
              Custom
            </p>
          </div>
        </div>
        <LibraryGrid />
      </div>
    </div>
  );
};

export default FeedLibrary;
