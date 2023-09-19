import React, { useState, useMemo, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ExpertReadMore from './ExpertReadMore';
import NavContext from '../NavContext';
import { baseURL } from '../..';


const AskAnExpert = () => {

    const { auth } = useContext(NavContext)

    const [submitted, setSubmitted] = useState(false)
    const [selected, setSelected] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [expert, setExpert] = useState(0)

    const [expertDetails, setExpertDetails] = useState([])
    const [question, setQuestion] = useState("")

    const [val1, setVal1] = useState(false)
    const [val2, setVal2] = useState(false)
    const [val3, setVal3] = useState(false)
    const [val4, setVal4] = useState(false)

    const getData = async () => {
        const data = await fetch(baseURL + 'experts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": auth
            },
        })
        const res = await data.json()
        setExpertDetails(res)
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (val1 === true || val2 === true || val3 === true || val4 === true) {
            setSelected(true)
        } else if (val1 === false || val2 === false || val3 === false || val4 === false) {
            setSelected(false)
        }
    }, [val1, val2, val3, val4])

    return (
        <div className='mt-6'>
            <div className='w-full border shadow-md bg-white rounded-md mb-5 '>
                <p className='mt-6 ml-5 text-black text-xl font-semibold'>Ask An Expert</p>
                {submitted === false ? <div>
                    <p className='mt-3 ml-5 font-light'>Have your most pressing questions answered by world renown experts.</p>
                    <p className='font-semibold mt-5 ml-5 text-sm'>Choose An Expert</p>
                </div> :
                    <div>
                        <div className='w-full flex justify-center mt-10'>
                            <img src="/query.svg" />
                        </div>
                        <div className='w-full flex justify-center'>
                            <p className='font-semibold text-2xl mt-4'>Thank You for Your Query!</p>
                        </div>
                        <div className='mt-5 w-full'>
                            <p className='px-10 font-light'>Your question has been successfully submitted to our team of manufacturing experts. Please allow up to 24 hours for one of our experts to review and respond to your query. Keep an eye out for the response in your notification. Meanwhile, you can ask the query to our Al advisor <Link to="/community/advisor"><span className='font-bold text-[#034C85] cursor-pointer'>here.</span></Link></p>
                        </div>
                        <div className='mt-5 w-full'>
                            <p className='px-10 font-light'>Here's a summary of the information you provided:</p>
                        </div>
                        <div className='mt-5 w-full'>
                            <p className='px-10 font-light text-[#034C85]'>Question:</p>
                        </div>
                        <div className='ml-10 mr-10'>
                            <div className='mt-2 w-full rounded-md '>
                                <p className='text-gray-600 px-2 py-2'>{question}</p>
                            </div>
                        </div>
                        <div className='mt-5 w-full mb-4'>
                            <p className='px-10 font-light'>Thank you for using our <span className='font-bold'>"Ask an Expert"</span> module. We're here to help you optimize efficiency and reduce waste in your manufacturing processes.</p>
                        </div>
                    </div>}
                {submitted === false ?
                    <div className='mx-5 mb-[5vh]'>
                        <div className='w-full grid md:grid-cols-2 flex items-center gap-6 mt-2'>
                            <div className='border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3'>
                                <div className='col-span-1 flex items-center w-full justify-center'>
                                    <img className='border rounded-md shadow-xl md:ml-0 ml-2 md:mt-0 mt-2' src="/advisor1.png" />
                                </div>
                                <div className='col-span-2 md:ml-0 mr-0 '>
                                    <p className='font-semibold text-lg mt-3 md:ml-0 ml-3'>Florian Budde</p>
                                    <p className='w-full mt-2 md:ml-0 ml-3 text-sm text-gray-700'>Senior Partner Emeritus, McKinsey & Company</p>
                                    <p className='w-full mt-2 md:ml-0 ml-3 text-sm text-gray-700 w-5/6 mb-7'>Speciality: Chemistry, Data, Al, Technology</p>
                                    <div className='w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between'>
                                        <p onClick={() => { setIsOpen(true); setExpert(0) }} className='cursor-pointer text-sm md:ml-0 ml-3'>Read More</p>
                                        <input name="firstchoice" value={val1} onChange={() => setVal1(!val1)} className='mr-5' type='radio' />
                                    </div>
                                </div>
                            </div>
                            <div className='border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3'>
                                <div className='col-span-1 flex items-center w-full justify-center'>
                                    <img className='border rounded-md shadow-xl md:ml-0 ml-2 md:mt-0 mt-2' src="/advisor2.png" />
                                </div>
                                <div className='col-span-2 md:ml-0 mr-0 '>
                                    <p className='font-semibold text-lg mt-3 md:ml-0 ml-3'>Shripad Nadkarni</p>
                                    <p className='w-full mt-2 text-sm text-gray-700 md:ml-0 ml-3'>Ex-VP Johnson & Johnson</p>
                                    <p className='w-full mt-2 text-sm text-gray-700 w-5/6 mb-7 md:ml-0 ml-3'>Speciality: Automobile, Food & Beverage, Apparel</p>
                                    <div className='w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between'>
                                        <p onClick={() => { setIsOpen(true); setExpert(1) }} className='cursor-pointer text-sm md:ml-0 ml-3'>Read More</p>
                                        <input name="firstchoice" value={val2} onChange={() => setVal2(!val2)} className='mr-5' type='radio' />
                                    </div>
                                </div>
                            </div>
                            <div className='border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3'>
                                <div className='col-span-1 flex items-center w-full justify-center'>
                                    <img className='border rounded-md shadow-xl md:mt-0 mt-2 md:ml-0 ml-2' src="/advisor3.png" />
                                </div>
                                <div className='col-span-2 md:ml-0 mr-0 '>
                                    <p className='font-semibold text-lg mt-3 md:ml-0 ml-3'>Luc Bonte</p>
                                    <p className='w-full text-sm mt-2 text-gray-700 md:ml-0 ml-3'>Ex-Country President, Arcelor Belgium</p>
                                    <p className='w-full text-sm mt-2 text-gray-700 w-5/6 md:ml-0 ml-3'>Speciality: Maintenance methodology, Ironmaking & Steel, Cape & Opex modeling</p>
                                    <div className='w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between'>
                                        <p onClick={() => { setIsOpen(true); setExpert(2) }} className='cursor-pointer text-sm md:ml-0 ml-3'>Read More</p>
                                        <input name="firstchoice" value={val3} onChange={() => setVal3(!val3)} className='mr-5' type='radio' />
                                    </div>
                                </div>
                            </div>
                            <div className='border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3'>
                                <div className='col-span-1 flex items-center w-full justify-center'>
                                    <img className='border rounded-md shadow-xl md:ml-0 ml-2 md:mt-0 mt-2' src="/advisor4.png" />
                                </div>
                                <div className='col-span-2 md:ml-0 mr-0 '>
                                    <p className='font-semibold text-lg mt-3 md:ml-0 ml-3'>Sujesh Vasudevan</p>
                                    <p className='w-full mt-2 text-sm text-gray-700 md:ml-0 ml-3'>Ex-President Glen Pharma - India, ME and Africa</p>
                                    <p className='w-full mt-2 text-sm text-gray-700 w-5/6 mb-7 md:ml-0 ml-3'>Speciality: Pharma, Lifescience</p>
                                    <div className='w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between'>
                                        <p onClick={() => { setIsOpen(true); setExpert(3) }} className='cursor-pointer text-sm md:ml-0 ml-3'>Read More</p>
                                        <input name="firstchoice" value={val4} onChange={() => setVal4(!val4)} className='mr-5' type='radio' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selected ? <div>
                            <div className='w-full font-light mt-6'>
                                Please provide a detailed description of your question or issue. Include relevant background information, any steps you've already taken to address the problem, and any specific challenges you're facing. If your question involves measurements, specifications, or technical details please include them in your description. This will help our experts provide you with a more accurate response. Feel free to attach relevant files, images or diagrams that can provide additional context to your question.
                            </div>
                            <div className='w-full mt-4'>
                                <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder='Type your query here...' className='w-full h-20 border rounded-md px-2 py-2' />
                            </div>
                            <div className='w-full flex justify-end mt-5'>
                                <button onClick={() => setSubmitted(true)} className='text-white px-6 py-3 bg-[#084298] rounded-md'>Submit</button>
                            </div>
                        </div> : null}
                    </div> : null}
            </div>
            <ExpertReadMore isOpen={isOpen} onClose={() => setIsOpen(false)} expert={expert} />
        </div>
    );
};

export default AskAnExpert;
