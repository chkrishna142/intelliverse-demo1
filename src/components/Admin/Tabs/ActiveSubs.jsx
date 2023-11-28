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
import ActiveSubsTable from '../Tables/ActiveSubsTable';


const ActiveSubs = () => {
  // const [activeSubs, setActiveSubs] = useState([
  //   {
  //     "subscriptionServiceId": "1",
  //     "serv": {
  //       "servId": "1",
  //       "servName": "Product 1",
  //       "servCategory": "Category A"
  //     },
  //     "plant": "Plant A",
  //     "instance": 1,
  //     "isActive": true,
  //     "validityEnd": "2023-12-01T00:00:00Z",
  //     "validityStart": "2023-11-01T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "2",
  //     "serv": {
  //       "servId": "2",
  //       "servName": "Product 2",
  //       "servCategory": "Category B"
  //     },
  //     "plant": "Plant B",
  //     "instance": 2,
  //     "isActive": false,
  //     "validityEnd": "2024-01-01T00:00:00Z",
  //     "validityStart": "2023-12-01T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "3",
  //     "serv": {
  //       "servId": "3",
  //       "servName": "Product 3",
  //       "servCategory": "Category C"
  //     },
  //     "plant": "Plant C",
  //     "instance": 3,
  //     "isActive": true,
  //     "validityEnd": "2023-11-15T00:00:00Z",
  //     "validityStart": "2023-10-15T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "4",
  //     "serv": {
  //       "servId": "4",
  //       "servName": "Product 4",
  //       "servCategory": "Category A"
  //     },
  //     "plant": "Plant A",
  //     "instance": 4,
  //     "isActive": false,
  //     "validityEnd": "2023-12-10T00:00:00Z",
  //     "validityStart": "2023-11-10T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "5",
  //     "serv": {
  //       "servId": "5",
  //       "servName": "Product 5",
  //       "servCategory": "Category B"
  //     },
  //     "plant": "Plant B",
  //     "instance": 5,
  //     "isActive": true,
  //     "validityEnd": "2024-02-01T00:00:00Z",
  //     "validityStart": "2024-01-01T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "6",
  //     "serv": {
  //       "servId": "6",
  //       "servName": "Product 6",
  //       "servCategory": "Category C"
  //     },
  //     "plant": "Plant C",
  //     "instance": 6,
  //     "isActive": false,
  //     "validityEnd": "2023-12-25T00:00:00Z",
  //     "validityStart": "2023-11-25T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "7",
  //     "serv": {
  //       "servId": "7",
  //       "servName": "Product 7",
  //       "servCategory": "Category A"
  //     },
  //     "plant": "Plant A",
  //     "instance": 7,
  //     "isActive": true,
  //     "validityEnd": "2024-03-01T00:00:00Z",
  //     "validityStart": "2024-02-01T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "8",
  //     "serv": {
  //       "servId": "8",
  //       "servName": "Product 8",
  //       "servCategory": "Category B"
  //     },
  //     "plant": "Plant B",
  //     "instance": 8,
  //     "isActive": false,
  //     "validityEnd": "2023-12-15T00:00:00Z",
  //     "validityStart": "2023-11-15T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "9",
  //     "serv": {
  //       "servId": "9",
  //       "servName": "Product 9",
  //       "servCategory": "Category C"
  //     },
  //     "plant": "Plant C",
  //     "instance": 9,
  //     "isActive": true,
  //     "validityEnd": "2024-01-15T00:00:00Z",
  //     "validityStart": "2023-12-15T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "10",
  //     "serv": {
  //       "servId": "10",
  //       "servName": "Product 10",
  //       "servCategory": "Category A"
  //     },
  //     "plant": "Plant A",
  //     "instance": 10,
  //     "isActive": false,
  //     "validityEnd": "2024-04-01T00:00:00Z",
  //     "validityStart": "2024-03-01T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "11",
  //     "serv": {
  //       "servId": "11",
  //       "servName": "Product 11",
  //       "servCategory": "Category B"
  //     },
  //     "plant": "Plant B",
  //     "instance": 11,
  //     "isActive": true,
  //     "validityEnd": "2024-01-25T00:00:00Z",
  //     "validityStart": "2023-12-25T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "12",
  //     "serv": {
  //       "servId": "12",
  //       "servName": "Product 12",
  //       "servCategory": "Category C"
  //     },
  //     "plant": "Plant C",
  //     "instance": 12,
  //     "isActive": false,
  //     "validityEnd": "2024-02-15T00:00:00Z",
  //     "validityStart": "2024-01-15T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "13",
  //     "serv": {
  //       "servId": "13",
  //       "servName": "Product 13",
  //       "servCategory": "Category A"
  //     },
  //     "plant": "Plant A",
  //     "instance": 13,
  //     "isActive": true,
  //     "validityEnd": "2024-05-01T00:00:00Z",
  //     "validityStart": "2024-04-01T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "14",
  //     "serv": {
  //       "servId": "14",
  //       "servName": "Product 14",
  //       "servCategory": "Category B"
  //     },
  //     "plant": "Plant B",
  //     "instance": 14,
  //     "isActive": false,
  //     "validityEnd": "2024-02-25T00:00:00Z",
  //     "validityStart": "2024-01-25T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "15",
  //     "serv": {
  //       "servId": "15",
  //       "servName": "Product 15",
  //       "servCategory": "Category C"
  //     },
  //     "plant": "Plant C",
  //     "instance": 15,
  //     "isActive": true,
  //     "validityEnd": "2024-03-15T00:00:00Z",
  //     "validityStart": "2024-02-15T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "16",
  //     "serv": {
  //       "servId": "16",
  //       "servName": "Product 16",
  //       "servCategory": "Category A"
  //     },
  //     "plant": "Plant A",
  //     "instance": 16,
  //     "isActive": false,
  //     "validityEnd": "2024-06-01T00:00:00Z",
  //     "validityStart": "2024-05-01T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "17",
  //     "serv": {
  //       "servId": "17",
  //       "servName": "Product 17",
  //       "servCategory": "Category B"
  //     },
  //     "plant": "Plant B",
  //     "instance": 17,
  //     "isActive": true,
  //     "validityEnd": "2024-03-25T00:00:00Z",
  //     "validityStart": "2024-02-25T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "18",
  //     "serv": {
  //       "servId": "18",
  //       "servName": "Product 18",
  //       "servCategory": "Category C"
  //     },
  //     "plant": "Plant C",
  //     "instance": 18,
  //     "isActive": false,
  //     "validityEnd": "2024-04-15T00:00:00Z",
  //     "validityStart": "2024-03-15T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "19",
  //     "serv": {
  //       "servId": "19",
  //       "servName": "Product 19",
  //       "servCategory": "Category A"
  //     },
  //     "plant": "Plant A",
  //     "instance": 19,
  //     "isActive": true,
  //     "validityEnd": "2024-07-01T00:00:00Z",
  //     "validityStart": "2024-06-01T00:00:00Z"
  //   },
  //   {
  //     "subscriptionServiceId": "20",
  //     "serv": {
  //       "servId": "20",
  //       "servName": "Product 20",
  //       "servCategory": "Category B"
  //     },
  //     "plant": "Plant B",
  //     "instance": 20,
  //     "isActive": false,
  //     "validityEnd": "2024-04-25T00:00:00Z",
  //     "validityStart": "2024-03-25T00:00:00Z"
  //   }
  // ]
  // );
  const [activeSubs,setActiveSubs] = useState([])
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
      // if (Array.isArray(response.data?.relSubscriptionServices)) {
      //   let active = new Array(
      //     response.data?.relSubscriptionServices?.length * 3
      //   )
      //     .fill(0)
      //     .map((_, i) =>
      //       response.data?.relSubscriptionServices?.at(
      //         i % response.data?.relSubscriptionServices?.length
      //       )
      //     );
      //   active?.sort(
      //     (first, second) =>
      //       new Date(first?.validityEnd).getTime() -
      //       new Date(second?.validityEnd).getTime()
      //   );
      //   console.log(response.data, 'Active subscriptions');
      //   setActiveSubs(active);
      // }
      setActiveSubs(response.data?.relSubscriptionServices)
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchActiveSubs();
  }, []);

  
  
  const plants = ['Angul', 'Jamshedpur', 'Goa'];

  const order = [''];

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
            limit={7}
            setDisplayData={setDisplayData}
          />
        </div>
      </div>
      {/* <TableContainer className="w-[80%] !text-center !font-roboto mt-[2vh] border rounded-md shadow-md bg-white">
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
      </TableContainer> */}
      <ActiveSubsTable activeSubs={displayData}/>
    </div>
  );
};

export default ActiveSubs;
