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
import TableCell from "./StatusTableCell";

const dummy = [
  {
    Concentrate: "C1",
    "Blend Ratio": "25%",
    Bay: "B-1",
    Section: "S-2",
    "200 MT": "50",
    R1: "100.91",
    R2: "100.60",
    R3: "0",
    R4: "0",
    R5: "0",
    R6: "0",
    Total: "303.83",
  },
  {
    Concentrate: "C2",
    "Blend Ratio": "20%",
    Bay: "B-2",
    Section: "S-2",
    "200 MT": "40",
    R1: "100.12",
    R2: "100.98",
    R3: "0",
    R4: "0",
    R5: "0",
    R6: "0",
    Total: "242.31",
  },
  {
    Concentrate: "C3",
    "Blend Ratio": "18%",
    Bay: "B-3",
    Section: "S-4",
    "200 MT": "36",
    R1: "100.91",
    R2: "50.34",
    R3: "0",
    R4: "0",
    R5: "0",
    R6: "0",
    Total: "219.15",
  },
  {
    Concentrate: "C4",
    "Blend Ratio": "17%",
    Bay: "B-4",
    Section: "S-4",
    "200 MT": "34",
    R1: "100.62",
    R2: "0",
    R3: "0",
    R4: "0",
    R5: "0.",
    R6: "0",
    Total: "206.09",
  },
  {
    Concentrate: "C5",
    "Blend Ratio": "13%",
    Bay: "B-5",
    Section: "S-6",
    "200 MT": "26",
    R1: "100.28",
    R2: "0",
    R3: "0",
    R4: "0",
    R5: "0",
    R6: "0",
    Total: "158.44",
  },
  {
    Concentrate: "C6",
    "Blend Ratio": "7%",
    Bay: "B-6",
    Section: "S-2",
    "200 MT": "14",
    R1: "100.38",
    R2: "0",
    R3: "0",
    R4: "0",
    R5: "0",
    R6: "0",
    Total: "88.54",
  },
  {
    Concentrate: "Total",
    "Blend Ratio": "100%",
    Bay: "-",
    Section: "-",
    "200 MT": "200",
    R1: "203.22",
    R2: "202.68",
    R3: "202.53",
    R4: "202.06",
    R5: "203.16",
    R6: "202.71",
    Total: "1216.36",
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
                {columns.length > 0 &&
                  columns.map((x, idx) => {
                    var val = x.includes('R') ? parseFloat(item[x]) : 0;
                    var percentage = val > 100 ? 100 : val
                    // : Math.random() < 0.5
                    // ? 100
                    // : Math.ceil(Math.random() * 99);
                    return (
                      <TableCell
                        key={x + "_" + idx + Math.random()}
                        data={dummy}
                        val={x}
                        item={item}
                        index={index}
                        percentage={percentage}
                      />
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
