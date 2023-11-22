import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TokenData from "../TokenData";
import Pagination from "../TransactionHistory/Pagination";

const AllotToken = () => {
  const toast = useToast();
  const [inputValue, setInputValue] = useState(20);
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },
    {
      id: 2,
      username: "Sudhanshu",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },
    {
      id: 3,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },
    {
      id: 4,
      username: "Sudhanshu",
      email: "sudhanshu@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },
    {
      id: 5,
      username: "Sudhanshu Prasad",
      email: "sudhansh@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },
    {
      id: 6,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },

    {
      id: 7,
      username: "Sudhanshu Prasad",
      email: "sudhanshu@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },
    {
      id: 8,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },

    {
      id: 9,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },
    {
      id: 10,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12@gmail.com",
      tokensRemaining: 150,
      addTokens: 20,
    },
  ]);
  const [displayData, setDisplayData] = useState([]);

  const showToast = (itemId, newValue) => {
    toast({
      title: `Added ${newValue} tokens for user ${
        dummyData.find((item) => item.id === itemId).username
      }`,
      status: "success",
      duration: 4000,
      isClosable: true,
      position: "top-right",
    });
  };

  const handleAddToken = (itemId, newValue) => {
    // Convert newValue to a number
    const parsedValue = Number(newValue);

    if (isNaN(parsedValue) || !Number.isInteger(parsedValue)) {
      // Handle the case where newValue is not a valid number
      toast({
        title: `Invalid input for tokens. Please enter a valid whole number`,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    // Update addTokens value without changing tokensRemaining
    setDummyData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, addTokens: parsedValue } : item
      )
    );
  };

  const handleAddButtonClick = (itemId) => {
    const currentItem = dummyData.find((item) => item.id === itemId);
    const updatedData = dummyData.map((item) =>
      item.id === itemId
        ? {
            ...item,
            tokensRemaining: item.tokensRemaining + currentItem.addTokens,
          }
        : item
    );

    setDummyData(updatedData);

    // Show toast only when the "Add" button is clicked
    showToast(itemId, currentItem.addTokens);

    // Reset the input field value to 20
    handleAddToken(itemId, 20);
  };
  // useEffect(()=>{

  // },[displayData])
  return (
    <div className="w-full flex flex-col gap-4">
      <div>
        <p className="text-[18px] text-[#605D64] font-medium">Allot Tokens</p>
      </div>

      <TokenData />

      {/* pagination */}

      <div className="flex justify-end mt-7">
        <Pagination
          data={dummyData}
          limit={4}
          setDisplayData={setDisplayData}
        />
      </div>

      <div className="border border-gray-100">
        <TableContainer className="!text-center  border rounded-md bg-white !overflow-y-auto">
          <Table variant="simple">
            <Thead className="bg-[#DDEEFF] !text-[#79767D] !text-xs !top-0">
              <Tr>
                <Th
                  className="!text-[#79767D] !text-center !text-[12px] !font-normal"
                  width="150px"
                >
                  USER NAME
                </Th>
                <Th
                  className="!text-[#79767D] !text-center !text-[12px] !font-normal"
                  width="150px"
                >
                  EMAIL
                </Th>
                <Th
                  className="!text-[#79767D] !text-center !text-[12px] !font-normal"
                  width="150px"
                >
                  TOKENS REMAINING
                </Th>
                <Th
                  className="!text-[#79767D] !text-[12px] !font-normal"
                  flex={1}
                  textAlign={"left"}
                >
                  ADD TOKEN
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {displayData &&
                displayData.map((item) => {
                  return (
                    <Tr key={item.id}>
                      <Td
                        className="!text-center !text-normal !text-[#3E3C42] !text-[14px]"
                        style={{ fontWeight: 500 }}
                      >
                        <p className="pl-2 pr-2">{item.username}</p>
                      </Td>
                      <Td
                        className="!text-center !text-normal !text-[#3E3C42] !text-[14px]"
                        style={{ fontWeight: 400 }}
                      >
                        {item.email}
                      </Td>
                      <Td
                        className="!text-center !text-normal !text-[#3E3C42] !text-[14px]"
                        style={{ fontWeight: 500 }}
                      >
                        <div className="w-full flex justify-center gap-1 !text-[14px]">
                          <p>{item.tokensRemaining}</p>
                          <img src="/token.svg" alt="token" />
                        </div>
                      </Td>
                      <Td
                        className="!text-[#3E3C42] !text-[15px]"
                        style={{ fontWeight: 400, flex: 1, textAlign: "left" }}
                      >
                        <div className="w-full flex justify-start gap-2">
                          {/* <div className="border pr-6 pl-2 rounded-md py-2">20</div> */}
                          <input
                            type="text"
                            className="border w-12 h-8 text-[#605D64] pl-2 pr-5 rounded-sm"
                            value={item.addTokens}
                            onChange={(e) =>
                              handleAddToken(item.id, e.target.value)
                            }
                          />
                          <button
                            className="!text-[#3A74CA] !font-semibold text-[14px]"
                            onClick={() => handleAddButtonClick(item.id)}
                          >
                            Add
                          </button>
                        </div>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AllotToken;
