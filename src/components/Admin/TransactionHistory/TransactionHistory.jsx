import { Spinner } from "@chakra-ui/react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";
import { useContext, useEffect, useState } from "react";
import TransactionHistoryTable from "./TransactionHistoryTable";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../..";
import NavContext from "../.././NavContext";

const TransactionHistory = () => {
  const { auth } = useContext(NavContext);
  const [tableData, setTableData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const navigate = useNavigate();
  const [currentBalance, SetCurrentBalance] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [fromTime, setFromTime] = useState(
    new Date(
      new Date().getTime() - 30 * 24 * 60 * 60 * 1000 + 5.5 * 60 * 60 * 1000
    )
      .toISOString()
      .slice(0, 10)
  );

  const [toTime, setToTime] = useState(
    new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10)
  );

  const [fromTimeInMs, setFromTimeInMs] = useState("");
  const [toTimeInMs, setToTimeInMs] = useState("");

  const setEndOfDay = (dateString) => {
    const parsedDate = new Date(dateString);
    // Set time to the end of the day (23:59:59.999)
    parsedDate.setHours(23, 59, 59, 999);
    return parsedDate;
  };
  const setStartOfDay = (dateString) => {
    const parsedDate = new Date(dateString);
    // Set time to the start of the day (00:00:00.000)
    parsedDate.setHours(0, 0, 0, 0);
    return parsedDate;
  };

  useEffect(() => {
    setFromTimeInMs(setStartOfDay(fromTime).getTime());
    setToTimeInMs(setEndOfDay(toTime).getTime());
  }, [fromTime, toTime]);
  const handleClick = () => {
    setLoading(true);

    fetchTransactionHistory();
  };

  const handleClickHistory = () => {
    window.history.back();
  };
  // navigating to addtokens page
  const handleToken = () => {
    navigate("/community/advisor/buycredits");
  };

  useEffect(() => {
    fetchTransactionHistory();
    fetchCurrentBalance();
  }, []);

  const handleAdvisorHistory = () => {
    navigate("/community/advisor/history");
  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(
        baseURL +
          `token-wallet/v1/transaction-log?endDate=${toTimeInMs}&startDate=${fromTimeInMs}`,
        {
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      setLoading(false);

      {
        response?.data?.transactionDetail &&
        response?.data?.transactionDetail.length > 0
          ? setTableData(response?.data?.transactionDetail?.reverse())
          : setTableData(response?.data?.transactionDetail);
      }
      console.log("res...",response)
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  const fetchCurrentBalance = async () => {
    try {
      const response = await axios.get(baseURL + "ripiktoken/balance", {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      });

      SetCurrentBalance(response.data.tokenBalance);
    } catch (e) {
      console.error(e);
    }
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
            {isLoading ? <Spinner /> : "Show"}
          </button>
        </div>
        <div className="lg:pl-6 flex flex-col gap-4 pr-2">
          <div className="flex items-center lg:w-[65vw] md:w-[70vw] justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center lg:gap-4 sm:gap-2 px-3 py-1 rounded-sm bg-[#FFFFD8]">
                <div>
                  <p className="text-[14px] text-[#605D64] font-normal p-1">
                    Current Balance
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <p className="text-[#3E3C42] font-semibold text-[14px]">
                    {currentBalance}
                  </p>
                  <img src="/token.svg" className="w-full h-full" alt="token" />
                </div>
              </div>
              <div onClick={handleToken}>
                <p className="text-[#3A74CA] font-bold text-[14px] cursor-pointer">
                  Buy Tokens
                </p>
              </div>
            </div>
          </div>

          {/* Transaction History Table */}

          {tableData && tableData.length !== 0 ? (
            <TransactionHistoryTable tableData={displayData} />
          ) : (
            <p className="ml-[45%]">No transaction history available.</p>
          )}
          {/* Pagination */}
          <div className="flex justify-end lg:w-[65vw] md:w-[70vw]">
            {tableData && tableData.length !== 0 && (
              <Pagination
                data={tableData}
                limit={7}
                setDisplayData={setDisplayData}
              />
            )}
          </div>

          <div className="md:pb-0 pb-10 flex items-center gap-4 mt-2">
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
