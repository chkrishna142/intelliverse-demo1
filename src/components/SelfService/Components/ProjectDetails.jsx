import { Input, useToast } from "@chakra-ui/react";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import { useRef, useState } from "react";
import TonalButton from "../../../util/Buttons/TonalButton";

const ProjectDetails = ({
  userData,
  setUSerData,
  activeStep,
  setActiveStep,
}) => {
  const nameRef = useRef();
  const [disable, setDisable] = useState(false);
  const toast = useToast();
  const handlSave = () => {
    if (nameRef.current.value == "") {
      toast({
        title: "Error",
        description: "Please enter project name",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setUSerData((prev) => {
      let newData = { ...prev };
      newData["name"] = nameRef.current.value;
      return newData;
    });
    if (activeStep < 1) setActiveStep((prev) => prev + 1);
    setDisable(true);
  };
  return (
    <div className="bg-white rounded-lg flex flex-col gap-8 p-6">
      <p className="text-[#3E3C42] text-xl font-medium">Project Details</p>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#3E3C42] font-medium">Project name</p>
        <Input
          width={"fit-content"}
          name="name"
          defaultValue={userData.name}
          ref={nameRef}
          isDisabled={disable}
        />
      </div>
      <div className="flex gap-2 items-center">
        <PrimaryButton
          text={"Save"}
          width={"fit-content"}
          onClick={handlSave}
          disable={disable}
        />
        {activeStep > 0 && (
          <TonalButton
            text={"Edit"}
            width={"fit-content"}
            onClick={() => setDisable(false)}
            disable={!disable}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
