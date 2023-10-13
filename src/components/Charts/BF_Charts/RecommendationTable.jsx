import {
    ArrowDownIcon,
    ArrowUpIcon,
    ArrowBackIcon,
    ArrowForwardIcon,
  } from "@chakra-ui/icons";
  
  const dictPos = {
    hh: 1, //4
    hir: 2, //5
    hl: 3, //6
    irh: 4, //5
    irir: 5, //6
    irl: 6,
    lh: 7,
    lir: 8,
    ll: 9,
  };
  
  const recommendationString = {
    1: 'Reduce Coke Rate in steps of 2Kg/THM & Change Burden Distribution',
    2: 'Reduce PCI in steps of 5Kg/THM',
    3: 'Reduce PCI in steps of 5Kg/THM & Change Burden Distribution',
    4: 'Change Burden Distribution',
    5: 'Optimized Functioning',
    6: 'Change Burden Distribution',
    7: 'Increase PCI in steps of 5Kg/THM & Change Burden Distribution',
    8: 'Increase PCI in steps of 5Kg/THM ',
    9: 'Increase Coke Rate in steps of 2Kg/THM & Change Burden Distribution',
  };
  
  //hotMetalpwi => hh => highhigh
  
  // (2,1) (3,1) (4,1) pwi
  // (5,2) (5,3) (5,4) hot metal
  // (row,col) <div className={`row-start-${val[0]} col-start-${val[1]} border-2 border-black h-full w-full`}></div>
  const RecommendationTable = ({ data }) => {
    // console.log("git",data)
    const pwi = data?.recommendation_matrix.pwi;
    const hotMetal = data?.recommendation_matrix.hot_metal;
    const key = hotMetal + pwi;
    const val = dictPos[key];
  
    // console.log(pwi+" ------"+hotMetal)
  
    return (
      <div className="grid grid-cols-4 grid-rows-4 text-center items-center w-full font-semibold text-xl h-[400px]">
        <div className="row-start-4 col-start-2 flex flex-col gap-5 items-center h-full w-full">
          <p>High</p>
          <ArrowBackIcon />
        </div>
        <div className="row-start-4 col-start-3 flex flex-col gap-5 h-full w-full">
          <p>In Range</p>
          <p>PWI</p>
        </div>
        <div className="row-start-4 col-start-4 flex flex-col gap-5 items-center h-full w-full">
          <p>Low</p>
          <ArrowForwardIcon />
        </div>
        <div className="col-start-1 row-start-1 flex flex-row-reverse gap-5 items-center justify-start h-full w-full">
          <p className="rotate-[-90deg]">High</p>
          <ArrowUpIcon />
        </div>
        <div className="col-start-1 row-start-2 flex flex-row-reverse gap-5 items-center justify-start h-full w-full">
          <p className="rotate-[-90deg] mr-[-20px]">In Range</p>
          <p className="mr-[-20px]">HM Temp</p>
        </div>
        <div className="col-start-1 row-start-3 flex flex-row-reverse gap-5 items-center justify-start h-full w-full">
          <p className="rotate-[-90deg]">Low</p>
          <ArrowDownIcon />
        </div>
        {[...Array(9)].map((i, idx) => {
          return (
            <div
              className={`border border-blue-600  h-full w-full text-blue-600 font-bold flex justify-center items-center text-lg ${
                val == idx + 1 ? "bg-[#ffffc4]" : "bg-gray-100"
              }`}
            >
              <div className="flex flex-col gap-1 text-center items-center text-[15px]">
                <p>{recommendationString[idx+1]}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  export default RecommendationTable;
  