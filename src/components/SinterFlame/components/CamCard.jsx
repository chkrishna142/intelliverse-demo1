import { Link, useParams } from "react-router-dom";
import IndexChart from "../../Charts/SinterFlameCharts/IndexChart";
import ColorCard from "../../Charts/SinterFlameCharts/ColorCard";

const CamCard = ({ plantId, cameraName, data, alert }) => {
  let param = useParams();
  let material = "sinterflame";
  return (
    <div className="relative flex flex-col gap-4 pt-1 pb-4 p-6 justify-between">
      {alert !== 0 && (
        <p className="absolute top-0 right-[50%] min-[1040px]:right-8 p-1 pl-2 pr-2 text-sm text-[#DC362E]">
          {alert} alert
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex flex-col h-full w-full items-center gap-4">
          <p className="self-start p-1 pl-2 pr-2 text-sm text-[#525056] font-medium ">
            {cameraName}
          </p>
          <div className="bg-black h-full w-full flex justify-center items-center rounded-md">
            <img
              className="h-[30vh] sm:h-[30vh] rounded-lg"
              src={data.originalImage}
              alt="no Support"
            />
          </div>
        </div>
        {!(data.flags.viewObstructed || data.flags.flapClosed) ? (
          <div className="flex flex-col h-full items-center gap-4 w-full sm:w-[35vw] min-w-[15vw]">
            <p className="text-xs sm:text-base text-black self-start">
              Health Index
            </p>
            {data.healthIndex != 0 && <IndexChart type={"Flame"} value={data.healthIndex} />}
            <ColorCard r={data.rgb.r} g={data.rgb.g} b={data.rgb.b} />
          </div>
        ) : (
          <div className="h-full flex flex-col gap-8 items-center justify-center text-black font-bold text-center text-2xl w-full sm:w-[35vw] min-w-[15vw]">
            <img
              src="/SinterflameIcons/viewObstruct.svg"
              className="h-[10vh]"
            />
            <p>View Obstructed</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 min-[400px]:flex-row justify-between">
        <Link
          to={`./${plantId}/${cameraName}`}
          style={{ textDecoration: "none" }}
        >
          <button className="hover:opacity-70 text-center p-[10px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-full">
            View detail
          </button>
        </Link>
        <div className="flex gap-4 items-center">
          <p className="text-xs text-[#938F96]">Last Updated</p>
          <p className="text-xs md:text-sm text-[#79767D]">
            {new Date(data.timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
            &nbsp;&nbsp;&nbsp;
            {new Date(data.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CamCard;
