import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef, useContext } from "react";

const ExpertHistoryTable = ({ tableData }) => {
  return (
    <div>
      <TableContainer className="!max-h-[43vh] !overflow-y-auto">
        <Table variant="simple">
          <Thead className="bg-[#DDEEFF] !text-xs !sticky !top-0">
            <Tr>
              <Th color="#79767D" fontWeight={400} className="!w-[650px]">
                <div className="w-full h-full flex justify-start">
                  TRANSACTION TYPE
                </div>
              </Th>
              <Th color="#79767D" fontWeight={400} className="!w-[150px]">
                <div className="w-full h-full flex justify-center">
                  ENQUIRER
                </div>
              </Th>
              <Th color="#79767D" fontWeight={400} className="!w-[150px]">
                <div className="w-full h-full flex justify-center">TIME</div>
              </Th>
              <Th color="#79767D" fontWeight={400} className="!w-[150px]">
                <div className=" w-full h-full flex justify-center">STATUS</div>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((item) => {
              return (
                <Tr
                  className={`!text-[14px] !text-[#3E3C42] text-center  ${
                    item.status === "New" ? "!font-bold" : "!font-normal"
                  } even:bg-[#FAFAFA] odd:bg-white`}
                >
                  <Td className="w-[650px] ">
                    <div className={`w-full flex justify-start `}>
                      {item.transactionType.split(" ").length > 22 ? (
                        <Tooltip label={item.transactionType} placement="top">
                          {item.transactionType
                            .split(" ")
                            .slice(0, 22)
                            .join(" ") + "..."}
                        </Tooltip>
                      ) : (
                        item.transactionType
                      )}
                    </div>
                  </Td>
                  <Td className="w-[150px] ">
                    <div className="w-full flex justify-center ">
                      {item.enquirer}
                    </div>
                  </Td>
                  <Td className="w-[150px] ">
                    <div className="w-full flex justify-center ">
                      {item.date}
                    </div>
                  </Td>
                  <Td className="w-[150px] ">
                    <div
                      className={`w-full flex justify-center gap-1 ${
                        item.status === "New"
                          ? "text-[#FFC107]"
                          : item.status === "Active"
                          ? "text-[#69B04B]"
                          : "text-[#6CA6FC]"
                      }`}
                    >
                      {item.status}
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

export default ExpertHistoryTable;
