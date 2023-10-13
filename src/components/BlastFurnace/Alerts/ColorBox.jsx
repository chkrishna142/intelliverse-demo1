const ColorBox = ({ currentValue, UpperLimit, LowerLimit }) => {
    if (currentValue < LowerLimit) {
      return (
        <div className="flex w-full border-[1px]  border-[#6CA6FC] p-2 bg-[#E2EDFE] text-[#605D64]  rounded-md  justify-center items-center font-semibold ">
          {currentValue}
        </div>
      );
    } else if (currentValue >= LowerLimit && currentValue <= UpperLimit) {
      return (
        <div className="flex w-full border-[1px] border-[#69B04B] p-2 bg-[#CDEEBF66] text-[#605D64] rounded-md justify-center items-center font-semibold ">
          {currentValue}
        </div>
      );
    } else  {
     return <div className="flex w-full border-[1px] border-[#EC928E] p-2 bg-[#F9DEDC] text-[#605D64] rounded-md justify-center items-center font-semibold ">
         {currentValue}
      </div>
    }
  };
  
  export default ColorBox;
  