import { Select } from "@chakra-ui/react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { useEffect, useState } from "react";
import { baseURL } from "../../..";

const Header = ({
  customEndDate,
  setCustomToTime,
  selectedExpert,
  selectedExpertId,
  setSelectedExpert,
  setSelectedExpertId,
  expertList,
  organisation,
  fullName,
  auth,
}) => {
  const [tokenBalance, setTokenBalance] = useState(0);

  const getBalance = async () => {
    try {
      const data = await fetch(baseURL + "token-wallet/v1/balance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      });
      const res = await data.json();
      if (data.status !== 400) {
        // setCredits(getQuestionsCredit(res, setDisabled));
        setTokenBalance(res.User.balance);
        // setDisabled(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBalance();
  }, []);
  return (
    <>
      <div className="flex justify-between">
        <div>
          <p className="text-[20px]" style={{ fontWeight: 500 }}>
            Hello, {fullName}
          </p>
        </div>
        <div className="flex items-center lg:gap-4 sm:gap-2 px-3 py-1 rounded-sm bg-[#FFFFD8]">
          <div>
            <p className="text-[14px] text-[#605D64] font-normal p-1">
              Question cost
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[#3E3C42] font-semibold text-[16px]">{200}</p>
            <img src="/token.svg" className="w-full h-full" alt="token" />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center my-2">
        <div className="flex items-center lg:gap-4 sm:gap-2 px-3 py-1 rounded-sm bg-[#FFFFD8]">
          <div>
            <p className="text-[14px] text-[#605D64] font-normal p-1">
              Current balance
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[#3E3C42] font-semibold text-[16px]">
              {tokenBalance}
            </p>
            <img src="/token.svg" className="w-full h-full" alt="token" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-16 text-[14px]">
        <div>
          <p className=" font-semibold">Expert</p>
          <div className="flex min-w-[110px]  items-center">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              variant="outline"
              className="!text-sm !font-medium text-[#605D64]"
              _focus={{ borderColor: "blue.500" }}
              value={selectedExpertId || ""}
              onChange={(e) => {
                const newSelectedId = parseInt(e.target.value, 10);
                const newSelectedExpert = expertList.find(
                  (expert) => expert.expertId === selectedExpertId
                );
                setSelectedExpert(newSelectedExpert);
                setSelectedExpertId(newSelectedId);
              }}
            >
              {expertList.map((expert) => (
                <option key={expert.expertId} value={expert.expertId}>
                  {expert.expertName}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          <p className=" font-semibold">Need by</p>
          <div className="flex gap-1 items-center">
            <div className="mt-1">
              <img src="/expert/date.svg" alt="" />
            </div>
            <div className="flex justify-center mt-1">
              <div className="min-w-[110px]">
                <FloatingInput
                  text=""
                  type="date"
                  setDateTime={setCustomToTime}
                  value={customEndDate}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className=" font-semibold">Enquirer</p>
          <div className="flex gap-1 items-center">
            <div>
              <img src="/expert/expert.png" alt="" />
            </div>
            <div>
              <p>{fullName}</p>
              <p className="text-[#AEA9B1]">{organisation}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
