import { useState } from "react";
import Header from "./Header";
import TonalButton from "../../../util/Buttons/TonalButton";
import PrimaryButton from "../../../util/Buttons/PrimaryButton";
import { Spinner } from "@chakra-ui/react";
import FileUploader from "../AnswerExpert/FileUploader";
import { Input } from "@chakra-ui/react";
import { SpinnerIcon } from "@chakra-ui/icons";
import QuestionInstructions from "./QuestionInstructions";

const AskYourQuestion = () => {
const [spinner, setSpinner] = useState(false);
  const [customEndDate, setCustomToTime] = useState("");
  const [summary, setSummary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState(false);
  const [reply, setReply] = useState("");
  const [send, setSend] = useState([]);

  return (
    <div className="mt-5">
      <div className="flex justify-end">
        <div className="flex items-center gap-2 my-3">
          {review === false ? (
            <TonalButton
              text={"Save Draft"}
              width={"fit-content"}
            //   onClick={handleSave}
            />
          ) : (
            <PrimaryButton
              text={"Back to Review"}
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
            //   onClick={() => postAnswer()}
            />
          ) : (
            <SpinnerIcon />
          )}
        </div>
      </div>
      <Header customEndDate={customEndDate} setCustomToTime={setCustomToTime} />
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
                  <p className="font-light text-[#AEA9B1] mb-3">{item.name}</p>
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
                // value={reply || savedAnswer}
                onChange={(e) => {
                  setReply(e.target.value);
                  // handleKeyDown();
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
              {/* {reply || savedAnswer} */}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AskYourQuestion;
