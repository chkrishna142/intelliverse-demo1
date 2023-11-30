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
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Flex,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import { AddNewModal, DeleteUserModal, EditUserModal } from "./UserModals";
import { useState, useContext } from "react";
import { useEffect } from "react";
import NavContext from "../../NavContext";
import axios from "axios";
import { baseURL } from "../../..";
import Paginator from "../../../util/VisionUtils/Paginator";
import ExlCsvDownload from "../../../util/VisionUtils/ExlCsvDownload";
import { CSVLink } from "react-csv";
import UserMngmtTable from "../Tables/userMngmtTable";

const UserMgmt = () => {
  const token = "03ad51d2-2154-41a2-a673-bd2ae52509d9"


  const dummyData = {
    userName: "Sudhanshu Prasad",
    email: "sudhanshu.12prasad@gmail.com",
    lastLogin: "8 Sep '23 10:15 AM",
    phoneNumber: "9856417823",
    role: "Admin",
  };
  const { auth } = useContext(NavContext);

  const [users, setUsers] = useState([]);

  const [displayData, setDisplayData] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [downloadData,setDownloadData] = useState({})
  const fetchUsers = async () => {
    try {
      const response = await axios.get(baseURL + "iam/users", {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      });
      setUsers(response?.data);
      console.log("users",response.data)
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDownloadApi = async () => {
    const header = {"header":"users"}
    try {
      const response = await axios.post(baseURL + "iam/header",header, {
        headers: {
          "Content-Type": "application/json",
          "X-auth-Token": auth,
        },
      });

    //setting order for downloading data
      setDownloadData(response.data)
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchDownloadApi();
  }, []);

  // useEffect(() => {
  //   setDisplayData(displayUsers);
  // }, [displayUsers]);

  useEffect(() => {
    setDisplayUsers(users);
  }, [users]);

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
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [emailInvitation, setEmailInvitation] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  
  const deleteUser = async (userID) => {
    try {
      let data = JSON.stringify({
        userid: userID,
      });

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: "https://backend-ripik.com/api/iam/users",
        headers: {
          "x-auth-token": auth,
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      
      if (response.status === 200) {
        fetchUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const patchUser = async () => {
    const requestData = JSON.stringify({
      fullname: fullName,
      email: userEmail,
      phoneNumber: contact,
      role: userRole,
      userid: selectedUser.userid,
    });
    const response = await axios
      .patch(baseURL + "iam/users", requestData, {
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          fetchUsers();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(contact);
  }, [contact]);

  useEffect(() => {
    if (selectedUser) {
      setContact(selectedUser.phoneNumber);
    }
  }, [selectedUser]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    let temp = users.filter((user) => {
      return (
        user?.username?.slice(0, search?.length)?.toLowerCase() ===
          search?.toLowerCase() ||
        (user?.email?.includes("@") &&
          user?.email?.split("@")[1]?.slice(0, search.length)?.toLowerCase() ===
            search?.toLowerCase())
      );
    });
    setDisplayUsers(temp);
  }, [search, users]);

  const [sortOption, setSortOption] = useState(0);

  useEffect(() => {
    let temp = users;
    if (sortOption === 0 && users) {
      temp.sort((a, b) => a.username.localeCompare(b.username));
      console.log(temp);
      setUsers(temp);
      setDisplayUsers(temp);
    }
  }, [sortOption, users]);
  
  return (
    <>
      <div className="w-full px-2 !font-roboto">
        <div className="flex flex-col 2xl:flex-row justify-between">
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
          <div className="flex flex-col xl:flex-row justify-end 2xl:justify-start items-end gap-6">
            <div className="w-full xl:w-[320px] flex flex-row border-2 py-2 rounded px-4 justify-between">
              <input
                className="w-full focus:outline-none text-sm"
                placeholder="Search email ID/name"
                onChange={(e) => setSearch(e.target.value)}
              />
              <img className="h-5 text-black" src="/search.svg" />
            </div>
            <div className="flex gap-1 flex-col sm:flex-row lg:gap-6 items-end">
              <ExlCsvDownload data={displayUsers} order={downloadData?.summary} orderDetail={downloadData?.detail} enable={true} />
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
        </div>
        {displayData && displayData.length != 0 && (
          <UserMngmtTable
            rowData={displayData}
            setIsOpenE={setIsOpenE}
            setIsOpenD={setIsOpenD}
            setSelectedUser={setSelectedUser}
            setFullName={setFullName}
            setUserEmail={setUserEmail}
            setUserRole={setUserRole}
            setContact={setContact}
          />
        )}
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
        size={"sm"}
        width={740}
      >
        <ModalOverlay />
        <ModalContent>
          <div className="text-white w-full h-10 flex bg-[#2660B6] font-semibold justify-center items-center rounded-t-md">
            Edit User
          </div>
          {/* <ModalCloseButton className="mt-2" color={'white'} /> */}
          <ModalBody className="mt-6">
            <Flex flexDirection={"column"} gap={"30px"}>
              <FormControl className="!h-12">
                <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                  Full Name
                </div>
                <input
                  className="w-full border rounded text-sm border-[#938F96] py-2 px-5 capitalize"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>
              <FormControl className="!h-12">
                <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                  E-mail ID
                </div>
                <input
                  className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                  placeholder="Enter valid email ID"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </FormControl>
              <FormControl className="!h-12">
                <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                  Phone Number{" "}
                  <span className="text-[#CAC5CD] text-xs">(optional)</span>
                </div>
                <input
                  className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                  placeholder="Enter valid phone number"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                />
              </FormControl>
              <FormControl className="!h-12 mb-2 font-semibold">
                <div className="text-xs text-[#2660B6] mb-2 font-semibold">
                  Role
                </div>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full border rounded text-sm border-[#938F96] py-2 px-5"
                >
                  <option value={"ADMIN"}>Admin</option>
                  <option value={"USER"}>Regular</option>
                  <option value={"Super Admin"}>CXO</option>
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
                patchUser();
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
