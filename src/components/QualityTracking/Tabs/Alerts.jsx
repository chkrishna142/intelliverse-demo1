import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import NavContext from "../../NavContext";
import { baseURL } from "../../../index";
import Paginator from "../../../util/VisionUtils/Paginator";
import DetailModal from "../Components/DetailModal";

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
    return "/SizingIcons/moisture.svg";
  } else if (reason === 2) {
    return "/SizingIcons/sizing.svg";
  } else if (reason === 1) {
    return "/SizingIcons/color.svg";
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

const Alerts = ({ plantId, cameraId, disable, plantCamMap }) => {
  const param = useParams();
  const { auth } = useContext(NavContext);
  let material = param.material.toLowerCase();
  let clientId = param.clientId.toLowerCase();
  const indexRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [alertsChanging, setAlertsChanging] = useState(false);
  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16)
  );
  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 16)
  );
  const [selectedPlant, setSelectedPlant] = useState(
    disable ? plantId : "All Plants"
  );
  const [selectedCam, setSelectedCam] = useState(
    disable ? cameraId : "All Cams"
  );
  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: clientId,
      useCase: material.toUpperCase(),
      startDate: new Date(fromTime).getTime() + 5.5 * 60 * 60 * 1000,
      endDate: new Date(toTime).getTime() + 5.5 * 60 * 60 * 1000,
      cameraId:
        selectedCam === "All Cams" || selectedPlant === "All Plants"
          ? "all"
          : selectedCam,
      plantName: selectedPlant === "All Plants" ? "all" : selectedPlant,
    });
    const response = await axios
      .post(baseURL + "vision/v2/qualityTracking/alerts/overview/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
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

  const handleDetail = (index) => {
    indexRef.current = index;
    setOpenModal(true);
  };

  useEffect(() => {
    handleClick();
  }, []);
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
        <div className="flex justify-between gap-3">
          <div className="flex gap-2 ml-6 overflow-x-auto">
            <div className="min-w-[110px]">
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
              <div className="min-w-[110px]">
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
            <button
              className="text-center py-2 px-4 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-full min-w-[80px]"
              onClick={handleClick}
            >
              {alertsChanging ? <Spinner /> : "Apply"}
            </button>
          </div>
          {alerts.hasOwnProperty("data") && (
            <Paginator
              data={alerts.data}
              limit={30}
              setDisplayData={setDisplayData}
            />
          )}
        </div>
        {alerts.hasOwnProperty("data") && (
          <TableContainer className="!max-h-[80vh] !overflow-y-auto">
            <Table variant="simple">
              <Thead className="bg-[#FAFAFA] !text-xs !sticky !top-0">
                <Tr>
                  <Th color="#79767D" fontWeight={400}>
                    SR. NO.
                  </Th>
                  {alerts.order.map((item) => {
                    return (
                      <Th color="#79767D" fontWeight={400}>
                        {item.toUpperCase()}
                      </Th>
                    );
                  })}
                  <Th color="#79767D" fontWeight={400}>
                    {""}
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {displayData.map((item, index) => {
                  return (
                    <Tr
                      key={index}
                      className="!text-sm !text-[#3E3C42] !font-medium even:bg-[#FAFAFA] odd:bg-white"
                    >
                      <Td className="cursor-pointer">
                        {String(item["idx"]).padStart(2, "0")}
                      </Td>
                      <Td className="cursor-pointer">{item.plantName}</Td>
                      <Td className="cursor-pointer">{item.cameraId}</Td>
                      <Td className="cursor-pointer">
                        {new Date(item.timestamp).toLocaleDateString() +
                          " " +
                          new Date(item.timestamp).toLocaleTimeString()}
                      </Td>
                      <Td className="cursor-pointer">
                        {/* <Flex gap="1rem" align="center">
                          <div className="flex flex-col justify-center items-center">
                            <Image
                              className="h-8 w-8"
                              src={getImage(item.alertCodes[0])}
                              alt="none"
                            />
                            <span>{getReason(item.alertCodes[0])}</span>
                          </div>
                        </Flex>{" "} */}
                        {item.type}
                      </Td>
                      <Td className="cursor-pointer">
                        {item.mgw}
                      </Td>
                      <Td className="cursor-pointer">
                        {String(item.avgGapWidths)}
                      </Td>
                      <Td>
                        <p
                          className="text-blue-800 cursor-pointer hover:text-blue-200 font-semibold min-w-[80px]"
                          onClick={() => handleDetail(index)}
                        >
                          View Details
                        </p>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
      {openModal && (
        <DetailModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          data={displayData}
          index={indexRef.current}
          PlantName={selectedPlant}
        />
      )}
    </div>
  );
};

export default Alerts;
