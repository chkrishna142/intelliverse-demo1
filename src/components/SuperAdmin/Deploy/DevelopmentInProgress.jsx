import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";

const DevelopmentInProgress = () => {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <img src="/deployment/building-blocks.png" alt="building-blocks" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-[24px] font-semibold">Development in progress</p>
        <p className="text-[16px] text-[#605D64]">
          Our team is working hard to bring you an exciting new feature. We
          apologize for any inconvenience.
        </p>
        <p className="text-[16px] text-[#605D64]">
          Thank you for your patience.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <PrimaryButton
          text={"Go to homepage"}
          width={"fit-content"}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};

export default DevelopmentInProgress;
