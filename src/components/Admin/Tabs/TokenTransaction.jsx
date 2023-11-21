import { Select } from "@chakra-ui/react";
import { useState } from "react";
import TokenData from "../TokenData";
import TokenTransactionTable from "../TokenTransactionTable";
import TokenAllocationTable from "../TokenAllocationTable";

const TokenTransaction = () => {
  const [selectPlant, setSelectPlant] = useState("All Plants");
  const handleSelectPlant = (e) => {
    setSelectPlant(e.target.value);
  };

  const [TransactiontableData, setTransactiontableData] = useState([
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: false,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: true,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: true,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: true,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: true,
    },
    {
      date: "15 Nov 2023",
      time: "12:30 pm",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: true,
    },
  ]);

  const [AllocationtableData, setAllocationtableData] = useState([
    {
      name: "Sudhanshu Prasad",
      date: "15 Nov 2023",
      time: "12:30 pm",
      email: " sudhanshu.12prasad@gmail.com",
      tokenUsed: 1,
      status: false,
    },
    {
      name: "Sudhanshu Prasad",
      date: "15 Nov 2023",
      time: "12:30 pm",
      email: " sudhanshu.12prasad@gmail.com",
      tokenUsed: 1,
      status: true,
    },
    {
      name: "Sudhanshu Prasad",
      date: "15 Nov 2023",
      time: "12:30 pm",
      email: " sudhanshu.12prasad@gmail.com",
      tokenUsed: 1,
      status: true,
    },
    {
      name: "Sudhanshu Prasad",
      date: "15 Nov 2023",
      time: "12:30 pm",
      email: " sudhanshu.12prasad@gmail.com",
      tokenUsed: 1,
      status: true,
    },
    {
      name: "Sudhanshu Prasad",
      date: "15 Nov 2023",
      time: "12:30 pm",
      email: " sudhanshu.12prasad@gmail.com",
      tokenUsed: 1,
      status: true,
    },
  ]);

  return (
    <div className="flex flex-col w-full h-full gap-4 ">
      {/* top head */}
      <div className="w-full flex justify-between items-center">
        <p className=" text-[18px] font-medium w-[200px] text-[#605D64]">
          Transaction History
        </p>
        <div className="flex min-w-[110px]  items-center">
          <Select
            borderColor="#CAC5CD"
            color="#605D64"
            variant="outline"
            className="!rounded-lg !text-sm !font-medium text-[#605D64]"
            _focus={{ borderColor: "blue.500" }}
            onChange={(e) => handleSelectPlant(e)}
            value={selectPlant}
          >
            <option
              key="all"
              value="all"
              className="bg-white hover:bg-blue-200"
            >
              All Plants
            </option>
          </Select>
        </div>
      </div>
      {/* token details */}

      <TokenData />

      <TokenTransactionTable tableData={TransactiontableData} />
      <TokenAllocationTable tableData={AllocationtableData} />
    </div>
  );
};

export default TokenTransaction;
