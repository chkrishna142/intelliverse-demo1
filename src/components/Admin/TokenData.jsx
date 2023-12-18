import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../..";
import NavContext from ".././NavContext";

const TokenData = ({isFetchBalance,isFetchTranChanged}) => {
  const { clientOrg } = useParams();
  const { auth } = useContext(NavContext);
  const navigate = useNavigate();
  const [totalTokens, setTotalTokens] = useState(0);
  const [allocated, setAllocated] = useState(0);
  const [unAllocated, setUnallocated] = useState(0);
  const [clientName, setClientName] = useState("");

  const fetchTokenBalance = async () => {
    const param = {
      organisation: clientOrg || "",
    };
    try {
      const response = await axios.get(
        baseURL + `token-wallet/v1/org-balance`,
        {
          params: param,
          headers: {
            "Content-Type": "application/json",
            "X-auth-Token": auth,
          },
        }
      );
      setTotalTokens(response?.data.total)
      setAllocated(response?.data.allocated)
      setUnallocated(response?.data.unAllocated)
      setClientName(response?.data?.clientName)
    } catch (error) {
      
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTokenBalance();
  }, [isFetchBalance,isFetchTranChanged]);

  const handleToken = () => {
   
      navigate(`/community/advisor/buycredits`);
    
    
  };

  console.log("clientName",clientName)
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
              <p className="text-[#3E3C42] font-semibold ">{totalTokens}</p>
              {/* coin icons */}
              <img src="/token.svg" alt="coins" />
            </div>

            <div
              className="w-full text-end text-[14px] text-[#3A74CA] font-medium cursor-pointer"
              onClick={handleToken}
            >
              Buy Tokens
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
              <p className="text-[#3E3C42] font-semibold ">{allocated}</p>
              {/* coin icons */}
              <img src="/token.svg" alt="coins" />
            </div>
            <p className="w-full text-end text-[14px] text-[#3A74CA] font-medium cursor-pointer"></p>
          </div>
          <p className="text-[#605D64] text-[14px] ">Allocated to users</p>
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
              <p className="text-[#3E3C42] font-semibold ">{unAllocated}</p>
              {/* coin icons */}
              <img src="/token.svg" alt="coins" />
            </div>
            <p className="w-full text-end text-[14px] text-[#3A74CA] font-medium cursor-pointer"></p>
          </div>
          <p className="text-[#605D64] text-[14px] ">Unallocated Tokens</p>
        </div>
      </div>
    </div>
  );
};

export default TokenData;
