import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AllotToken = () => {
  const [inputValue, setInputValue] = useState(20);
  const [dummyData, setDummyData] = useState([
    {
      id: 1,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: "150",
      addTokens: "20",
    },
    {
      id: 2,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: "150",
      addTokens: "20",
    },
    {
      id: 3,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: "150",
      addTokens: "20",
    },
    {
      id: 4,
      username: "Sudhanshu Prasad",
      email: "sudhanshu.12prasad@gmail.com",
      tokensRemaining: "150",
      addTokens: "20",
    },
  ]);

  const handleAddToken = (itemId, newValue) => {
    // Perform any additional logic you need here
    console.log(`Adding ${newValue} tokens for item with ID ${itemId}`);

    // Update the state
    setDummyData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, addTokens: newValue } : item
      )
    );
  };

  return (
    <div>
      <div>
        <p className="text-[18px] text-[#605D64] font-medium">Allot Tokens</p>
      </div>
      <div className="border border-gray-100">
        <TableContainer className="!text-center  border rounded-md bg-white !overflow-y-auto !max-h-[50vh]">
          <Table variant="simple">
            <Thead className="bg-[#DDEEFF] !text-[#79767D] !text-xs !top-0">
              <Tr>
                <Th className="!text-[#79767D] !text-center !text-sm !font-normal" width="150px">
                  USER NAME
                </Th>
                <Th className="!text-[#79767D] !text-center !text-sm !font-normal" width="150px">
                  EMAIL
                </Th>
                <Th className="!text-[#79767D] !text-center !text-sm !font-normal" width="150px">
                  TOKENS REMAINING
                </Th>
                <Th className="!text-[#79767D] !text-sm !font-normal" flex={1} textAlign={"left"}>
                  ADD TOKEN
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {dummyData &&
                dummyData.map((item) => {
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
                        style={{ fontWeight: 400, flex:1, textAlign:"left" }}
                      >
                        <div className="w-full flex justify-start gap-2">
                          {/* <div className="border pr-6 pl-2 rounded-md py-2">20</div> */}
                          <input
                            type="text"
                            className="border w-12 h-8 text-[#605D64] pl-2 pr-5 rounded-sm"
                            value={item.addTokens}
                            onChange={(e) => handleAddToken(item.id, e.target.value)}
                          />
                          <button className="!text-[#3A74CA] !font-semibold text-[14px]" onClick={() => handleAddToken(item.id, item.addTokens)}>
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
