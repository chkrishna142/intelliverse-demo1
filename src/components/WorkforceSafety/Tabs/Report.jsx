import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { useState, useEffect, useContext } from "react";
import { baseURL } from "../../../index";
import { useParams } from "react-router-dom";
import axios from "axios";
import ExlCsvDownload from "../../../util/VisionUtils/ExlCsvDownload";
import ReportTable from "../Tables/ReportTable";
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

  const ReportApi = async () => {
    const requestData = JSON.stringify({
      clientId: param.clientId.toLowerCase(),
      useCase: param.material.toUpperCase(),
      plantName: "khandala",
      cameraGpId: "all",
      startDate: new Date(fromTime).getTime() + 5.5 * 60 * 60 * 1000,
      endDate: new Date(toTime).getTime() + 5.5 * 60 * 60 * 1000,
    });
    const response = await axios
      .post(
        baseURL + "vision/v1/workforceMonitoring/report/overview/",
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
        setReport(response.data);
        console.log(response.data.data)
        setReportChanging(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick = () => {
    setReportChanging(true);
    ReportApi();
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
        <div className="flex justify-end gap-2 pl-4 pr-6 mr-3 overflow-x-auto">
          {report.hasOwnProperty("order") && (
            <ExlCsvDownload order={report.order} data={report.data} />
          )}
        </div>
        {report.hasOwnProperty("data") && report.data.length > 0 && (
          <ReportTable rowData={report.data} />
        )}
      </div>
    </div>
  );
};

export default Report;
