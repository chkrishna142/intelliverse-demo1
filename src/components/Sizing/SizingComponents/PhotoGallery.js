import { useState } from "react";
import LibraryGrid from "./LibraryGrid";
import { Select } from "@chakra-ui/react";

const PhotoGallery = ({ plantId, cameraId, disable, plantCamMap }) => {
  const [showType, setShowType] = useState("today");
  const [selectedPlant, setSelectedPlant] = useState(
    disable ? plantId : "All Plants"
  );
  const [selectedCam, setSelectedCam] = useState(
    disable ? cameraId : "All Cams"
  );
  return (
    <div className="bg-white pl-6 pr-6 flex flex-col gap-6">
      <div className="flex pt-5 gap-4 items-start">
        <div>
          <Select
            borderColor="#CAC5CD"
            color="#605D64"
            placeholder={disable && plantId}
            variant="outline"
            isDisabled={disable}
            className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
            onChange={(e) => setSelectedPlant(e.target.value)}
            value={selectedPlant}
          >
            <option key="All Plants" value="All Plants">
              All Plants
            </option>
            {!disable &&
              Object.keys(plantCamMap).map((plant) => {
                return (
                  <option key={plant} value={plant}>
                    {plant}
                  </option>
                );
              })}
          </Select>
        </div>
        {selectedPlant !== "All Plants" && (
          <div>
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              placeholder={disable && cameraId}
              variant="outline"
              isDisabled={disable}
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              onChange={(e) => setSelectedCam(e.target.value)}
              value={selectedCam}
            >
              {" "}
              <option key="All Cams" value="All Cams">
                All Cams
              </option>
              {!disable &&
                plantCamMap[selectedPlant].map((cam) => {
                  return (
                    <option key={cam} value={cam}>
                      {cam}
                    </option>
                  );
                })}
            </Select>
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
