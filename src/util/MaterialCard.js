import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react';
import mixpanel from 'mixpanel-browser';

const Capitalize = (str) => {
  const arr = str.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');
  return str2;
};

const useCase = {
  Sizing: 'Sizing',
  ProcessMonitoring: 'Analysis',
  qualityTracking: 'Tracking',
  workforceMonitoring: 'Monitoring',
  datadigitization: '',
};

const MaterialCard = ({ material, alerts, deployments }) => {
  let param = useParams();
  let category = param.category;
  return (
    <Link
      to={`/vision/${category}/${material?.split(' ').join('').toLowerCase()}`}
      onClick={() => {
        mixpanel.track(`${material} selected`);
      }}
      style={{
        textDecoration: 'none',
        pointerEvents: deployments == 0 ? 'none' : '',
      }}
    >
      <div
        className={`w-28 h-[115px] relative rounded-xl shadow-md ${
          deployments == 0 ? 'bg-gray-200' : 'bg-white'
        } border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer`}
      >
        <div className="absolute top-[-15px] right-[-15px]">
          {alerts !== 0 && (
            <div className="h-8 w-8 rounded-full bg-orange-500 flex justify-center items-center text-lg text-white">
              {alerts}
            </div>
          )}
        </div>
        <div className="w-full flex justify-center ">
          <img
            className="mt-1 h-20 w-20 p-3"
            src="/SizingIcons/MaterialIcon.svg"
          />
        </div>
        <div
          className={`w-full flex justify-center ${
            deployments == 0 ? 'text-white' : 'text-[#024D87]'
          }  text-xs`}
        >
          <div
            className={`${
              deployments == 0 ? 'bg-[#79767d]' : 'bg-[#CCEAFF]'
            } px-2 py-1 w-full font-bold text-xs whitespace-nowrap`}
          >
            {deployments == 0
              ? 'Not Subscribed'
              : deployments + ' Deployment' + (deployments > 1 ? 's' : '')}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center h-10 w-28 text-center">
        <Tooltip
          label={Capitalize(material) + ' ' + useCase[category]}
          placement="top"
        >
          <p
            className="font-bold text-[#024D87]"
            style={{ pointerEvents: 'all' }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            {(Capitalize(material) + ' ' + useCase[category]).split(' ')
              .length > 2
              ? (Capitalize(material) + ' ' + useCase[category])
                  .split(' ')
                  .slice(0, 2)
                  .join(' ') + '...'
              : Capitalize(material) + ' ' + useCase[category]}
          </p>
        </Tooltip>
      </div>
    </Link>
  );
};

export default MaterialCard;
