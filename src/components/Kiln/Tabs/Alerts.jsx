import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import NavContext from "../../NavContext";
import { baseURL } from "../../../index";
import KilnModal from "../KilnComponents/KilnModal";
import Paginator from "../../../util/VisionUtils/Paginator";
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

const Alerts = ({ plantId, cameraId, disable, plantCamMap }) => {
  const param = useParams();
  const { auth } = useContext(NavContext);
  let material = "kilnhealth";
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
      material: material,
      startDate: (new Date(fromTime).getTime() + 5.5 * 60 * 60 * 1000) / 1000,
      endDate: (new Date(toTime).getTime() + 5.5 * 60 * 60 * 1000) / 1000,
      cameraId:
        selectedCam === "All Cams" || selectedPlant === "All Plants"
          ? "all"
          : selectedCam,
      plantName: selectedPlant === "All Plants" ? "all" : selectedPlant,
    });
    const response = await axios
      .post(
        baseURL + "vision/processMonitoring/alerts/overview/",
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
              <Thead className="bg-[#FAFAFA] !text-xs">
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
                        {new Date(item._id.date).toLocaleDateString() +
                          " " +
                          new Date(item._id.date).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            timeZone: "UTC", // Specify UTC timezone
                          })}
                      </Td>
                      <Td className="cursor-pointer">{item.reason}</Td>
                      <Td className="cursor-pointer">{item.comment}</Td>
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
        <KilnModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          data={displayData}
          index={indexRef.current}
        />
      )}
    </div>
  );
};

export default Alerts;
