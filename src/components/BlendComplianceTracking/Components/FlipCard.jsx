import { useState } from "react";
import ReactCardFlip from "react-card-flip";
import FillBar from "./FillBar";

const Hopper = ({ isActiveHopper, name = 'H2', subName = 'SM2' }) => {
  return (
    <>
      <img
        className="absolute bottom-0 right-[-30px]"
        src={`/BlendComplianceIcons/trapezium${isActiveHopper ? '' : '2'}.svg`}
        alt="no support"
      />
      <p
        className="text-sm font-medium absolute bottom-[30px] right-[-10px]"
        style={{ color: isActiveHopper ? "#FAFAFA" : "#605D64" }}
      >
        {name}
      </p>
      <p
        className="text-sm font-normal absolute bottom-[4px] right-[-15px]" 
        style={{ color: isActiveHopper ? "#FAFAFA" : "#79767D" }}
      >
        {subName}
      </p>
    </>
  );
};

const FlipCard = ({
  title,
  hasHopper = false,
  isActiveHopper = false,
  materialNum,
}) => {
  const [flip, setFlip] = useState(false);
  let active = Math.floor(Math.random() * materialNum);
  return (
    <div className="w-full h-[220px]">
      <ReactCardFlip
        isFlipped={flip}
        flipDirection="vertical"
        containerClassName="w-full h-full"
      >
        {/*front view */}
        <div className="py-3 px-[18px] flex flex-col gap-3 relative w-full h-full">
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-[#3E3C42] font-medium">{title}</p>
            <img
              src="/BlendComplianceIcons/flip.svg"
              alt="no support"
              className="cursor-pointer"
              onClick={() => setFlip((prev) => !prev)}
            />
          </div>
          <div className="flex gap-7 justify-center w-full h-full">
            {[...Array(materialNum)].map((id, idx) => {
              return (
                <FillBar current={50} total={100} isActive={idx == active} />
              );
            })}
          </div>
          {hasHopper && <Hopper isActiveHopper={isActiveHopper} />}
        </div>
        {/*flipped view */}
        <div className="w-full h-full relative flex justify-center items-center bg-black">
          <img
            src="https://media.istockphoto.com/id/1283895179/photo/jcb-crane-working-near-sand-quarry.jpg?s=612x612&w=0&k=20&c=DAESMJ9vd1vzUW1JznFoWBSkdZkBUSTM5zyTZPCzLHs="
            alt="no support"
            className="w-full h-auto"
          />
          <div className="absolute top-[12px] flex justify-between px-[18px] w-full">
            <p className="text-sm font-medium text-white">{title}</p>
            <img
              src="/BlendComplianceIcons/flip.svg"
              alt="no support"
              className="cursor-pointer text-white"
              onClick={() => setFlip((prev) => !prev)}
            />
          </div>
          <div className="absolute bottom-[8px] flex justify-start px-[18px] gap-3 w-full text-sm text-white">
            <p>12 May ‘23</p>
            <p>12:45 pm</p>
          </div>
          {hasHopper && <Hopper isActiveHopper={isActiveHopper} />}
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlipCard;
