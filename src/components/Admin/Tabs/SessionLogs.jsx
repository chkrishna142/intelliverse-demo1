import React from "react";

import { AddIcon, DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { NorthEast, SouthEast } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import Paginator from "../../../util/VisionUtils/Paginator";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";
import axios from "axios";
import ExlCsvDownload from "../../../util/VisionUtils/ExlCsvDownload";
import SessionLogsTable from "../Tables/SessionLogsTable";

const SessionLogs = () => {
  const { auth } = useContext(NavContext);
  const [sessions, setSessions] = useState([]);
  const [order,setOrder] = useState({})
  

  const [displaySessions, setDisplaySessions] = useState([]);
  const [avgDuration, setAvgDuration] = useState({
    duration: 0,
    compare: 0,
  });
  const [displayData, setDisplayData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiCall();
    fetchDownloadApi()
  }, []);

  const apiCall = async () => {
    const obj = {"header":"logs"}
    try {
      const response = await axios.get(baseURL + "iam/logs", {
        headers: {
          "Content-Type": "application/json",
          "X-auth-Token": auth,
        },
      });

      setSessions(response.data.data);
     
      
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDownloadApi = async () => {
    const header = {"header":"logs"}
    try {
      const response = await axios.post(baseURL + "iam/header",header, {
        headers: {
          "Content-Type": "application/json",
          "X-auth-Token": auth,
        },
      });

    //setting order for downloading data
      setOrder(response.data)
      
    } catch (error) {
      console.log(error);
    }
  };
  //search bar
  useEffect(() => {
    if (search) {
      setDisplaySessions(
        sessions.filter((session) => {
          return (
            session?.email?.slice(0, search.length)?.toLowerCase() ===
              search?.toLowerCase() ||
            (session?.email?.includes("@") &&
              session?.email?.split("@")[1]
                ?.slice(0, search.length)
                ?.toLowerCase() === search?.toLowerCase())
          );
        })
      );
    } else setDisplaySessions(sessions);
  }, [search, sessions]);
  //average calculation
  useEffect(() => {
    if (sessions.length != 0) {
      let data = sessions;
      Date.prototype.getWeek = function () {
        const date = new Date(this.getTime());
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
        const week1 = new Date(date.getFullYear(), 0, 4);
        return (
          1 +
          Math.round(
            ((date - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
          )
        );
      };
      const groupedData = {};
      data.forEach((session) => {
        const weekNumber = new Date(session.loginTime).getWeek();
        if (!groupedData[weekNumber]) {
          groupedData[weekNumber] = [];
        }
        groupedData[weekNumber].push(session);
      });
      const averageDurations = {};
      for (const weekNumber in groupedData) {
        const sessions = groupedData[weekNumber];
        const totalDuration = sessions.reduce(
          (sum, session) => sum + session.sessionDuration,
          0
        );
        const averageDuration = totalDuration / sessions.length;
        averageDurations[weekNumber] = averageDuration;
      }
      const weekNumbers = Object.keys(averageDurations).map(Number);
      const latestWeek = Math.max(...weekNumbers);
      setAvgDuration({
        duration:
          Math.floor(averageDurations[latestWeek] / (1000 * 60 * 60)) +
          " hrs " +
          Math.floor(
            (averageDurations[latestWeek] % (1000 * 60 * 60)) / (1000 * 60)
          ) +
          " min",
        compare: averageDurations[latestWeek - 1]
          ? (averageDurations[latestWeek] - averageDurations[latestWeek - 1])*100 /
            averageDurations[latestWeek - 1]
          : 100,
      });
    }
  }, [sessions]);
  console.log("session",sessions)
  return (
    <div className="w-full px-2 !font-roboto">
      <div className="flex flex-col min-[1300px]:flex-row justify-between">
        <div className="flex flex-row justify-start gap-6">
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-[#605D64]">
              {avgDuration.duration}
              <span className="text-sm text-[#938F96] font-normal mb-2">
                <span
                  className="items-start text-sm"
                  style={{
                    color: avgDuration.compare > 0 ? "#7AC958" : "#FF4C4C",
                  }}
                >
                  {avgDuration.compare > 0 ? (
                    <NorthEast sx={{ fontSize: "16px" }} />
                  ) : (
                    <SouthEast sx={{ fontSize: "16px" }} />
                  )}
                  {Math.abs(avgDuration.compare?.toFixed(2))}%
                </span>
                {avgDuration.compare > 0
                  ? " increase over last week"
                  : " less than last week"}
              </span>
            </p>
            <p className="text-[#938F96]">Average session duration</p>
          </div>
        </div>
        <div className="flex flex-col min-[850px]:flex-row justify-end min-[1300px]:justify-start items-end gap-6">
          <div className="w-full min-[850px]:w-[320px] flex flex-row border-2 py-2 rounded px-4 justify-between">
            <input
              className="w-full focus:outline-none text-sm"
              placeholder="Search email ID"
              onChange={(e) => setSearch(e.target.value)}
            />
            <img className="h-5 text-black" src="/search.svg" />
          </div>
          <div className="flex flex-col min-[450px]:flex-row items-end gap-6">
            {sessions.length > 0 && <ExlCsvDownload data={sessions} order={order.summary} orderDetail={order.detail} enable={true}/>}
            <Paginator
              data={displaySessions}
              limit={6}
              setDisplayData={setDisplayData}
            />
          </div>
        </div>
      </div>
    <div>
    <SessionLogsTable rowData={displayData} />
    </div>
    </div>
  );
};

export default SessionLogs;
