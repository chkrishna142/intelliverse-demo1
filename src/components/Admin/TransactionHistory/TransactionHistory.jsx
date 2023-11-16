import { Spinner } from "@chakra-ui/react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { useEffect, useState } from "react";
import TransactionHistoryTable from "./TransactionHistoryTable";

const dummyData = [{ id: 1, title: "json-server", author: "typicode" }];

const TransactionHistory = () => {
  const [alertsChanging, setAlertsChanging] = useState(false);

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

  useEffect(() => {
    handleClick();
  }, []);

  return (
    <div className="mt-[3vh]">
      <div className="flex justify-start items-center w-full gap-2">
        <div>
          <img
            src="/transactionhistory/backarrow.svg"
            className="w-full h-full"
            alt="backarrow_img"
          />
        </div>
        <div className="flex justify-center items-center">
          <p className="font-semibold text-[20px] text-[#084298] text-bold">
            Transaction history
          </p>
        </div>
      </div>
      <div className="flex flex-col rounded-lg">
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
        <div className="pl-6 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className=" flex items-center gap-4 px-3 py-1 rounded-sm bg-[#FFFFD8]">
              <div>
                <p className="text-[14px] text-[#605D64] font-normal">
                  Current Balance
                </p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-[#3E3C42] font-semibold text-[14px]">2000</p>
                <img
                  src="/transactionhistory/token.svg"
                  className="w-full h-full"
                  alt="token"
                />
              </div>
            </div>
            <div>
              <p className="text-[#3A74CA] font-medium text-[14px]">
                Add Tokens
              </p>
            </div>
          </div>
          {/* Transaction History Table */}
          <TransactionHistoryTable />
          <div className="flex items-center gap-4 mb-[50px] ">
            <div className="bg-[#447ED4] text-[#FFFFFF] rounded-lg text-[16px] font-semibold">
              <button className="px-[16px] py-[10px]">
                AI Advisor question history
              </button>
            </div>
            <div className="bg-[#447ED4] text-[#FFFFFF] rounded-lg text-[16px] font-semibold">
              <button className="px-[16px] py-[10px]">
                Ask an Expert history
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
