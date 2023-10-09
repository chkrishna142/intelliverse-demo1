import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { useState, useEffect, useContext } from "react";
import { baseURL } from "../../../index";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExlCsvDownload from "../../../util/VisionUtils/ExlCsvDownload";
import NavContext from "../../NavContext";
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

const Report = ({ plantId, cameraId, disable, plantCamMap }) => {
  const param = useParams();
  const { auth } = useContext(NavContext);
  const [report, setReport] = useState([]);
  const [selectedBasis, setSelectedBasis] = useState(0);
  const [reportChanging, setReportChanging] = useState(false);
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
      clientId: param.clientId.toLowerCase(),
      useCase: param.material.toUpperCase(),
      startDate: new Date(fromTime).getTime() + 5.5 * 60 * 60 * 1000,
      endDate: new Date(toTime).getTime() + 5.5 * 60 * 60 * 1000,
      cameraId:
        selectedCam === "All Cams" || selectedPlant === "All Plants"
          ? "all"
          : selectedCam,
      plantName: selectedPlant === "All Plants" ? "all" : selectedPlant,
      basis: selectedBasis,
    });
    const response = await axios
      .post(baseURL + "vision/v2/qualityTracking/report/overview/", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        setReport(response.data);
        setReportChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    setReportChanging(true);
    apiCall();
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
            {reportChanging ? <Spinner /> : "Show Report"}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-[160px] md:mt-11 pt-[57px] bg-white rounded-xl justify-start">
        <div className="flex justify-between gap-2 pl-4 pr-6 mr-3 overflow-x-auto">
          <div className="flex gap-2">
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
                {/* {!disable &&
                  Object.keys(plantCamMap).map((plant) => {
                    return (
                      <option key={plant} value={plant}>
                        {plant}
                      </option>
                    );
                  })} */}
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
                  {/* {!disable &&
                    plantCamMap[selectedPlant].map((cam) => {
                      return (
                        <option key={cam} value={cam}>
                          {cam}
                        </option>
                      );
                    })} */}
                </Select>
              </div>
            )}
            <div className="min-w-[110px]">
              <Select
                borderColor="#CAC5CD"
                color="#605D64"
                variant="outline"
                className="!rounded-2xl !text-sm !font-medium !text-[#605D64]"
                value={selectedBasis}
                onChange={(e) => setSelectedBasis(e.target.value)}
              >
                <option value={0}>Daily Basis</option>
                <option value={1}>Shift Basis</option>
                <option value={2}>Hourly Basis</option>
              </Select>
            </div>
            <button
              className="text-center py-2 px-4 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-full min-w-[80px]"
              onClick={handleClick}
            >
              {reportChanging ? <Spinner /> : "Apply"}
            </button>
          </div>
          {report.hasOwnProperty("order") && (
            <ExlCsvDownload order={report.order} data={report.data} />
          )}
        </div>
        {report.hasOwnProperty("data") && (
          <TableContainer className="!max-h-[80vh] !overflow-y-auto">
            <Table variant="simple">
              <Thead className="bg-[#FAFAFA] !text-xs !sticky !top-0">
                <Tr>
                  <Th color="#79767D" fontWeight={400}>
                    SR. NO.
                  </Th>
                  {report.order.map((id, idx) => {
                    return (
                      <Th key={idx} color="#79767D" fontWeight={400}>
                        {id.toUpperCase()}
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {report.data.map((item, index) => {
                  return (
                    <Tr
                      key={index}
                      className="!text-sm !text-[#3E3C42] !font-medium even:bg-[#FAFAFA] odd:bg-white"
                    >
                      <Td className="cursor-pointer">
                        {String(index + 1).padStart(2, "0")}
                      </Td>
                      {report.order.map((x, idx) => {
                        return (
                          <Td key={idx} className="cursor-pointer">
                            {x.toLowerCase().includes("time")
                              ? new Date(item[x]).toLocaleDateString() +
                                " " +
                                new Date(item[x]).toLocaleTimeString()
                              : item[x]}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default Report;