import { useState } from "react";
import Header from "./Header";
import TonalButton from "../../../util/Buttons/TonalButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import { Spinner } from "@chakra-ui/react";
import FileUploader from "../AnswerExpert/FileUploader";
import { Input } from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";
import QuestionInstructions from "./QuestionInstructions";
import { useNavigate } from "react-router-dom";

const AskYourQuestion = ({
  postQuestion,
  summary,
  setSummary,
}) => {
  const [spinner, setSpinner] = useState(false);
  const [customEndDate, setCustomToTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState(false);
  const [reply, setReply] = useState("");
  const [send, setSend] = useState([]);
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate("/community/askanexpert/question");
  };
  const handleSubmit = () => {
    setSubmitted(true)
  };
  return submitted === false ? (
    <>
      <div className="mt-[3vh]">
        <div className="flex justify-between w-full items-center">
          <div className="flex">
            <div className="cursor-pointer w-8" onClick={handleBackButton}>
              <img
                src="/transactionhistory/backarrow.svg"
                className="w-full h-full"
                alt="backarrow_img"
              />
            </div>
            <p className="text-lg sm:text-2xl font-semibold text-[#024D87]">
              QnA Details
            </p>
          </div>
          <div className="flex items-center gap-2 my-3">
            {review === false ? (
              <TonalButton
                text={"Save Draft"}
                width={"fit-content"}
                //   onClick={handleSave}
              />
            ) : (
              <PrimaryButton
                text={"Back to Editing"}
                width={"fit-content"}
                onClick={() => setReview(false)}
              />
            )}
            {review === false ? (
              <PrimaryButton
                text={"Review"}
                width={"fit-content"}
                onClick={() => setReview(true)}
              />
            ) : spinner === false ? (
              <PrimaryButton
                text={"Submit"}
                width={"fit-content"}
                onClick={handleSubmit}
              />
            ) : (
              <SpinnerIcon />
            )}
          </div>
        </div>
      </div>
      <div className=" px-6 w-full border shadow-md bg-white rounded-md mb-5 pt-3">
        <Header
          customEndDate={customEndDate}
          setCustomToTime={setCustomToTime}
        />
        <div className="py-6">
          <p className="text-[14px] font-semibold">Question summary</p>
          <input
            type="text"
            placeholder="Be concise and summarize your question"
            className="w-[60%] mt-1 h-10 px-4 rounded-md border"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div className="w-full bg-white rounded-md py-3">
          <p className="text-[14px] font-semibold">Question Details</p>
          <QuestionInstructions />
          <div className="flex items-center gap-3">
            {send.length < 1 && <FileUploader setSend={setSend} send={send} />}
            {send.length < 2 && <FileUploader setSend={setSend} send={send} />}
            <div className="mt-3 flex gap-3 items-center">
              {send?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {/* <img src="/pdf.svg" alt="pdf" /> */}
                    <p className="font-light text-[#AEA9B1] mb-3">
                      {item.name}
                    </p>
                    <p className="mb-3">
                      {/* <CloseIcon onClick={() => removeFile(index)} /> */}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {review === false ? (
            <div>
              <textarea
                // ref={""}
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                placeholder="Your answer here"
                className="w-[60%] border rounded-md px-2 py-2 h-32"
              />
            </div>
          ) : (
            ""
          )}
          {review === true ? (
            <div className="w-full mt-4">
              <p className="text-[#034C85]">Your Question</p>
              <div className="w-full h-20  rounded-md px-0 py-2">
                {question}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  ) : (
    <div className="mt-40">
      <div className="w-full flex justify-center mt-10">
        <img src="/query.svg" />
      </div>
      <div className="w-full flex justify-center">
        <p className="font-semibold text-2xl mt-4">Thank You for Your Query!</p>
      </div>
      <div className="mt-5 w-full flex justify-center">
        <p className="px-10 font-light">
          Your insights and expertise are greatly appreciated.
        </p>
      </div>
      <div className="mt-5 w-full flex justify-center">
        <p className="px-10 font-light">
          If any further updates or clarifications are required, you will be
          contacted directly. Feel free to use other tools.
        </p>
      </div>
    </div>
  );
};

export default AskYourQuestion;
