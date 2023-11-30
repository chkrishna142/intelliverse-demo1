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

const AskAnExpertHistory = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData,setFilteredData] = useState([])
  const [selectedRange, setSelectedRange] = useState(0);

  const [stateChanging, setStateChanging] = useState(false);
  const [changingbutton, setChangingbutton] = useState("All");

  const [homebadge, setHomebadge] = useState({
    badgeLogo: "/advisor/batchok.svg",
    badgeTag: "Proficient Inquirer",
  });

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
    setStateChanging(false);
    // apiCall();
  };

  const handleRangeSelect = (e) => {
    setSelectedRange(e.target.value);
    // for alltime e=0
    if (e.target.value == 0) {
      setFromTime(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
      setToTime(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    }
    // for this month e=1
    if (e.target.value == 1) {
      setFromTime(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
      setToTime(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    }
    // for this quarter e=2
    if (e.target.value == 2) {
      setFromTime(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
      setToTime(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    }
    // for previous quarter e=3
    if (e.target.value == 3) {
      setFromTime(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
      setToTime(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    }
    // for this year e=4
    if (e.target.value == 4) {
      setFromTime(
        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
      setToTime(
        new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10)
      );
    }
  };
  
  const [displayData, setDisplayData] = useState([]);

  const fetchQueries = async () => {
    try {
      let data = [
        {
          enquirer: "Sudhanshu Kumar",
          date: "2023-11-28",
          time: "12:30 pm",
          status: "Pending",
          company: "Asianpaints",
          queries:
            "What steps can we take to reduce our environmental impact and comply with regulation ?",
          deadline: "72 Hours",
          id: 1,
        },
        {
          enquirer: "Sudhanshu Kumar",
          date: "2023-11-28",
          time: "12:30 pm",
          status: "Inprogress",
          company: "Asianpaints",
          queries: "How can we improve our product quality?",
          deadline: "48 Hours",
          id: 2,
        },
        {
          enquirer: "Sudhanshu Kumar",
          date: "2023-11-28",
          time: "12:30 pm",
          status: "Answered",
          company: "Asianpaints",
          queries: "What is the best marketing strategy for our new product?",
          deadline: "24 Hours",
          id: 3,
        },
        {
          enquirer: "Sudhanshu Kumar",
          date: "2023-11-28",
          time: "12:30 pm",
          status: "Pending",
          company: "Asianpaints",
          queries: "How can we optimize our software development process?",
          deadline: "72 Hours",
          id: 4,
        },
        {
          enquirer: "Sudhanshu Kumar",
          date: "2023-11-28",
          time: "12:30 pm",
          status: "Inprogress",
          company: "Asianpaints",
          queries: "Discussing potential collaboration opportunities",
          deadline: "48 Hours",
          id: 5,
        },
        {
          enquirer: "Sudhanshu Kumar",
          date: "2023-11-28",
          time: "12:30 pm",
          status: "Answered",
          company: "Asianpaints",
          queries: "Seeking advice on adopting new technologies",
          deadline: "24 Hours",
          id: 6,
        },
        {
          enquirer: "Sudhanshu Kumar",
          date: "2023-11-28",
          time: "12:30 pm",
          status: "Answered",
          company: "Asianpaints",
          queries: "Seeking advice on adopting new technologies",
          deadline: "24 Hours",
          id: 7,
        },
        {
          enquirer: "Sudhanshu Kumar",
          date: "2023-11-28",
          time: "12:30 pm",
          status: "Answered",
          company: "Asianpaints",
          queries: "Seeking advice on adopting new technologies",
          deadline: "24 Hours",
          id: 8,
        },
        {
            enquirer: "Sudhanshu Kumar",
            date: "2023-11-28",
            time: "12:30 pm",
            status: "Answered",
            company: "Asianpaints",
            queries: "Seeking advice on adopting new technologies",
            deadline: "24 Hours",
            id: 9,
          },
          {
            enquirer: "Sudhanshu Kumar",
            date: "2023-11-28",
            time: "12:30 pm",
            status: "Answered",
            company: "Asianpaints",
            queries: "Seeking advice on adopting new technologies",
            deadline: "24 Hours",
            id: 10,
          },
      ];
      const statusOrder = ["Pending", "Inprogress", "Answered"];

      // Custom sort function
      data = data.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      );
      setTableData(data);
      setFilteredData(data)
    } catch (e) {
      console.error(e);
    }
  };


  useEffect(() => {
    fetchQueries();
  }, []);

  const handleStatus =(selectedStatus)=>{

    setChangingbutton(selectedStatus)
    if (selectedStatus === "All") {
        setFilteredData(tableData)
      } else {
        let filtered = tableData.filter((item) => item.status === selectedStatus);
        setFilteredData(filtered);
      }
  }

  return (
    <div className="mt-[3vh] flex flex-col w-full gap-2">
      <div className="w-full flex gap-[8px]">
        <p className="text-[20px] sm:text-[20px] font-semibold text-[#024D87]">
          Expert Dashboard
        </p>
      </div>
      {/* bottom white background part */}
      <div className="flex flex-col w-full h-full gap-[18px]  bg-white p-4 rounded-xl   ">
        <div className="w-full flex justify-end h-10 p-0 items-center">
          <div className="flex gap-2">
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
                  key="Last 7 days"
                  value={0}
                  className="bg-white hover:bg-blue-200"
                >
                  All time
                </option>
                <option
                  key="This Month"
                  value={1}
                  className="bg-white hover:bg-blue-200"
                >
                  This Month
                </option>
                <option
                  key="This Quarter"
                  value={2}
                  className="bg-white hover:bg-blue-200"
                >
                  This Quarter
                </option>
                <option
                  key="Previous Quarter"
                  value={3}
                  className="bg-white hover:bg-blue-200"
                >
                  Previous Quarter
                </option>
                <option
                  key="This Year"
                  value={4}
                  className="bg-white hover:bg-blue-200"
                >
                  This Year
                </option>
                <option
                  key="custom"
                  value={5}
                  className="bg-white hover:bg-blue-200"
                >
                  Custom
                </option>
              </Select>
            </div>
            {selectedRange == 5 && (
              <div className="w-[300px] gap-2 flex justify-end">
                <div className="min-w-[110px]">
                  <FloatingInput
                    text="From"
                    type="date"
                    setDateTime={setFromTime}
                    value={fromTime}
                  />
                </div>

                <div className="min-w-[110px]">
                  <FloatingInput
                    text="To"
                    type="date"
                    setDateTime={setToTime}
                    value={toTime}
                  />
                </div>
              </div>
            )}

            {/* <button
              className="text-center py-2 px-4 text-white text-xs md:text-base font-medium bg-[#6CA6FC] rounded-full min-w-[80px]"
              onClick={handleClick}
            >
              Apply
            </button> */}
          </div>
        </div>

        {/* <div className="w-full flex justify-evenly">
        
          <div className="w-[380px] p-0 flex h-full rounded-lg ">
            <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#FFFFC4] rounded-tl-lg  rounded-bl-lg">
              <img src="/advisor/yellowques.svg" alt="" />
            </div>
            <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[14px] ">New queries</p>
            </div>
          </div>
     
          <div className="w-[380px] p-0 flex h-full rounded-lg ">
            <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#CDEEBF] rounded-tl-lg  rounded-bl-lg">
              <img src="/advisor/greenques.svg" alt="" />
            </div>
            <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[14px] ">Active queries</p>
            </div>
          </div>
    

          <div className="w-[380px] p-0 flex h-full rounded-lg ">
            <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#CBE3FB] rounded-tl-lg  rounded-bl-lg">
              <img src="/advisor/blueques.svg" alt="" />
            </div>
            <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
              <p className="text-[#605D64] text-[18px] font-semibold">3</p>
              <p className="text-[#605D64] text-[14px] ">Answered queries</p>
            </div>
          </div>
        </div> */}
        <div className=" flex items-center rounded-lg shadow-md">
          <div className=" flex items-center gap-3 p-6">
            <div className="rounded-full">
              <img
                src="/askanexperthistory.png"
                className="w-full object-cover rounded-full"
                alt="img"
              />
            </div>
            <div className="">
              <p className="text-[18px] font-[600] text-[#1C56AC]">
                Hello Luc!
              </p>
              <p className="text-[#938F96] text-[14px] font-[500] ">
                You have <span className="text-[#FFC107]">2 new questions</span>{" "}
                to be answered. You have{" "}
                <span className="text-[#6CA6FC]">answered 80%</span> of the
                queries this week.
              </p>
              <p className="text-[#938F96] text-[14px] font-[500] ">
                Thank you for your expertise.
              </p>
            </div>
          </div>
          <div className="bg-[#124CA2] text-[#FAFAFA] w-[45vw] h-[140px] rounded-r-lg flex items-center gap-[56px] pl-[46px]">
            <div className="">
              <div className="mb-3">
                <img src="/questionmarkorange.svg" alt="questionmark" />
              </div>
              <p className="text-[24px] font-[500]">2</p>
              <p className="text-[14px] font-[400]">In Progress</p>
            </div>
            <div>
              <div className="mb-3">
                <img src="/questionmarkgreen.svg" alt="questionmark" />
              </div>
              <p className="text-[24px] font-[500]">2</p>

              <p className="text-[14px] font-[400]">Pending</p>
            </div>
            <div>
              <div className="mb-3">
                <img src="/questionmarkblue.svg" alt="questionmark" />
              </div>
              <p className="text-[24px] font-[500]">6</p>
              <p className="text-[14px] font-[400]">Answered questions</p>
            </div>
          </div>
        </div>
        <div className="w-full h-[60px] flex justify-between">
          {/* filter button */}
          <div className=" w-[500px]  flex gap-3 justify-start p-1">
            <button
              className={`w-[80px] flex justify-center items-center ${
                changingbutton == "All"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px] `}
              onClick={()=>handleStatus("All")}
            >
              <p className="text-[#605D64]">All</p>
            </button>
            <button
              className={`w-[80px] flex justify-center items-center ${
                changingbutton == "Pending"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px] `}
              onClick={()=>handleStatus("Pending")}
            >
              <p className="text-[#605D64]">Pending</p>
            </button>
            <button
              className={`w-[150px] flex justify-center items-center ${
                changingbutton == "Inprogress"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px] `}
              onClick={()=>handleStatus("Inprogress")}
            >
              <p className="text-[#605D64]">In progress</p>
            </button>
            <button
              className={`w-[100px] flex justify-center items-center ${
                changingbutton == "Answered"
                  ? "bg-[#DDEEFF] text-[#605D64] border-[#6CA6FC]"
                  : "border-[#EBEBEB]"
              } border-[2px]  rounded-full px-[16px] py-[8px] `}
              onClick={()=>handleStatus("Answered")}
            >
              <p className="text-[#605D64]">Answered</p>
            </button>
          </div>
          {/* paginator */}
          <div className="w-[400px]  flex justify-evenly items-center p-2 ">
            <ExlCsvDownload
              data={[""]}
              order={[""]}
              orderDetail={[""]}
              enable={true}
            />
            <div className="flex justify-end gap-3 ">
              
                <Paginator
                  data={filteredData}
                  limit={4}
                  setDisplayData={setDisplayData}
                />
              
            </div>
          </div>
        </div>

        <div>
          <AskAnExpertHistoryTable rowData={displayData} />
        </div>
      </div>
    </div>
  );
};

export default AskAnExpertHistory;
