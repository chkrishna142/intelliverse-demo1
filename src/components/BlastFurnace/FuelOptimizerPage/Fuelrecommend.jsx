import React from "react";

const Fuelrecommend = ({ recommendedValue, currentValue }) => {
  const ratio = (currentValue / recommendedValue) * 100;



  if(currentValue>recommendedValue)
  {
    const reverseRatio=100-(((currentValue-recommendedValue)/currentValue)*100) ;
    return (
        <div className="flex flex-col items-center gap-4  ">
          <div className="h-[20px]  w-[80%] ">
            <div
              className=" flex h-full w-100px bg-[#6CA6FC] text-white rounded-tr-md rounded-br-md text-[14px] items-center"
              style={{ width: `100%` }}
            >
              {currentValue}
            </div>
          </div>
    
          <div className="h-[20px]   w-[80%]">
            {" "}
            <div
              className="flex h-full w-100px bg-[#16FCD2] text-black  rounded-tr-md rounded-br-md text-[14px] items-center "
              style={{ width:`${reverseRatio}%`}}
            >
              {recommendedValue}
            </div>
          </div>
        </div>
      );

  }
  else{
    return (
        <div className="flex flex-col items-center gap-4  ">
          <div className="h-[20px]  w-[80%] ">
            <div
              className=" flex h-full w-100px bg-[#6CA6FC] text-white rounded-tr-md rounded-br-md text-[14px] items-center"
              style={{ width: `${ratio}%` }}
            >
              {currentValue}
            </div>
          </div>
    
          <div className="h-[20px]   w-[80%]">
            {" "}
            <div
              className="flex h-full w-100px bg-[#16FCD2] text-black  rounded-tr-md rounded-br-md text-[14px] items-center "
              style={{ width: `100%` }}
            >
              {recommendedValue}
            </div>
          </div>
        </div>
      );

  }

 
};

export default Fuelrecommend;
