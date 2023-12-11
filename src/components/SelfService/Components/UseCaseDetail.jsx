import { Input, Radio, RadioGroup } from "@chakra-ui/react";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import TonalButton from "../../../util/Buttons/TonalButton";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const UseCaseDetail = ({
  userData,
  setUSerData,
  activeStep,
  setActiveStep,
  show,
}) => {
  const descRef = useRef();
  const [disable, setDisable] = useState(false);
  const handleChange = (name, value) => {
    setUSerData((prev) => {
      const updatedData = { ...prev };
      updatedData[name] = value;
      return updatedData;
    });
  };
  const handleSave = () => {
    setUSerData((prev) => {
      let newData = { ...prev };
      newData["whatToDetect"] = descRef.current.value;
      return newData;
    });
    if (activeStep < 2) setActiveStep((prev) => prev + 1);
    setDisable(true);
  };
  const dataTypes = ["Image", "Video", "Text"];
  return (
    <div
      className={`p-6 flex flex-col gap-8 rounded-lg bg-white transition-all ease-in duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="text-[#3E3C42] text-xl font-medium">UseCase details</p>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-[#3E3C42] font-medium">Select data type</p>
          <RadioGroup
            name="dataType"
            onChange={(e) => handleChange("dataType", e)}
            value={userData.dataType}
          >
            <div className="flex gap-1 items-center">
              {dataTypes.map((x) => {
                return (
                  <div
                    style={{
                      backgroundColor:
                        x == userData.dataType ? "#DDEEFF80" : "#FFF",
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
                      isDisabled={x == "Text" || disable}
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
          <p className="text-sm text-[#3E3C42] font-medium">
            What do you want to detect?
          </p>
          <Input
            placeholder="Ex. I want to detect the size of coal"
            width={"300px"}
            name="whatToDetect"
            defaultValue={userData.whatToDetect}
            ref={descRef}
            isDisabled={disable}
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <PrimaryButton
          text={"Save"}
          width={"fit-content"}
          onClick={handleSave}
          disable={disable}
        />
        {activeStep > 1 && (
          <TonalButton
            width={"fit-content"}
            text={"Edit"}
            onClick={() => {
              setDisable(false);
            }}
            disable={!disable}
          />
        )}
      </div>
    </div>
  );
};

export default UseCaseDetail;
