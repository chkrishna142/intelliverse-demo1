import {
  Table,
  Td,
  Tr,
  Thead,
  Tbody,
  TableContainer,
  Th,
} from "@chakra-ui/react";
import ReportTableRows from "./ReportTableRows";

const ReportTable = ({ rowData }) => {
  const columns = [
    "SR No.",
    "Date",
    "Shift",
    "Batch No.",
    "Total Weight (MT)",
    "Alerts",
  ];
  return (
    <TableContainer
      className="w-full"
      rounded={"8px"}
    >
      <Table variant="simple">
        <Thead className="bg-[#DEF] !text-xs !sticky !top-0" style={{zIndex: 100}}>
          <Tr>
            {columns.map((id, idx) => {
              return (
                <Th
                  key={idx}
                  color="#79767D"
                  fontWeight={400}
                  p={"12px"}
                  textAlign={"center"}
                  w={150}
                >
                  {id.toUpperCase()}
                </Th>
              );
            })}
            <Th
              color="#79767D"
              fontWeight={400}
              p={0}
              px={"12px"}
              flex={1}
              textAlign={"center"}
            >
              {" "}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(5)].map((i) => {
            return <ReportTableRows />;
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;
