import {
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
} from "@chakra-ui/react";
import { useState } from "react";

const dummy = [
  {
    Concentrate: "C1",
    "Blend Ratio": "77%",
    Bay: "B-1",
    Section: "S-1 S-2",
    "200 MT": "200-1",
    R1: "3.91",
    R2: "3.60",
    R3: "2.47",
    R4: "7.65",
    R5: "3.76",
    R6: "8.44",
    Total: "29.83",
  },
  {
    Concentrate: "C2",
    "Blend Ratio": "85%",
    Bay: "B-2",
    Section: "S-2 S-3",
    "200 MT": "200-2",
    R1: "6.12",
    R2: "9.98",
    R3: "5.41",
    R4: "1.27",
    R5: "4.50",
    R6: "2.03",
    Total: "29.31",
  },
  {
    Concentrate: "C3",
    "Blend Ratio": "73%",
    Bay: "B-3",
    Section: "S-3 S-4",
    "200 MT": "200-3",
    R1: "7.91",
    R2: "2.34",
    R3: "6.21",
    R4: "9.10",
    R5: "4.82",
    R6: "7.77",
    Total: "38.15",
  },
  {
    Concentrate: "C4",
    "Blend Ratio": "6%",
    Bay: "B-4",
    Section: "S-4 S-5",
    "200 MT": "200-4",
    R1: "4.62",
    R2: "5.18",
    R3: "8.09",
    R4: "3.57",
    R5: "1.21",
    R6: "6.42",
    Total: "29.09",
  },
  {
    Concentrate: "C5",
    "Blend Ratio": "53%",
    Bay: "B-5",
    Section: "S-5 S-6",
    "200 MT": "200-5",
    R1: "9.28",
    R2: "7.41",
    R3: "2.59",
    R4: "6.18",
    R5: "7.05",
    R6: "4.93",
    Total: "37.44",
  },
];

const ReportTableRows = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const columns = [
    "Concentrate",
    "Blend Ratio",
    "Bay",
    "Section",
    "200 MT",
    "R1",
    "R2",
    "R3",
    "R4",
    "R5",
    "R6",
    "Total",
  ];
  return (
    <>
      <Tr color={"#3E3C42"} fontWeight={500} fontSize={"14px"}>
        <Td textAlign={"center"}>1</Td>
        <Td textAlign={"center"}>20 Nov ‘23</Td>
        <Td textAlign={"center"}>A 6pm - 2pm</Td>
        <Td textAlign={"center"}>19</Td>
        <Td textAlign={"center"}>2546.64</Td>
        <Td textAlign={"center"} color={"#E46962"}>
          2
        </Td>
        <Td>
          <div className="flex w-full justify-end">
            <img
              src={`/BlendComplianceIcons/${isExpanded ? "up" : "down"}.svg`}
              alt="no support"
              className="cursor-pointer"
              onClick={() => setIsExpanded((prev) => !prev)}
            />
          </div>
        </Td>
      </Tr>
      {isExpanded && (
        <Tr>
          <Td colSpan={"100%"} px={"12px"} py={"16px"}>
            <TableContainer
              className="w-full"
              rounded={"8px"}
            >
              <Table variant="simple">
                <Thead className="bg-[#FFFFED] !text-xs !sticky !top-0">
                  <Tr h={"44px"}>
                    {columns.map((id, idx) => {
                      return (
                        <Th
                          key={idx}
                          color="#79767D"
                          fontWeight={400}
                          p={"8px"}
                          textAlign={"center"}
                        >
                          {id.toUpperCase()}
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {dummy.map((item, index) => {
                    return (
                      <Tr
                        className="!bg-white"
                        color={"#3E3C42"}
                        fontWeight={600}
                        fontSize={"14px"}
                      >
                        {columns.map((x) => {
                          return <Td textAlign={"center"}>{item[x]}</Td>;
                        })}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Td>
        </Tr>
      )}
    </>
  );
};

export default ReportTableRows;
