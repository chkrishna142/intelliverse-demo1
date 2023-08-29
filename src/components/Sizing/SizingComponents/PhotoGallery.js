import { useState } from "react";
import LibraryGrid from "./LibraryGrid";
import { Select } from "@chakra-ui/react";

const PhotoGallery = ({plantId, cameraId}) => {
  const [showType, setShowType] = useState("today");
  return (
    <div className="bg-white pl-6 pr-6 flex flex-col gap-6">
      <div className="flex pt-5 gap-4 items-start">
        <div>
          <Select
            borderColor="#CAC5CD"
            color="#605D64"
            placeholder={plantId}
            variant="outline"
            isDisabled={plantId !== "All Plants"}
            className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
          />
        </div>
        {plantId !== "All Plants" && (
          <div>
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              placeholder={cameraId}
              variant="outline"
              isDisabled={cameraId !== ""}
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
            />
          </div>
        )}
        <div>
          <Select
            borderColor="#CAC5CD"
            color="#605D64"
            placeholder="Today"
            variant="outline"
            className="!rounded-2xl"
          />
        </div>
      </div>
      <LibraryGrid />
    </div>
  );
};

export default PhotoGallery;
