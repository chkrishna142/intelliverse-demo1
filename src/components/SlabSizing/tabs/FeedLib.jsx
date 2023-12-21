import { useState } from "react";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { Spinner } from "@chakra-ui/react";
import ImageLibrary from "../components/ImageLibrary";

const FeedLib = () => {
  const [alertsChanging, setAlertsChanging] = useState(false);
  const [serverd, setServerd] = useState(true);
  const [imageData, setImageData] = useState([
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "top",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "right",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "left",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "top",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "right",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "left",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "top",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "right",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "left",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "top",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "right",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "left",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "top",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "right",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "left",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "top",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "right",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "left",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "top",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "right",
    },
    {
      cameraId: "123",
      originalImage: "/slabsizing/slabPic.jpg",
      timestamp: 1703099983,
      view: "left",
    },
  ]);

  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  const handleClick = () => {
    setAlertsChanging(false);
    //   apiCall();
  };

  return (
    <div className="relative flex flex-col p-1">
      <div className={`absolute left-0 right-0 flex justify-center z-50 `}>
        <div className="p-5 pl-6 pr-6 gap-6 flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md">
          <div>
            <FloatingInput
              text="From"
              type="date"
              setDateTime={setFromTime}
              value={fromTime}
            />
          </div>
          <div>
            <FloatingInput
              text="To"
              type="date"
              setDateTime={setToTime}
              value={toTime}
            />
          </div>

          {serverd ? (
            alertsChanging ? (
              <Spinner />
            ) : (
              <PrimaryButton
                text={"Apply"}
                width={"fit-content"}
                onClick={handleClick}
              />
            )
          ) : (
            <PrimaryButton
              text={"Apply"}
              width={"fit-content"}
              onClick={handleClick}
            />
          )}
        </div>
      </div>
      {serverd ? (
        alertsChanging ? (
          <div className="w-full h-full  mt-[200px] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-[160px] md:mt-8 pt-[57px] bg-white rounded-xl justify-start  ">
            <ImageLibrary img={imageData} />
          </div>
        )
      ) : (
        <div className="w-full mt-[70px] ">No Data Found</div>
      )}
    </div>
  );
};

export default FeedLib;
