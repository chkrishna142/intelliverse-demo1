import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { useParams } from 'react-router-dom';
import { baseURL } from '../..';
import { Spinner } from '@chakra-ui/react';


const Expert = () => {

    const [submitted, setSubmitted] = useState(false)
    const [reply, setReply] = useState("")
    const [review, setReview] = useState(false)
    let param = useParams();

    const [spinner, setSpinner] = useState(false)
    const [question, setQuestion] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = await fetch(baseURL + 'questions', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const res = await data.json()
        setQuestion(res?.filter((item) => {
            return item.questionId.toLowerCase().includes(param.questionId)
        }))
    }

    const postAnswer = async () => {
        setSpinner(true)
        var myHeaders = new Headers();
        //myHeaders.append("X-Auth-Token", auth);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            answer: reply
        });
        var requestOptions = {
            credentials: 'same-origin',
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        const data = await fetch(`${baseURL}questions/answer/${param.questionId}`, requestOptions)
        setSpinner(false)
        setSubmitted(true)
    }

    function expertName(id) {
        if (id === 1) {
            return "Florian Budde"
        } else if (id === 2) {
            return "Luc Bonte"
        } else if (id === 3) {
            return "Shripad Nadkarni"
        } else {
            return "Sujesh Vasudevan"
        }
    }

    // useEffect(() => {
    //     console.log(question)
    // })


    return (
        <>
            <Navbar />
            <div className='mt-20 mx-10'>
                {submitted === false ? <div className='w-full border shadow-md bg-white rounded-md mb-5 '>
                    <p className='mt-6 ml-5 text-black text-xl font-semibold'>Ask An Expert</p>
                    <div>
                        <p className='mt-5 ml-7 font-bold'>Hello {expertName(question[0]?.expertId)},</p>
                    </div>
                    <div className='mx-7'>
                        <div className='w-full font-light mt-2'>
                            You can see the user's question and reply using the text box below. Feel free to request additional information from the user if necessary, but aim to resolve the query in your initial
                            Remember to save your work by clicking 'Save' if you need to leave temporarily. Your response will be sent after you click 'Review Answer' and then 'Submit Answer.'
                            <p className='text-[#034C85] font-bold mt-3'>User’s Query</p>
                            <div>
                                <p className='mt-2 font-bold'>Dear {expertName(question[0]?.expertId)},</p>
                                <p className='w-full font-light mt-2'>{question[0]?.question}</p>
                            </div>
                            <p className='font-light mt-5'>Here's a summary of the information you provided:</p>
                            <p className='mt-2 text-[#034C85] font-bold'>Attached Files:</p>
                            <div className='mt-3 flex gap-3 items-center'>
                                <div className='flex items-center gap-2 cursor-pointer'>
                                    <img src="/pdf.svg" alt="pdf" />
                                    <p className='font-light text-[#AEA9B1]'>12 Sep BF Report.pdf</p>
                                </div>
                                <div className='flex items-center gap-2 ursor-pointer'>
                                    <img src="/pdf.svg" alt="pdf" />
                                    <p className='font-light text-[#AEA9B1]'>11 Sep BF Report.pdf</p>
                                </div>
                            </div>
                        </div>
                        {review === false ? <div className='w-full mt-4'>
                            <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder='Enter your reply here...' className='w-full h-24 border rounded-md px-2 py-2' />

                            <div className='relative w-full -mt-12 h-10 px-2 py-2 flex items-center gap-2'>
                                <img className='cursor-pointer -mr-2' src="/abc.svg" alt="abc" />
                                <img className='cursor-pointer' src="/attachment.svg" alt="attach" />
                                <img className='cursor-pointer' src="/sharing.svg" alt="abc" />
                                <img className='cursor-pointer' src="/emoji.svg" alt="attach" />
                                <img className='cursor-pointer' src="/drive.svg" alt="attach" />
                                <img className='cursor-pointer' src="/image.svg" alt="attach" />
                                <img className='cursor-pointer' src="/pen.svg" alt="attach" />
                            </div>

                        </div> : null}
                        {review === true ? <div className='w-full mt-4'>
                            <p className='text-[#034C85]'>Your Reply</p>
                            <div className='w-full h-20  rounded-md px-0 py-2'>
                                {reply}
                            </div>
                        </div> : null}
                        <div className='w-full flex justify-start items-center gap-6 mt-5 mb-5'>
                            {review === false ? <button className='text-white px-6 py-3 bg-[#084298] rounded-md'>Save Answer</button> : <button onClick={() => setReview(false)} className='text-white px-6 py-3 bg-[#084298] rounded-md'>Back To Editing</button>}
                            {review === false ? <button onClick={() => setReview(true)} className='text-white px-6 py-3 bg-[#084298] rounded-md'>Review Answer</button> : <button onClick={() => postAnswer()} className='text-white px-6 py-3 bg-[#084298] rounded-md'>{spinner === false ? <span>Submit Answer</span> : <Spinner />}</button>}
                        </div>
                    </div>
                </div> :
                    <div className='mt-40'>
                        <div className='w-full flex justify-center mt-10'>
                            <img src="/query.svg" />
                        </div>
                        <div className='w-full flex justify-center'>
                            <p className='font-semibold text-2xl mt-4'>Thank You for Your Query!</p>
                        </div>
                        <div className='mt-5 w-full flex justify-center'>
                            <p className='px-10 font-light'>Your insights and expertise are greatly appreciated.</p>
                        </div>
                        <div className='mt-5 w-full flex justify-center'>
                            <p className='px-10 font-light'>If any further updates or clarifications are required, you will be contacted directly. You can close this tab now.</p>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default Expert;
