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

const TokenAllocationTable = ({ tableData }) => {
  const size = useWindowSize();

  return (
    <div>
      <div>
        <TableContainer
          className={` !overflow-y-auto ${
            size.width < 768 ? "!mb-[50px] !max-h-[45vh]" : "!max-h-[31vh]"
          }`}
        >
          <Table variant="simple">
            <Thead className="bg-[#DDEEFF] !text-xs !sticky !top-0">
              <Tr>
                <Th color="#79767D" fontWeight={400} width="200px">
                  <div className="w-full h-full flex justify-center">
                    USERNAME
                  </div>
                </Th>
                <Th color="#79767D" fontWeight={400} width="250px">
                  <div className="w-full h-full flex justify-center">
                    DATE/TIME
                  </div>
                </Th>

                <Th color="#79767D" fontWeight={400} width="250px">
                  <div className="w-full h-full flex justify-center">EMAIL</div>
                </Th>
                <Th color="#79767D" fontWeight={400} width="150px">
                  <div className=" w-full h-full flex justify-center">
                    TOKEN
                  </div>
                </Th>
                <Th color="#79767D" fontWeight={400} flex={1} textAlign="left">
                  <div className="w-full h-full flex justify-start">STATUS</div>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((item) => {
                return (
                  <Tr className="!text-[14px] !text-[#3E3C42] text-center !font-medium even:bg-[#FAFAFA] odd:bg-white">
                    <Td>
                      <div className="w-full flex justify-center ">
                        {item.name}
                      </div>
                    </Td>
                    <Td>
                      <div className="w-full flex justify-center ">
                        {item.date}
                      </div>
                    </Td>

                    <Td>
                      <div className="w-full flex justify-center gap-1 ">
                        {item.email}
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
    </div>
  );
};

export default TokenAllocationTable;
