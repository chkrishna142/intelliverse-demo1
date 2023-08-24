import { Link } from "react-router-dom";

const MaterialCard = ({ material, alerts, deployments }) => {
  return (
    <Link to={`/vision/Sizing/${material.split(' ')[0]}`} style={{ textDecoration: 'none' }}>
      <div className="relative flex flex-col items-center shadow-[2px_2px_13px_0_rgba(0,0,0,0.09)] rounded-[24px]">
        <div className="flex flex-col p-4 pl-7 pr-7 gap-4 bg-white rounded-tr-[24px] rounded-tl-[24px] hover:bg-[#F1F7FF]">
          <img src="/SizingIcons/MaterialIcon.svg" alt="No support" />
          <p className="text-[#024D87] text-base font-medium">{material}</p>
        </div>
        <div className="flex pt-2 pb-2 w-full bg-[#F1F7FF] rounded-br-[24px] rounded-bl-[24px] justify-center">
          <p className="text-[#024D87] text-xs">{deployments} Deployments</p>
        </div>
        {alerts !== 0 && (
          <div className="absolute top-[-11.618px] right-0 text-white text-xs font-medium bg-[#E46962] rounded-[20px] p-1 pl-[10px] pr-[10px]">
            {alerts} alerts
          </div>
        )}
      </div>
    </Link>
  );
};

export default MaterialCard;
