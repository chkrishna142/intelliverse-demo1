import React, { useState, useMemo, useEffect } from 'react';

const AiAdvisor = () => {

    const [send, setSend] = useState(false)

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
                    <div className='w-full'>
                        <div className='flex items-center gap-5 border rounded-md'>
                            <div className='h-14 w-full flex gap-4 items-center col-span-9'>
                                <div className='ml-4 h-10 w-10 px-4 py-4 border bg-[#FAFAFA] flex justify-center items-center font-bold rounded-md'>A</div>
                                <p className='text-gray-600 font-semibold text-sm'>What are the recommended strategies and techniques for effectively mitigating scaffold build-up on the refractory lining of a blast furnace?</p>

                            </div>
                            <img className='mr-4 cursor-pointer hover:scale-110 hover:transition duration-200' src="/share.svg" />
                        </div>

                        <div className='mt-[2vh] h-[58vh] overflow-y-scroll border rounded-md'>
                            <div className='grid grid-cols-12'>
                                <div className='col-span-1'>
                                    <img className='h-[10vh] w-[3vw] ml-4' src="/doc.svg" />
                                </div>
                                <div className='col-span-11 mt-[3vh] mb-[3vh] -ml-8 mr-6 text-gray-500 text-sm'>
                                    <p>Mitigating scaffold build-up on the refractory lining of a blast furnace is crucial for maintaining efficient and safe operations. Scaffold build-up can lead to reduced furnace performance, increased energy consumption, and potential safety hazards. Here are some recommended strategies and techniques to effectively mitigate scaffold build-up:</p>
                                    <h1 className='font-bold mt-3'>1. Raw Material Selection and Preparation:</h1>
                                    <ol>
                                        <li> Opt for high-quality raw materials that have low propensity for creating scaffolds. Contaminants and impurities in raw materials can contribute to scaffold formation.</li>
                                        <li> Ensure proper sizing and blending of raw materials to prevent agglomeration and uneven distribution, which can lead to scaffold formation.</li>
                                    </ol>
                                    <h1 className='font-bold mt-3'>2. Optimise Charging Practises:</h1>
                                    Properly distribute burden materials evenly across the furnace to avoid concentrating materials in certain areas and causing build-up.
                                    Implement consistent and controlled charging rates to minimize disturbances that can contribute to scaffold formation.

                                    <h1 className='font-bold mt-3'>3.Use of Anti-Scaffold Additives:</h1>
                                    Some additives can be introduced to the furnace charge to help prevent scaffold formation. These may include fluxes or other materials that promote slag formation and reduce sticking of materials to the lining.

                                    <h1 className='font-bold mt-3'>4.Monitoring and Control:</h1>
                                    Utilize advanced process monitoring systems to continuously track the condition of the lining and the formation of scaffolds.
                                    Implement automated control systems that adjust operational parameters in real-time to minimize scaffold build-up.
                                    <h1 className='font-bold mt-3'>5.Injection of Oxygen or Steam:</h1>
                                    Controlled injection of oxygen or steam at specific locations in the furnace can help break down scaffold formations and prevent their accumulation.
                                    <h1 className='font-bold mt-3'>6.Regular Maintenance and Cleaning:</h1>
                                    Plan regular maintenance shutdowns to physically remove accumulated scaffold material from the lining. This can involve mechanical methods, water jetting, or pneumatic methods.
                                    Avoid allowing scaffold build-up to become excessive, as it becomes more difficult to remove.
                                    <h1 className='font-bold mt-3'>7.Lining Design and Material Selection:</h1>
                                    Choose refractory materials that have good resistance to scaffold formation and sticking of materials.
                                    Optimize the lining design to reduce dead zones where materials can accumulate and form scaffolds.
                                    <h1 className='font-bold mt-3'>8.Hot Repair Techniques:</h1>
                                    Utilize hot repair techniques that allow maintenance and cleaning of the lining without having to shut down the entire furnace. This can help prevent scaffold build-up from reaching critical levels.
                                    <h1 className='font-bold mt-3'>9.Research and Innovation:</h1>
                                    Stay updated with the latest research and technological advancements in blast furnace operation and refractory materials to implement innovative solutions for scaffold mitigation.
                                </div>
                            </div>
                        </div>

                    </div>}
                {send === false ? <div>
                    <div className='fixed bottom-48 ml-4 text-xs'>
                        <div onClick={() => setSend(true)} style={{ width: '85.5vw' }} className='flex gap-4' >
                            <div className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                                What are the recommended strategies and techniques for effectively mitigating scaffold build-up on the refractory lining of a blast furnace?
                            </div>
                            <div onClick={() => setSend(true)} className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                                Ask me to generate test plans for the manufacturing of automobile axels including test cases, and acceptance criteria.

                            </div>
                        </div>
                    </div>
                    <div className='fixed bottom-32 ml-4 text-xs'>
                        <div style={{ width: '85.5vw' }} className='flex gap-4' >
                            <div onClick={() => setSend(true)} className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                                What are the recommended strategies and techniques for effectively mitigating scaffold build-up on the refractory lining of a blast furnace?
                            </div>
                            <div onClick={() => setSend(true)} className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                                Ask me to generate test plans for the manufacturing of automobile axels including test cases, and acceptance criteria.
                            </div>
                        </div>
                    </div>
                </div> : null}
                <div className='fixed bottom-8'>
                    <div style={{ width: '88.5vw' }} className='rounded-md border border-[#3A74CA] h-16 bg-white w-full px-5 py-2 flex gap-2 items-center'>
                        <input className='w-full px-2 py-2 select-none' placeholder='Send a message' />
                        <div>
                            <img src="/send.svg" />
                        </div>
                    </div>
                    <p className='pt-1 text-[10px] ml-2 text-gray-500'>Note : It is important to note that while the bot tries to provide accurate information, it can sometimes make errors. So always double-check the important facts independently.</p>
                </div>
            </div>
        </div>
    );
};

export default AiAdvisor;
