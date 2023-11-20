import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NavContext from "../../NavContext";
import LibraryGrid from "./LibraryGrid";
import { Select, Spinner } from "@chakra-ui/react";
import { baseURL } from "../../../index";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import axios from "axios";

const PhotoGallery = ({ plantId, cameraId, disable, plantCamMap }) => {
  const { auth } = useContext(NavContext);
  let param = useParams();
  const [imgData, setImgData] = useState([]);
  const [imgDataChanging, setImgDataChanging] = useState(false);
  const [showType, setShowType] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedPlant, setSelectedPlant] = useState(plantId);
  const [selectedCam, setSelectedCam] = useState(cameraId);
  const handleSelect = (e) => {
    let val = e.target.value;
    setShowType(val);
    if (val == 0) {
      setDate(new Date().toISOString().slice(0, 10));
    } else if (val == 1) {
      setDate(
        new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
      );
    }
  };

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: param.clientId.toLowerCase(),
      useCase: "KILNHEALTH",
      plantName: selectedPlant,
      cameraId: selectedCam,
      startDate: new Date(date).getTime(),
    });
    const response = await axios
      .post(
        baseURL + "vision/v2/processMonitoring/feedLibrary/images/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      )
      .then((response) => {
        setImgData(response.data);
        setImgDataChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    setImgDataChanging(true);
    apiCall();
  };

  useEffect(() => {
    handleClick();
  }, []);

  useEffect(() => {
    if (!disable && plantCamMap[selectedPlant] && plantCamMap[selectedPlant].length > 0) {
      setSelectedCam(plantCamMap[selectedPlant][0]);
    }
  }, [selectedPlant]);

  return (
    <div className="bg-white pl-6 pr-6 flex flex-col gap-6">
      <div className="flex pt-5 gap-4 items-center overflow-x-auto">
        <div className="min-w-[110px]">
          <Select
            borderColor="#CAC5CD"
            color="#605D64"
            placeholder={disable && selectedPlant}
            variant="outline"
            isDisabled={disable}
            className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
            onChange={(e) => setSelectedPlant(e.target.value)}
            value={selectedPlant}
          >
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
        <div className="min-w-[110px]">
          <Select
            borderColor="#CAC5CD"
            color="#605D64"
            placeholder={disable && selectedCam}
            variant="outline"
            isDisabled={disable}
            className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
            onChange={(e) => setSelectedCam(e.target.value)}
            value={selectedCam}
          >
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
        <div className="min-w-[110px]">
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
          <div className="min-w-[110px]">
            <FloatingInput
              text="Date"
              type="date"
              setDateTime={setDate}
              value={date}
            />
          </div>
        )}
        <button
          className="text-center py-2 px-4 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-full min-w-[80px]"
          onClick={handleClick}
        >
          {imgDataChanging ? <Spinner /> : "Apply"}
        </button>
      </div>
      <LibraryGrid plantName={selectedPlant} img={imgData} />
    </div>
  );
};

export default PhotoGallery;
