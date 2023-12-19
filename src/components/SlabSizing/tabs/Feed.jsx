import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Camerafeed from "../components/Camerafeed";
import OverallOutput from "../components/OverallOutput";
import OverallDimensions from "../components/OverallDimensions";
import DynamicTable from "../components/DynamicTable";

const Capitalize = (str) => {
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2;
};

const Feed = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");
  const size = useWindowSize();
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const date = formatDate(now);
      const time = formatTime(now);
      setCurrentDateTime(`${date}  ${time}`);
    }, 1000);

    // Clear the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const cam = [0, 1, 2];

  return (
    <div className="flex flex-col w-full gap-2  h-full shadow-md px-4 py-4 md:pb-5 pl-5 rounded-md text-[15px]  bg-white">
      {/* Top of home */}
      <div className="text-start flex gap-3">
        <div className="flex gap-1 text-[16px] font-bold">
          <p>Slab ID-</p>
          <p>123456</p>
        </div>
        <p className="text-[#938F96] text-[15px]">{currentDateTime}</p>
      </div>
      {/* cam fed */}
      <div
        className={`grid w-full  ${
          size.width >= 768
            ? "grid-cols-3"
            : size.width < 425
            ? "grid-cols-1"
            : "grid-cols-2 gap-3"
        }`}
      >
        {cam.map((e) => {
          return <Camerafeed show={e} />;
        })}
      </div>
      {/* overall dime */}
      <OverallDimensions />

      {/* overall output */}
      <OverallOutput />

      <div className="w-full">
        <DynamicTable />
      </div>
    </div>
  );
};

export default Feed;
