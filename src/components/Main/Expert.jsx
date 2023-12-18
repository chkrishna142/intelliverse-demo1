import React, {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import Navbar from "../Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../..";
import { Input, Spinner } from "@chakra-ui/react";
import NavContext from "../NavContext";
import axios from "axios";
import PrimaryButton from "../../util/Buttons/PrimaryButton";
import ExpertComments from "../community/ExpertComments";
import TonalButton from "../../util/Buttons/TonalButton";
import FileUploader from "../community/AnswerExpert/FileUploader";
// import { baseURL } from "../../index";
import CloseIcon from "@mui/icons-material/Close";
const Expert = () => {
  const { auth, userType } = useContext(NavContext);
  const [submitted, setSubmitted] = useState(false);
  const [reply, setReply] = useState("");
  const [review, setReview] = useState(false);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(localStorage.getItem("fullname"));
  let param = useParams();

  const [spinner, setSpinner] = useState(false);
  const [question, setQuestion] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [send, setSend] = useState([]);
  const [answer, setAnswer] = useState("");
  const [comment, setComment] = useState("");
  const [savedAnswer, setSavedAnswer] = useState("");
  const [subject, setSubject] = useState("");
  const [retrievedComments, setRetrievedComments] = useState([]);
  const [enquirer, setEnquirer] = useState("");

  const { login } = useContext(NavContext);

  // const textbox = useRef(null);

  // function adjustHeight() {
  //   textbox.current.style.height = "inherit";
  //   textbox.current.style.height = `${textbox.current.scrollHeight + 50}px`;
  // }

  // useLayoutEffect(adjustHeight, []);
  // useEffect(() => {
  //   adjustHeight();
  // }, [reply]); // Call adjustHeight whenever reply changes

  // useLayoutEffect(() => {
  //   adjustHeight();
  // }, [textbox.current]);

  // const selectPicture = (event) => {
  //   setSend([...send, event.target.files[0]]);
  //   console.log("send", send);
  // };

  // function handleKeyDown(e) {
  //   adjustHeight();
  // }

  const fetchSavedAnswer = async () => {
    try {
      const response = await axios.get(
        baseURL + `questions/saveAnswer/${param.questionId}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSavedAnswer(response?.data);
      // console.log("saved", response?.data);
    } catch (e) {
      console.error(e);
    }
  };
  const handleSave = async () => {
    const data = {
      answer: reply,
    };
    try {
      const response = await axios.post(
        baseURL + `questions/saveAnswer/${param.questionId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );

      console.log("saved", response?.data);
    } catch (e) {
      console.error(e);
    }
  };

  const postComments = async () => {
    setComment("");
    const data = {
      comment: comment,
    };
    try {
      const response = await axios.post(
        baseURL + `questions/comment/${param.questionId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      getComments();
      console.log("comments", response);
    } catch (e) {
      console.error(e);
    }
  };

  const getComments = async () => {
    const data = {
      comment,
    };
    try {
      const response = await axios.get(
        baseURL + `questions/comment/${param.questionId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      setRetrievedComments(response?.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
    getAttachments();
    fetchSavedAnswer();
    getComments();
  }, []);

  const getAttachments = async () => {
    try {
      const res = await axios.get(
        baseURL + `attachment/expert/${param.questionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": auth,
          },
        }
      );
      // const res = await data?.json();
      setAttachments(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    const data = await fetch(baseURL + `questions/${param.questionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data.json();
    // setQuestion(
    //   res?.filter((item) => {
    //     return item.questionId.toLowerCase().includes(param.questionId);
    //   })
    // );
    setQuestion(res?.question);
    setAnswer(res?.answer);
    setEnquirer(res?.username);
    setSubject(res?.subject);
  };

  const postAnswer = async () => {
    setSpinner(true);
    // var myHeaders = new Headers();
    // //myHeaders.append("X-Auth-Token", auth);
    // myHeaders.append("Content-Type", "application/json");
    // var raw = JSON.stringify({
    //     answer: reply
    // });
    // var requestOptions = {
    //     credentials: 'same-origin',
    //     method: 'PATCH',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };
    // const data = await fetch(`${baseURL}questions/answer/${param.questionId}`, requestOptions)
    // setSpinner(false)
    // setSubmitted(true)

    const cap = {
      answer: reply,
    };
    const json = JSON.stringify(cap);
    const blob = new Blob([json], {
      type: "application/json",
    });
    const FormData = require("form-data");
    let data = new FormData();
    data.append("json", blob);
    data.append("files", send[0]);
    data.append("files", send[1]);
    data.append("files", send[2]);
    let config = {
      method: "post",
      credentials: "same-origin",
      maxBodyLength: Infinity,
      redirect: "follow",
      url: baseURL + `questions/answer/${param.questionId}`,
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSpinner(false);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const downloadAsset = async (asset) => {
    axios({
      url: baseURL + `attachment/download?key=${asset}`, //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", removeExtension(asset)); //or any other extension
      document.body.appendChild(link);
      link.click();
      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
    //setDownloadLoader(false)
  };

  function expertName(id) {
    if (id === 1) {
      return "Florian Budde";
    } else if (id === 2) {
      return "Luc Bonte";
    } else if (id === 3) {
      return "Shripad Nadkarni";
    } else {
      return "Sujesh Vasudevan";
    }
  }

  function removeExtension(filename) {
    return (
      filename.substring(filename.lastIndexOf("/") + 1, filename.length) ||
      filename
    );
  }
  const handleClickHistory = () => {
    navigate("/community/askanexpert");
  };
  const handleComments = () => {
    console.log("Comment added");
  };
  const removeFile = (index) => {
    const updatedSend = [...send];
    updatedSend.splice(index, 1); // Remove the file at the specified index
    setSend(updatedSend);
  };
  console.log("roleType", auth);
  return (
    <>
      <Navbar />
      <div className={login === false ? "mt-20 mx-10" : "mt-10"}>
        <div className="flex justify-between items-center w-full gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div
              className="cursor-pointer w-6 h-6"
              onClick={handleClickHistory}
            >
              <img
                src="/transactionhistory/backarrow.svg"
                className="w-full h-full"
                alt="backarrow_img"
              />
            </div>
            <div className="flex justify-center items-center cursor-pointer">
              <p className="font-semibold text-[20px] text-[#084298] text-bold">
                QnA Details
              </p>
            </div>
          </div>
          {userType !== "EXPERT" ? (
            ""
          ) : (
            <>
              {answer == null || answer.length == 0 ? (
                <div className="flex items-center gap-2">
                  {review === false ? (
                    <TonalButton
                      text={"Save Draft"}
                      width={"fit-content"}
                      onClick={handleSave}
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
                      onClick={() => postAnswer()}
                    />
                  ) : (
                    <Spinner />
                  )}
                </div>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        {submitted === false ? (
          <>
            <div className="w-full p-6 border bg-white rounded-md mb-5">
              {/* <div>
              <p className="mt-5 ml-7 font-bold">
                Hello {expertName(question[0]?.expertId)},
              </p>
              <p className="mt-2 ml-7">
                Subject will be displayed here
              </p>
            </div>
            <div className="mx-7">
              <div className="w-full font-light mt-2">
                You can see the user's question and reply using the text box
                below. Feel free to request additional information from the user
                if necessary, but aim to resolve the query in your initial
                Remember to save your work by clicking 'Save' if you need to
                leave temporarily. Your response will be sent after you click
                'Review Answer' and then 'Submit Answer.'
                <div>
                  <p className="text-[#034C85] font-bold mt-4">User’s Query</p>
                  <div>
                    <p className="mt-2 font-bold">
                      Dear {expertName(question[0]?.expertId)},
                      Dear {fullName}
                    </p>
                    <p className="w-full font-light mt-2">{question}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="font-semibold text-[#034C85]">
                        User Provided Attachments:{" "}
                      </p>
                      {attachments?.map((item, index) => {
                        return (
                          <p
                            onClick={() => downloadAsset(item)}
                            className="font-light text-[#034C85] underline cursor-pointer text-sm"
                            key={index}
                          >
                            {removeExtension(item)}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <p className="font-light mt-5">
                  Here's a summary of the information you provided:
                </p>
                <p className="mt-2 text-[#034C85] font-bold">Attached Files:</p>
                <div className="mt-3 flex gap-3 items-center">
                  {send?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <img src="/pdf.svg" alt="pdf" />
                        <p className="font-light text-[#AEA9B1]">{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              {review === false ? (
                <div className="w-full mt-4">
                  <textarea
                    ref={textbox}
                    value={reply}
                    onChange={(e) => {
                      setReply(e.target.value);
                      handleKeyDown();
                    }}
                    placeholder="Enter your reply here..."
                    className="w-full border rounded-md px-2 py-2"
                  />
                  {answer == null || answer.length == 0 ? (
                    <textarea
                      ref={textbox}
                      value={reply || savedAnswer}
                      onChange={(e) => {
                        setReply(e.target.value);
                        handleKeyDown();
                      }}
                      placeholder="Enter your reply here..."
                      className="w-full border rounded-md px-2 py-2"
                    />
                  ) : (
                    <div>
                      <div className="w-full h-20 rounded-md px-0 py-2 overflow-y-auto mb-3">
                        <p className="ml-2">Dear {enquirer}</p>
                        <p className="ml-2">{answer}</p>
                      </div>
                      <div className="flex gap-2 items-center justify-center mb-2">
                        <Input
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Add your comments here..."
                          className="w-full border rounded-md px-2 py-2 mt-2"
                        />
                        <div className="w-15 mt-2">
                          <PrimaryButton
                            text={"Add"}
                            onClick={() => postComments()}
                          />
                        </div>
                      </div>
                      {retrievedComments && retrievedComments.length != 0 && (
                        <ExpertComments retrievedComments={retrievedComments} />
                      )}
                    </div>
                  )}

                  {answer == null || answer.length == 0 ? (
                    <div className="mx-2 mt-10">
                      <div className="relative w-full bg-white -mt-12 h-10 px-2 py-2 flex items-center gap-2">
                        <img
                          className="cursor-pointer -mr-2"
                          src="/abc.svg"
                          alt="abc"
                        />
                        <img className='cursor-pointer' src="/attachment.svg" alt="attach" />
                                <input className="opacity-0 cursor-pointer" type="file" onChange={(e) => selectPicture(e)} />
                        <label for="image">
                          <input
                            onChange={(e) => selectPicture(e)}
                            type="file"
                            name="image"
                            id="image"
                            style={{ display: "none" }}
                          />
                          <img
                            className="cursor-pointer"
                            src="/attachment.svg"
                            alt="attach"
                          />
                        </label>
                        <img
                          className="cursor-pointer"
                          src="/sharing.svg"
                          alt="abc"
                        />
                        <img
                        className="cursor-pointer"
                        src="/emoji.svg"
                        alt="attach"
                      />
                        <img
                          className="cursor-pointer"
                          src="/drive.svg"
                          alt="attach"
                        />
                        <img
                          className="cursor-pointer"
                          src="/image.svg"
                          alt="attach"
                        />
                        <img
                          className="cursor-pointer"
                          src="/pen.svg"
                          alt="attach"
                        />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : null}
              {review === true ? (
                <div className="w-full mt-4">
                  <p className="text-[#034C85]">Your Reply</p>
                  <div className="w-full h-20  rounded-md px-0 py-2">
                    {reply || savedAnswer}
                  </div>
                </div>
              ) : null}
              {answer == null || answer.length == 0 ? (
                <div className="w-full flex justify-start items-center gap-6 mt-5 mb-5">
                  {review === false ? (
                    <button
                      className="text-white px-6 py-3 bg-[#084298] rounded-md"
                      onClick={handleSave}
                    >
                      Save Answer
                    </button>
                  ) : (
                    <button
                      onClick={() => setReview(false)}
                      className="text-white px-6 py-3 bg-[#084298] rounded-md"
                    >
                      Back To Editing
                    </button>
                  )}
                  {review === false ? (
                    <button
                      onClick={() => setReview(true)}
                      className="text-white px-6 py-3 bg-[#084298] rounded-md"
                    >
                      Review Answer
                    </button>
                  ) : (
                    <button
                      onClick={() => postAnswer()}
                      className="text-white px-6 py-3 bg-[#084298] rounded-md"
                    >
                      {spinner === false ? (
                        <span>Submit Answer</span>
                      ) : (
                        <Spinner />
                      )}
                    </button>
                  )}
                </div>
              ) : (
                ""
              )}
            </div> */}
              <div className="flex justify-between">
                <div>
                  <p className="text-[20px]" style={{ fontWeight: 500 }}>
                    Dear, {fullName}
                  </p>
                </div>
                <div className="flex items-center lg:gap-4 sm:gap-2 px-3 py-1 rounded-sm bg-[#FFFFD8]">
                  <div>
                    <p className="text-[14px] text-[#605D64] font-normal p-1">
                      Question cost
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-[#3E3C42] font-semibold text-[16px]">
                      {200}
                    </p>
                    <img
                      src="/token.svg"
                      className="w-full h-full"
                      alt="token"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-16 text-[14px]">
                <div>
                  <p className=" font-semibold">Expert</p>
                  <div className="flex gap-1 items-center">
                    <div>
                      <img src="/expert/expert.png" alt="" />
                    </div>
                    <div>
                      <p>{fullName}</p>
                      <p className="text-[#AEA9B1]">Asainpaints</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className=" font-semibold">Need by</p>
                  <div className="flex gap-1 items-center">
                    <div className="mt-2">
                      <img src="/expert/date.svg" alt="" />
                    </div>
                    <div className="flex justify-center">
                      <p>12th May 23</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className=" font-semibold">Enquirer</p>
                  <div className="flex gap-1 items-center">
                    <div>
                      <img src="/expert/expert.png" alt="" />
                    </div>
                    <div>
                      <p>{enquirer}</p>
                      <p className="text-[#AEA9B1]">Asainpaints</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-6 border bg-white rounded-md mb-5">
              <p className="text-[14px] font-semibold">Question summary</p>
              <p className="text-[16px] mt-3">
                How can I reduce the occurrence of refractory failure in blast
                furnace
              </p>
            </div>
            <div className="w-full p-6 border bg-white rounded-md mb-5">
              <p className="text-[14px] font-semibold">Question details</p>
              <div className="flex my-2">
                <p>
                  {attachments?.map((item, index) => {
                    return (
                      <p
                        onClick={() => downloadAsset(item)}
                        className="font-light text-[#034C85] underline cursor-pointer text-sm"
                        key={index}
                      >
                        {removeExtension(item)}
                      </p>
                    );
                  })}
                </p>
              </div>
              <p className="text-[16px] mt-3 w-[70%]">
                {/* How can I reduce the occurrence of refractory failure in blast
                furnace. How can I reduce the occurrence of refractory failure
                in blast furnace. How can I reduce the occurrence of refractory
                failure in blast furnace How can I reduce the occurrence of
                refractory failure in blast furnace How can I reduce the
                occurrence of refractory failure in blast furnace How can I
                reduce the occurrence of refractory failure in blast furnace */}
                {question}
              </p>
            </div>
            <div className="w-full p-6 border bg-white rounded-md mb-5">
              <p className="text-[14px] font-semibold">Answer Details</p>
              {userType !== "EXPERT" ? (
                ""
              ) : (
                <div className="flex items-center gap-3">
                  {send.length < 1 && (
                    <FileUploader setSend={setSend} send={send} />
                  )}
                  {send.length < 2 && (
                    <FileUploader setSend={setSend} send={send} />
                  )}
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
                            <CloseIcon onClick={() => removeFile(index)} />
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {review === false ? (
                <div>
                  {answer == null || answer.length == 0 ? (
                    userType === "EXPERT" && (
                      <textarea
                        // ref={""}
                        value={reply || savedAnswer}
                        onChange={(e) => {
                          setReply(e.target.value);
                          // handleKeyDown();
                        }}
                        placeholder="Your answer here"
                        className={`w-[60%] border rounded-md px-2 py-2 h-32`}
                      />
                    )
                  ) : (
                    <div>
                      <div className="w-full h-20 rounded-md px-0 py-2 overflow-y-auto mb-3">
                        <p className="">{answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}
              {review === true ? (
                <div className="w-full mt-4">
                  <p className="text-[#034C85]">Your Reply</p>
                  <div className="w-full h-20  rounded-md px-0 py-2">
                    {reply || savedAnswer}
                  </div>
                </div>
              ) : null}
              {userType !== "EXPERT" &&
                (answer == null ||
                  answer.length == 0 ||
                  answer == "" ||
                  savedAnswer.length == 0) && (
                  <p className="mt-2">
                    The expert has received your question, please watch this
                    page for the response.
                  </p>
                )}
            </div>
            {(userType === "EXPERT" && answer === "") ||
            answer == null ||
            answer.length === 0 ? (
              ""
            ) : (
              <div className="w-full p-6 border bg-white rounded-md">
                <p>Comments</p>
                {retrievedComments && retrievedComments.length !== 0 && (
                  <ExpertComments retrievedComments={retrievedComments} />
                )}

                <div className="relative">
                  <textarea
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add your comment"
                    className="w-[60%] border h-20 rounded-md px-2 py-2 mt-2"
                  />
                  <button
                    className="text-[#FFF] text-sm rounded bg-[#6CA6FC] absolute bottom-0 right-0 mb-3 mr-2 p-3"
                    onClick={() => postComments()}
                  >
                    Post comment
                  </button>
                </div>
              </div>
            )}
            
          </>
        ) : (
          // <div className="mt-40">
          //   <div className="w-full flex justify-center mt-10">
          //     <img src="/query.svg" />
          //   </div>
          //   <div className="w-full flex justify-center">
          //     <p className="font-semibold text-2xl mt-4">
          //       Thank You for Your Query!
          //     </p>
          //   </div>
          //   <div className="mt-5 w-full flex justify-center">
          //     <p className="px-10 font-light">
          //       Your insights and expertise are greatly appreciated.
          //     </p>
          //   </div>
          //   <div className="mt-5 w-full flex justify-center">
          //     <p className="px-10 font-light">
          //       If any further updates or clarifications are required, you will
          //       be contacted directly. You can close this tab now.
          //     </p>
          //   </div>
          // </div>
          ""
        )}
      </div>
    </>
  );
};

export default Expert;
