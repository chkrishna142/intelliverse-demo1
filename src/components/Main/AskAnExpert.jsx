import React, { useState, useMemo, useEffect } from 'react';


const AskAnExpert = () => {

    return (
        <div className=' mt-6'>
            <div className='h-max w-full border shadow-md bg-white rounded-md mb-5 '>
                <p className='mt-6 ml-5 text-black text-xl font-semibold'>Ask An Expert</p>
                <p className='mt-3 ml-5 font-light'>Have your most pressing questions answered by world renown experts.</p>
                <p className='font-semibold mt-5 ml-5 text-sm'>Choose An Expert</p>
                <div className='mx-5 mb-[5vh]'>
                    <div className='w-full grid md:grid-cols-2 flex items-center gap-6 mt-2'>
                        <div className='border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3'>
                            <div className='col-span-1 flex items-center w-full justify-center'>
                                <img className='border rounded-md shadow-xl' src="/advisor1.png" />
                            </div>
                            <div className='col-span-2 md:ml-0 mr-0 '>
                                <p className='font-semibold text-lg mt-3'>Florian Budde</p>
                                <p className='w-full mt-2 text-sm text-gray-700'>Senior Partner Emeritus, McKinsey & Company</p>
                                <p className='w-full mt-2 text-sm text-gray-700 w-5/6 mb-7'>Speciality: Chemistry, Data, Al, Technology</p>
                                <div className='w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between'>
                                    <p className='cursor-pointer text-sm'>Read More</p>
                                    <input className='mr-5' type='checkbox' />
                                </div>
                            </div>
                        </div>
                        <div className='border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3'>
                            <div className='col-span-1 flex items-center w-full justify-center'>
                                <img className='border rounded-md shadow-xl' src="/advisor2.png" />
                            </div>
                            <div className='col-span-2 md:ml-0 mr-0 '>
                                <p className='font-semibold text-lg mt-3'>Shripad Nadkarni</p>
                                <p className='w-full mt-2 text-sm text-gray-700'>Ex-VP Johnson & Johnson</p>
                                <p className='w-full mt-2 text-sm text-gray-700 w-5/6 mb-7'>Speciality: Automobile, Food & Beverage, Apparel</p>
                                <div className='w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between'>
                                    <p className='cursor-pointer text-sm'>Read More</p>
                                    <input className='mr-5' type='checkbox' />
                                </div>
                            </div>
                        </div>
                        <div className='border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3'>
                            <div className='col-span-1 flex items-center w-full justify-center'>
                                <img className='border rounded-md shadow-xl' src="/advisor3.png" />
                            </div>
                            <div className='col-span-2 md:ml-0 mr-0 '>
                                <p className='font-semibold text-lg mt-3'>Luc Bonte</p>
                                <p className='w-full text-sm mt-2 text-gray-700'>Ex-Country President, Arcelor Belgium</p>
                                <p className='w-full text-sm mt-2 text-gray-700 w-5/6'>Speciality: Maintenance methodology, Ironmaking & Steel, Cape & Opex modeling</p>
                                <div className='w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between'>
                                    <p className='cursor-pointer text-sm'>Read More</p>
                                    <input className='mr-5' type='checkbox' />
                                </div>
                            </div>
                        </div>
                        <div className='border-dashed rounded-md border-gray-700 border w-full h-max grid md:grid-cols-3'>
                            <div className='col-span-1 flex items-center w-full justify-center'>
                                <img className='border rounded-md shadow-xl' src="/advisor4.png" />
                            </div>
                            <div className='col-span-2 md:ml-0 mr-0 '>
                                <p className='font-semibold text-lg mt-3'>Sujesh Vasudevan</p>
                                <p className='w-full mt-2 text-sm text-gray-700'>Ex-President Glen Pharma - India, ME and Africa</p>
                                <p className='w-full mt-2 text-sm text-gray-700 w-5/6 mb-7'>Speciality: Pharma, Lifescience</p>
                                <div className='w-full mt-2 text-[#034D86] font-bold mb-5 flex justify-between'>
                                    <p className='cursor-pointer text-sm'>Read More</p>
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
                        <button className='text-white px-6 py-3 bg-[#084298] rounded-md'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskAnExpert;
