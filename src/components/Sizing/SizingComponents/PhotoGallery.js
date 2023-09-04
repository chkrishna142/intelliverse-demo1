import { useEffect, useState } from "react";
import LibraryGrid from "./LibraryGrid";
import { Select } from "@chakra-ui/react";
import FloatingInput from "../SizingUtils/FloatingInput";

const PhotoGallery = ({ plantId, cameraId, disable, plantCamMap }) => {
  const [showType, setShowType] = useState(0);
  const [date, setDate] = useState(new Date());
  const [selectedPlant, setSelectedPlant] = useState(
    disable ? plantId : "All Plants"
  );
  const [selectedCam, setSelectedCam] = useState(
    disable ? cameraId : "All Cams"
  );
  const handleSelect = (e) =>{
    let val = e.target.value;
    setShowType(val);
    if(val == 0){
      setDate(new Date())
    }else if(val == 1){
      setDate(new Date(new Date().getTime() - 24*60*60*1000))
    }
  }
  // useEffect(()=>{
  //   console.log(date,'selected value')
  // },[date])
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
            variant="outline"
            className="!rounded-2xl"
            onChange={(e) => handleSelect(e)}
            value={showType}
          >
            <option value={0}>Today</option>
            <option value={1}>Yesterday</option>
            <option value={2}>Custom</option>
          </Select>
        </div>
        {showType == 2 && (
          <div>
            <FloatingInput text="Date" type="date" setDateTime={setDate} />
          </div>
        )}
      </div>
      <LibraryGrid />
    </div>
  );
};

export default PhotoGallery;
