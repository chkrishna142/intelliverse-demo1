import { Spinner } from "@chakra-ui/react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { useEffect, useState } from "react";
import TransactionHistoryTable from "./TransactionHistoryTable";
import Pagination from "./Pagination";
import { NavLink, useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  const [alertsChanging, setAlertsChanging] = useState(false);
  const [dummyData, setDummyData] = useState([
    {
      date: "15 Nov '23",
      time: "12:30",
      description: "Purchase",
      tokens: "20",
      balance: "20",
    },
    {
      date: "16 Nov '23",
      time: "01:30",
      description: "Transfer",
      tokens: "20",
      balance: "20",
    },
    {
      date: "15 Nov '23",
      time: "12:30",
      description: "AI Advisor usage",
      tokens: "20",
      balance: "20",
    },
    {
      date: "15 Nov '23",
      time: "17:00",
      description: "Purchase",
      tokens: "20",
      balance: "20",
    },
    {
      date: "16 Nov '23",
      time: "16:30",
      description: "Transfer",
      tokens: "20",
      balance: "20",
    },
    {
      date: "15 Nov '23",
      time: "12:30",
      description: "AI Advisor usage",
      tokens: "20",
      balance: "20",
    },
    {
      date: "16 Nov '23",
      time: "01:30",
      description: "Transfer",
      tokens: "20",
      balance: "20",
    },
    {
      date: "15 Nov '23",
      time: "12:30",
      description: "AI Advisor usage",
      tokens: "20",
      balance: "20",
    },
    {
      date: "15 Nov '23",
      time: "17:00",
      description: "Purchase",
      tokens: "20",
      balance: "20",
    },
    {
      date: "16 Nov '23",
      time: "16:30",
      description: "Transfer",
      tokens: "20",
      balance: "20",
    },
    {
      date: "15 Nov '23",
      time: "12:30",
      description: "AI Advisor usage",
      tokens: "20",
      balance: "20",
    },
  ]);
  const [displayData, setDisplayData] = useState([]);
  const navigate = useNavigate();

  const [fromTime, setFromTime] = useState(
    new Date(new Date().getTime() - 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  const handleClick = () => {
    setAlertsChanging(false);
  };

  const handleClickHistory = () => {
    window.history.back();
  };
  // navigating to addtokens page
  const handleToken = () => {
    navigate("/community/advisor/buycredits");
  };

  useEffect(() => {
    handleClick();
  }, []);

  const handleAdvisorHistory = () => {
    navigate("/community/advisor/history");
  };

  return (
    <div className="mt-[3vh]">
      <div className="flex justify-start items-center w-full gap-2">
        {/* <div className="cursor-pointer">
          <img
            src="/transactionhistory/backarrow.svg"
            className="w-full h-full"
            alt="backarrow_img"
          />
        </div> */}
        <div
          className="flex justify-center items-center cursor-pointer"
          onClick={handleClickHistory}
        >
          <p className="font-semibold text-[20px] text-[#084298] text-bold">
            Transaction history
          </p>
        </div>
      </div>
      <div className="flex flex-col rounded-lg bg-white">
        <div className="p-6 pl-6 pr-6 gap-6 flex flex-col md:flex-row items-center">
          {/* Date Picker */}
          <div>
            <FloatingInput
              text="Start time "
              type="date"
              setDateTime={setFromTime}
              value={fromTime}
            />
          </div>
          <div>
            <FloatingInput
              text="End time"
              type="date"
              setDateTime={setToTime}
              value={toTime}
            />
          </div>
          <button
            className="text-center p-[8px] pl-4 pr-4 text-white text-xs md:text-base font-medium bg-[#084298] rounded-lg"
            onClick={handleClick}
          >
            {alertsChanging ? <Spinner /> : "Show"}
          </button>
        </div>
        <div className="lg:pl-6 flex flex-col gap-4 pr-2">
          <div className="flex items-center lg:w-[55vw] md:w-[70vw] justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center lg:gap-4 sm:gap-2 px-3 py-1 rounded-sm bg-[#FFFFD8]">
                <div>
                  <p className="text-[14px] text-[#605D64] font-normal">
                    Current Balance
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[#3E3C42] font-semibold text-[14px]">
                    2000
                  </p>
                  <img src="/token.svg" className="w-full h-full" alt="token" />
                </div>
              </div>
              <div onClick={handleToken}>
                <p className="text-[#3A74CA] font-bold text-[14px] cursor-pointer">
                  Add Tokens
                </p>
              </div>
            </div>
            {/* Pagination */}
            <div>
              <Pagination
                data={dummyData}
                limit={7}
                setDisplayData={setDisplayData}
              />
            </div>
          </div>

          {/* Transaction History Table */}

          <TransactionHistoryTable dummyData={displayData} />

          <div className="md:pb-0 pb-10 flex items-center gap-4 mb-[10px]">
            <div
              className="bg-[#447ED4] text-[#FFFFFF] rounded-lg text-[16px] font-semibold"
              onClick={handleAdvisorHistory}
            >
              <button className="px-[16px] py-[10px]">
                AI Advisor question history
              </button>
            </div>
            {/* <div className="bg-[#447ED4] text-[#FFFFFF] rounded-lg text-[16px] font-semibold">
              <button className="px-[16px] py-[10px]">
               Ask an Expert history
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
