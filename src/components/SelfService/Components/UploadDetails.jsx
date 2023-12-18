import { useContext, useEffect, useRef, useState } from "react";
import { Input, Radio, RadioGroup, useToast } from "@chakra-ui/react";
import SecondaryButton from "../../../util/Buttons/SecondaryButton";
import TextButton from "../../../util/Buttons/TextButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import TonalButton from "../../../util/Buttons/TonalButton";
import axios from "axios";
import { baseURL } from "../../../index";
import NavContext from "../../NavContext";

const UploadDetails = ({
  userData,
  setUSerData,
  setActiveStep,
  activeStep,
  show,
  viewMode = false,
}) => {
  const { auth } = useContext(NavContext);
  const fileInputRef = useRef();
  const [disable, setDisable] = useState(viewMode);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const format = {
    Image: ["jpg", "jpeg", "png"],
    Video: ["mp4"],
  };

  const handleChange = (name, value) => {
    setUSerData((prev) => {
      let updateData = { ...prev };
      updateData[name] = value;
      return updateData;
    });
  };

  const UploadFiles = async (data) => {
    const param = {
      projectId: userData.projectId,
    };

    const promise = new Promise((resolve, reject) => {
      let chunkSize = 25;
      const totalChunks = Math.ceil(data.length / chunkSize);
      let completedChunks = 0;
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = (i + 1) * chunkSize;
        const filesChunk = data.slice(start, end);
        let requestData = new FormData();
        filesChunk.map((x) => {
          requestData.append("files", x);
        });
        axios
          .post(
            baseURL + "selfserve/v1/project/v1/file/batchUpload/",
            requestData,
            {
              params: param,
              headers: {
                "Content-Type": "multipart/form-data",
                "X-Auth-Token": auth,
              },
            }
          )
          .then((response) => {
            completedChunks++;
            if (completedChunks == totalChunks) {
              resolve(200);
              setLoading(false);
              handleChange("uploadedFiles", response.data?.dataset);
            }
          })
          .catch((error) => {
            console.log(error);
            reject(error);
            setLoading(false);
          });
      }
    });

    toast.promise(promise, {
      success: {
        title: "Upload complete",
        description: "Click on save to annotate",
        position: "top-right",
      },
      error: {
        title: "Upload failed",
        description: "Something went wrong",
        position: "top-right",
      },
      loading: {
        title: "Uploading files",
        description: "Please wait",
        position: "top-right",
      },
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = Array.from(event.target.files);
    if (selectedFile) {
      const acceptedTypes = format[userData.dataType].map((ext) => {
        return userData.dataType.toLowerCase() + "/" + ext;
      });
      let goodToGo = true;
      selectedFile.map((file) => {
        if (!acceptedTypes.includes(file.type) || file.size > 2 * 1024 * 1024) {
          toast({
            title: "Error",
            description: (
              <div>
                <p>{`Image name: ${file.name}`}</p>
                <p>{`Accepted formats: [${acceptedTypes.join(", ")}]`}</p>
                <p>{`Uploaded file: ${file.type}`}</p>
                <p>{`Max size: 2MB, Uploaded size: ${(
                  file.size /
                  (1024 * 1024)
                ).toFixed(1)}MB`}</p>
              </div>
            ),
            status: "error",
            position: "top-right",
            duration: 6000,
            isClosable: true,
          });
          goodToGo = false;
          return;
        }
      });
      if (goodToGo) {
        setLoading(true);
        UploadFiles(selectedFile);
        handleChange("savedFiles", selectedFile);
      }
    }
  };

  const handleSave = async () => {
    if (
      userData.annotationType == "" ||
      Object.entries(userData.uploadedFiles).length == 0
    ) {
      toast({
        title: "Error",
        description:
          "Please check files are uploaded and all fields are filled",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      return;
    } else {
      try {
        const requestBody = JSON.stringify({
          remarks: userData.whatToDetect,
          datasetType: userData.dataType.toUpperCase(),
          isAnnotated: userData.isAnnotated == "No" ? false : true,
          modelType: userData.annotationType.toUpperCase(),
        });
        const param = {
          projectId: userData.projectId,
        };
        const response = await axios.post(
          baseURL + "selfserve/v1/project/v1/update/",
          requestBody,
          {
            params: param,
            headers: {
              "Content-Type": "application/json",
              "X-Auth-Token": auth,
            },
          }
        );
        if (response.status == 200) {
          if (activeStep < 3) setActiveStep((prev) => prev + 1);
          setDisable(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 p-6 bg-white rounded-lg transition-all ease-in duration-700 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      id="step2"
    >
      <div className="flex flex-col gap-8">
        <p className="text-[#3E3C42] text-xl font-medium">Upload details</p>
        <div className="flex flex-col gap-6">
          {/*Is annotated*/}
          <div className="flex flex-col gap-3">
            <p className="text-[#3E3C42] text-sm font-medium">
              Is the data annotated?
            </p>
            <RadioGroup
              onChange={(e) => handleChange("isAnnotated", e)}
              value={userData.isAnnotated}
            >
              <div className="flex gap-1 items-center">
                {["Yes", "No"].map((x) => {
                  return (
                    <div
                      style={{
                        backgroundColor:
                          x == userData.isAnnotated ? "#DDEEFF80" : "#FFF",
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
                        isDisabled={disable}
                      >
                        {x}
                      </Radio>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
          {/*annotation type */}
          <div className="flex flex-col gap-3">
            <p className="text-[#3E3C42] text-sm font-medium">
              Select annotation type
            </p>
            <RadioGroup
              onChange={(e) => handleChange("annotationType", e)}
              value={userData.annotationType}
              isDisabled={disable}
            >
              <div className="flex gap-1 items-center">
                {["Classify", "Detect", "Segment"].map((x) => {
                  return (
                    <div
                      style={{
                        backgroundColor:
                          x == userData.annotationType ? "#DDEEFF80" : "#FFF",
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
                        isDisabled={disable}
                      >
                        {x}
                      </Radio>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
          {/*Upload data*/}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#79767D] text-sm font-medium">
                Upload {userData.dataType}
                <span className="text-[#DC362E]">*</span>
              </p>
              <p className="text-[#AEA9B1] text-sm">
                Supported formats: {format[userData.dataType]?.join(", ")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 text-[#AEA9B1] text-sm items-start sm:items-center whitespace-nowrap">
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                multiple
              />
              <SecondaryButton
                Icon={<img src="/selfServiceIcons/upload.svg" alt="upload" />}
                text={"Upload files"}
                width={"fit-content"}
                onClick={() => {
                  fileInputRef.current.click();
                }}
                disable={disable}
              />
              <p>or</p>
              <div className="flex items-center gap-0">
                <TextButton
                  text={"Link Bucket"}
                  width={"fit-content"}
                  disable={disable}
                />
                <div style={{ width: "fit-content" }}>
                  <Input
                    type="text"
                    placeholder="Supported Aws"
                    isDisabled={disable}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center mt-2">
          <PrimaryButton
            text={"Save"}
            onClick={handleSave}
            width={"fit-content"}
            disable={disable || loading}
          />
          {/* {activeStep > 2 && (
            <TonalButton
              text={"Edit"}
              width={"fit-content"}
              disable={!disable}
              onClick={() => setDisable(false)}
            />
          )} */}
        </div>
      </div>
      {userData.annotationType != "" && userData.savedFiles == null && (
        <div className="rounded-lg h-full flex justify-center items-center transition-all duration-500 ease-linear">
          <img
            src={`/selfServiceIcons/images/${userData.annotationType.toLowerCase()}_final.png`}
            alt="info image"
            className="rounded-lg h-auto xl:h-[420px] w-full lg:w-[35vw] xl:w-auto"
          />
        </div>
      )}
      {userData.uploadedFiles &&
        Object.entries(userData.uploadedFiles).length > 0 && (
          <div className="grid grid-cols-2 h-full w-fit gap-3">
            {Object.entries(userData.uploadedFiles)
              .slice(0, 5)
              .map((item) => {
                return (
                  <div className="flex justify-center items-center bg-black w-full rounded-lg">
                    <img
                      src={item[1]}
                      alt="image"
                      className="h-auto xl:h-[120px] w-[50vw] lg:w-[15vw] xl:w-auto rounded-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                );
              })}
            <div className="text-[#3E3C42] text-lg font-medium flex justify-center items-center text-center">
              Images Uploaded...
            </div>
          </div>
        )}
    </div>
  );
};

export default UploadDetails;
