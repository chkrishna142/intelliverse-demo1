import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from 'react';
import { Link } from 'react-router-dom';
import ExpertReadMore from './ExpertReadMore';
import NavContext from '../NavContext';
import { baseURL } from '../..';
import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useWindowSize } from '@uidotdev/usehooks';
import { getQuestionsCredit } from '../../util/utilFunctions';

const AskAnExpert = () => {
  const { auth } = useContext(NavContext);
  const size = useWindowSize();

  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expert, setExpert] = useState(0);
  const [credits, setCredits] = useState();
  const [disabled, setDisabled] = useState(true);

  const [expertDetails, setExpertDetails] = useState([]);
  const [question, setQuestion] = useState('');
  const [loader, setLoader] = useState(false);

  const [val1, setVal1] = useState(false);
  const [val2, setVal2] = useState(false);
  const [val3, setVal3] = useState(false);
  const [val4, setVal4] = useState(false);

  const [expertId, setExpertId] = useState(''); // expert id

  const [send, setSend] = useState([]);

  const selectPicture = (event) => {
    setSend([...send, event.target.files[0]]);
    console.log('send', send);
  };

  const getData = async () => {
    const data = await fetch(baseURL + 'experts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': auth,
      },
    });
    const res = await data.json();
    if (res.status === 200) {
      setExpertDetails(res);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  const getBalance = async () => {
    try {
      const data = await fetch(baseURL + 'user/balance/expert', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': auth,
        },
      });
      const res = await data.json();
      if (data.status !== 400) {
        setCredits(getQuestionsCredit(res, setDisabled));
      } else if (data.status === 400) {
        setCredits(0);
        setDisabled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const postQuestion = async () => {
    // const send = JSON.stringify({
    //     question: question,
    //     expertId: expertId
    // })
    // var formdata = new FormData()
    // formdata.append("json", send)
    // const data = await fetch(baseURL + 'questions', {
    //     method: "POST",
    //     headers: {

    //         "X-Auth-Token": auth
    //     },
    //     body: formdata
    // })
    setLoader(true);
    const cap = {
      expertId: expertId,
      question: question,
    };
    const json = JSON.stringify(cap);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const FormData = require('form-data');
    let data = new FormData();
    data.append('json', blob);
    data.append('files', send[0]);
    data.append('files', send[1]);
    data.append('files', send[2]);
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://backend-ripik.com/api/questions',
      headers: {
        'X-Auth-Token': auth,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSubmitted(true);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    getBalance();
  }, []);

  useEffect(() => {
    if (val1 === true || val2 === true || val3 === true || val4 === true) {
      setSelected(true);
    } else if (
      val1 === false ||
      val2 === false ||
      val3 === false ||
      val4 === false
    ) {
      setSelected(false);
    }
  }, [val1, val2, val3, val4]);

  return (
    <div className="mt-6">
      <div className="w-full border shadow-md bg-white rounded-md mb-5 ">
        <p className="mt-6 ml-5 text-black text-xl font-semibold">
          Ask An Expert
        </p>
        {submitted === false ? (
          <div>
            <p className="mt-3 ml-5 font-light">
              Have your most pressing questions answered by world renown
              experts.
            </p>
            <p className="font-semibold mt-5 ml-5 text-sm">Choose An Expert</p>
          </div>
        ) : (
          <div>
            <div className="w-full flex justify-center mt-10">
              <img src="/query.svg" />
            </div>
            <div className="w-full flex justify-center">
              <p className="font-semibold text-2xl mt-4">
                Thank You for Your Query!
              </p>
            </div>
            <div className="mt-5 w-full">
              <p className="px-10 font-light">
                Your question has been successfully submitted to our team of
                manufacturing experts. Please allow up to 24 hours for one of
                our experts to review and respond to your query. Keep an eye out
                for the response in your notification. Meanwhile, you can ask
                the query to our Al advisor{' '}
                <Link to="/community/advisor">
                  <span className="font-bold text-[#034C85] cursor-pointer">
                    here.
                  </span>
                </Link>
              </p>
            </div>
            <div className="mt-5 w-full">
              <p className="px-10 font-light">
                Here's a summary of the information you provided:
              </p>
            </div>
            <div className="mt-5 w-full">
              <p className="px-10 font-light text-[#034C85]">Question:</p>
            </div>
            <div className="ml-10 mr-10">
              <div className="mt-2 w-full rounded-md ">
                <p className="text-gray-600 px-2 py-2">{question}</p>
              </div>
            </div>
            <div className="mt-5 w-full mb-4">
              <p className="px-10 font-light">
                Thank you for using our{' '}
                <span className="font-bold">"Ask an Expert"</span> module. We're
                here to help you optimize efficiency and reduce waste in your
                manufacturing processes.
              </p>
            </div>
          </div>
        )}
        {submitted === false ? (
          <div className="mx-5 mb-[5vh]">
            <div className="w-full grid md:grid-cols-2 flex items-center gap-6 mt-2">
              <div className="border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3">
                <div className="col-span-1 flex items-center w-full justify-center">
                  <img
                    className="border rounded-md shadow-xl md:ml-0 ml-2 md:mt-0 mt-2"
                    src="/advisor1.png"
                  />
                </div>
                <div className="col-span-2 md:ml-0 mr-0 ">
                  <p className="font-semibold text-lg mt-3 md:ml-0 ml-3">
                    Florian Budde
                  </p>
                  <p className="w-full mt-2 md:ml-0 ml-3 text-sm text-gray-700">
                    Senior Partner Emeritus, McKinsey & Company
                  </p>
                  <p className="w-full mt-2 md:ml-0 ml-3 text-sm text-gray-700 w-5/6 mb-7">
                    Speciality: Chemistry, Data, Al, Technology
                  </p>
                  <div className="w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between">
                    <p
                      onClick={() => {
                        setIsOpen(true);
                        setExpert(0);
                      }}
                      className="cursor-pointer text-sm md:ml-0 ml-3"
                    >
                      Read More
                    </p>
                    <input
                      disabled={disabled}
                      name="firstchoice"
                      value={val1}
                      onChange={() => {
                        setVal1(!val1);
                        setExpertId(1);
                      }}
                      className="mr-5"
                      type="radio"
                    />
                  </div>
                </div>
              </div>
              <div className="border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3">
                <div className="col-span-1 flex items-center w-full justify-center">
                  <img
                    className="border rounded-md shadow-xl md:ml-0 ml-2 md:mt-0 mt-2"
                    src="/advisor2.png"
                  />
                </div>
                <div className="col-span-2 md:ml-0 mr-0 ">
                  <p className="font-semibold text-lg mt-3 md:ml-0 ml-3">
                    Shripad Nadkarni
                  </p>
                  <p className="w-full mt-2 text-sm text-gray-700 md:ml-0 ml-3">
                    Ex-VP Johnson & Johnson
                  </p>
                  <p className="w-full mt-2 text-sm text-gray-700 w-5/6 mb-7 md:ml-0 ml-3">
                    Speciality: Automobile, Food & Beverage, Apparel
                  </p>
                  <div className="w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between">
                    <p
                      onClick={() => {
                        setIsOpen(true);
                        setExpert(1);
                      }}
                      className="cursor-pointer text-sm md:ml-0 ml-3"
                    >
                      Read More
                    </p>
                    <input
                      disabled={disabled}
                      name="firstchoice"
                      value={val2}
                      onChange={() => {
                        setVal2(!val2);
                        setExpertId(3);
                      }}
                      className="mr-5"
                      type="radio"
                    />
                  </div>
                </div>
              </div>
              <div className="border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3">
                <div className="col-span-1 flex items-center w-full justify-center">
                  <img
                    className="border rounded-md shadow-xl md:mt-0 mt-2 md:ml-0 ml-2"
                    src="/advisor3.png"
                  />
                </div>
                <div className="col-span-2 md:ml-0 mr-0 ">
                  <p className="font-semibold text-lg mt-3 md:ml-0 ml-3">
                    Luc Bonte
                  </p>
                  <p className="w-full text-sm mt-2 text-gray-700 md:ml-0 ml-3">
                    Ex-Country President, Arcelor Belgium
                  </p>
                  <p className="w-full text-sm mt-2 text-gray-700 w-5/6 md:ml-0 ml-3">
                    Speciality: Maintenance methodology, Ironmaking & Steel,
                    Cape & Opex modeling
                  </p>
                  <div className="w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between">
                    <p
                      onClick={() => {
                        setIsOpen(true);
                        setExpert(2);
                      }}
                      className="cursor-pointer text-sm md:ml-0 ml-3"
                    >
                      Read More
                    </p>
                    <input
                      disabled={disabled}
                      name="firstchoice"
                      value={val3}
                      onChange={() => {
                        setVal3(!val3);
                        setExpertId(2);
                      }}
                      className="mr-5"
                      type="radio"
                    />
                  </div>
                </div>
              </div>
              <div className="border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3">
                <div className="col-span-1 flex items-center w-full justify-center">
                  <img
                    className="border rounded-md shadow-xl md:ml-0 ml-2 md:mt-0 mt-2"
                    src="/advisor4.png"
                  />
                </div>
                <div className="col-span-2 md:ml-0 mr-0 ">
                  <p className="font-semibold text-lg mt-3 md:ml-0 ml-3">
                    Sujesh Vasudevan
                  </p>
                  <p className="w-full mt-2 text-sm text-gray-700 md:ml-0 ml-3">
                    Ex-President Glen Pharma - India, ME and Africa
                  </p>
                  <p className="w-full mt-2 text-sm text-gray-700 w-5/6 mb-7 md:ml-0 ml-3">
                    Speciality: Pharma, Lifescience
                  </p>
                  <div className="w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between">
                    <p
                      onClick={() => {
                        setIsOpen(true);
                        setExpert(3);
                      }}
                      className="cursor-pointer text-sm md:ml-0 ml-3"
                    >
                      Read More
                    </p>
                    <input
                      disabled={disabled}
                      name="firstchoice"
                      value={val4}
                      onChange={() => {
                        setVal4(!val4);
                        setExpertId(4);
                      }}
                      className="mr-5"
                      type="radio"
                    />
                  </div>
                </div>
              </div>
            </div>

            {selected ? (
              <div>
                <div className="w-full font-light mt-6">
                  Please provide a detailed description of your question or
                  issue. Include relevant background information, any steps
                  you've already taken to address the problem, and any specific
                  challenges you're facing. If your question involves
                  measurements, specifications, or technical details please
                  include them in your description. This will help our experts
                  provide you with a more accurate response. Feel free to attach
                  relevant files, images or diagrams that can provide additional
                  context to your question.
                </div>
                <div className="w-full mt-4 w-full border rounded-md px-2 py-2">
                  {/* <p>{file ? `File name: ${file[0].name}` : null}</p> */}
                  <textarea
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                    }}
                    placeholder="Type your query here..."
                    className="w-full px-2 py-2"
                  />
                  <div className="flex items-center gap-2">
                    <label for="image">
                      <input
                        onChange={(e) => selectPicture(e)}
                        type="file"
                        name="image"
                        id="image"
                        style={{ display: 'none' }}
                      />
                      <img
                        className="cursor-pointer"
                        src="/attachment.svg"
                        alt="attach"
                      />
                    </label>
                    {send?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <p className="font-light text-[#AEA9B1]">
                            {item.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full flex justify-end mt-5">
                  <button
                    onClick={() => {
                      postQuestion();
                      setLoader(true);
                    }}
                    disabled={question === ''}
                    className={
                      question === ''
                        ? 'text-white px-6 py-3 bg-gray-400 rounded-md'
                        : 'text-white px-6 py-3 bg-[#084298] rounded-md'
                    }
                  >
                    {loader === false ? <span>Submit</span> : <Spinner />}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <ExpertReadMore
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        expert={expert}
      />
      <div className="flex justify-between items-center md:mb-0 mb-20">
        <div></div>
        <div className="flex items-start gap-4 text-[14px] mt-0 mr-2 whitespace-nowrap">
          <p
            className={
              credits < 5 ? 'font-bold text-[#DC362E]' : 'font-bold text-black'
            }
          >
            {credits}{' '}
            <img src="/token.svg" className="h-[12px] inline-block -mt-[2px]" />{' '}
            Remaining
          </p>
          <Link to="/community/advisor/buycredits">
            <div className="text-[#124CA2] font-bold cursor-pointer">
              Add more
            </div>
          </Link>
          <Link to="/user/transactionhistory">
            <div className="text-[#124CA2] font-bold cursor-pointer">
              View Transaction History
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AskAnExpert;
