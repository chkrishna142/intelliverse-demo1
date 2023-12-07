import {
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import SecondaryButton from "../../../util/Buttons/SecondaryButton";
import TextButton from "../../../util/Buttons/TextButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import TonalButton from "../../../util/Buttons/TonalButton";
import { useNavigate } from "react-router-dom";

const CreateNew = () => {
  const [selectedType, setSelectedType] = useState("Image");
  const [prepareData, setPrepareData] = useState("No");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const dataPrepare = ["Yes", "No"];
  const dataOptions = {
    Image: {
      formats: ["jpg", "jpeg", "png"],
      option: ["Auto-clean", "Auto-annotate", "Auto-classify"],
      models: ["Azure", "YoloV8", "Ultralytics"],
      enable: true,
    },
    Video: {
      formats: ["mp4"],
      option: ["Auto-clean", "Auto-annotate", "Auto-classify"],
      models: ["Azure"],
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
        setFile(selectedFile);
        toast({
          title: "Uploaded",
          description: "File succesfully uploaded",
          status: "success",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: (
            <div>
              <p>{`Accepted formats: [${acceptedTypes.join(", ")}]`}</p>
              <p>{`Uploaded file: ${selectedFile.type}`}</p>
            </div>
          ),
          status: "error",
          position: "top-right",
          duration: 6000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="font-roboto flex flex-col gap-2 mt-6">
      <p className="text-[#084298] font-medium text-xl">Create new project</p>
      <div className="flex flex-col gap-3">
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-white">
          <p className="text-[#79767D] text-sm font-medium">Project name</p>
          <div style={{ width: "fit-content" }}>
            <Input type="text" />
          </div>
        </div>
        <div className="p-6 flex flex-col gap-3 bg-white rounded-lg">
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
                  Supported formats:{" "}
                  {dataOptions[selectedType].formats.join(", ")}
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
                <div className="flex items-center gap-0">
                  <TextButton text={'Link Bucket'} width={'fit-content'}/>
                  <div style={{ width: "fit-content" }}>
                    <Input type="text" placeholder="Supported Aws"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg flex flex-col gap-3">
          <p className="text-[#3E3C42] text-lg font-medium">Model</p>
          <div className="flex flex-col gap-3">
            <p className="text-[#79767D] text-sm font-medium">
              Select the model
            </p>
            <RadioGroup onChange={setSelectedModel} value={selectedModel}>
              <div
                className="grid grid-cols-4 gap-2"
                style={{ width: "fit-content" }}
              >
                {dataOptions[selectedType].models.map((x) => {
                  return (
                    <div
                      style={{
                        backgroundColor: selectedModel.includes(x)
                          ? "#DDEEFF80"
                          : "#FFF",
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
            <p className="text-[#3E3C42] text-sm font-medium">OR</p>
            <div className="flex flex-col gap-3">
              <p className="text-[#79767D] text-sm font-medium">Model link</p>
              <div style={{ width: "fit-content" }}>
                <Input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] items-center mt-2">
        <PrimaryButton text={"Train model"} width={"fit-content"} />
        <TonalButton
          text={"Discard"}
          width={"fit-content"}
          onClick={() => {
            navigate("/Sandbox");
          }}
        />
      </div>
    </div>
  );
};

export default CreateNew;
