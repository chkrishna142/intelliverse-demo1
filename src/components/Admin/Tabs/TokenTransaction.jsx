import { Select } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import TokenData from "../TokenData";
import TokenTransactionTable from "../TokenTransactionTable";
import TokenAllocationTable from "../TokenAllocationTable";
import Paginator from "../../../util/VisionUtils/Paginator";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../..";
import NavContext from "../../NavContext";

const TokenTransaction = ({ isFetchTranChanged }) => {
  const { clientOrg } = useParams();
  const [selectPlant, setSelectPlant] = useState("All Plants");
  const { auth } = useContext(NavContext);

  // const [TransactiontableData, setTransactiontableData] = useState([
  //   {
  //     date: "8 Sep '23 10:15",
  //     transactionType: "Purchase",
  //     amount: 1000,
  //     token: 20,
  //     status: false,
  //   },
  //   {
  //     date: "8 Sep '23 10:15",
  //     transactionType: "Transfer",
  //     amount: 0,
  //     token: -20,
  //     status: true,
  //   },
  //   {
  //     date: "8 Sep '23 10:15",
  //     transactionType: "Purchase",
  //     amount: 1000,
  //     token: 20,
  //     status: true,
  //   },
  //   {
  //     date: "8 Sep '23 10:15",
  //     transactionType: "Purchase",
  //     amount: 1000,
  //     token: 20,
  //     status: true,
  //   },
  //   {
  //     date: "8 Sep '23 10:15",
  //     transactionType: "Purchase",
  //     amount: 1000,
  //     token: 20,
  //     status: true,
  //   },
  //   {
  //     date: "8 Sep '23 10:15",
  //     transactionType: "Purchase",
  //     amount: 1000,
  //     token: 20,
  //     status: true,
  //   },
  // ]);
  const [transactiontableData, setTransactiontableData] = useState([]);
  // const [AllocationtableData, setAllocationtableData] = useState([
  //   {
  //     name: "Sudhanshu Prasad",
  //     date: "8 Sep '23 10:15",
  //     email: " sudhanshu.12prasad@gmail.com",
  //     token: 1,
  //     status: false,
  //   },
  //   {
  //     name: "Sudhanshu Prasad",
  //     date: "8 Sep '23 10:15",
  //     email: " sudhanshu.12prasad@gmail.com",
  //     token: 1,
  //     status: true,
  //   },
  //   {
  //     name: "Sudhanshu Prasad",
  //     date: "8 Sep '23 10:15",
  //     email: " sudhanshu.12prasad@gmail.com",
  //     token: 1,
  //     status: true,
  //   },
  //   {
  //     name: "Sudhanshu Prasad",
  //     date: "8 Sep '23 10:15",
  //     email: " sudhanshu.12prasad@gmail.com",
  //     token: 1,
  //     status: true,
  //   },
  //   {
  //     name: "Sudhanshu Prasad",
  //     date: "8 Sep '23 10:15",
  //     email: " sudhanshu.12prasad@gmail.com",
  //     token: 1,
  //     status: true,
  //   },
  // ]);
  const [allocationtableData, setAllocationtableData] = useState([]);
  const [displayData1, setDisplayData1] = useState([]);
  const [displayData2, setDisplayData2] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSelectPlant = (e) => {
    setSelectPlant(e.target.value);
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    const param = {
      organisation: clientOrg || "",
    };
    try {
      const response = await axios.get(
        baseURL + `token-wallet/v1/allocation-log`,
        {
          params: param,
          headers: {
            "Content-Type": "application/json",
            "X-auth-Token": auth,
          },
        }
      );
      setIsLoading(false);
      // Sort the data based on transactionDate in descending order
      const sortedOrgData = response?.data?.org.sort(
        (a, b) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime()
      );

      const sortedUserData = response?.data?.user.sort(
        (a, b) =>
          new Date(b.transactionDate).getTime() -
          new Date(a.transactionDate).getTime()
      );

      setTransactiontableData(sortedOrgData);
      setAllocationtableData(sortedUserData);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, [isFetchTranChanged]);

  return (
    <div
      className={`flex flex-col w-full h-full gap-4 ${clientOrg && "mt-[4vh]"}`}
    >
      {/* top head */}
      <div className="w-full flex justify-between items-center">
        <p className=" text-[18px] font-medium w-[200px] text-[#605D64]">
          Allocation History
        </p>
      </div>
      <TokenData isFetchTranChanged={isFetchTranChanged} />
      {/* token details */}
      {isLoading ? (
        // Render spinner or loading indicator while data is being fetched
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-full p-2">
            {/* <p className="text-[#605D64] text-[16px] font-medium mt-3">
              Allocation History
            </p> */}
            <div className="mt-3">
              {displayData2 && displayData2.length !== 0 && (
                <TokenAllocationTable tableData={displayData2} />
              )}
            </div>
            {allocationtableData && allocationtableData.length > 0 && (
              <div className="flex justify-end">
                <Paginator
                  data={allocationtableData}
                  limit={4}
                  setDisplayData={setDisplayData2}
                />
              </div>
            )}
          </div>
          {/* {displayData1 && displayData1.length !== 0 && (
            <TokenTransactionTable tableData={displayData1} />
          )}
          {transactiontableData && transactiontableData.length > 0 && (
            <div className="w-full flex justify-end">
              <Paginator
                data={transactiontableData}
                limit={4}
                setDisplayData={setDisplayData1}
              />
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default TokenTransaction;
