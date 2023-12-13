import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UseCaseDetail from "../Components/UseCaseDetail";
import UploadDetails from "../Components/UploadDetails";
import AnnotateData from "../Components/AnnotateData";
import ProjectDetails from "../Components/ProjectDetails";

const CreateForm = () => {
  const initState = {
    name: "",
    dataType: "",
    whatToDetect: "",
    uploadedFiles: null,
    isAnnotated: "No",
    annotationType: "",
    steps: [
      { title: "Basic details", description: "Enter basic details" },
      { title: "Upload data", description: "Fill info about data set" },
      { title: "Annotate", description: "Annotate data for training" },
    ],
    annotatedData: null,
  };
  const [userState, setUserState] = useState(initState);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const elem = document.getElementById("step" + activeStep);
    elem.scrollIntoView({
      behavior: "smooth", // You can use 'auto' instead of 'smooth' for instant scrolling
      block: "center", // You can use 'center' or 'end' instead of 'start'
    });
  }, [activeStep]);

  console.log(userState, "data");
  return (
    <div className="flex flex-col gap-2 h-screen mt-6 font-roboto">
      <p className="text-[#084298] font-medium text-xl">Create new project</p>
      <div className="flex flex-col gap-3 h-full">
        <ProjectDetails
          userData={userState}
          setUSerData={setUserState}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          disable={activeStep > 0}
        />
        <UseCaseDetail
          userData={userState}
          setUSerData={setUserState}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          show={activeStep >= 1}
        />
        <UploadDetails
          userData={userState}
          setUSerData={setUserState}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          show={activeStep >= 2}
        />
        <AnnotateData
          userData={userState}
          setUSerData={setUserState}
          setActiveStep={setActiveStep}
          show={activeStep >= 3}
        />
      </div>
    </div>
  );
};

export default CreateForm;
