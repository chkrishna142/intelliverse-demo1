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
 
  const activeSubsDataList = []
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
      // console.log(response.data, 'Active subscriptions1');
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
      console.log("response.......",response)
      // response.data?.map(item => {
      //   let services = item?.relSubscriptionServices;

      //   activeSubsDataList  = activeSubsDataList.concat(services.map(serv=>{
      //     serv['id'] = item?.subscriptionId + serv.subscriptionServiceId;
      //     serv['plantName'] = item?.plantName
      //     return serv;
      //   }))
      // })

    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchActiveSubs();
  }, []);


  
  const plants = ['Angul', 'Jamshedpur', 'Goa'];

  const order = [''];
  // console.log("activeSubsDataList",activeSubsDataList)
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
      <ActiveSubsTable activeSubs={displayData}/>
    </div>
  );
};

export default ActiveSubs;
