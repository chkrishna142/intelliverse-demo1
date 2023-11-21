import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useWindowSize } from "@uidotdev/usehooks";
import React, { useState, useEffect, useRef, useContext } from "react";

const TokenTransactionTable = ({ tableData }) => {
  const size = useWindowSize();

  return (
    <div>
      <TableContainer
        className={` !overflow-y-auto w-full ${
          size.width < 768 ? "!mb-[50px] !max-h-[45vh]" : "!max-h-[31vh]"
        }`}
      >
        <Table variant="simple">
          <Thead className="bg-[#DDEEFF] !text-xs !sticky !top-0">
            <Tr>
              <Th color="#79767D" fontWeight={400} width="150px">
                <div className="w-full h-full flex justify-center">DATE</div>
              </Th>
              <Th color="#79767D" fontWeight={400} width="150px">
                <div className="w-full h-full flex justify-center">TIME</div>
              </Th>
              <Th color="#79767D" fontWeight={400} width="150px">
                <div className="w-full h-full flex justify-center">
                  TRANSACTION TYPE
                </div>
              </Th>
              <Th color="#79767D" fontWeight={400} width="150px">
                <div className=" w-full h-full flex justify-center">AMOUNT</div>
              </Th>
              <Th color="#79767D" fontWeight={400} width="150px">
                <div className="w-full h-full flex justify-center">TOKEN</div>
              </Th>
              <Th color="#79767D" fontWeight={400} flex={1} textAlign="left">
                STATUS
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((item) => {
              return (
                <Tr className="!text-[14px] !text-[#3E3C42] text-center !font-medium even:bg-[#FAFAFA] odd:bg-white">
                  <Td>
                    <div className="w-full flex justify-center ">
                      {item.date}
                    </div>
                  </Td>
                  <Td>
                    <div className="w-full flex justify-center ">
                      {item.time}
                    </div>
                  </Td>
                  <Td>
                    <div className="w-full flex justify-center gap-1 ">
                      {item.transactionType}
                    </div>
                  </Td>
                  <Td>
                    <div className="w-full flex justify-center gap-1 ">
                      {item.amount}
                    </div>
                  </Td>
                  <Td>
                    <div className="w-full flex justify-center gap-1 ">
                      {item.token}
                      <img src="/token.svg" alt="coins" />
                    </div>
                  </Td>
                  <Td>
                    <div
                      className={`w-full flex justify-start  ${
                        item.status == false ? "text-[#E46962]" : ""
                      }`}
                    >
                      {item.status == false ? "Failed" : "Success"}
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

export default TokenTransactionTable;
