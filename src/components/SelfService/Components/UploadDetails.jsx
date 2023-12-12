import { useEffect, useRef, useState } from "react";
import { Input, Radio, RadioGroup, useToast } from "@chakra-ui/react";
import SecondaryButton from "../../../util/Buttons/SecondaryButton";
import TextButton from "../../../util/Buttons/TextButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import TonalButton from "../../../util/Buttons/TonalButton";

const UploadDetails = ({
  userData,
  setUSerData,
  setActiveStep,
  activeStep,
  show,
}) => {
  const fileInputRef = useRef();
  const [disable, setDisable] = useState(false);
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

  const handleFileChange = (event) => {
    const selectedFile = Array.from(event.target.files);
    if (selectedFile) {
      const acceptedTypes = format[userData.dataType].map((ext) => {
        return userData.dataType.toLowerCase() + "/" + ext;
      });
      let goodToGo = true;
      selectedFile.map((file) => {
        if (!acceptedTypes.includes(file.type)) {
          toast({
            title: "Error",
            description: (
              <div>
                <p>{`Accepted formats: [${acceptedTypes.join(", ")}]`}</p>
                <p>{`Uploaded file: ${file.type}`}</p>
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
        handleChange("uploadedFiles", selectedFile);
        toast({
          title: "Uploaded",
          description: "File succesfully uploaded",
          status: "success",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const handleSave = () => {
    if (userData.annotationType == "" || userData.uploadedFiles == null) {
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
    }
    if (activeStep < 3) setActiveStep((prev) => prev + 1);
    setDisable(true);
  };

  return (
    <div
      className={`flex flex-col gap-8 p-6 bg-white rounded-lg transition-all ease-in duration-700 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
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
          <div className="flex gap-4 text-[#AEA9B1] text-sm items-center">
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
          disable={disable}
        />
        {activeStep > 2 && (
          <TonalButton
            text={"Edit"}
            width={"fit-content"}
            disable={!disable}
            onClick={() => setDisable(false)}
          />
        )}
      </div>
    </div>
  );
};

export default UploadDetails;
