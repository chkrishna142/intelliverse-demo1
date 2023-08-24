import FloatingInput from "../SizingUtils/FloatingInput";
import { useState } from "react";
import {
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  Flex,
  Image,
} from "@chakra-ui/react";
const report = [
  {
    "start time": "08:00 AM",
    "end time": "10:00 AM",
    "0-2mm": "5",
    "2-6mm": "10",
    "6-8mm": "2",
    "8+ mm": "0",
    Moisture: "High",
    Black: "Yes",
    Gray: "No",
  },
  {
    "start time": "10:30 AM",
    "end time": "12:30 PM",
    "0-2mm": "8",
    "2-6mm": "15",
    "6-8mm": "3",
    "8+ mm": "1",
    Moisture: "Medium",
    Black: "No",
    Gray: "Yes",
  },
  {
    "start time": "01:00 PM",
    "end time": "03:00 PM",
    "0-2mm": "3",
    "2-6mm": "8",
    "6-8mm": "1",
    "8+ mm": "0",
    Moisture: "Low",
    Black: "Yes",
    Gray: "No",
  },
  {
    "start time": "03:30 PM",
    "end time": "05:30 PM",
    "0-2mm": "12",
    "2-6mm": "20",
    "6-8mm": "5",
    "8+ mm": "2",
    Moisture: "High",
    Black: "No",
    Gray: "Yes",
  },
  {
    "start time": "06:00 PM",
    "end time": "08:00 PM",
    "0-2mm": "6",
    "2-6mm": "12",
    "6-8mm": "2",
    "8+ mm": "0",
    Moisture: "Medium",
    Black: "Yes",
    Gray: "No",
  },
  {
    "start time": "08:30 PM",
    "end time": "10:30 PM",
    "0-2mm": "4",
    "2-6mm": "10",
    "6-8mm": "1",
    "8+ mm": "0",
    Moisture: "Low",
    Black: "No",
    Gray: "Yes",
  },
  {
    "start time": "09:00 AM",
    "end time": "11:00 AM",
    "0-2mm": "7",
    "2-6mm": "14",
    "6-8mm": "3",
    "8+ mm": "1",
    Moisture: "High",
    Black: "Yes",
    Gray: "No",
  },
  {
    "start time": "11:30 AM",
    "end time": "01:30 PM",
    "0-2mm": "2",
    "2-6mm": "7",
    "6-8mm": "1",
    "8+ mm": "0",
    Moisture: "Medium",
    Black: "No",
    Gray: "Yes",
  },
  {
    "start time": "02:00 PM",
    "end time": "04:00 PM",
    "0-2mm": "9",
    "2-6mm": "16",
    "6-8mm": "4",
    "8+ mm": "1",
    Moisture: "Low",
    Black: "Yes",
    Gray: "No",
  },
  {
    "start time": "04:30 PM",
    "end time": "06:30 PM",
    "0-2mm": "5",
    "2-6mm": "11",
    "6-8mm": "2",
    "8+ mm": "0",
    Moisture: "High",
    Black: "No",
    Gray: "Yes",
  },
];

const Report = () => {
  const [selectedBasis, setSelectedBasis] = useState("");
  return (
    <div className="relative flex flex-col">
      <div className="absolute left-0 right-0 flex justify-center">
        <div className="p-5 pl-6 pr-6 gap-6 flex items-center bg-white rounded-xl shadow-md">
          <div>
            <FloatingInput text="From" type="datetime-local" />
          </div>
          <div>
            <FloatingInput text="To" type="datetime-local" />
          </div>
          <button className="text-center p-[10px] pl-4 pr-4 text-white text-base font-medium bg-[#084298] rounded-full">
            Show Report
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-[68px] pt-10 bg-white rounded-xl justify-start">
        <div className="flex justify-between pl-4 pr-6 mr-3">
          <div className="flex gap-6 text-[#49454F] text-base">
            <div
              className={`p-3 flex items-center gap-1 ${
                selectedBasis === 0 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={0}
                onClick={() => setSelectedBasis(0)}
                type="radio"
                name="freq"
                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Daily Basis</p>
            </div>
            <div
              className={`p-3 flex items-center gap-1 ${
                selectedBasis === 1 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={1}
                onClick={() => setSelectedBasis(1)}
                type="radio"
                name="freq"
                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Shift Basis</p>
            </div>
            <div
              className={`p-3 flex items-center gap-1 ${
                selectedBasis === 2 ? "bg-[#e7effb] rounded-xl" : "bg-white"
              }`}
            >
              <input
                value={2}
                onClick={() => setSelectedBasis(2)}
                type="radio"
                name="freq"
                className="cursor-pointer accent-[#3A74CA] h-[18px] w-[18px]"
              />
              <p>Hourly Basis</p>
            </div>
          </div>
          <div className="flex items-baseline text-base text-white font-medium p-4 pt-[10px] pb-[10px] bg-[#6CA6FC] rounded-[51px]">
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
        <TableContainer className="!whitespace-normal">
          <Table variant="simple">
            <Thead className="bg-[#FAFAFA] !text-xs">
              <Tr>
                <Th color="#79767D" fontWeight={400}>
                  SR. NO.
                </Th>
                {Object.keys(report[0]).map((id,idx) => {
                  return (
                    <Th key={idx} color="#79767D" fontWeight={400}>
                      {id.toUpperCase()}
                    </Th>
                  );
                })}
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
                    {Object.keys(item).map((x,idx) => {
                      return <Td key={idx} className="cursor-pointer">{item[x]}</Td>;
                    })}
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

export default Report;
