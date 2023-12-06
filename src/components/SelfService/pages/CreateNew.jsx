import {
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import SecondaryButton from "../../../util/Buttons/SecondaryButton";
import TextButton from "../../../util/Buttons/TextButton";

const CreateNew = () => {
  const [selectedType, setSelectedType] = useState("Image");
  const [prepareData, setPrepareData] = useState("No");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const fileInputRef = useRef(null);
  const dataPrepare = ["Yes", "No"];
  const dataOptions = {
    Image: {
      formats: ["jpg", "jpeg", "png"],
      option: ["Auto-clean", "Auto-annotate", "Auto-classify"],
      models: [],
      enable: true,
    },
    Video: {
      formats: ["mp4"],
      option: ["Auto-clean", "Auto-annotate", "Auto-classify"],
      models: [],
      enable: true,
    },
    Text: {
      enable: false,
    },
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const acceptedTypes = dataOptions[selectedType].formats.map((ext) => {
        return selectedType.toLowerCase() + "/" + ext;
      });
      if (acceptedTypes.includes(selectedFile.type)) {
        console.log("File type is accepted:", selectedFile.type);
      } else {
        console.log(
          "Invalid file type. Please choose a different file.",
          selectedFile.type,
          acceptedTypes
        );
      }
    }
  };

  return (
    <div className="font-roboto flex flex-col gap-2 mt-6">
      <p className="text-[#084298] font-medium text-xl">Create new project</p>
      <div className="flex flex-col gap-3">
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-white">
          <p className="text-[#79767D] text-sm font-medium">Project name</p>
          <div className="w-[310px]">
            <Input type="text" />
          </div>
        </div>
        <div className="p-6 flex flex-col gap-3 bg-white">
          <p className="text-[#3E3C42] text-lg font-medium">Data set</p>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[#79767D] text-sm font-medium">
                Select data type
              </p>
              <RadioGroup onChange={setSelectedType} value={selectedType}>
                <div className="flex gap-1 items-center">
                  {Object.keys(dataOptions).map((x) => {
                    return (
                      <div
                        style={{
                          backgroundColor:
                            x == selectedType ? "#DDEEFF80" : "#FFF",
                          borderRadius: "8px",
                        }}
                      >
                        <Radio
                          value={x}
                          py={"8px"}
                          pl={"8px"}
                          pr={"12px"}
                          fontSize={"14px"}
                          fontWeight={500}
                          color={"#3E3C42"}
                          _checked={{
                            bg: "#6CA6FC",
                            borderColor: "#6CA6FC",
                          }}
                          _hover={{
                            borderColor: "#6CA6FC",
                          }}
                          isDisabled={!dataOptions[x].enable}
                        >
                          {x}
                        </Radio>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[#79767D] text-sm font-medium">
                Would you like to prepare data?
                <span className="text-[#DC362E]">*</span>
              </p>
              <RadioGroup onChange={setPrepareData} value={prepareData}>
                <div className="flex gap-1 items-center">
                  {dataPrepare.map((x) => {
                    return (
                      <div
                        style={{
                          backgroundColor:
                            x == prepareData ? "#DDEEFF80" : "#FFF",
                          borderRadius: "8px",
                        }}
                      >
                        <Radio
                          value={x}
                          py={"8px"}
                          pl={"8px"}
                          pr={"12px"}
                          fontSize={"14px"}
                          fontWeight={500}
                          color={"#3E3C42"}
                          _checked={{
                            bg: "#6CA6FC",
                            borderColor: "#6CA6FC",
                          }}
                          _hover={{
                            borderColor: "#6CA6FC",
                          }}
                        >
                          {x}
                        </Radio>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
              {prepareData == "Yes" && (
                <CheckboxGroup
                  onChange={setSelectedOptions}
                  value={selectedOptions}
                >
                  <div className="flex gap-1 items-center">
                    {dataOptions[selectedType].option.map((x) => {
                      return (
                        <Checkbox
                          value={x}
                          py={"8px"}
                          pl={"8px"}
                          pr={"12px"}
                          fontSize={"14px"}
                          fontWeight={500}
                          color={"#3E3C42"}
                          rounded={"8px"}
                          _checked={{
                            bg: "#DDEEFF80",
                          }}
                          _hover={{
                            borderColor: "#6CA6FC",
                          }}
                        >
                          {x}
                        </Checkbox>
                      );
                    })}
                  </div>
                </CheckboxGroup>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-[#79767D] text-sm font-medium">
                  Upload {selectedType}
                  <span className="text-[#DC362E]">*</span>
                </p>
                <p className="text-[#AEA9B1] text-sm">
                  Supported formats: {dataOptions[selectedType].formats.join(", ")}
                </p>
              </div>
              <div className="flex gap-4 text-[#AEA9B1] text-sm items-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <SecondaryButton
                  Icon={<img src="/selfServiceIcons/upload.svg" alt="upload" />}
                  text={"Upload files"}
                  width={"fit-content"}
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                />
                <p>or</p>
                <TextButton
                  text={"Connect to cloud bucket"}
                  width={"fit-content"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
