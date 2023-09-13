import { useEffect, useState, useContext, useRef } from "react";
import NavContext from "../../NavContext";
import { useParams } from "react-router-dom";
import FloatingInput from "../SizingUtils/FloatingInput";
import { baseURL } from "../../../index";
import axios from "axios";
import DetailModal from "./DetailModal";
import {
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  Select,
  Spinner,
} from "@chakra-ui/react";

const HistoryAnalytics = ({ plantId, cameraId, disable, plantCamMap }) => {
  let param = useParams();
  const { auth } = useContext(NavContext);
  const indexRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyChanging, setHistoryChanging] = useState(false);
  const [selectedRange, setSelectedRange] = useState(0);
  const [selectedPlant, setSelectedPlant] = useState(plantId);
  const [selectedCam, setSelectedCam] = useState(cameraId);
  const [date, setDate] = useState(
    new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const handleRangeSelect = (e) => {
    setSelectedRange(e.target.value);
    if (e.target.value === 0) {
      setDate(
        new Date(new Date() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
      );
    }
  };

  const apiCall = async () => {
    const requestData = JSON.stringify({
      clientId: param.clientId.toLowerCase(),
      material: param.material.toLowerCase(),
      cameraId: selectedCam,
      plantName: selectedPlant,
      startDate: new Date(date).getTime(),
    });
    const response = await axios
      .post(baseURL + "vision/v2/sizing/analytics/history/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setHistory(response.data);
        setHistoryChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    setHistoryChanging(true);
    apiCall();
  };

  const handleDetail = (index) => {
    indexRef.current = index;
    setOpenModal(true);
  };

  useEffect(() => {
    setHistoryChanging(true);
    apiCall();
  }, []);

  return (
    <div className="relative flex flex-col gap-4 rounded-xl bg-white">
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center gap-2 pt-6">
        <p className="text-[#3E3C42] text-xl font-medium pl-6">History</p>
        <div className="flex justify-start md:justify-end items-center gap-4 pr-6 pl-6 md:pl-0 overflow-x-auto max-w-[90vw]">
          <div className="min-w-[110px]">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              variant="outline"
              placeholder={disable && plantId}
              isDisabled={disable}
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              value={selectedPlant}
              onChange={(e) => setSelectedPlant(e.target.value)}
            >
              {!disable &&
                Object.keys(plantCamMap)?.map((plant) => {
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
              placeholder={disable && cameraId}
              variant="outline"
              isDisabled={disable}
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              value={selectedCam}
              onChange={(e) => setSelectedCam(e.target.value)}
            >
              {!disable &&
                plantCamMap[selectedPlant]?.map((cam) => {
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
              className="!rounded-2xl !text-sm !font-medium !text-[#605D64]"
              value={selectedRange}
              onChange={(e) => handleRangeSelect(e)}
            >
              <option value={0}>Yesterday</option>
              <option value={1}>Custom</option>
            </Select>
          </div>
          {selectedRange == 1 && (
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
            className="text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-full min-w-[100px]"
            onClick={handleClick}
          >
            {historyChanging ? <Spinner /> : "Apply"}
          </button>
          {/* {history.hasOwnProperty("order") && (
            <ExlCsvDownload order={history.order} data={history.data} />
          )} */}
        </div>
      </div>
      {history.hasOwnProperty("data") && (
        <TableContainer className="!max-h-[80vh] !overflow-y-auto">
          <Table variant="simple">
            <Thead className="bg-[#FAFAFA] !text-xs">
              <Tr>
                <Th color="#79767D" fontWeight={400}>
                  SR. NO.
                </Th>
                {history.order.map((id, idx) => {
                  return (
                    <Th key={idx} color="#79767D" fontWeight={400}>
                      {id.toUpperCase()}
                    </Th>
                  );
                })}
                <Th color="#79767D" fontWeight={400}>
                  {""}
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {history.data.map((item, index) => {
                return (
                  <Tr
                    key={index}
                    className="!text-sm !text-[#3E3C42] !font-medium even:bg-[#FAFAFA] odd:bg-white"
                  >
                    <Td className="cursor-pointer">
                      {String(index + 1).padStart(2, "0")}
                    </Td>
                    {history.order.map((x, idx) => {
                      return (
                        <Td key={idx} className="cursor-pointer">
                          {item[x]}
                        </Td>
                      );
                    })}
                    <Td>
                      <p
                        className="text-blue-800 cursor-pointer hover:text-blue-200 font-semibold min-w-[150px]"
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
      {openModal && (
        <DetailModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          data={history.data}
          index={indexRef.current}
          PlantName={selectedPlant}
        />
      )}
    </div>
  );
};

export default HistoryAnalytics;
