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
import { AddNewModal, DeleteUserModal, EditUserModal } from './UserModals';
import { useState } from 'react';
import { useEffect } from 'react';

const UserMgmt = () => {
  const dummyData = {
    userName: 'Sudhanshu Prasad',
    email: 'sudhanshu.12prasad@gmail.com',
    lastLogin: "8 Sep '23 10:15 AM",
    phoneNumber: '9856417823',
    role: 'Admin',
  };

  const [isOpenD, setIsOpenD] = useState(false);

  const onCloseD = () => {
    setIsOpenD(false);
  };

  const [isOpenA, setIsOpenA] = useState(false);

  const onCloseA = () => {
    setIsOpenA(false);
  };

  const [isOpenE, setIsOpenE] = useState(false);

  const onCloseE = () => {
    setIsOpenE(false);
  };

  return (
    <>
      <div className="w-full px-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-start gap-6">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">30</p>
              <p className="text-[#938F96]">Total</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">12</p>
              <p className="text-[#938F96]">Active</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">8</p>
              <p className="text-[#938F96]">Inactive Last Week</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">5</p>
              <p className="text-[#938F96]">Deleted</p>
            </div>
          </div>
          <div className="flex flex-row items-end gap-6">
            <Button className="!border-0 !text-[#1C56AC] !text-sm gap-1 !bg-white">
              <DownloadIcon />
              <span>Download Table</span>
            </Button>
            <Button
              onClick={() => setIsOpenA(true)}
              className="!border-0 !text-[#1C56AC] !text-sm gap-1 !bg-white"
            >
              <AddIcon />
              <span>Add New User</span>
            </Button>
            <div className="w-[320px] flex flex-row border-2 py-2 rounded px-4 justify-between">
              <input
                className="w-full focus:outline-none text-sm"
                placeholder="Search email ID/name"
              />
              <img className="h-5 text-black" src="/search.svg" />
            </div>
          </div>
        </div>
        <TableContainer className="w-full !text-center mt-[2vh] border rounded-md shadow-md bg-white">
          <Table variant="simple">
            <Thead className="bg-[#DDEEFF] text-[#79767D] whitespace-nowrap">
              <Tr>
                <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  USER NAME
                </Th>
                <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  EMAIL
                </Th>
                <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  ROLE
                </Th>
                <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  LAST LOGIN
                </Th>
                <Th className="!text-[#79767D] whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  STATUS
                </Th>
                <Th className="!text-[#79767D] whitespace-nowrap w-[300px] !pl-0 !pr-10 !text-start !text-sm !font-normal mr-auto">
                  ACTION
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {[...Array(14)].map(() => {
                return (
                  <Tr className="">
                    <Td className="!text-center !px-0 !text-sm font-semibold whitespace-nowrap">
                      {dummyData.userName}
                    </Td>
                    <Td className="!text-center !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                      {dummyData.email}
                    </Td>
                    <Td className="!text-center !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                      {10 * Math.random() > 7 ? 'Regular' : 'Admin'}
                    </Td>
                    <Td className="!text-center !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                      {dummyData.lastLogin}
                    </Td>
                    <Td className="!text-center !px-0 !text-sm text-[#3E3C42] whitespace-nowrap ">
                      {10 * Math.random() > 7 ? (
                        <span className="text-[#E46962] text-sm font-semibold">
                          Inactive
                        </span>
                      ) : (
                        <span className="text-[#7AC958] text-sm font-semibold">
                          Active
                        </span>
                      )}
                    </Td>
                    <Td className="!text-start !pl-0 !pr-10 !text-sm !py-0 text-[#3E3C42] whitespace-nowrap mr-auto">
                      <span className="flex flex-row gap-1">
                        <Button
                          onClick={() => setIsOpenD(true)}
                          className="!text-[#E46962] !bg-white !p-0 !border-0"
                        >
                          <DeleteIcon h={5} />
                        </Button>
                        <Button
                          //   onClick={() => setIsOpenE(true)}
                          className="!text-[#3474CA] !bg-white !p-0 !border-0"
                        >
                          <EditIcon h={5} />
                        </Button>
                      </span>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot></Tfoot>
          </Table>
        </TableContainer>
      </div>
      <DeleteUserModal isOpen={isOpenD} onClose={onCloseD} />
      <AddNewModal isOpen={isOpenA} onClose={onCloseA} />
      {/* <EditUserModal isOpen={isOpenE} onClose={onCloseE} user={dummyData} /> */}
    </>
  );
};

export default UserMgmt;
