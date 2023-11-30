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
    "Blend Ratio": "25%",
    Bay: "B-1",
    Section: "S-2",
    "200 MT": "50",
    R1: "0.91",
    R2: "0.60",
    R3: "0.47",
    R4: "0.65",
    R5: "0.76",
    R6: "0.44",
    Total: "303.83",
  },
  {
    Concentrate: "C2",
    "Blend Ratio": "20%",
    Bay: "B-2",
    Section: "S-2",
    "200 MT": "40",
    R1: "0.12",
    R2: "0.98",
    R3: "0.41",
    R4: "0.27",
    R5: "0.50",
    R6: "0.03",
    Total: "242.31",
  },
  {
    Concentrate: "C3",
    "Blend Ratio": "18%",
    Bay: "B-3",
    Section: "S-4",
    "200 MT": "36",
    R1: "0.91",
    R2: "0.34",
    R3: "0.21",
    R4: "0.10",
    R5: "0.82",
    R6: "0.77",
    Total: "219.15",
  },
  {
    Concentrate: "C4",
    "Blend Ratio": "17%",
    Bay: "B-4",
    Section: "S-4",
    "200 MT": "34",
    R1: "0.62",
    R2: "0.18",
    R3: "0.09",
    R4: "0.57",
    R5: "0.21",
    R6: "0.42",
    Total: "206.09",
  },
  {
    Concentrate: "C5",
    "Blend Ratio": "13%",
    Bay: "B-5",
    Section: "S-6",
    "200 MT": "26",
    R1: "0.28",
    R2: "0.41",
    R3: "0.59",
    R4: "0.18",
    R5: "0.05",
    R6: "0.93",
    Total: "158.44",
  },
  {
    Concentrate: "C6",
    "Blend Ratio": "7%",
    Bay: "B-6",
    Section: "S-2",
    "200 MT": "14",
    R1: "0.38",
    R2: "0.17",
    R3: "0.76",
    R4: "0.29",
    R5: "0.82",
    R6: "0.12",
    Total: "88.54",
  },
];

const calTotal = (param, data) => {
  if (param == "Concentrate") return "Total";
  else if (param == "Blend Ratio") return "100%";
  else if (["Bay", "Section"].includes(param)) return "-";
  const sum = data.reduce((a, b) => {
    return a + parseFloat(b[param]);
  }, 0);
  return sum.toFixed(2);
};

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
    <TableContainer className=" w-full" rounded={"8px"}>
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
                  textAlign={"center"}
                >
                  {/^R\d+$/.test(id) ? "Round " + id[1] : id.toUpperCase()}
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
                    <Td p={"8px"} textAlign={"center"}>
                      <CircularProgress value={100} color="#6CA6FC">
                        <CircularProgressLabel color="gray">
                          + {item[x]}
                        </CircularProgressLabel>
                      </CircularProgress>
                    </Td>
                  ) : (
                    <Td p={"8px"} textAlign={"center"}>
                      {item[x]}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
          {/*Total row*/}
          <Tr
            className="!bg-white"
            color={"#3E3C42"}
            fontWeight={600}
            fontSize={"14px"}
          >
            {columns.map((x) => {
              return (
                <Td p={"8px"} textAlign={"center"}>
                  {calTotal(x, dummy)}
                </Td>
              );
            })}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StatusTable;
