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
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Flex,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon } from '@chakra-ui/icons';
import { AddNewModal, DeleteUserModal, EditUserModal } from './UserModals';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import NavContext from '../../NavContext';
import axios from 'axios';
import { baseURL } from '../../..';
import Paginator from '../../../util/VisionUtils/Paginator';

const UserMgmt = () => {
  const dummyData = {
    userName: 'Sudhanshu Prasad',
    email: 'sudhanshu.12prasad@gmail.com',
    lastLogin: "8 Sep '23 10:15 AM",
    phoneNumber: '9856417823',
    role: 'Admin',
  };
  const { auth } = useContext(NavContext);

  const [users, setUsers] = useState([]);

  const [displayData, setDisplayData] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(baseURL + 'iam/users', {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': auth,
        },
      });
      setUsers(response?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // useEffect(() => {
  //   setDisplayData(displayUsers);
  // }, [displayUsers]);

  useEffect(() => {
    setDisplayUsers(users);
  }, [users]);

  function tableToCSV() {
    let csv_data = [];

    let csv_headers = [];
    csv_headers.push('USER NAME');
    csv_headers.push('EMAIL');
    csv_headers.push('ROLE');
    csv_headers.push('LAST LOGIN');
    csv_headers.push('STATUS');
    csv_headers.join(',');
    csv_data.push(csv_headers);
    users?.map((elem) => {
      let csv_row = [];
      csv_row.push(elem.username[0].toUpperCase() + elem.username.slice(1));
      csv_row.push(elem.email);
      csv_row.push(elem.role === 'USER' ? 'REGULAR' : elem.role);
      csv_row.push(dummyData.lastLogin);
      csv_row.push(
        elem.isactive === 'false' || !elem.isactive ? 'Inactive' : 'Active'
      );
      csv_row.join(',');
      csv_data.push(csv_row);
    });
    csv_data = csv_data.join('\n');

    downloadCSVFile(csv_data);
  }

  function downloadCSVFile(csv_data) {
    let CSVFile = new Blob([csv_data], {
      type: 'text/csv',
    });

    let temp_link = document.createElement('a');
    temp_link.download = 'Users.csv';
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = 'none';
    document.body.appendChild(temp_link);

    temp_link.click();
    document.body.removeChild(temp_link);
  }

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

  const [contact, setContact] = useState();
  const [whatsapp, setWhatsapp] = useState(false);
  const [emailInvitation, setEmailInvitation] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);

  const deleteUser = async (userID) => {
    try {
      let data = JSON.stringify({
        userid: userID,
      });

      let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: 'https://backend-ripik.com/api/iam/users',
        headers: {
          'x-auth-token': auth,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(response);
      if (response.status === 200) {
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(contact);
  }, [contact]);

  useEffect(() => {
    if (selectedUser) {
      setContact(selectedUser.phoneNumber);
    }
  }, [selectedUser]);

  const [search, setSearch] = useState('');

  useEffect(() => {
    let temp = users.filter((user) => {
      return (
        user?.username?.slice(0, search?.length)?.toLowerCase() ===
          search?.toLowerCase() ||
        (user?.email?.includes('@') &&
          user?.email?.split('@')[1]?.slice(0, search.length)?.toLowerCase() ===
            search?.toLowerCase())
      );
    });
    setDisplayUsers(temp);
  }, [search]);

  return (
    <>
      <div className="w-full px-2 !font-roboto">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-start gap-6">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">
                {users?.length}
              </p>
              <p className="text-[#938F96]">Total</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">
                {users?.filter((elem) => elem?.isactive).length}
              </p>
              <p className="text-[#938F96]">Active</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">
                {users?.filter((elem) => !elem?.isactive).length}
              </p>
              <p className="text-[#938F96]">Inactive Last Week</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">
                {users?.filter((elem) => elem?.isDeleted).length}
              </p>
              <p className="text-[#938F96]">Deleted</p>
            </div>
          </div>
          <div className="flex flex-row items-end gap-6">
            <div className="w-[320px] flex flex-row border-2 py-2 rounded px-4 justify-between">
              <input
                className="w-full focus:outline-none text-sm"
                placeholder="Search email ID/name"
                onChange={(e) => setSearch(e.target.value)}
              />
              <img className="h-5 text-black" src="/search.svg" />
            </div>
            <Button
              onClick={tableToCSV}
              className="!border-0 !text-[#1C56AC] !text-sm gap-1 !bg-white"
            >
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
            <Paginator
              data={displayUsers}
              setDisplayData={setDisplayData}
              limit={10}
            />
          </div>
        </div>
        <TableContainer className="w-full !text-center mt-4 border rounded-md shadow-md bg-white">
          <Table variant="simple">
            <Thead className="bg-[#DDEEFF] text-[#79767D] whitespace-nowrap">
              <Tr>
                <Th className="!text-[#79767D] !font-roboto whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  USER NAME
                </Th>
                <Th className="!text-[#79767D] !font-roboto whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  EMAIL
                </Th>
                <Th className="!text-[#79767D] !font-roboto whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  ROLE
                </Th>
                <Th className="!text-[#79767D] !font-roboto whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  LAST LOGIN
                </Th>
                <Th className="!text-[#79767D] !font-roboto whitespace-nowrap w-auto !px-0 !text-center !text-sm !font-normal">
                  STATUS
                </Th>
                <Th className="!text-[#79767D] !font-roboto whitespace-nowrap w-[300px] !pl-0 !pr-10 !text-start !text-sm !font-normal mr-auto">
                  ACTION
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {displayData.map((elem) => {
                return (
                  <Tr className="">
                    <Td className="!text-center !font-roboto !px-0 !text-sm font-semibold whitespace-nowrap">
                      {elem.username[0].toUpperCase() + elem.username.slice(1)}
                    </Td>
                    <Td className="!text-center !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                      {elem.email}
                    </Td>
                    <Td className="!text-center !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                      {elem.role === 'USER' ? 'REGULAR' : elem.role}
                    </Td>
                    <Td className="!text-center !px-0 !text-sm text-[#3E3C42] whitespace-nowrap">
                      {dummyData.lastLogin}
                    </Td>
                    <Td className="!text-center !px-0 !text-sm text-[#3E3C42] whitespace-nowrap ">
                      {elem.isactive === 'false' || !elem.isactive ? (
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
                          onClick={() => {
                            setIsOpenD(true);
                            setSelectedUser(elem);
                          }}
                          className="!text-[#E46962] !bg-white !p-0 !border-0"
                        >
                          <DeleteIcon h={5} />
                        </Button>
                        <Button
                          onClick={() => {
                            setIsOpenE(true);
                            setSelectedUser(elem);
                          }}
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
      <DeleteUserModal
        isOpen={isOpenD}
        onClose={onCloseD}
        userID={selectedUser?.userid}
        fetchUsers={fetchUsers}
      />
      <AddNewModal
        isOpen={isOpenA}
        onClose={onCloseA}
        fetchUsers={fetchUsers}
      />
      <Modal
        isOpen={isOpenE}
        onClose={onCloseE}
        isCentered
        size={'sm'}
        width={740}
      >
        <ModalOverlay />
        <ModalContent>
          <div className="text-white w-full h-10 flex bg-[#2660B6] font-semibold justify-center items-center rounded-t-md">
            Edit User
          </div>
          {/* <ModalCloseButton className="mt-2" color={'white'} /> */}
          <ModalBody className="mt-6">
            <Flex flexDirection={'column'} gap={'30px'}>
              <FormControl className="!h-12">
                <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                  Full Name
                </div>
                <input
                  className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                  placeholder="Enter full name"
                  value={
                    selectedUser?.username?.charAt(0)?.toUpperCase() +
                    selectedUser?.username?.slice(1)
                  }
                />
              </FormControl>
              <FormControl className="!h-12">
                <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                  E-mail ID
                </div>
                <input
                  className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                  placeholder="Enter valid email ID"
                  value={selectedUser?.email}
                />
              </FormControl>
              <FormControl className="!h-12">
                <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                  Phone Number{' '}
                  <span className="text-[#CAC5CD] text-xs">(optional)</span>
                </div>
                <input
                  className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                  placeholder="Enter valid phone number"
                  value={selectedUser?.phoneNumber}
                  onChange={(event) => setContact(event.target.value)}
                />
              </FormControl>
              <FormControl className="!h-12 mb-2 font-semibold">
                <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                  Role
                </div>
                <select
                  value={selectedUser?.role}
                  className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                >
                  <option value={'ADMIN'}>Admin</option>
                  <option value={'USER'}>Regular</option>
                  <option value={'Super Admin'}>CXO</option>
                </select>
                {/* <Input placeholder="Enter Your Name" /> */}
              </FormControl>
              <div className="flex flex-col items-start gap-2 text-xs font-light">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    disabled={contact?.length !== 10}
                    onSelect={() => setWhatsapp(!whatsapp)}
                  />
                  Enable WhatsApp Integration
                </div>
                {/* <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onSelect={() => setEmailInvitation(!emailInvitation)}
                />
                Send Invitation Email
              </div> */}
              </div>
            </Flex>
          </ModalBody>
          <ModalFooter className="!w-full !flex !flex-row !items-center !justify-start !gap-2">
            <button
              onClick={() => {
                onCloseE();
              }}
              className="bg-[#084298] text-sm h-10 text-white px-7 py-2 rounded-md mb-5 "
              mr={3}
            >
              Save
            </button>
            <button
              onClick={() => {
                deleteUser(selectedUser?.userid);
                onCloseE();
              }}
              className="border-[#DC362E] text-sm h-10 border text-[#DC632E] bg-white px-7 py-2 rounded-md mb-5 "
              mr={3}
            >
              Delete user
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserMgmt;
