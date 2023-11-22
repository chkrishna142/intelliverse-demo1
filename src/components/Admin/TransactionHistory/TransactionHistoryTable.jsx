import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const TransactionHistoryTable = ({ tableData }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear().toString().slice(2);
    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });

    return {
      date: `${day} ${month} '${year}`,
      time: time,
    };
  };
  // console.log("htable date reversed", tableData.reverse())
  return (
    <div className="lg:w-[55vw] md:w-[70vw] sm:w-[80vw] border border-gray-100">
      <TableContainer className="!text-center  border rounded-md bg-white overflow-x-auto">
        <Table variant="simple">
          <Thead className="bg-[#DDEEFF] !text-[#79767D] !text-xs !top-0">
            <Tr>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                DATE/TIME
              </Th>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                DESCRIPTION
              </Th>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                RIPIK TOKENS
              </Th>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                BALANCE AFTER TRANSACTION
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData &&
              tableData.map((item) => {
                const formattedDateTime = formatDate(item.createdAt);
                return (
                  <Tr key={item.tokenTxnId}>
                    <Td
                      className="!text-center !text-normal !text-[#3E3C42] !text-[14px] flex items-center justify-center gap-2"
                      style={{ fontWeight: 400 }}
                    >
                      <p className="pl-2 pr-2">{formattedDateTime.date}</p>
                      <p className="px-4"> {formattedDateTime.time}</p>
                    </Td>
                    <Td
                      className="!text-center !text-normal !text-[#3E3C42] !text-[14px]"
                      style={{ fontWeight: 500 }}
                    >
                      {item.service.servName}
                    </Td>
                    <Td
                      className="!text-center !text-normal !text-[#3E3C42] !text-[14px]"
                      style={{ fontWeight: 500 }}
                    >
                      {item.tokenBalanceBefore < item.tokenBalanceAfter ? (
                        <div className="w-full flex justify-center gap-1 text-[#7AC958] !text-[14px]">
                          <p>
                            +{item.tokenBalanceAfter - item.tokenBalanceBefore}
                          </p>
                          <img src="/token.svg" alt="token" />
                        </div>
                      ) : (
                        <div className="w-full flex justify-center gap-1 text-[#3E3C42] !text-[14px]">
                          <p>
                            -{item.tokenBalanceBefore - item.tokenBalanceAfter}
                          </p>
                          <img src="/token.svg" alt="token" />
                        </div>
                      )}
                    </Td>
                    <Td
                      className="!text-center !text-normal !text-[#3E3C42] !text-[14px]"
                      style={{ fontWeight: 500 }}
                    >
                      <div className="w-full flex justify-center gap-1">
                        <p>{item.tokenBalanceAfter}</p>
                        <img src="/token.svg" alt="token" />
                      </div>
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

export default TransactionHistoryTable;
