import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import TokenData from "../TokenData";
import Pagination from "../TransactionHistory/Pagination";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../..";
import NavContext from "../../NavContext";

const AllotToken = ({ setTranTableChange, isFetchTranChanged }) => {
  const { clientOrg, mode } = useParams();
  const { auth } = useContext(NavContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchBalance, setFetchBalance] = useState(false);

  const [addTokens, setAddTokens] = useState(20);

  const [tableData, setTableData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [addTokensArray, setAddTokensArray] = useState([]);

  const fetchTableData = async () => {
    setIsLoading(true);
    const param = {
      organisation: clientOrg || "",
    };
    try {
      const response = await axios.get(
        baseURL + `token-wallet/v1/user-balance`,
        {
          params: param,
          headers: {
            "Content-Type": "application/json",
            "X-auth-Token": auth,
          },
        }
      );
      setIsLoading(false);
      setTableData(response?.data.Users);
      console.log("res", response.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [isFetchBalance]);

  const handleAddButtonClick = async (id, user) => {
    if (isNaN(addTokens)) {
      // Handle the case where addTokens is not a valid integer
      toast({
        title: `Invalid input for tokens. Please enter a valid number`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setAddTokens(20);
      return;
    }
    const body = {
      organisation: clientOrg || "",
      userId: id,
      allotedToken: Number(addTokens),
    };
    try {
      const response = await axios.post(
        baseURL + `token-wallet/v1/allot-token`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            "X-auth-Token": auth,
          },
        }
      );
      setTranTableChange(!isFetchTranChanged);
      toast({
        title: `Added ${addTokens} tokens for ${user}`,
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      setAddTokens(20);
      setFetchBalance(!isFetchBalance);
      fetchTableData();
      console.log("res", response);
    } catch (error) {
      setTranTableChange(!isFetchTranChanged);
      setAddTokens(20);
      toast({
        title: `Invalid token`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    // Initialize addTokensArray with default values (20 for each row)
    setAddTokensArray(Array(tableData.length).fill(20));
  }, [tableData]);

  const handleAddToken = (index, newValue) => {
    // Update addTokensArray with the new value for the specific index
    setAddTokensArray((prevTokens) => {
      const newTokens = [...prevTokens];
      newTokens[index] = newValue;
      setAddTokens(newValue);
      return newTokens;
    });
  };
  return (
    <div className={`w-full flex flex-col gap-4 ${clientOrg && "mt-[4vh]"}`}>
      <div>
        <p className="text-[18px] text-[#605D64] font-medium">
          Allocated Tokens
        </p>
      </div>

      <TokenData isFetchBalance={isFetchBalance} />

      {/* pagination */}
      {isLoading ? (
        <div className="ml-[50%]">
          <Spinner speed="0.65s" />
        </div>
      ) : (
        <div className="border border-gray-100">
          <TableContainer className="!text-left  border rounded-md bg-white !overflow-y-auto">
            <Table variant="simple">
              <Thead className="bg-[#DDEEFF] !text-[#79767D] !text-xs !top-0">
                <Tr>
                  <Th
                    className="!text-[#79767D] !text-left !text-[12px] !font-normal"
                    width="150px"
                  >
                    USER NAME
                  </Th>
                  <Th
                    className="!text-[#79767D] !text-left !text-[12px] !font-normal"
                    width="150px"
                  >
                    EMAIL
                  </Th>
                  <Th
                    className="!text-[#79767D] !text-left !text-[12px] !font-normal"
                    width="150px"
                  >
                    TOKENS REMAINING
                  </Th>
                  {mode === "view" ? (
                    ""
                  ) : (
                    <Th
                      className="!text-[#79767D] !text-[12px] !font-normal"
                      flex={1}
                      textAlign={"left"}
                    >
                      ADD TOKEN
                    </Th>
                  )}
                </Tr>
              </Thead>
              <Tbody textAlign={"left"}>
                {displayData &&
                  displayData.length > 0 &&
                  displayData.map((item, index) => {
                    return (
                      <Tr key={item.userId}>
                        <Td
                          className="!text-left !text-normal !text-[#3E3C42] !text-[14px]"
                          style={{ fontWeight: 500 }}
                        >
                          <p className="pl-2 pr-2">{item.userName}</p>
                        </Td>
                        <Td
                          className="!text-left !text-normal !text-[#3E3C42] !text-[14px]"
                          style={{ fontWeight: 400 }}
                        >
                          {item.email}
                        </Td>
                        <Td
                          className="!text-left !text-normal !text-[#3E3C42] !text-[14px]"
                          style={{ fontWeight: 500 }}
                        >
                          <div className="w-full !text-left flex gap-1 !text-[14px]">
                            <p className="!text-left">{item.tokenBalance}</p>
                            <img src="/token.svg" alt="token" />
                          </div>
                        </Td>
                        {mode === "view" ? (
                          ""
                        ) : (
                          <Td
                            className="!text-[#3E3C42] !text-[15px]"
                            style={{
                              fontWeight: 400,
                              flex: 1,
                              textAlign: "left",
                            }}
                          >
                            <div className="w-full flex justify-start gap-2">
                              {/* <div className="border pr-6 pl-2 rounded-md py-2">20</div> */}
                              <input
                                type="text"
                                className="border w-12 h-8 text-[#605D64] pl-2 pr-5 rounded-sm"
                                value={addTokensArray[index]}
                                onChange={(e) => handleAddToken(index,e.target.value)}
                                style={{width:"70px"}}
                              />
                              <button
                                className="!text-[#3A74CA] !font-semibold text-[14px]"
                                onClick={() =>
                                  handleAddButtonClick(
                                    item.userId,
                                    item.userName
                                  )
                                }
                              >
                                Add
                              </button>
                            </div>
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      )}
      <div className="flex justify-end">
        {tableData && tableData.length > 0 && (
          <Pagination
            data={tableData}
            limit={4}
            setDisplayData={setDisplayData}
          />
        )}
      </div>
    </div>
  );
};

export default AllotToken;
