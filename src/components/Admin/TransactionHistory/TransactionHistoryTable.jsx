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
      hour12: false,
    });

    return {
      date: `${day} ${month} '${year}`,
      time: time,
    };
  };

  return (
    <div className="lg:w-[65vw] md:w-[80vw] sm:w-[80vw] border border-gray-100">
      <TableContainer className="!text-center  border rounded-md bg-white overflow-x-auto">
        <Table variant="simple">
          <Thead className="bg-[#DDEEFF] !text-[#79767D] !text-xs !top-0">
            <Tr>
              <Th className="!text-[#79767D] !text-left !text-sm !font-normal">
                DATE/TIME
              </Th>
              <Th className="!text-[#79767D] !text-left !text-sm !font-normal">
                DESCRIPTION
              </Th>
              <Th className="!text-[#79767D] !text-left !text-sm !font-normal">
                RIPIK TOKENS
              </Th>
              <Th className="!text-[#79767D] !text-left !text-sm !font-normal">
                BALANCE AFTER TRANSACTION
              </Th>
              <Th className="!text-[#79767D] !text-left !text-sm !font-normal">
                STATUS
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData &&
              tableData.map((item) => {
                const formattedDateTime = formatDate(item.transactionDate);
                return (
                  <Tr key={item.transactionId}>
                    <Td
                      className="!text-left !text-normal !text-[#3E3C42] !text-[14px] flex items-center gap-2"
                      style={{ fontWeight: 400 }}
                    >
                      <p className="">{formattedDateTime.date}</p>
                      <p className=""> {formattedDateTime.time}</p>
                    </Td>
                    <Td
                      className="!text-left !text-normal !text-[#3E3C42] !text-[14px]"
                      style={{ fontWeight: 500 }}
                    >
                      {item.description}
                    </Td>
                    <Td
                      className="!text-left !text-normal !text-[#3E3C42] !text-[14px]"
                      style={{ fontWeight: 500 }}
                    >
                      {item.token > 0 ? (
                        <div className="w-full flex gap-1 text-[#7AC958] !text-[14px]">
                          <p>
                            +{item.token}
                          </p>
                          <img src="/token.svg" alt="token" />
                        </div>
                      ) : (
                        <div className="w-full flex gap-1 text-[#E46962] !text-[14px]">
                          <p>
                            {item?.token}
                          </p>
                          <img src="/token.svg" alt="token" />
                        </div>
                      )}
                    </Td>
                    <Td
                      className="!text-left !text-normal !text-[#3E3C42] !text-[14px]"
                      style={{ fontWeight: 500 }}
                    >
                      <div className="w-full flex gap-1">
                        <p>{item.afterBalance}</p>
                        <img src="/token.svg" alt="token" />
                      </div>
                    </Td>
                    <Td>
                    <div
                      className={`w-full flex justify-start  ${
                        item.status == "FAILURE" ? "text-[#E46962]" : "text-[#7AC958]"
                      }`}
                    >
                      {item.status == "FAILURE" ? "Failed" : "Success"}
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
