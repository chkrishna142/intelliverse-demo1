import {
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

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
  {
    Concentrate: "C6",
    "Blend Ratio": "88%",
    Bay: "B-6",
    Section: "S-6 S-7",
    "200 MT": "200-6",
    R1: "1.38",
    R2: "4.17",
    R3: "8.76",
    R4: "5.29",
    R5: "3.82",
    R6: "9.12",
    Total: "32.54",
  },
  {
    Concentrate: "C7",
    "Blend Ratio": "10%",
    Bay: "B-7",
    Section: "S-7 S-8",
    "200 MT": "200-7",
    R1: "2.94",
    R2: "9.05",
    R3: "4.11",
    R4: "7.23",
    R5: "6.49",
    R6: "1.76",
    Total: "31.58",
  },
  {
    Concentrate: "C8",
    "Blend Ratio": "56%",
    Bay: "B-8",
    Section: "S-8 S-9",
    "200 MT": "200-8",
    R1: "6.76",
    R2: "1.64",
    R3: "5.95",
    R4: "2.48",
    R5: "8.01",
    R6: "4.68",
    Total: "29.52",
  },
  {
    Concentrate: "C9",
    "Blend Ratio": "0%",
    Bay: "B-9",
    Section: "S-9 S-10",
    "200 MT": "200-9",
    R1: "9.71",
    R2: "7.38",
    R3: "4.32",
    R4: "1.19",
    R5: "2.65",
    R6: "8.24",
    Total: "33.49",
  },
];

const StatusTable = () => {
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
    <TableContainer
      className=" w-full"
      rounded={"8px"}
    >
      <Table variant="simple">
        <Thead className="bg-[#DEF] !text-xs !sticky !top-0">
          <Tr h={"44px"}>
            {columns.map((id, idx) => {
              return (
                <Th
                  key={idx}
                  color="#79767D"
                  fontWeight={400}
                  p={0}
                  px={"12px"}
                  textAlign={'center'}
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
                  return /^R\d+$/.test(x) ? (
                    <Td p={'8px'} textAlign={'center'}>
                      <CircularProgress value={100} color="#6CA6FC">
                        <CircularProgressLabel color="gray">
                          + {item[x]}
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Td>
                  ) : (
                    <Td>{item[x]}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StatusTable;
