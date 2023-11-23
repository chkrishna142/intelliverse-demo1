import { useNavigate } from "react-router-dom";

const TokenData = () => {
  
  const navigate = useNavigate()
  const handleToken = () => {
    navigate("/community/advisor/buycredits");
  };

  return (
    <div className="w-full lg:flex lg:flex-row lg:justify-between flex-col items-center mx-auto">
      {/* Total coins */}
      <div className="md:w-[380px] w-[300px] mx-auto p-0 flex h-full rounded-lg mb-2">
        <div className="w-[90px] h-[70px] flex justify-center items-center p-2 bg-[#FFFFC4] rounded-tl-lg  rounded-bl-lg">
          <img src="/advisor/totalripiktoken.svg" alt="" />
        </div>
        <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-[8px]">
          <div className="flex gap-2 w-full ">
            <div className="w-full flex gap-1">
              <p className="text-[#3E3C42] font-semibold ">400</p>
              {/* coin icons */}
              <img src="/token.svg" alt="coins" />
            </div>
            
            <div className="w-full text-end text-[14px] text-[#3A74CA] font-medium cursor-pointer" onClick={handleToken}>
                Add tokens
              </div>
          </div>
          <p className="text-[#605D64] text-[14px] ">Total Enterprise Tokens</p>
        </div>
      </div>
      {/*alloted coins */}
      <div className="md:w-[380px] w-[300px] mx-auto p-0 flex h-full rounded-lg mb-2">
        <div className="w-[90px] h-[70px] flex justify-center items-center p-2 bg-[#CBE3FB] rounded-tl-lg  rounded-bl-lg">
          <img src="/advisor/alottoken.svg" alt="" />
        </div>
        <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-[8px]">
          <div className="flex gap-2 w-full ">
            <div className="w-full flex gap-1">
              <p className="text-[#3E3C42] font-semibold ">200</p>
              {/* coin icons */}
              <img src="/token.svg" alt="coins" />
            </div>
            <p className="w-full text-end text-[14px] text-[#3A74CA] font-medium cursor-pointer"></p>
          </div>
          <p className="text-[#605D64] text-[14px] ">Allotted to users</p>
        </div>
      </div>
      {/* unalloted coins */}

      <div className="md:w-[380px] w-[300px] mx-auto mb-2 p-0 flex h-full rounded-lg">
        <div className="w-[90px] h-[70px] flex justify-center items-center p-2 bg-[#CBE3FB] rounded-tl-lg  rounded-bl-lg">
          <img src="/advisor/tokenunallot.svg" alt="" />
        </div>
        <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-[8px]">
          <div className="flex gap-2 w-full ">
            <div className="w-full flex gap-1">
              <p className="text-[#3E3C42] font-semibold ">200</p>
              {/* coin icons */}
              <img src="/token.svg" alt="coins" />
            </div>
            <p className="w-full text-end text-[14px] text-[#3A74CA] font-medium cursor-pointer"></p>
          </div>
          <p className="text-[#605D64] text-[14px] ">Unallotted Tokens</p>
        </div>
      </div>
    </div>
  );
};

export default TokenData;
