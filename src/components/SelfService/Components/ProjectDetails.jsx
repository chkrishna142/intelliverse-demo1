import { Input, useToast } from "@chakra-ui/react";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import { useContext, useRef, useState } from "react";
import TonalButton from "../../../util/Buttons/TonalButton";
import axios from "axios";
import { baseURL } from "../../..";
import NavContext from "../../NavContext";

const ProjectDetails = ({
  userData,
  setUSerData,
  activeStep,
  setActiveStep,
}) => {
  const nameRef = useRef();
  const { auth } = useContext(NavContext);
  const [disable, setDisable] = useState(false);
  const toast = useToast();

  const handlSave = async () => {
    if (nameRef.current.value == "" || nameRef.current.value.length > 100) {
      toast({
        title: "Error",
        description:
          "Please ensure project name is not empty or greater than 100 characters",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    try {
      const requestBody = JSON.stringify({
        name: nameRef.current.value,
        remarks: "Self Serve project",
        clientId: "ripik",
      });
      const response = await axios.post(
        baseURL + "selfserve/v1/project/v1/add/",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      if (response.status == 200) {
        setUSerData((prev) => {
          let newData = { ...prev };
          newData["name"] = nameRef.current.value;
          newData["projectId"] = response.data.projectId;
          return newData;
        });
        toast({
          title: "Success",
          description: "Project created with id: " + response.data.projectId,
          status: "success",
          position: "top-right",
          duration: 2000,
          isClosable: true,
        });
        if (activeStep < 1) setActiveStep((prev) => prev + 1);
        setDisable(true);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Creation api failed",
        status: "error",
        position: "top-right",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg flex flex-col gap-8 p-6" id="step0">
      <p className="text-[#3E3C42] text-xl font-medium">Project Details</p>
      <div className="flex flex-col gap-3">
        <p className="text-sm text-[#3E3C42] font-medium">Project name</p>
        <Input
          width={"fit-content"}
          name="name"
          defaultValue={userData.name}
          ref={nameRef}
          isDisabled={disable}
          placeholder="Max char 100"
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
