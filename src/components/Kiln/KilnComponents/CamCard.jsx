import { Link, useParams } from "react-router-dom";
import KilnHealthCard from "../../Charts/KilnCharts/kilnHealthCard";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const CamCard = ({ plantId, cameraName, data, alert }) => {
  let param = useParams();
  let material = "kilnhealth";
  // console.log(data,'cam data')
  return (
    <div className="relative flex flex-col gap-4 pt-1 pb-4 p-6">
      {alert !== 0 && (
        <p className="absolute top-0 right-[50%] min-[1040px]:right-8 p-1 pl-2 pr-2 text-sm text-[#DC362E]">
          {alert} alert
        </p>
      )}
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex flex-col h-full w-full items-center gap-4">
          <p className="self-start p-1 pl-2 pr-2 text-sm text-[#525056] font-medium ">
            {Capitalize(cameraName)}
          </p>
          <div className="bg-black h-full w-full flex justify-center items-center rounded-md">
            <img
              className="h-[30vh] sm:h-[30vh] min-h-[250px] rounded-lg"
              src={data.image_url}
              alt="no Support"
            />
          </div>
        </div>
        <div className="flex flex-col h-full w-full sm:w-min items-center gap-4">
          <p className="text-xs sm:text-base text-black self-start">
            Health Status
          </p>
          <KilnHealthCard
            dusty={data.dusty}
            hot={data.hot}
            health={data.tag.toLowerCase()}
          />
        </div>
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
            {new Date(data.created).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })}
            &nbsp;&nbsp;&nbsp;
            {new Date(data.created).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CamCard;
