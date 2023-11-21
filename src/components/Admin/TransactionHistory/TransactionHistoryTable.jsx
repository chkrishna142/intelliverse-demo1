import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

const TransactionHistoryTable = ({ dummyData }) => {
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
            {dummyData &&
              dummyData.map((item) => {
                return (
                  <Tr>
                    <Td className="!text-center !text-normal !text-[#3E3C42] !text-[14px] flex items-center justify-center gap-2" style={{fontWeight:400}}>
                      <p className="pl-2 pr-2">{item.date}</p>
                      <p className="px-4"> {item.time}</p>
                    </Td>
                    <Td className="!text-center !text-normal !text-[#3E3C42] !text-[14px]" style={{fontWeight:500}}>
                      {item.description}
                    </Td>
                    <Td className="!text-center !text-normal !text-[#3E3C42] !text-[14px]" style={{fontWeight:500}}>
                      {item.description == "Purchase" ? (
                        <div className="w-full flex justify-center gap-1 text-[#7AC958] !text-[14px]">
                          <p>+{item.tokens}</p>
                          <img
                            src="/token.svg"
                            alt="token"
                          />
                        </div>
                      ) : (
                        <div className="w-full flex justify-center gap-1 text-[#3E3C42] !text-[14px]">
                          <p>-{item.tokens}</p>
                          <img
                            src="/token.svg"
                            alt="token"
                          />
                        </div>
                      )}
                    </Td>
                    <Td className="!text-center !text-normal !text-[#3E3C42] !text-[14px]" style={{fontWeight:500}}>
                      <div className="w-full flex justify-center gap-1">
                        <p>{item.balance}</p>
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
