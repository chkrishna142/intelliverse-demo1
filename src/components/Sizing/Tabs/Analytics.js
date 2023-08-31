import { useState } from "react";
import PieChart from "../../Charts/SizingCharts/PieChart";
import StackBarChart from "../../Charts/SizingCharts/StackBarChart";
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

const Analytics = ({ plantId, cameraId }) => {
  const [selectedBasis, setSelectedBasis] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col p-6 pt-4 bg-white rounded-xl">
        <div className="flex justify-between items-center overflow-x-auto">
          <div className="flex gap-6 text-[#49454F] text-xs lg:text-base min-w-[445px]">
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
              <p>Size distribution</p>
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
              <p>Colour Analysis</p>
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
              <p>Moisture analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
        <p className="text-[#3E3C42] font-medium text-xl">Size Distribution</p>
        {/* <div className="relative flex gap-1 sm:gap-[40px] items-center overflow-x-auto min-h-[280px]">
          <div className="ml-[-40px] sm:ml-0 min-w-[280px] w-[25vw]">
            <PieChart />
          </div>
          <div className="ml-[-40px] sm:ml-0 h-[35vh] min-w-[680px] flex-grow">
            <StackBarChart />
          </div>
        </div> */}
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-white">
        <div className="flex flex-col items-start md:flex-row md:justify-between md:items-center gap-2 pt-6 overflow-x-auto">
          <p className="text-[#3E3C42] text-xl font-medium pl-6">
            Report table
          </p>
          <div className="flex justify-start md:justify-end items-center gap-4 pr-6 pl-6 md:pl-0 min-w-[500px]">
            <div>
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
              <div>
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
            <div>
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
    </div>
  );
};

export default Analytics;
