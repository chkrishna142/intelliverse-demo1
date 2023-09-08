import FloatingInput from "../SizingUtils/FloatingInput";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Select,
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  Flex,
  Image,
  Spinner,
} from "@chakra-ui/react";

// const alerts = [
//   {
//     Plant: "Plant 1",
//     Camera: "Camera 1",
//     Time: "Time 1",
//     Reason: Math.floor(Math.random() * 3), // Generates random number between 0 and 2
//     Comment: "Comment 1",
//   },
//   {
//     Plant: "Plant 2",
//     Camera: "Camera 2",
//     Time: "Time 2",
//     Reason: Math.floor(Math.random() * 3),
//     Comment: "Comment 2",
//   },
//   {
//     Plant: "Plant 3",
//     Camera: "Camera 3",
//     Time: "Time 3",
//     Reason: Math.floor(Math.random() * 3),
//     Comment: "Comment 3",
//   },
//   {
//     Plant: "Plant 4",
//     Camera: "Camera 4",
//     Time: "Time 4",
//     Reason: Math.floor(Math.random() * 3),
//     Comment: "Comment 4",
//   },
//   {
//     Plant: "Plant 5",
//     Camera: "Camera 5",
//     Time: "Time 5",
//     Reason: Math.floor(Math.random() * 3),
//     Comment: "Comment 5",
//   },
//   {
//     Plant: "Plant 6",
//     Camera: "Camera 6",
//     Time: "Time 6",
//     Reason: Math.floor(Math.random() * 3),
//     Comment: "Comment 6",
//   },
//   {
//     Plant: "Plant 7",
//     Camera: "Camera 7",
//     Time: "Time 7",
//     Reason: Math.floor(Math.random() * 3),
//     Comment: "Comment 7",
//   },
//   {
//     Plant: "Plant 8",
//     Camera: "Camera 8",
//     Time: "Time 8",
//     Reason: Math.floor(Math.random() * 3),
//     Comment: "Comment 8",
//   },
//   {
//     Plant: "Plant 9",
//     Camera: "Camera 9",
//     Time: "Time 9",
//     Reason: Math.floor(Math.random() * 3),
//     Comment: "Comment 9",
//   },
//   {
//     Plant: "Plant 10",
//     Camera: "Camera 10",
//     Time: "Time 10",
//     Reason: Math.floor(Math.random() * 3),
//     Comment: "Comment 10",
//   },
// ];
const getImage = (reason) => {
  if (reason === 0) {
    return "https://img.icons8.com/color/96/null/dew-point.png";
  } else if (reason === 2) {
    return "https://cdn-icons-png.flaticon.com/512/5098/5098724.png";
  } else if (reason === 1) {
    return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5yzFWdE5SK3P50mbWltF_3ZLLAEHzai5VuDl9NgQD_SIcG6sztUZueLJQekHEmEFNjkE&usqp=CAU";
  }
};

const getReason = (reason) => {
  if (reason === 0) {
    return "Moisture";
  } else if (reason === 2) {
    return "Size";
  } else if (reason === 1) {
    return "Gray";
  }
};

const convertTimeString = (item) => {
  let date = new Date(item).toISOString().split("T")[0];
  let time = new Date(item).toTimeString();
  return date.split("-").reverse().join("/") + " " + time.slice(0, 8);
};

const Alerts = ({ plantId, cameraId, disable, plantCamMap }) => {
  const param = useParams();
  let material = param.material.toLowerCase();
  let clientId = param.clientId.toLowerCase();
  const [alerts, setAlerts] = useState([]);
  const [alertsChanging, setAlertsChanging] = useState(false);
  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5*60*60*1000).toISOString().slice(0,16)
  );
  const [toTime, setToTime] = useState(new Date(new Date().getTime() + 5.5*60*60*1000).toISOString().slice(0,16));
  const [selectedPlant, setSelectedPlant] = useState(
    disable ? plantId : "All Plants"
  );
  const [selectedCam, setSelectedCam] = useState(
    disable ? cameraId : "All Cams"
  );
  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      material: material,
      startDate: (new Date(fromTime).getTime() + 5.5*60*60*1000),
      endDate: (new Date(toTime).getTime() + 5.5*60*60*1000),
      cameraId: selectedCam === "All Cams" ? "all" : selectedCam,
      plantId: selectedPlant === "All Plants" ? "all" : selectedPlant,
    });
    const response = await axios
      .post(
        " https://intelliverse.backend-ripik.com/vision/v2/sizing/getOverviewAlerts/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setAlerts(response.data);
        setAlertsChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    setAlertsChanging(true);
    apiCall();
  };

  useEffect(()=>{
    handleClick();
  },[]);
  console.log(fromTime,toTime,'times');
  return (
    <div className="relative flex flex-col">
      <div className="absolute left-0 right-0 flex justify-center">
        <div className="p-5 pl-6 pr-6 gap-6 flex flex-col md:flex-row items-center bg-white rounded-xl shadow-md">
          <div>
            <FloatingInput
              text="From"
              type="datetime-local"
              setDateTime={setFromTime}
              value={fromTime}
            />
          </div>
          <div>
            <FloatingInput
              text="To"
              type="datetime-local"
              setDateTime={setToTime}
              value={toTime}
            />
          </div>
          <button
            className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-full"
            onClick={handleClick}
          >
            {alertsChanging ? <Spinner /> : "Show Alerts"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-[160px] md:mt-11 pt-[57px] bg-white rounded-xl justify-start">
        <div className="flex gap-2 ml-6">
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
              placeholder="Reason"
              variant="outline"
              className="!rounded-2xl !text-sm !font-medium !text-[#605D64]"
            />
          </div>
        </div>
        <TableContainer className="!whitespace-normal !h-[80vh] !overflow-y-auto">
          <Table variant="simple">
            <Thead className="bg-[#FAFAFA] !text-xs">
              <Tr>
                <Th color="#79767D" fontWeight={400}>
                  SR. NO.
                </Th>
                <Th color="#79767D" fontWeight={400}>
                  PLANT
                </Th>
                <Th color="#79767D" fontWeight={400}>
                  CAMERA
                </Th>
                <Th color="#79767D" fontWeight={400}>
                  TIME
                </Th>
                <Th color="#79767D" fontWeight={400}>
                  REASON
                </Th>
                <Th color="#79767D" fontWeight={400}>
                  COMMENT
                </Th>
                <Th color="#79767D" fontWeight={400}>
                  {""}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {alerts.map((item, index) => {
                return (
                  <Tr
                    key={index}
                    className="!text-sm !text-[#3E3C42] !font-medium even:bg-[#FAFAFA] odd:bg-white"
                  >
                    <Td className="cursor-pointer">
                      {String(index + 1).padStart(2, "0")}
                    </Td>
                    <Td className="cursor-pointer">{item.plantId}</Td>
                    <Td className="cursor-pointer">{item.cameraId}</Td>
                    <Td className="cursor-pointer">{item.timestamp}</Td>
                    <Td className="cursor-pointer">
                      <Flex gap="1rem" align="center">
                        <div className="flex flex-col justify-center items-center">
                          <Image
                            className="h-8 w-8"
                            src={getImage(item.alertCodes[0])}
                            alt="none"
                          />
                          <span>{getReason(item.alertCodes[0])}</span>
                        </div>
                      </Flex>{" "}
                    </Td>
                    <Td className="cursor-pointer">{item.alertMessages.join(' ')}</Td>
                    <Td>
                      <p className="text-blue-800 cursor-pointer hover:text-blue-200 font-semibold min-w-[150px]">
                        View Details
                      </p>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Alerts;
