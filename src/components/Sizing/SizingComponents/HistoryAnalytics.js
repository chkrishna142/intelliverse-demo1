import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FloatingInput from "../SizingUtils/FloatingInput";
import axios from "axios";
import {
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  Select,
  Skeleton,
} from "@chakra-ui/react";

const HistoryAnalytics = ({ plantId, cameraId, disable, plantCamMap }) => {
  let param = useParams();
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
      .post(
        " https://intelliverse.backend-ripik.com/vision/v2/sizing/analytics/history/",
        requestData,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setHistory(response.data);
        setHistoryChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!disable && Object.keys(plantCamMap).length !== 0) {
      setSelectedPlant(Object.keys(plantCamMap)[0]);
      setSelectedCam(plantCamMap[Object.keys(plantCamMap)[0]][0]);
    }
  }, [plantCamMap]);

  useEffect(() => {
    setHistoryChanging(true);
    apiCall();
  }, [date]);

  return (
    <div className="relative flex flex-col gap-4 rounded-xl bg-white">
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center gap-2 pt-6 overflow-x-auto">
        <p className="text-[#3E3C42] text-xl font-medium pl-6">History</p>
        <div className="flex justify-start md:justify-end items-center gap-4 pr-6 pl-6 md:pl-0">
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
          <div className="flex items-baseline text-xs md:text-base text-white font-medium p-[10px] pl-4 pr-4 bg-[#6CA6FC] rounded-[51px]">
            <p className="cursor-pointer">Download</p>
            <select
              name="typeSheet"
              id="typeSheet"
              className="focus:outline-none bg-[#6CA6FC]"
            >
              <option>Exl</option>
              <option>Csv</option>
            </select>
          </div>
        </div>
      </div>
      {historyChanging && <Skeleton height="20px" />}
      {history.hasOwnProperty("data") && (
        <TableContainer className="!whitespace-normal !h-[80vh] !overflow-y-auto">
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
      )}
    </div>
  );
};

export default HistoryAnalytics;
