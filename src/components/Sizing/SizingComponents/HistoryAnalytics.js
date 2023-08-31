import { useState } from "react";
import FloatingInput from "../SizingUtils/FloatingInput";
import {
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  Select,
} from "@chakra-ui/react";

const report = [
  {
    Plant: "Plant A",
    Camera: "Camera 1",
    time: "10:00 AM",
    "0-2mm": "5",
    "2-6mm": "10",
    "6-8mm": "2",
    "8+ mm": "0",
    Moisture: "High",
    Black: "Yes",
    Gray: "No",
  },
  {
    Plant: "Plant B",
    Camera: "Camera 2",
    time: "11:30 AM",
    "0-2mm": "8",
    "2-6mm": "12",
    "6-8mm": "3",
    "8+ mm": "1",
    Moisture: "Medium",
    Black: "No",
    Gray: "Yes",
  },
  {
    Plant: "Plant C",
    Camera: "Camera 3",
    time: "1:15 PM",
    "0-2mm": "3",
    "2-6mm": "8",
    "6-8mm": "1",
    "8+ mm": "0",
    Moisture: "Low",
    Black: "Yes",
    Gray: "No",
  },
  {
    Plant: "Plant D",
    Camera: "Camera 4",
    time: "3:45 PM",
    "0-2mm": "6",
    "2-6mm": "9",
    "6-8mm": "2",
    "8+ mm": "0",
    Moisture: "High",
    Black: "No",
    Gray: "Yes",
  },
  {
    Plant: "Plant E",
    Camera: "Camera 1",
    time: "5:30 PM",
    "0-2mm": "4",
    "2-6mm": "11",
    "6-8mm": "2",
    "8+ mm": "1",
    Moisture: "Medium",
    Black: "Yes",
    Gray: "No",
  },
  {
    Plant: "Plant F",
    Camera: "Camera 2",
    time: "8:00 AM",
    "0-2mm": "7",
    "2-6mm": "10",
    "6-8mm": "3",
    "8+ mm": "1",
    Moisture: "High",
    Black: "No",
    Gray: "Yes",
  },
  {
    Plant: "Plant G",
    Camera: "Camera 3",
    time: "2:45 PM",
    "0-2mm": "2",
    "2-6mm": "7",
    "6-8mm": "1",
    "8+ mm": "0",
    Moisture: "Low",
    Black: "Yes",
    Gray: "No",
  },
  {
    Plant: "Plant H",
    Camera: "Camera 4",
    time: "7:15 AM",
    "0-2mm": "4",
    "2-6mm": "8",
    "6-8mm": "1",
    "8+ mm": "0",
    Moisture: "Medium",
    Black: "No",
    Gray: "Yes",
  },
];

const HistoryAnalytics = ({ plantId, cameraId, disable, plantCamMap }) => {
    const [selectedBasis, setSelectedBasis] = useState(0);
    const [selectedRange, setSelectedRange] = useState(0);
    const [selectedPlant, setSelectedPlant] = useState(
      disable ? plantId : "All Plants"
    );
    const [selectedCam, setSelectedCam] = useState(
      disable ? cameraId : "All Cams"
    );
    const [fromTime, setFromTime] = useState(
      new Date(new Date().getTime() - 7*24*60*60*1000)
    );
    const [toTime, setToTime] = useState(new Date(new Date().getTime() - 24*60*60*1000));
  
    const handleRangeSelect = (e) =>{
      setSelectedRange(e.target.value);
      if(e.target.value == 0){
        setFromTime(new Date(new Date().getTime() - 7*24*60*60*1000))
        setToTime(new Date(new Date().getTime() - 24*60*60*1000))
      }
    }
  return (
    <div className="relative flex flex-col gap-4 rounded-xl bg-white">
      <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center gap-2 pt-6 overflow-x-auto">
        <p className="text-[#3E3C42] text-xl font-medium pl-6">History</p>
        <div className="flex justify-start md:justify-end items-center gap-4 pr-6 pl-6 md:pl-0">
          <div className="min-w-[110px]">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              placeholder={plantId}
              variant="outline"
              isDisabled={plantId !== "All Plants"}
              className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
            />
          </div>
          {plantId !== "All Plants" && (
            <div className="min-w-[110px]">
              <Select
                borderColor="#CAC5CD"
                color="#605D64"
                placeholder={cameraId}
                variant="outline"
                isDisabled={cameraId !== ""}
                className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
              />
            </div>
          )}
          <div className="min-w-[110px]">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              placeholder="Yesterday"
              variant="outline"
              className="!rounded-2xl !text-sm !font-medium !text-[#605D64]"
            />
          </div>
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
      <TableContainer className="!whitespace-normal !h-[80vh] !overflow-y-auto">
        <Table variant="simple">
          <Thead className="bg-[#FAFAFA] !text-xs">
            <Tr>
              <Th color="#79767D" fontWeight={400}>
                SR. NO.
              </Th>
              {Object.keys(report[0]).map((id, idx) => {
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
            {report.map((item, index) => {
              return (
                <Tr
                  key={index}
                  className="!text-sm !text-[#3E3C42] !font-medium even:bg-[#FAFAFA] odd:bg-white"
                >
                  <Td className="cursor-pointer">
                    {String(index + 1).padStart(2, "0")}
                  </Td>
                  {Object.keys(item).map((x, idx) => {
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
    </div>
  );
};

export default HistoryAnalytics;
