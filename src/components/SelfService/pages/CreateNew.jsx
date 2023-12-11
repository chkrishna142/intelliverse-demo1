import {
  Input,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  useToast,
} from "@chakra-ui/react";
import { useState, useRef, useEffect, useContext } from "react";
import SecondaryButton from "../../../util/Buttons/SecondaryButton";
import TextButton from "../../../util/Buttons/TextButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import TonalButton from "../../../util/Buttons/TonalButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";

const CreateNew = () => {
  const [selectedType, setSelectedType] = useState("Image");
  const projectNameRef = useRef(null);
  const modelLinkRef = useRef(null);
  const userTextref = useRef(null);
  const bucketLinkRef = useRef(null);
  const [prepareData, setPrepareData] = useState("No");
  const { auth } = useContext(NavContext);
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedModel, setSelectedModel] = useState();
  const [ownModel, setOwnModel] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);
  const dataPrepare = ["Yes", "No"];
  const dataOptions = {
    Image: {
      formats: ["jpg", "jpeg", "png"],
      option: ["Detection", "Segmentation", "Classification"],
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

  const apiCall = async () => {
    try {
      const requestBody = JSON.stringify({
        name: projectNameRef.current.value,
        remarks: "Fruit Vision",
        clientId: "ripik",
        dataSetType: selectedType.toUpperCase(),
        toAutoAnnotate: selectedOptions.includes("Auto-annotate"),
        toAutoClean: selectedOptions.includes("Auto-clean"),
        toAutoClassify: selectedOptions.includes("Auto-classify"),
        modelType: "PREDEFINED",
        modelId: "1asd21fsd3",
        uploadRefId: "4asd2343asd",
      });
      const response = await axios.post(
        baseURL + "selfserve/v1/project/v2/add/",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      if (response.status == 200) {
        navigate("/Sandbox/View");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ownModel) {
      setSelectedModel("");
    }
  }, [ownModel]);

  const handleSubmit = () => {
    if (
      projectNameRef.current.value != "" &&
      (file || bucketLinkRef.current.value != "") &&
      (selectedModel != "" || bucketLinkRef.current.value != "")
    ) {
      apiCall();
    } else {
      toast({
        title: "Error",
        description: "Some necessary fields are empty",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="font-roboto flex flex-col gap-2 mt-6">
      <p className="text-[#084298] font-medium text-xl">Create new project</p>
      <div className="flex flex-col gap-3">
        <div className="p-6 rounded-lg flex flex-col gap-3 bg-white">
          <p className="text-[#79767D] text-sm font-medium">Project name</p>
          <div style={{ width: "fit-content" }}>
            <Input type="text" ref={projectNameRef} />
          </div>
        </div>
        {/*Data enter and prepare */}
        <div className="p-6 flex flex-col gap-3 bg-white rounded-lg">
          <p className="text-[#3E3C42] text-lg font-medium">Data set</p>
          <div className="flex flex-col gap-6">
            {/*Data Type*/}
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
            {/*Text field what is to be done */}
            <div className="flex flex-col gap-3">
              <p className="text-[#79767D] text-sm font-medium">
                What are you trying to detect?
              </p>
              <div style={{ width: "fit-content" }}>
                <Input
                  type="text"
                  placeholder="Describe problem statement"
                  ref={userTextref}
                />
              </div>
            </div>
            {/*Upload data */}
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
                  <TextButton text={"Link Bucket"} width={"fit-content"} />
                  <div style={{ width: "fit-content" }}>
                    <Input
                      type="text"
                      placeholder="Supported Aws"
                      ref={bucketLinkRef}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*Ask annotation*/}
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
                <RadioGroup
                  onChange={setSelectedOptions}
                  value={selectedOptions}
                >
                  <div className="flex gap-1 items-center">
                    {dataOptions[selectedType].option.map((x) => {
                      return (
                        <div
                          style={{
                            backgroundColor:
                              x == selectedOptions ? "#DDEEFF80" : "#FFF",
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
              )}
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
                        backgroundColor:
                          selectedModel == x ? "#DDEEFF80" : "#FFF",
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
                        isDisabled={ownModel}
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
              <Checkbox
                py={"8px"}
                pl={"8px"}
                pr={"12px"}
                fontSize={"14px"}
                fontWeight={500}
                color={"#79767D"}
                rounded={"8px"}
                _checked={{
                  bg: "#DDEEFF80",
                }}
                _hover={{
                  borderColor: "#6CA6FC",
                }}
                onChange={() => setOwnModel((prev) => !prev)}
                width={"fit-content"}
              >
                Import your model
              </Checkbox>
              <div style={{ width: "fit-content" }}>
                <Input type="text" disabled={!ownModel} ref={modelLinkRef} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-[10px] items-center mt-2">
        <PrimaryButton
          text={"Train"}
          width={"fit-content"}
          disable={ownModel}
          onClick={() => {
            if (
              selectedModel != "" &&
              (file || bucketLinkRef.current.value != "")
            ) {
              const examplePromise = new Promise((resolve, reject) => {
                setTimeout(() => resolve(200), 5000);
              });
              toast.promise(examplePromise, {
                success: {
                  title: "Training Complete",
                  description: "Click on save changes to view results",
                  position: "top-right",
                },
                error: {
                  title: "Promise rejected",
                  description: "Something wrong",
                  position: "top-right",
                },
                loading: {
                  title: "Model is training",
                  description: "Please wait",
                  position: "top-right",
                },
              });
            } else {
              toast({
                title: "Error",
                description: "model , dataset or both is/are missing",
                status: "error",
                position: "top-right",
                duration: 2000,
                isClosable: true,
              });
            }
          }}
        />
        <PrimaryButton
          text={"Test"}
          width={"fit-content"}
          disable={!ownModel}
          onClick={() => {
            navigate("/Sandbox/View");
          }}
        />
        <TonalButton
          text={"Save Changes"}
          width={"fit-content"}
          onClick={handleSubmit}
        />
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
