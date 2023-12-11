import React, { useState, useEffect, useRef, useContext } from "react";
import { Select, Spinner } from "@chakra-ui/react";
import TransactionTable from "./TransactionTable";
import ReadMore from "./ReadMore";
import ExpertHistoryTable from "./ExpertHistoryTable";
import DownloadExcel from "./DownloadExcel";
import FloatingInput from "../../util/VisionUtils/FloatingInput";
import Paginator from "../../util/VisionUtils/Paginator";
import ExlCsvDownload from "../../util/VisionUtils/ExlCsvDownload";
import AskAnExpertHistoryTable from "./AskAnExpertHistoryTable";
import { filter } from "d3-array";
import axios from "axios";
import NavContext from ".././NavContext";
import { baseURL } from "../../index";
import TopEnquirerChart from "./AskAnExpertCharts/TopEnquirerChart";
import TopClientsChart from "./AskAnExpertCharts/TopClientsChart";

const AskAnExpertHistory = () => {
  const { auth } = useContext(NavContext);

  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRange, setSelectedRange] = useState(0);

  const [stateChanging, setStateChanging] = useState(false);
  const [changingbutton, setChangingbutton] = useState("All");

  const [homebadge, setHomebadge] = useState({
    badgeLogo: "/advisor/batchok.svg",
    badgeTag: "Proficient Inquirer",
  });

  const [startDate, setFromTime] = useState("");
  const [endDate, setToTime] = useState("");
  const [customStartDate, setCustomFromTime] = useState("");
  const [customEndDate, setCustomToTime] = useState("");
  const [pendingQuestions, setPendingQuestions] = useState(0);
  const [inProgressQuestions, setInProgressQuestions] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  const [fullName, setFullName] = useState("");
  const [downloadData, setDownloadData] = useState({});
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setStateChanging(false);
    // apiCall();
    // Set the time of the selected start date to 00:00:00
    const customStartDateObject = new Date(customStartDate);
    customStartDateObject.setHours(0, 0, 0);
    const customStartTimeInMs = customStartDateObject.getTime();
    // Set the time of the selected end date to 23:59:59
    const customEndDateObject = new Date(customEndDate);
    customEndDateObject.setHours(23, 59, 59);
    const customEndTimeInMs = customEndDateObject.getTime();

    // Call API with custom values
    fetchQueries(customStartTimeInMs, customEndTimeInMs);
  };

  const handleRangeSelect = (e) => {
    setSelectedRange(e.target.value);

    // Get the current time
    const currentTime = new Date().getTime();

    // Calculate start and end times based on the selected range
    let startTime, endTime;

    switch (e.target.value) {
      case "0": // All Time

        // Set startTime to the beginning of the year 2022
        startTime = new Date("2022-01-01T00:00:00").getTime();
        // Set endTime to the current time
        endTime = currentTime;
        break;

      case "1": // Last Seven Days
        startTime = currentTime - 7 * 24 * 60 * 60 * 1000;
        endTime = currentTime;
        console.log("1", startTime, endTime);
        break;

      case "2": // This Month
        const startOfMonth = new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          1,
          0,
          0,
          0
        ).getTime();
        startTime = startOfMonth;
        endTime = currentTime;
        break;

      case "3": // This Quarter
        let currentMonth = new Date(currentTime).getMonth();
        let startQuarter = currentMonth - (currentMonth % 3);
        startTime = new Date(
          new Date().getFullYear(),
          startQuarter,
          1,
          0,
          0,
          0
        ).getTime();
        endTime = currentTime;
        break;

      case "4": // Previous Quarter
        let currentMonthPre = new Date(currentTime).getMonth();

        const startPreviousQuarter =
          currentMonthPre - (currentMonthPre % 3) - 3;
        startTime = new Date(
          new Date().getFullYear(),
          startPreviousQuarter,
          1,
          0,
          0,
          0
        ).getTime();
        endTime = new Date(
          new Date().getFullYear(),
          startPreviousQuarter + 2,
          31,
          23,
          59,
          59
        ).getTime();
        break;

      case "5": // This Year
        const startOfYear = new Date(
          new Date().getFullYear(),
          0,
          1,
          0,
          0,
          0
        ).getTime();
        startTime = startOfYear;
        endTime = currentTime;
        break;

      default:
        break;
    }

    // Update state with the calculated start and end times
    setFromTime(startTime);
    setToTime(endTime);
    
    // Call API when a new range is selected
    if (e.target.value !== "6") {
      fetchQueries(startTime, endTime);
    }
  };

  const fetchQueries = async (startTime = null, endTime = null) => {
    try {
      let requestData = null;

      if (startTime != null && endTime !== null) {
        // If startTime and endTime are provided, create the request data
        requestData = {
          startDate: startTime,
          endDate: endTime,
        };
      }

      const response = await axios.post(
        baseURL + "questions/expert",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );

      const data = response?.data.data;
      setDownloadData(response?.data);
      // Count questions based on status
      const pendingCount = data.filter(
        (item) => item.status === "Pending"
      ).length;
      const inProgressCount = data.filter(
        (item) => item.status === "In Progress"
      ).length;
      const answeredCount = data.filter(
        (item) => item.status === "Answered"
      ).length;

      setPendingQuestions(pendingCount);
      setInProgressQuestions(inProgressCount);
      setAnsweredQuestions(answeredCount);

      // Sort data based on the order "In Progress" -> "Pending" -> "Answered"
      const sortedData = data.sort((a, b) => {
        const statusOrder = ["In Progress", "Pending", "Answered"];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      });

      setTableData(sortedData);
      setFilteredData(sortedData);
      setLoading(false);
      // console.log("date in fetch ", requestData);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchUser = async () => {
    try {
      const response = await axios.get(
        baseURL + "user",

        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      setFullName(response?.data.data.fullname);
      // console.log("users",response?.data.data.fullname);
    } catch (e) {
      console.error(e);
    }
  };

  

  useEffect(() => {
    if (auth) {
      setLoading(true);
      fetchQueries();
      fetchUser();
    }
  }, [auth]);

  const handleStatus = (selectedStatus) => {
    setChangingbutton(selectedStatus);
    if (selectedStatus === "All") {
      setFilteredData(tableData);
    } else if (selectedStatus === "starred") {
      // Filter data based on the "starred" status
      const starredData = tableData.filter((item) => item.starred);
      setFilteredData(starredData);
    } else {
      // Filter data based on other statuses
      const filtered = tableData.filter((item) => item.status === selectedStatus);
      setFilteredData(filtered);
    }
  };

  return (
    <div className="mt-[3vh] flex flex-col w-full gap-1">
      <div className="w-full flex justify-between items-center">
        <p className="text-[20px] sm:text-[20px] font-semibold text-[#024D87]">
          {fullName}'s Dashboard
        </p>
        <div className="flex items-center gap-1">
          <div className="flex min-w-[110px]  items-center">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              variant="outline"
              className="!text-sm !font-medium text-[#605D64]"
              _focus={{ borderColor: "blue.500" }}
              onChange={(e) => handleRangeSelect(e)}
              value={selectedRange}
            >
              <option
                key="All Time"
                value={0}
                className="bg-white hover:bg-blue-200"
              >
                All time
              </option>
              <option
                key="Last Seven Days"
                value={1}
                className="bg-white hover:bg-blue-200"
              >
                This Week
              </option>
              <option
                key="This Month"
                value={2}
                className="bg-white hover:bg-blue-200"
              >
                Month to Date
              </option>
              <option
                key="This Quarter"
                value={3}
                className="bg-white hover:bg-blue-200"
              >
                Quarter to Date
              </option>
              {/* <option
                key="Previous Quarter"
                value={4}
                className="bg-white hover:bg-blue-200"
              >
                Previous Quarter
              </option> */}
              <option
                key="This Year"
                value={5}
                className="bg-white hover:bg-blue-200"
              >
                Year to Date
              </option>
              <option
                key="custom"
                value={6}
                className="bg-white hover:bg-blue-200"
              >
                Custom Range
              </option>
            </Select>
          </div>
          {selectedRange == 6 && (
            <div className="gap-2 flex justify-end">
              <div className="min-w-[110px]">
                <FloatingInput
                  text="From"
                  type="date"
                  setDateTime={setCustomFromTime}
                  value={customStartDate}
                />
              </div>

              <div className="min-w-[110px]">
                <FloatingInput
                  text="To"
                  type="date"
                  setDateTime={setCustomToTime}
                  value={customEndDate}
                />
              </div>
              <div>
                <button
                  className="text-center py-2 px-2 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-md min-w-[80px]"
                  onClick={handleClick}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full h-full  bg-white p-4 rounded-xl">
        {/* <div className=" flex items-center  rounded-lg "> */}
        <div className="flex items-center  rounded-lg">
          <div className="bg-[#124CA2] flex-1 flex items-center justify-evenly rounded-l-lg  gap-4 h-[200px]">
            <div className="rounded-full ">
              <img
                src="/askanexperthistory.png"
                className="w-full object-cover rounded-full"
                alt="img"
              />
            </div>
            <div className=" flex flex-col justify-center text-[#FAFAFA] ">
              <div className=" font-md text-[20px]">Question Summary</div>
              <div className="flex items-center gap-10">
                <div className="">
                  {/* <div className="mb-3">
                <img src="/questionmarkorange.svg" alt="questionmark" />
              </div> */}
                  <p className="text-[40px] font-[500] text-[#69B04B]">
                    {inProgressQuestions}
                  </p>
                  <p className="text-[14px] font-[400] ">In Progress</p>
                </div>
                <div>
                  {/* <div className="mb-3">
                <img src="/questionmarkgreen.svg" alt="questionmark" />
              </div> */}
                  <p className="text-[40px] font-[500] text-[#FFC107]">
                    {pendingQuestions}
                  </p>

                  <p className="text-[14px] font-[400] ">Pending</p>
                </div>
                <div>
                  {/* <div className="mb-3">
                <img src="/questionmarkblue.svg" alt="questionmark" />
              </div> */}
                  <p className="text-[40px] font-[500]">{answeredQuestions}</p>
                  <p className="text-[14px] font-[400]">Answered</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 bg-blue-100 justify-evenly rounded-r-lg h-[200px]">
          <div className=" flex flex-col justify-center mt-5 items-center ">
              <div className="text-[20px] font-md">Top 3 Clients</div>
              <div className="text-[#fff]">
                <TopClientsChart />
              </div>
            </div>
            <div className=" flex flex-col justify-center mt-5 items-center ">
              <div className="text-[20px] font-md">Top 3 Enquirers</div>
              <div className="text-[#fff]">
                <TopEnquirerChart />
              </div>
            </div>
          </div>
          <div className="p-10">
            <img src="/advisor/batchok.svg" alt="" />
          </div>
          {/* </div> */}
        </div>
        <div className="w-full flex justify-between mt-3">
          {/* filter button */}
          <div className="flex gap-3 justify-start p-2">
            <button
              className={`w-[70px] flex justify-center items-center ${
                changingbutton == "All"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[10px] py-[4px] `}
              onClick={() => handleStatus("All")}
            >
              <p className="text-[#605D64]">All</p>
            </button>
            <button
              className={`px-[10px] ${
                changingbutton == "In Progress"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full`}
              onClick={() => handleStatus("In Progress")}
            >
              <p className="text-[#605D64]">In progress</p>
            </button>
            <button
              className={`w-[80px] flex justify-center items-center ${
                changingbutton == "Pending"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px] `}
              onClick={() => handleStatus("Pending")}
            >
              <p className="text-[#605D64]">Pending</p>
            </button>

            <button
              className={`w-[100px] flex justify-center items-center ${
                changingbutton == "Answered"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px]`}
              onClick={() => handleStatus("Answered")}
            >
              <p className="text-[#605D64]">Answered</p>
            </button>
            <button
              className={`w-[100px] flex justify-center items-center ${
                changingbutton == "starred"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px]`}
              onClick={() => handleStatus("starred")}
            >
              <p className="text-[#605D64]">Starred</p>
            </button>
          </div>
          {/* paginator */}
          <div className="">
            {displayData && displayData.length != 0 && (
              <ExlCsvDownload
                data={displayData}
                order={downloadData.summary}
                orderDetail={downloadData.details}
                enable={true}
              />
            )}
          </div>
        </div>

        <div>
          {/* {displayData && displayData.length != 0 && (
            <AskAnExpertHistoryTable rowData={displayData} />
          )} */}
          <div>
            {loading ? (
              <div className="ml-[50%]">
                <Spinner speed="0.65s" />
              </div>
            ) : (
              <React.Fragment>
                {displayData && displayData.length !== 0 ? (
                  <AskAnExpertHistoryTable rowData={displayData} fetchQueries={fetchQueries} handleStatus={handleStatus}/>
                ) : (
                  <p className="ml-[45%]">No data available!</p>
                )}
              </React.Fragment>
            )}
          </div>
          <div className="flex justify-end">
            <div>
              <Paginator
                data={filteredData}
                limit={5}
                setDisplayData={setDisplayData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAnExpertHistory;
