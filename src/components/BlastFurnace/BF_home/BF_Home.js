import { useEffect, useState } from 'react';
import Fuelrate from './Fuelrate';
import Production from './Production';
import Modelaccuracy from '../BF_Components/Modelaccuracy';
import Averagepar from './Averagepar';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useWindowSize } from '@uidotdev/usehooks';

const BF_Home = () => {
  const size = useWindowSize();
  console.log('--------------------', size);
  const [fetcheddata, setFetcheddata] = useState();

  const client = "sesa";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://15.206.88.112.nip.io:443/api/get_fuel_rate_and_production/?client_id=${client}`
        );
        const json = await response.json();
        console.log('fetched data=====>>>', json);
        setFetcheddata(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fetch data initially
    fetchData();
  }, [client]);

  if (fetcheddata) {
    return (
      <div className="w-full h-full flex flex-col  ">
        <div class="w-full h-full ">
          <p
            style={{
              color: '#024D87',
              fontWeight: '600',
              height: 'auto',
              whiteSpace: 'nowrap',
              fontSize: '20px',
            }}
          >
            AI Alerts and Recommendations
          </p>
          <div
            style={{}}
            //  className="grid grid-cols-1 h-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[4px] sm:gap-[5px] md:gap-[6px] lg:gap-[7px] xl:gap-[8px] w-full  justify-items-center"
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7 justify-center mb-[10px] w-full p-2 "
          >
            <Fuelrate data={fetcheddata?.tools.fuel_rate} />

            <Production data={fetcheddata?.tools.burden_production} />

            {client != 'sesa' ? <Averagepar /> : ''}
            {/* <Averagepar/> */}
          </div>
          <div className="flex w-full justify-end  h-[20%]">
            {/* <Modelaccuracy /> */}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" flex justify-center">
        <CircularProgress isIndeterminate color="green.300" />
      </div>
    );
  }
};

export default BF_Home;
