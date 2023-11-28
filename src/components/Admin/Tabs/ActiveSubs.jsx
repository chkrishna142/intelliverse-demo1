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
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import NavContext from '../../NavContext';
import { baseURL } from '../../..';
import Paginator from '../../../util/VisionUtils/Paginator';
import { useToast } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import ExlCsvDownload from '../../../util/VisionUtils/ExlCsvDownload';
import { CSVLink } from 'react-csv';


const ActiveSubs = () => {
  const [activeSubs, setActiveSubs] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const { auth } = useContext(NavContext);
  const toast = useToast();

  const fetchActiveSubs = async () => {
    try {
      const response = await axios.get(baseURL + 'fetch/subscribed', {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': auth,
        },
      });
      console.log(response.data, 'Active subscriptions1');
      if (Array.isArray(response.data?.relSubscriptionServices)) {
        let active = new Array(
          response.data?.relSubscriptionServices?.length * 3
        )
          .fill(0)
          .map((_, i) =>
            response.data?.relSubscriptionServices?.at(
              i % response.data?.relSubscriptionServices?.length
            )
          );
        active?.sort(
          (first, second) =>
            new Date(first?.validityEnd).getTime() -
            new Date(second?.validityEnd).getTime()
        );
        console.log(response.data, 'Active subscriptions');
        setActiveSubs(active);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchActiveSubs();
  }, []);

  const plants = ['Angul', 'Jamshedpur', 'Goa'];

  const order = [''];
  console.log(displayData,'hello')
  return (
    <div className="w-full px-2 !font-roboto">
      <div className="flex justify-between w-[80%]">
        <div>
          <p className="text-lg font-semibold text-[#605D64]">
            {activeSubs?.length}
          </p>
          <p className="text-[#938F96]">Tools subscribed</p>
        </div>
        <div className="flex flex-row items-baseline gap-2">
          <ExlCsvDownload data={[""]} order={[""]} enable={true}/>
          <Paginator
            data={activeSubs}
            setDisplayData={setDisplayData}
            limit={10}
          />
        </div>
      </div>
      <TableContainer className="w-[80%] !text-center !font-roboto mt-[2vh] border rounded-md shadow-md bg-white">
        <Table variant="simple">
          <Thead className="bg-[#DDEEFF] text-[#79767D] !font-roboto">
            <Tr>
              <Th className="!text-[#79767D] !font-roboto !text-center !text-sm !font-normal !w-[400px]">
                TOOL
              </Th>
              <Th className="!text-[#79767D] !font-roboto !text-center !text-sm !font-normal">
                PLANT
              </Th>
              <Th className="!text-[#79767D] !font-roboto !text-center !text-sm !font-normal">
                INSTANCE
              </Th>
              <Th className="!text-[#79767D] !font-roboto !text-center !text-sm !font-normal">
                STATUS
              </Th>
              <Th className="!text-[#79767D] !font-roboto !text-center !text-sm !font-normal">
                RENEWS ON
              </Th>
              <Th className="!text-[#79767D] !font-roboto !text-center !text-sm !font-normal">
                EXPIRES IN
              </Th>
              <Th className="!text-[#79767D] !font-roboto !text-center !text-sm !font-normal">
                RENEW NOW
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(displayData) &&
              displayData.map((elem, i) => {
                return (
                  <Tr>
                    <Td className="!px-6 !font-semibold !font-roboto !text-sm !w-[300px] whitespace-break-spaces">
                      {elem?.serv?.servName}
                    </Td>
                    <Td className="!text-center !font-roboto !text-sm">
                      {plants[i % 3]}
                    </Td>
                    <Td className="!text-center !font-roboto !text-sm">
                      {(i % 3) + 1}
                    </Td>
                    <Td className="!text-center !font-roboto !text-sm font-semibold">
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
                    <Td className="!text-center !font-roboto !text-sm">
                      {elem.validityEnd &&
                        new Date(elem.validityEnd)
                          .toDateString()
                          .split(' ')[2] +
                          ' ' +
                          new Date(elem.validityEnd)
                            .toDateString()
                            .split(' ')[1] +
                          " '" +
                          new Date(elem.validityEnd)
                            .toDateString()
                            .split(' ')[3]
                            .slice(2, 4)}
                    </Td>
                    <Td className="!text-center !font-roboto !text-sm ">
                      {elem.validityEnd &&
                        elem.validityStart &&
                        (new Date(elem.validityEnd).getTime() -
                          new Date(elem.validityStart).getTime()) /
                          (24 * 60 * 60 * 1000)}{' '}
                      days
                    </Td>
                    <Td className="!text-center !font-roboto !text-sm font-semibold">
                      <Link
                        onClick={() => {
                          toast({
                            title: 'Mail sent',
                            description:
                              "We've recieved a request for your subscription renewal.",
                            status: 'success',
                            duration: 4000,
                            position: 'top-right',
                            isClosable: true,
                          });
                        }}
                        className="!text-[#3474CA] !no-underline"
                      >
                        Renew
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
