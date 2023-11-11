import React from 'react';
import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Link,
} from '@chakra-ui/react';

const ActiveSubs = () => {
  const dummyData = {
    tools: 'Blast Furnace Tool',
    noOfPlants: 2,
    activatedOn: "12 Dec '23",
    renewsOn: "11 Dec '24",
    renewNow: 'Contact Ripik',
  };

  return (
    <div className="w-full px-2">
      <p className="text-lg font-semibold">8</p>
      <p>Tools subscribed</p>
      <TableContainer className="w-[70%] !text-center mt-[2vh] border rounded-md shadow-md bg-white">
        <Table variant="simple">
          <Thead className="bg-[#DDEEFF] text-[#79767D]">
            <Tr>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                TOOL
              </Th>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                NUMBER OF PLANTS
              </Th>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                ACTIVATED ON
              </Th>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                RENEWS ON
              </Th>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                RENEW NOW
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(6)].map(() => {
              return (
                <Tr>
                  <Td className="!text-center !text-sm font-semibold">
                    {dummyData.tools}
                  </Td>
                  <Td className="!text-center !text-sm font-semibold">
                    {dummyData.noOfPlants}
                  </Td>
                  <Td className="!text-center !text-sm font-semibold">
                    {dummyData.activatedOn}
                  </Td>
                  <Td className="!text-center !text-sm font-semibold ">
                    <Link>{dummyData.renewsOn}</Link>
                  </Td>
                  <Td className="!text-center !text-sm font-semibold">
                    <Link className="!text-[#3474CA] !no-underline">
                      {dummyData.renewNow}
                    </Link>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActiveSubs;
