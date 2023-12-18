import { Select } from "@chakra-ui/react";
import FloatingInput from "../../../util/VisionUtils/FloatingInput";

const Header = ({ customEndDate, setCustomToTime }) => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <p className="text-[20px]" style={{ fontWeight: 500 }}>
            Dear, {"Luc"}
          </p>
        </div>
        <div className="flex items-center lg:gap-4 sm:gap-2 px-3 py-1 rounded-sm bg-[#FFFFD8]">
          <div>
            <p className="text-[14px] text-[#605D64] font-normal p-1">
              Question cost
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[#3E3C42] font-semibold text-[16px]">{200}</p>
            <img src="/token.svg" className="w-full h-full" alt="token" />
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center my-2">
        <div className="flex items-center lg:gap-4 sm:gap-2 px-3 py-1 rounded-sm bg-[#FFFFD8]">
          <div>
            <p className="text-[14px] text-[#605D64] font-normal p-1">
              Current balance
            </p>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[#3E3C42] font-semibold text-[16px]">{2000}</p>
            <img src="/token.svg" className="w-full h-full" alt="token" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-16 text-[14px]">
        <div>
          <p className=" font-semibold">Expert</p>
          <div className="flex min-w-[110px]  items-center">
            <Select
              borderColor="#CAC5CD"
              color="#605D64"
              variant="outline"
              className="!text-sm !font-medium text-[#605D64]"
              _focus={{ borderColor: "blue.500" }}
            //   onChange={(e) => handleRangeSelect(e)}
              value={""}
            >
              <option
                key="Luc"
                value={0}
                className="bg-white hover:bg-blue-200"
              >
                Luc
              </option>
              <option
                key="Last Seven Days"
                value={1}
                className="bg-white hover:bg-blue-200"
              >
                John
              </option>
              <option
                key="This Month"
                value={2}
                className="bg-white hover:bg-blue-200"
              >
                Shone
              </option>
              <option
                key="This Quarter"
                value={3}
                className="bg-white hover:bg-blue-200"
              >
                James
              </option>
            </Select>
          </div>
        </div>
        <div>
          <p className=" font-semibold">Need by</p>
          <div className="flex gap-1 items-center">
            <div className="mt-1">
              <img src="/expert/date.svg" alt="" />
            </div>
            <div className="flex justify-center mt-1">
              <div className="min-w-[110px]">
                <FloatingInput
                  text=""
                  type="date"
                  setDateTime={setCustomToTime}
                  value={customEndDate}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className=" font-semibold">Enquirer</p>
          <div className="flex gap-1 items-center">
            <div>
              <img src="/expert/expert.png" alt="" />
            </div>
            <div>
              <p>{"enquirer"}</p>
              <p className="text-[#AEA9B1]">Asainpaints</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
