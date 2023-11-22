import { Select } from "@chakra-ui/react";
import { useState } from "react";
import TokenData from "../TokenData";
import TokenTransactionTable from "../TokenTransactionTable";
import TokenAllocationTable from "../TokenAllocationTable";
import Paginator from "../../../util/VisionUtils/Paginator";

const TokenTransaction = () => {
  const [selectPlant, setSelectPlant] = useState("All Plants");
  const handleSelectPlant = (e) => {
    setSelectPlant(e.target.value);
  };

  const [TransactiontableData, setTransactiontableData] = useState([
    {
      date: "8 Sep '23 10:15",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: false,
    },
    {
      date: "8 Sep '23 10:15",
      transactionType: "Transfer",
      amount: 0,
      token: -20,
      status: true,
    },
    {
      date: "8 Sep '23 10:15",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: true,
    },
    {
      date: "8 Sep '23 10:15",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: true,
    },
    {
      date: "8 Sep '23 10:15",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: true,
    },
    {
      date: "8 Sep '23 10:15",
      transactionType: "Purchase",
      amount: 1000,
      token: 20,
      status: true,
    },
  ]);

  const [AllocationtableData, setAllocationtableData] = useState([
    {
      name: "Sudhanshu Prasad",
      date: "8 Sep '23 10:15",
      email: " sudhanshu.12prasad@gmail.com",
      token: 1,
      status: false,
    },
    {
      name: "Sudhanshu Prasad",
      date: "8 Sep '23 10:15",
      email: " sudhanshu.12prasad@gmail.com",
      token: 1,
      status: true,
    },
    {
      name: "Sudhanshu Prasad",
      date: "8 Sep '23 10:15",
      email: " sudhanshu.12prasad@gmail.com",
      token: 1,
      status: true,
    },
    {
      name: "Sudhanshu Prasad",
      date: "8 Sep '23 10:15",
      email: " sudhanshu.12prasad@gmail.com",
      token: 1,
      status: true,
    },
    {
      name: "Sudhanshu Prasad",
      date: "8 Sep '23 10:15",
      email: " sudhanshu.12prasad@gmail.com",
      token: 1,
      status: true,
    },
  ]);

  const [displayData1, setDisplayData1] = useState([]);
  const [displayData2, setDisplayData2] = useState([]);

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
      {TransactiontableData && (
        <div className="w-full flex justify-end">
          <Paginator
            data={TransactiontableData}
            limit={4}
            setDisplayData={setDisplayData1}
          />
        </div>
      )}
      <TokenTransactionTable tableData={displayData1} />

      <div className="w-full p-2 flex justify-between items-center">
        <p className="text-[#605D64] text-[16px] font-medium">
          Allocation History
        </p>
        {AllocationtableData && (
          <div className="">
            <Paginator
              data={AllocationtableData}
              limit={4}
              setDisplayData={setDisplayData2}
            />
          </div>
        )}
      </div>
      <TokenAllocationTable tableData={displayData2} />
    </div>
  );
};

export default TokenTransaction;
