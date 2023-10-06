import * as React from "react";
import { useRef, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import SkillMatrix from "../Tables/SkillMatrix";

const MasterFiles = () => {
  const fileInputRef = useRef(null);
  const [page, setPage] = useState("skill matrix");

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log("Dropped files:", files);
  };

  const handleFileSelectClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    console.log("Selected files:", files);
  };
  return (
    <div className="flex flex-col gap-6 bg-white rounded-xl">
      <div className="pt-3 flex flex-col gap-3">
        <div className="flex items-center justify-between px-6">
          <p className="text-lg text-[#605D64] font-medium">
            Upload master file
          </p>
          <p className="text-sm text-[#AEA9B1]">Last update today</p>
        </div>
        <div
          className="p-4 flex justify-center items-center w-full h-[180px] border-dashed border-2 border-[#D9D9D9] rounded-xl"
          onDrop={handleFileDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-4 items-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.3337 3.33325H10.0003C8.16699 3.33325 6.68366 4.83325 6.68366 6.66659L6.66699 33.3333C6.66699 35.1666 8.15033 36.6666 9.98366 36.6666H30.0003C31.8337 36.6666 33.3337 35.1666 33.3337 33.3333V13.3333L23.3337 3.33325ZM30.0003 33.3333H10.0003V6.66659H21.667V14.9999H30.0003V33.3333ZM13.3337 25.0166L15.6837 27.3666L18.3337 24.7333V31.6666H21.667V24.7333L24.317 27.3833L26.667 25.0166L20.017 18.3333L13.3337 25.0166Z"
                fill="#024D87"
              />
            </svg>
            <p className="text-[#525056] text-lg">
              Drag and Drop file or{" "}
              <span
                className="text-[#629CF2] font-medium cursor-pointer"
                onClick={handleFileSelectClick}
              >
                Choose file{" "}
              </span>{" "}
              to upload
              <p className="text-[#AEA9B1] text-xs text-center">
                Supported formats: .xlsx
              </p>
            </p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <Tabs>
          <TabList
            px="25px"
            border="0px"
            display="flex"
            width="full"
            gap="16px"
          >
            <Tab
              flex={1}
              border={0}
              px="10px"
              py="8px"
              textColor={page == "skill matrix" ? "#5892E8" : "#79767D"}
              fontWeight={500}
              fontSize='16px'
              bgColor={page == "skill matrix" ? "#E2EDFE" : "white"}
              onClick={() => setPage("skill matrix")}
              rounded='4px'
            >
              Skill Matrix
            </Tab>
            <Tab
              flex={1}
              border={0}
              px="10px"
              py="8px"
              textColor={page == "resource mapping" ? "#5892E8" : "#79767D"}
              fontWeight={500}
              fontSize='16px'
              bgColor={page == "resource mapping" ? "#E2EDFE" : "white"}
              onClick={() => setPage("resource mapping")}
              rounded='4px'
            >
              Resource Mapping
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel padding={0}>
              <SkillMatrix />
            </TabPanel>
            <TabPanel padding={0}>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default MasterFiles;
