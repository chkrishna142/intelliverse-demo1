import React from 'react';
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
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons';
import { NorthEast } from '@mui/icons-material';
import { useState } from 'react';
import { useEffect } from 'react';
import Paginator from '../../../util/VisionUtils/Paginator';

const SessionLogs = () => {
  const dummyData = {
    lastLogin: "12 May '23  11:12",
    email: 'sudhanshu.12prasad@gmail.com',
    sessionDur: '2 hrs 30 min',
    IP: '129.102:34',
    device: 'Chrome',
    location: 'Bhubaneshwar, India',
  };

  const [sessions, setSessions] = useState([]);
  const [displaySessions, setDisplaySessions] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push(dummyData);
    }
    setSessions(temp);
  }, []);

  useEffect(() => {
    if (search) {
      setDisplaySessions(
        sessions.filter((session) => {
          return (
            session?.email?.slice(0, search.length)?.toLowerCase() ===
              search?.toLowerCase() ||
            (session?.email?.includes('@') &&
              session?.email
                ?.split('@')[1]
                ?.slice(0, search.length)
                ?.toLowerCase() === search?.toLowerCase())
          );
        })
      );
    } else setDisplaySessions(sessions);
  }, [search, sessions]);

  return (
    <div className="w-full px-2 !font-roboto">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-start gap-6">
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-[#605D64]">
              30{' '}
              <span className="text-sm text-[#938F96] font-normal mb-2">
                <span className="text-[#7AC958] items-start text-sm">
                  <NorthEast sx={{ fontSize: '16px' }} />
                  35%{' '}
                </span>
                increase over last week
              </span>
            </p>
            <p className="text-[#938F96]">Average session duration</p>
          </div>
        </div>
        <div className="flex flex-row items-end gap-6">
          <div className="w-[320px] flex flex-row border-2 py-2 rounded px-4 justify-between">
            <input
              className="w-full focus:outline-none text-sm"
              placeholder="Search email ID"
              onChange={(e) => setSearch(e.target.value)}
            />
            <img className="h-5 text-black" src="/search.svg" />
          </div>
          <Button className="!border-0 !text-[#1C56AC] !text-sm gap-1 !bg-white">
            <DownloadIcon />
            <span>Download Table</span>
          </Button>
          <Paginator
            data={displaySessions}
            limit={10}
            setDisplayData={setDisplayData}
          />
        </div>
      </div>
      <TableContainer className="w-full !text-center !font-roboto mt-[2vh] border rounded-md shadow-md bg-white">
        <Table variant="simple">
          <Thead className="bg-[#DDEEFF] text-[#79767D] whitespace-nowrap">
            <Tr>
              <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !font-roboto !text-sm !font-normal">
                LOGIN TIME
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !font-roboto !text-sm !font-normal">
                EMAIL
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !font-roboto !text-sm !font-normal">
                SESSION DURATION
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !font-roboto !text-sm !font-normal">
                IP ADDRESS
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !font-roboto !text-sm !font-normal">
                DEVICE
              </Th>
              <Th className="!text-[#79767D] whitespace-nowrap w-[300px] !pl-0 !pr-10 !text-start !text-sm !font-normal !font-roboto mr-auto">
                LOCATION
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {displayData.map((session) => {
              return (
                <Tr className="">
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                    {session.lastLogin}
                  </Td>
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                    {session.email}
                  </Td>
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                    {session.sessionDur}
                  </Td>
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                    {session.IP}
                  </Td>
                  <Td className="!text-center !font-roboto !px-0 !text-sm text-[#3E3C42] whitespace-nowrap ">
                    {session.device}
                  </Td>
                  <Td className="!text-start !pl-0 !pr-10 !text-sm !font-roboto !py-0 text-[#3E3C42] whitespace-nowrap mr-auto">
                    {session.location}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SessionLogs;
