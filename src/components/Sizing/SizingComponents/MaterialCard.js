import { Link } from 'react-router-dom';

const MaterialCard = ({ material, alerts, deployments }) => {
  const demoRouting = {
    Coke: 'esl',
    Coal: 'imfa',
    Sinter: 'jspl',
    Cement: 'jspl',
  };
  console.log('Material', material, demoRouting[material.split(' ')[0]]);
  return (
    <Link
      to={`/vision/Sizing/${material?.split(' ')[0]}/${
        demoRouting[material.split(' ')[0]]
      }`}
      style={{ textDecoration: 'none' }}
    >
      <div className="w-28 h-[115px] relative rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer">
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
        <div className="w-full flex justify-center text-[#024D87]  text-xs">
          <div className="bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs">
            {deployments} Deployments
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center h-10 w-28">
        <p className="font-bold text-[#024D87]">{material}</p>
      </div>
    </Link>
  );
};

export default MaterialCard;
