import React, { useState, useContext, useEffect } from 'react';
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
import axios from 'axios';
import NavContext from '../../NavContext';
import { baseURL } from '../../..';

const ActiveSubs = () => {
  const [activeSubs, setActiveSubs] = useState([]);
  const { auth } = useContext(NavContext);

  const fetchActiveSubs = async () => {
    try {
      const response = await axios.get(baseURL + 'fetch/subscribed', {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': auth,
        },
      });
      setActiveSubs(response.data?.relSubscriptionServices);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchActiveSubs();
  }, []);

  return (
    <div className="w-full px-2">
      <p className="text-lg font-semibold">8</p>
      <p>Tools subscribed</p>
      <TableContainer className="w-[80%] !text-center mt-[2vh] border rounded-md shadow-md bg-white">
        <Table variant="simple">
          <Thead className="bg-[#DDEEFF] text-[#79767D]">
            <Tr>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal !w-[300px]">
                TOOL
              </Th>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                NUMBER OF PLANTS
              </Th>
              <Th className="!text-[#79767D] !text-center !text-sm !font-normal">
                ACTIVE STATUS
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
            {Array.isArray(activeSubs) &&
              activeSubs.map((elem) => {
                return (
                  <Tr>
                    <Td className="!text-center !text-sm font-semibold !w-[300px] whitespace-break-spaces">
                      {elem?.serv?.servName}
                    </Td>
                    <Td className="!text-center !text-sm font-semibold">1</Td>
                    <Td className="!text-center !text-sm font-semibold">
                      {elem.isActive === 'false' ? (
                        <span className="text-[#E46962] text-sm font-semibold">
                          Inactive
                        </span>
                      ) : (
                        <span className="text-[#7AC958] text-sm font-semibold">
                          Active
                        </span>
                      )}
                    </Td>
                    <Td className="!text-center !text-sm font-semibold">
                      {new Date(elem.validityStart).toISOString().split('T')[0]}
                    </Td>
                    <Td className="!text-center !text-sm font-semibold ">
                      {new Date(elem.validityEnd).toISOString().split('T')[0]}
                    </Td>
                    <Td className="!text-center !text-sm font-semibold">
                      <Link className="!text-[#3474CA] !no-underline">
                        Contact Ripik
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
