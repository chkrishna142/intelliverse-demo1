import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const RangeSlider = ({ overallRange, optimalRange, currentValue }) => {
  const optimalMin = optimalRange[0];
  const optimalMax = optimalRange[1];

  const calculateOptimalRangeWidth = () => {
    const overallMin = overallRange[0];
    const overallMax = overallRange[1];

    const leftWidth = ((optimalMin - overallMin) / (overallMax - overallMin)) * 100;
    const rangeWidth = ((optimalMax - optimalMin) / (overallMax - overallMin)) * 100;

    return { left: `${leftWidth}%`, width: `${rangeWidth}%` };
  };

  let currentValuePosition = ((currentValue - overallRange[0]) / (overallRange[1] - overallRange[0])) * 100;
  if(currentValuePosition<0){
    currentValuePosition=0;
  }else if(currentValuePosition>100)
  {
    currentValuePosition=100;
  }
  // console.log("current value of position---",currentValuePosition)

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full relative">
        <div className="h-2 bg-blue-400 absolute left-0 right-0 top-7"></div>
        <div className="h-2 bg-[#CDEEBF] absolute left-0 top-7" style={calculateOptimalRangeWidth()}>
          <div className="text-sm text-gray-500 absolute bottom-0 left-0 transform translate-y-5 -translate-x-6">
            {optimalRange[0]}
          </div>
          <div className="text-sm text-gray-500 absolute bottom-0 right-0 transform translate-y-5 translate-x-6">
            {optimalRange[1]}
          </div>
        </div>
        <div className="h-8 w-50 border-2 bg-white p-1 shadow-md rounded-xl absolute transform -translate-x-1/2 -top-5 left-1/2" style={{ left: `${currentValuePosition}%` }}>
          <div className="text-blue-600 text-sm font-bold text-center transform translate-y-34">{currentValue.toFixed(2)}</div>
          <ArrowDropDownIcon/>
        </div>
      

      </div>
      <div className="flex justify-between w-full">
        <span>{overallRange[0]}</span>
        <span>{overallRange[1]}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
