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
import React, { useState, useEffect, useRef, useContext } from "react";

const TransactionTable = ({ tableData }) => {
  return (
    <div>
      <TableContainer className="!max-h-[31vh] !overflow-y-auto">
        <Table variant="simple">
          <Thead className="bg-[#DDEEFF] !text-xs !sticky !top-0">
            <Tr>
              <Th color="#79767D" fontWeight={400} className="!w-[150px]">
                <div className="w-full h-full flex justify-center">DATE</div>
              </Th>
              <Th color="#79767D" fontWeight={400} className="!w-[150px]">
                <div className="w-full h-full flex justify-center">TIME</div>
              </Th>
              <Th color="#79767D" fontWeight={400} className="!w-[550px]">
                <div className="w-full h-full flex justify-center">SUMMARY</div>
              </Th>
              <Th color="#79767D" fontWeight={400} className="!w-[150px]">
                <div className=" w-full h-full flex justify-center">
                  TOKEN USED
                </div>
              </Th>
              <Th color="#79767D" fontWeight={400} className="!w-[150px]">
                <div className="w-full h-full flex justify-center">LINK</div>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((item) => {
              return (
                <Tr className="!text-[14px] !text-[#3E3C42] text-center !font-medium even:bg-[#FAFAFA] odd:bg-white">
                  <Td className="w-[150px] ">
                    <div className="w-full flex justify-center ">
                      {item.date}
                    </div>
                  </Td>
                  <Td className="w-[150px] ">
                    <div className="w-full flex justify-center ">
                      {item.time}
                    </div>
                  </Td>
                  <Td className="w-[550px] ">
                    <div className="w-full flex justify-center ">
                      {item.summary}
                    </div>
                  </Td>
                  <Td className="w-[150px] ">
                    <div className="w-full flex justify-center gap-1 ">
                      {item.tokenUsed}
                      <img src="/token.svg" alt="coins" />
                    </div>
                  </Td>
                  <Td className="w-[150px] ">
                    <div className="w-full flex justify-center item-center gap-2 text-[#5892E8] cursor-pointer ">
                      <p>Link to Q/A</p>
                      <div className="flex items-center justify-center">
                        <ExternalLinkIcon />
                      </div>
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

export default TransactionTable;
