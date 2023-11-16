import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const TransactionHistoryTable = () => {
  const dummyData = [
    {
      date: "15 Nov 23",
      time: "12:30",
      description: "Purchase",
      tokens: "20",
      balance: "20",
    },
    {
      date: "16 Nov 23",
      time: "01:30",
      description: "Transfer",
      tokens: "20",
      balance: "20",
    },
    {
      date: "15 Nov 23",
      time: "12:30",
      description: "AI Advisor usage",
      tokens: "20",
      balance: "20",
    },
    {
      date: "15 Nov 23",
      time: "17:00",
      description: "Purchase",
      tokens: "20",
      balance: "20",
    },
    {
      date: "16 Nov 23",
      time: "16:30",
      description: "Transfer",
      tokens: "20",
      balance: "20",
    },
    {
      date: "15 Nov 23",
      time: "12:30",
      description: "AI Advisor usage",
      tokens: "20",
      balance: "20",
    },
  ];

  return (
    <div className="w-[55vw] border border-gray-100">
      <TableContainer className="w-[55vw] !text-center  border rounded-md shadow-md bg-white">
        <Table variant="simple">
          <Thead className="bg-[#DEF] !text-[#79767D]">
            <Tr>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                TRANSACTION TIME
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
            {dummyData &&
              dummyData.map((item) => {
                return (
                  <Tr>
                    <Td className="!text-center !text-normal font-semibold !text-[#3E3C42] text-[14px] flex items-center justify-center gap-2">
                      <p className=" pl-2 pr-2">{item.date}</p>
                      <p className="px-4"> {item.time}</p>
                    </Td>
                    <Td className="!text-center !text-normal font-semibold !text-[#3E3C42] !text-[14px]">
                      {item.description}
                    </Td>
                    <Td className="!text-center !text-normal font-semibold !text-[#3E3C42] !text-[14px]">
                      {item.description == "Purchase" ? (
                        <div className="w-full flex justify-center gap-1 text-[#7AC958] !text-[14px]">
                          <p>+{item.tokens}</p>
                          <img
                            src="/transactionhistory/token.svg"
                            alt="token"
                          />
                        </div>
                      ) : (
                        <div className="w-full flex justify-center gap-1 text-[#3E3C42] !text-[14px]">
                          <p>-{item.tokens}</p>
                          <img
                            src="/transactionhistory/token.svg"
                            alt="token"
                          />
                        </div>
                      )}
                    </Td>
                    <Td className="!text-center !text-normal font-semibold !text-[#3E3C42] !text-[14px]">
                      <div className="w-full flex justify-center gap-1">
                        <p>{item.balance}</p>
                        <img src="/transactionhistory/token.svg" alt="token" />
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
