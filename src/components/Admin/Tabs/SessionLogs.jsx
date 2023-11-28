import React from "react";
import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Tfoot,
  Link,
  Button,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { NorthEast, SouthEast } from "@mui/icons-material";
import { useState, useEffect, useContext } from "react";
import Paginator from "../../../util/VisionUtils/Paginator";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";
import axios from "axios";
import ExlCsvDownload from "../../../util/VisionUtils/ExlCsvDownload";

const SessionLogs = () => {
  const { auth } = useContext(NavContext);
  const [sessions, setSessions] = useState([]);
  const [displaySessions, setDisplaySessions] = useState([]);
  const [avgDuration, setAvgDuration] = useState({
    duration: 0,
    compare: 0,
  });
  const [displayData, setDisplayData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
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
  //search bar
  useEffect(() => {
    if (search) {
      setDisplaySessions(
        sessions.filter((session) => {
          return (
            session?.Email?.slice(0, search.length)?.toLowerCase() ===
              search?.toLowerCase() ||
            (session?.Email?.includes("@") &&
              session?.Email?.split("@")[1]
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
            <ExlCsvDownload data={[""]} order={[""]} enable={true}/>
            <Paginator
              data={displaySessions}
              limit={10}
              setDisplayData={setDisplayData}
            />
          </div>
        </div>
      </div>
      <TableContainer className="w-full !text-center !font-roboto mt-[2vh] border rounded-md shadow-md bg-white overflow-auto">
        <Table variant="simple" className="min-w-[1220px]">
          <Thead className="bg-[#DDEEFF] text-[#79767D] whitespace-nowrap">
            <Tr>
              <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !font-roboto !text-sm !font-normal">
                LOGIN TIME
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap !w-[300px]  !px-0 !text-center !font-roboto !text-sm !font-normal">
                EMAIL
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !font-roboto !text-sm !font-normal">
                SESSION DURATION
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap w-[150px] !px-0 !text-center !font-roboto !text-sm !font-normal">
                IP ADDRESS
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !font-roboto !text-sm !font-normal">
                DEVICE
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap w-[200px] !pl-0 !pr-10 !text-start !text-sm !font-normal !font-roboto mr-auto">
                LOCATION
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayData.map((session) => {
              return (
                <Tr className="!whitespace-normal">
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                    {new Date(session.loginTime).toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "short",
                      day: "numeric",
                    }) +
                      " " +
                      new Date(session.loginTime).toLocaleTimeString()}
                  </Td>
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                    {session.email}
                  </Td>
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                    {Math.floor(session.sessionDuration / (1000 * 60 * 60)) +
                      " hrs " +
                      Math.floor(
                        (session.sessionDuration % (1000 * 60 * 60)) /
                          (1000 * 60)
                      ) +
                      " min"}
                  </Td>
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                    {session.ipAddress}
                  </Td>
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-normal">
                    {session.device}
                  </Td>
                  <Td className="!text-start !pl-0 !pr-10 !text-sm !font-roboto !py-0 text-[#3E3C42] whitespace-nowrap mr-auto">
                    {session.location}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SessionLogs;
