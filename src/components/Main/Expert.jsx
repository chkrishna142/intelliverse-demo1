import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExpertReadMore from './ExpertReadMore';


const Expert = () => {

    const [submitted, setSubmitted] = useState(false)
    const [selected, setSelected] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [onClose, setOnClose] = useState(false)
    const [expert, setExpert] = useState(0)

  

    return (
        <div className='mt-6'>
            <div className='w-full border shadow-md bg-white rounded-md mb-5 '>
                <p className='mt-6 ml-5 text-black text-xl font-semibold'>Ask An Expert</p>
                <div>
                    <p className='mt-5 ml-7 font-bold'>Hello [Expert's Name],</p>
                </div>
                <div className='mx-7'>
                    <div className='w-full font-light mt-2'>
                        You can see the user's question and reply using the text box below. Feel free to request additional information from the user if necessary, but aim to resolve the query in your initial
                        Remember to save your work by clicking 'Save' if you need to leave temporarily. Your response will be sent after you click 'Review Answer' and then 'Submit Answer.'

                        <p className='text-[#034C85] font-bold mt-3'>User’s Query</p>
                        <div>
                            <p className='mt-2 font-bold'>Dear [Expert's Name],</p>
                            <p className='w-full font-light mt-2'>I hope this email finds you well. I am writing to seek your expertise regarding a specific issue we've encountered in our steel plant's blast furnace operation. We are currently facing irregular temperature fluctuations. Despite our efforts, we have not been able to pinpoint the exact cause or find an effective solution. Given your extensive experience in [mention the expert's area of expertise, e.g., metallurgy, blast furnace operations], I believe your insights could be invaluable in helping us troubleshoot and resolve this issue.</p>
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

                    <div className='w-full mt-4'>
                        <textarea placeholder='Enter your reply here...' className='w-full h-20 border rounded-md px-2 py-2' />
                    </div>
                    <div className='w-full flex justify-start items-center gap-6 mt-5 mb-5'>
                        <button onClick={() => setSubmitted(true)} className='text-white px-6 py-3 bg-[#084298] rounded-md'>Save Answer</button>
                        <button onClick={() => setSubmitted(true)} className='text-white px-6 py-3 bg-[#084298] rounded-md'>Review Answer</button>
                    </div>
                </div>
            </div>
            <ExpertReadMore isOpen={isOpen} onClose={() => setIsOpen(false)} expert={expert} />
        </div>
    );
};

export default Expert;
