import { useEffect, useState } from "react";
import UseCaseDetail from "../Components/UseCaseDetail";
import UploadDetails from "../Components/UploadDetails";
import AnnotateData from "../Components/AnnotateData";
import ProjectDetails from "../Components/ProjectDetails";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";

const TimeLengthMap = (val) => {
  if (val > 1000) return "30 min";
  else if (val > 500) return "15 min";
  else return "a few min";
};

const CreateForm = () => {
  const initState = {
    projectId: "",
    name: "",
    dataType: "",
    whatToDetect: "",
    uploadedFiles: {},
    savedFiles: null,
    isAnnotated: "No",
    annotationType: "",
    annotatedData: null,
  };
  const [userState, setUserState] = useState(initState);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const elem = document.getElementById("step" + activeStep);
    elem.scrollIntoView({
      behavior: "smooth", // You can use 'auto' instead of 'smooth' for instant scrolling
      block: "center", // You can use 'center' or 'end' instead of 'start'
    });
  }, [activeStep]);

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
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          show={activeStep >= 3}
        />
        {activeStep == 4 && (
          <div
            className={`p-6 flex flex-col gap-8 rounded-lg bg-white transition-all ease-in duration-500 ${
              activeStep == 4 ? "opacity-100" : "opacity-0"
            }`}
            id="step4"
          >
            <p className="text-[#3E3C42] text-xl font-medium">
              Traning request Submitted
            </p>
            <p className="text-base font-medium text-[#3E3C42] whitespace-normal">
              You saved {Object.entries(userState.uploadedFiles)?.length} files
              and annotated {userState.annotatedData?.length} Files. Based on
              the information provided the model will take{" "}
              {TimeLengthMap(userState.annotatedData?.length)} approx. Please
              click on close to move to home page
            </p>
            <div className="flex items-center gap-2 mt-2">
              <PrimaryButton
                text={"Close"}
                width={"fit-content"}
                onClick={() => navigate("/Sandbox")}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateForm;
