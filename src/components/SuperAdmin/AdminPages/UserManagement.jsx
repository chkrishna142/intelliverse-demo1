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
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";

import { useState, useContext } from "react";
import { useEffect } from "react";
import NavContext from "../../NavContext";
import axios from "axios";
import { baseURL } from "../../..";
import Paginator from "../../../util/VisionUtils/Paginator";
import ExlCsvDownload from "../../../util/VisionUtils/ExlCsvDownload";
import { CSVLink } from "react-csv";

import {
  AddNewModal,
  AddNewUserManagementModal,
  DeleteUserModal,
} from "./UserManagementModal";
import { useNavigate } from "react-router-dom";
import UserManagementTable from "../AdminTables/UserManagementTable";

const UserManagement = () => {
  const { auth } = useContext(NavContext);

  const [users, setUsers] = useState([]);

  const [displayData, setDisplayData] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [downloadData, setDownloadData] = useState({});
  const [loading, setLoading] = useState(false);
  const [organisation, setOrganisation] = useState("");
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();
  const fetchUsers = async () => {
    const param = {
      organisation: organisation,
    };
    try {
      const response = await axios.get(baseURL + "iam/users", {
        credentials: "same-origin",
        params: param,
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": auth,
        },
      });

      const sortedUsers = [...response?.data];
      sortedUsers.sort((a, b) => {
        const dateA = new Date(a.createdat);
        const dateB = new Date(b.createdat);

        // Compare timestamps in descending order (newest first)
        return dateB - dateA;
      });

      setUsers(sortedUsers);
      const organisation = sortedUsers[0].organisation;
      setOrganisation(organisation); //setting organisation
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDownloadApi = async () => {
    const header = { header: "users" };
    try {
      const response = await axios.post(baseURL + "iam/header", header, {
        headers: {
          "Content-Type": "application/json",
          "X-auth-Token": auth,
        },
      });

      //setting order for downloading data
      setDownloadData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth) {
      setLoading(true);
      fetchUsers();
      fetchDownloadApi();
      fetchStatus();
    }
  }, [auth]);

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
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const toast = useToast();

  const fetchStatus = async () => {
    try {
      const param = {
        organisation: organisation,
      };
      const response = await axios.get(baseURL + `iam/status`, {
        params: param,
        headers: {
          "Content-Type": "application/json",
          "X-auth-Token": auth,
        },
      });
      // console.log("stats",response.data)
      setStatus(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUser = async (userID) => {
    // try {
    //   let data = JSON.stringify({
    //     userid: userID,
    //   });
    //   let config = {
    //     method: "delete",
    //     maxBodyLength: Infinity,
    //     url: baseURL + "iam/users",
    //     headers: {
    //       "x-auth-token": auth,
    //       "Content-Type": "application/json",
    //     },
    //     data: data,
    //   };
    //   const response = await axios.request(config);
    //   if (response.status === 200) {
    //     fetchUsers();
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  useEffect(() => {
    // Enable the button if email and name are not empty
    setDisabled(!(userEmail && fullName));
  }, [userEmail, fullName]);

  // Function to validate email using regex
  const isValidEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const patchUser = async () => {
    // Validate email and name before editing user details
    if (!userEmail || !isValidEmail(userEmail) || !fullName) {
      // Display an error message or handle it as per your UI/UX
      setError("Please enter a valid email and name.");
      return;
    }

    // Clear any previous error
    setError("");

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
          onCloseE();
          toast({
            title: `User details has been Edited`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: `Unable to edit this user's details`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
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
  const handleClickHistory = () => {
    navigate("/superadmin/addclient");
  };

  return (
    <>
      <div className="w-full px-2 !font-roboto mt-[3vh]">
        <div className="flex justify-start items-center w-full gap-2 mb-3">
          <div className="cursor-pointer" onClick={handleClickHistory}>
            <img
              src="/transactionhistory/backarrow.svg"
              className="w-full h-full"
              alt="backarrow_img"
            />
          </div>
          <div className="flex justify-center items-center cursor-pointer">
            <p className="font-semibold text-[20px] text-[#084298] text-bold">
              UserManagement
            </p>
          </div>
        </div>
        <div className="flex flex-col 2xl:flex-row justify-between">
          <div className="flex flex-row justify-start gap-6">
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">
                {/* {users?.length} */}
                {status.Total}
              </p>
              <p className="text-[#938F96]">Total</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">
                {/* {users?.filter((elem) => elem?.isactive).length} */}
                {status.Active}
              </p>
              <p className="text-[#938F96]">Active</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">
                {/* {users?.filter((elem) => !elem?.isactive).length} */}
                {status.InActive}
              </p>
              <p className="text-[#938F96]">Inactive Last Week</p>
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold text-[#605D64]">
                {/* {users?.filter((elem) => elem?.isDeleted).length} */}
                {status.Deleted}
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
              {displayUsers.length > 0 && (
                <ExlCsvDownload
                  data={displayUsers}
                  order={downloadData?.summary}
                  orderDetail={downloadData?.detail}
                  enable={true}
                />
              )}
            </div>
          </div>
        </div>
        {displayData && displayData.length != 0 && (
          <UserManagementTable
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
        {loading ? (
          <div className="ml-[50%]">
            <Spinner speed="0.65s" />
          </div>
        ) : (
          <React.Fragment>
            {/* {displayData && displayData.length !== 0 ? (
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
            ) : (
              <p className="ml-[45%]">No data available!</p>
            )} */}
          </React.Fragment>
        )}
        <div className="flex justify-end">
          <Paginator
            data={displayUsers}
            setDisplayData={setDisplayData}
            limit={10}
          />
        </div>
      </div>
    </>
  );
};

export default UserManagement;
