import { Select } from "@chakra-ui/react";
import { useState } from "react";

const TokenTransaction = () => {
  const [selectPlant, setSelectPlant] = useState("All Plants");
  const handleSelectPlant = (e) => {
    setSelectPlant(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full gap-4">
      {/* top head */}
      <div className="w-full flex justify-between items-center">
        <p className=" text-[18px] font-medium w-[200px] text-[#605D64]">
          Purchase History
        </p>
        <div className="flex min-w-[110px]  items-center">
          <Select
            borderColor="#CAC5CD"
            color="#605D64"
            variant="outline"
            className="!rounded-2xl !text-sm !font-medium text-[#605D64]"
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
      <div className="w-full flex justify-between">
        {/* new querries */}
        <div className="w-[380px] p-0 flex h-full rounded-lg ">
          <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#FFFFC4] rounded-tl-lg  rounded-bl-lg">
            <img src="/advisor/yellowques.svg" alt="" />
          </div>
          <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
            <p className="text-[#605D64] text-[18px] font-semibold">3</p>
            <p className="text-[#605D64] text-[14px] ">New queries</p>
          </div>
        </div>
        {/* active querries */}
        <div className="w-[380px] p-0 flex h-full rounded-lg ">
          <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#CDEEBF] rounded-tl-lg  rounded-bl-lg">
            <img src="/advisor/greenques.svg" alt="" />
          </div>
          <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
            <p className="text-[#605D64] text-[18px] font-semibold">3</p>
            <p className="text-[#605D64] text-[14px] ">Active queries</p>
          </div>
        </div>
        {/* answered queries */}

        <div className="w-[380px] p-0 flex h-full rounded-lg ">
          <div className="w-[90px] h-[70px] flex justify-center items-center p-0 bg-[#CBE3FB] rounded-tl-lg  rounded-bl-lg">
            <img src="/advisor/blueques.svg" alt="" />
          </div>
          <div className="flex flex-col w-full h-[70px] px-[16px] py-[6px] justify-center bg-[#FAFAFA] rounded-tr-lg  rounded-br-lg gap-0">
            <p className="text-[#605D64] text-[18px] font-semibold">3</p>
            <p className="text-[#605D64] text-[14px] ">Answered queries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenTransaction;
