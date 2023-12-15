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
import PrimaryButton from "../../util/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
const AskAnExpertHistory = () => {
  const { auth } = useContext(NavContext);
  const navigate = useNavigate();
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
  const [top3clients, setTopClients] = useState([]);
  const [top3Enquirers, setTopEnquirers] = useState([]);
  const [top3Experts, setExperts] = useState([]);
  const [tokenSummary, setTokenSummary] = useState([]);
  const [role, setRole] = useState("");
  const [imageurl, setImageUrl] = useState("");

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
      setTopEnquirers(response?.data?.top3enquirer);
      setTopClients(response?.data?.top3client);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(baseURL + "user", {
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      });
      setFullName(response?.data.data.fullname);
      setRole(response?.data.data.role);
      setImageUrl(response?.data?.data?.imageurl);
      // console.log("reee", response);
      if (response?.data.data.role === "EXPERT") {
        fetchQueries();
      } else {
        handleQuestionsExceptexpert();
      }
      // console.log("users",response?.data.data.fullname);
    } catch (e) {
      console.error(e);
    }
  };

  const handleQuestionsExceptexpert = () => {
    const data = [
      {
        starred: false,
        subject: "s1",
        question: "Danish Asking",
        questionId: "f136dd04-80d5-41ab-8c76-117454ae5596",
        organisation: "Ripik.Ai",
        expert: "Aman Kumar",
        dateTime: "2023-12-14T11:55:13.809513",
        deadLine: 74,
        status: "Pending",
      },
      {
        starred: true,
        subject: "Exquisite Subject",
        question: "Cant Solve?",
        questionId: "67f4fc41-06af-4f93-94c4-5c9f893ad812",
        organisation: "Ripik.Ai",
        expert: "Aman Kumar",
        dateTime: "2023-12-12T14:41:53.694541",
        deadLine: 29,
        status: "In Progress",
      },
      {
        starred: false,
        subject: "Wanted to ask about something",
        question: "Dunno what to ask?",
        questionId: "a4a9a9b4-80c6-4144-9bf3-23449a5c464c",
        organisation: "Ripik.Ai",
        expert: "Anandkar",
        dateTime: "2023-12-12T13:50:37.868293",
        deadLine: 28,
        status: "Pending",
      },
      {
        starred: false,
        subject: "(no subject)",
        question: "NewStuff",
        questionId: "d466748d-f8b3-4400-b14f-2b7c5b9c76ca",
        organisation: "Ripik.Ai",
        expert: "Anandkar",
        dateTime: "2023-12-12T13:48:47.386948",
        deadLine: 28,
        status: "Pending",
      },
      {
        starred: true,
        subject: null,
        question: "#Unique",
        questionId: "37ca6b26-9aa9-452f-be25-a01af838d085",
        organisation: "Ripik.Ai",
        expert: "Anandkar",
        dateTime: "2023-12-07T19:42:12.697713",
        deadLine: -1,
        status: "In Progress",
      },
      {
        starred: false,
        subject: null,
        question: "How u doin Mr.Expert",
        questionId: "1cec94eb-3030-43b8-a535-280e14b006d4",
        organisation: "Ripik.Ai",
        expert: "Anandkar",
        dateTime: "2023-12-06T19:36:24.152814",
        deadLine: -1,
        status: "Pending",
      },
      {
        starred: false,
        subject: null,
        question: "Testing Question",
        questionId: "b948d0b5-6970-45ae-9b5e-3853e02a9c08",
        organisation: "Ripik.Ai",
        expert: "Sharun N D",
        dateTime: "2023-12-06T12:18:15.10578",
        deadLine: -1,
        status: "In Progress",
      },
      {
        starred: true,
        subject: null,
        question: "Testing Question",
        questionId: "20a4630f-ec5b-49e2-bc6c-487b9c2c6e4f",
        organisation: "Ripik.Ai",
        expert: "Sharun N D",
        dateTime: "2023-12-06T12:18:02.219655",
        deadLine: -1,
        status: "In Progress",
      },
    ];
    setExperts({
      names: ["Expert 1", "Expert 1", "Expert 3"],
      questions: [24, 20, 17],
    });
    setTokenSummary({
      names: ["Total questions asked", "Total tokens used"],
      questions: [24, 20],
    });

    setDownloadData(data);
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
    const sortedData = data.sort((a, b) => {
      const statusOrder = ["In Progress", "Pending", "Answered"];
      return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    });

    setTableData(sortedData);
    setFilteredData(sortedData);

    setLoading(false);
  };

  useEffect(() => {
    if (auth) {
      setLoading(true);
      fetchUser();
      // if (role === "EXPERT") {
      //   fetchQueries();
      // } else {
      //   handleQuestionsExceptexpert();
      // }
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
      const filtered = tableData.filter(
        (item) => item.status === selectedStatus
      );
      setFilteredData(filtered);
    }
  };
  const handleQuestionPage = () => {
    navigate("/community/askanexpert/question");
  };

  console.log("img", imageurl);

  return (
    <div className="mt-[3vh] flex flex-col w-full gap-1 ">
      <div className="w-full flex justify-between items-center">
        <p className="text-[20px] sm:text-[20px] font-semibold text-[#024D87]">
          {fullName}'s Dashboard
        </p>
        <div className="flex gap-3">
          {role !== "EXPERT" && (
            <PrimaryButton
              text={"Ask a question"}
              width={"fit-content"}
              onClick={handleQuestionPage}
            />
          )}
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
          {role !== "EXPERT" && (
            <div className="flex items-center lg:gap-4 sm:gap-2 px-3 py-1 rounded-sm bg-[#FFFFD8]">
              <div>
                <p className="text-[14px] text-[#605D64] font-normal p-1">
                  Current Balance
                </p>
              </div>
              <div className="flex items-center gap-1">
                <p className="text-[#3E3C42] font-semibold text-[14px]">
                  {2000}
                </p>
                <img src="/token.svg" className="w-full h-full" alt="token" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full h-full  bg-white p-4 rounded-xl">
        {/* <div className=" flex items-center  rounded-lg "> */}
        <div className="flex items-center  rounded-lg">
          <div className="bg-[#124CA2] w-[30vw] flex items-center justify-evenly rounded-l-lg  gap-4 h-[200px]">
            <div className="rounded-full w-[100px]">
              {imageurl !== "" && imageurl !== null ? (
                <img
                  src={imageurl}
                  className="w-full object-covered rounded-full h-[100px]"
                  alt="img"
                />
              ) : (
                <img
                  src="/profile.svg"
                  className="w-full object-cover rounded-full"
                  alt="img"
                />
              )}
              {/* <AccountBoxIcon /> */}
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

          <div className="flex flex-1 bg-white justify-center rounded-r-lg h-[200px]">
            <div className=" flex flex-col mt-5 ">
              <div className="text-[14px] font-semibold">
                {role === "EXPERT" ? "Top 3 Clients" : "Top 3 Experts"}
              </div>
              <div className="text-[#fff]">
                {top3clients && top3clients?.names?.length > 0 && (
                  <TopClientsChart data={top3clients} role={role} />
                )}
                {top3Experts && top3Experts?.names?.length > 0 && (
                  <TopClientsChart data={top3Experts} role={role} />
                )}
              </div>
            </div>
            <div className=" flex flex-col mt-5">
              <div className="text-[14px] font-semibold">
                {role === "EXPERT" ? "Top 3 Enquirers" : "Token summary"}
              </div>
              <div className="text-[#fff]">
                {top3Enquirers &&
                  top3Enquirers?.names?.length > 0 &&
                  top3Enquirers?.questions?.length > 0 && (
                    <TopEnquirerChart data={top3Enquirers} role={role} />
                  )}
                {tokenSummary &&
                  tokenSummary?.names?.length > 0 &&
                  tokenSummary?.questions?.length > 0 && (
                    <TopEnquirerChart data={tokenSummary} role={role} />
                  )}
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
            {filteredData && filteredData.length != 0 && role === "EXPERT" ? (
              <ExlCsvDownload
                data={filteredData}
                order={downloadData.summary}
                orderDetail={downloadData.details}
                enable={true}
              />
            ) : (
              filteredData &&
              filteredData.length != 0 && (
                <ExlCsvDownload
                  data={[""]}
                  order={[""]}
                  orderDetail={[""]}
                  enable={true}
                />
              )
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
                {filteredData && filteredData.length !== 0 && role ? (
                  <AskAnExpertHistoryTable
                    rowData={filteredData}
                    fetchQueries={fetchQueries}
                    role={role}
                  />
                ) : (
                  <p className="ml-[45%]">No data available!</p>
                )}
              </React.Fragment>
            )}
          </div>
          <div className="flex justify-end">
            <div>
              {/* <Paginator
                data={filteredData}
                limit={5}
                setDisplayData={setDisplayData}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskAnExpertHistory;
