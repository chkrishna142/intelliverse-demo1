import React, { useState, useMemo, useEffect } from 'react';


const AskAnExpert = () => {

    const [submitted, setSubmitted] = useState(false)
    

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
                            <p className='px-10 font-light'>Your question has been successfully submitted to our team of manufacturing experts. Please allow up to 24 hours for one of our experts to review and respond to your query. Keep an eye out for the response in your notification. Meanwhile, you can ask the query to our Al advisor <span className='font-bold text-[#034C85] cursor-pointer'>here.</span></p>
                        </div>
                        <div className='mt-5 w-full'>
                            <p className='px-10 font-light'>Here's a summary of the information you provided:</p>
                        </div>
                        <div className='mt-5 w-full'>
                            <p className='px-10 font-light text-[#034C85]'>Question:</p>
                        </div>
                        <div className='ml-10 mr-10'>
                            <div className='mt-2 w-full border h-40 rounded-md '>
                                <p className='text-gray-400 px-2 py-2'>[User's submitted question text]</p>
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
                                        <p className='cursor-pointer text-sm md:ml-0 ml-3'>Read More</p>
                                        <input className='mr-5' type='checkbox' />
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
                                        <p className='cursor-pointer text-sm md:ml-0 ml-3'>Read More</p>
                                        <input className='mr-5' type='checkbox' />
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
                                        <p className='cursor-pointer text-sm md:ml-0 ml-3'>Read More</p>
                                        <input className='mr-5' type='checkbox' />
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
                                        <p className='cursor-pointer text-sm md:ml-0 ml-3'>Read More</p>
                                        <input className='mr-5' type='checkbox' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full font-light mt-6'>
                            Please provide a detailed description of your question or issue. Include relevant background information, any steps you've already taken to address the problem, and any specific challenges you're facing. If your question involves measurements, specifications or technical details please include them in your description This will help our experts provide you a more accurate response. Feel free to attach an relevant files images or diagrams that can provide additional context to your question.
                        </div>
                        <div className='w-full mt-4'>
                            <textarea placeholder='Type your query here...' className='w-full h-20 border rounded-md px-2 py-2' />
                        </div>
                        <div className='w-full flex justify-end mt-5'>
                            <button onClick={()=>setSubmitted(true)} className='text-white px-6 py-3 bg-[#084298] rounded-md'>Submit</button>
                        </div>
                    </div> : null}
            </div>
        </div>
    );
};

export default AskAnExpert;
