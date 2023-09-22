import React, { useState, useEffect, useRef, useContext } from 'react';
import { baseURL } from '../..';
import NavContext from '../NavContext';
import Typewriter from './Typewriter';


const AiAdvisor = () => {

    const [send, setSend] = useState(false)
    const { auth } = useContext(NavContext)
    const ref = useRef(null)

    const [response, setResponse] = useState([])
    const [typing, setTyping] = useState(false)
    const [text, setText] = useState("")
    const [credits, setCredits] = useState(0)

    const callChatGpt = async (ask) => {
        setTyping(true)
        setText("")
        setResponse(current => [...current, ask])
        const data = await fetch(baseURL + 'chat', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": auth
            },
            body: JSON.stringify({
                message: ask
            })
        })
        const res = await data.json()
        setSend(true)
        setTyping(false)
        setResponse(current => [...current, res?.data?.reply])
    }

    useEffect(() => {
        if (response.length) {
            ref?.current?.scrollIntoView({
                behaviour: "smooth",
                block: "end"
            })
        }
    }, [response.length])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSend(true)
            callChatGpt(text)
        }
    }

    return (
        <div className=''>
            <div className='mt-[4vh] bg-white'>
                {send === false ? <div className='rounded-md border border-[#3A74CA] pb-5 w-full'>
                    <div className='grid grid-cols-8'>
                        <div className='col-span-1 m-10'>
                            <img src="/doc.svg" />
                        </div>
                        <div className='col-span-7 mt-3 mr-20 '>
                            <div className='text-2xl font-bold'>Hello !! I am <span className='text-[#6CA6FC]'>IntelliDoc</span></div>
                            <div className='mt-4 text-[#605D64]  '>
                                I am your go-to-chatbot. I am here to answer your questions using the latest manufacturing research papers. Ask me all your doubts about manufacturing and I will be more than happy to answer them!
                            </div>
                            <div className='text-[#605D64] text-xs mt-7'>
                                Note : It is important to note that while I try to provide accurate information, I can sometimes make errors. So always double-check the important facts independently.
                            </div>
                        </div>
                    </div>
                </div> :
                    <div className='w-full h-[60vh] overflow-y-scroll'>
                        {response?.map((item, index) => {
                            return (<div className='mt-[1vh] overflow-y-scroll border rounded-md'>
                                <div className='grid grid-cols-12'>
                                    {index % 2 !== 0 ? <div className='col-span-1'>
                                        <img className='md:h-[8vh] md:w-[3vw] md:mt-0 mt-4 ml-4' src="/doc.svg" />
                                    </div> : <div className='col-span-1'>
                                        <div className='ml-4 mt-3 h-[5vh] w-[3vw]  px-4 py-4 border bg-[#FAFAFA] flex justify-center items-center font-bold rounded-md'>A</div>
                                    </div>}
                                    {index % 2 !== 0 ? <div key={index} className=' col-span-11 mt-[3vh] mb-[3vh] md:-ml-8 ml-8 mr-6 text-gray-500 text-sm'>
                                        <Typewriter text={item} delay={10} infinite />
                                        {/* <div ref={ref} lassName='h-4 border'></div> */}
                                    </div> : <div key={index} className='col-span-10 mt-[3vh] mb-[3vh] md:-ml-8 ml-8 mr-6 text-gray-500 text-sm'>
                                        {item}
                                    </div>}
                                    {index % 2 === 0 ? <div key={index} className='col-span-1'>
                                        <img className='ml-14 mt-6 cursor-pointer hover:scale-110 hover:transition duration-200' src="/share.svg" />
                                    </div> : null}
                                </div>
                            </div>)
                        })}
                        <div className='h-4' ref={ref}>
                        </div>
                    </div>}
                {typing === true && send === true ? <div className="chat-bubble">
                    <div className="typing">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div> : null}
                {send === false ? <div className='md:visible invisible'>
                    <div className='fixed bottom-32 ml-4 text-xs'>
                        <div style={{ width: '85.5vw' }} className='flex gap-4' >
                            <div onClick={() => { callChatGpt("What are the recommended strategies and techniques for effectively mitigating scaffold build-up on the refractory lining of a blast furnace?"); setSend(true) }} className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                                What are the recommended strategies and techniques for effectively mitigating scaffold build-up on the refractory lining of a blast furnace?
                            </div>
                            <div onClick={() => { callChatGpt("Ask me to generate test plans for the manufacturing of automobile axels including test cases, and acceptance criteria."); setSend(true) }} className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                                Ask me to generate test plans for the manufacturing of automobile axels including test cases, and acceptance criteria.
                            </div>
                        </div>
                    </div>
                </div> : null}
                <div className='fixed md:bottom-8 bottom-20'>
                    <div style={{ width: '88.5vw' }} className='rounded-md border border-[#3A74CA] h-16 bg-white w-full px-5 py-2 flex gap-2 items-center'>
                        <input value={text} onKeyDown={handleKeyDown} onChange={(e) => setText(e.target.value)} className='w-full px-2 py-2 select-none' placeholder='Send a message' />
                        <div className='cursor-pointer' onClick={() => callChatGpt(text)}>
                            <img src="/send.svg" />
                        </div>
                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='pt-1 text-[10px] ml-2 text-gray-500'>Note : It is important to note that while the bot tries to provide accurate information, it can sometimes make errors. So always double-check the important facts independently.</p>
                        <div className='flex items-center gap-4 text-xs mt-1 mr-5'>
                            <p className={credits <= 5 ? 'font-bold text-[#DC362E]' : 'font-bold text-black'}>${credits} Credit Remaining</p>
                            <div className='text-[#124CA2] font-bold cursor-pointer'>Add more</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AiAdvisor;
