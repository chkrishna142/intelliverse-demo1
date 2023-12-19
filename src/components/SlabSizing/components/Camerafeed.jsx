import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

function Camerafeed({ show }) {
  const size = useWindowSize();
  return (
    <div
      className={`flex flex-col ${
        size.width < 768 ? "w-full " : "w-[28vw]"
      }  h-[33vh]  gap-2 mt-2`}
    >
      <div className="w-full h-[30px]  flex justify-between p-1 items-center ">
        <p className="text-[#605D64] text-[13px]">
          {" "}
          {show == 0
            ? "Top View"
            : show == 1
            ? "Right side view"
            : "Left side view"}
        </p>
        <div className="flex gap-1 items-center justify-center">
          <img
            src="/slabsizing/standard.svg"
            alt=""
            style={{ marginTop: "7px", marginRight: "-5px" }}
          />
          <p className="text-[#605D64] text-[13px]">Standard</p>
        </div>
      </div>
      <div
        className={` ${size.width < 768 ? "w-full " : "w-[28vw]"}  h-[28vh] `}
      >
        <img
          src="/slabsizing/slabPic.jpg"
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}

export default Camerafeed;
