import { useState } from "react";
import LibraryGrid from "./LibraryGrid";
import { Select } from "@chakra-ui/react";

const PhotoGallery = () => {
    const [showType, setShowType] = useState("today");
  return (
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
  );
};

export default PhotoGallery;
