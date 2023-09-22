import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CreditBuy = () => {

    const selected = "w-1/2 py-4 border-b-2 border-[#084298] text-[#084298] font-bold md:text-base text-xs"
    const non_selected = "w-1/2 py-4 border-b border-gray-600 text-gray-600 md:text-base text-xs"


    const [selector, setSelector] = useState(1)
    const [submitted, setSubmitted] = useState(false)

    return (
        <div className='w-full flex justify-center items-center'>
            <div className=' border border-[#3A74CA] rounded-md bg-white shadow-md w-[90%] mt-[5vh]'>
                {submitted === false ? <div className='mb-16'>
                    <div className='flex justify-center '>
                        <p className='text-[#024D87] text-xl font-semibold mt-10'>Intellidoc Credit Portal</p>
                    </div>
                    <div className='flex justify-center mt-10 '>
                        <div className='md:w-[60%] w-[92%]'>
                            <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Username</div>
                            <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                <input className="w-full focus:outline-none pl-2" placeholder="Username" />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <div className='md:w-[60%] w-[92%]'>
                            <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Available Credit</div>
                            <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                <div className="w-full focus:outline-none pl-2" >$0</div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center mt-10'>
                        <div className='md:w-[60%] w-[92%]'>
                            <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Add Credits</div>
                            <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                <select className="w-full focus:outline-none pl-2 font-semibold">
                                    <option className='font-bold'>$5 (~2.5 Mn input words or 1.9 Mn output Words)</option>
                                    <option className='font-bold'>$20 (~10 Mn input words or 7.5 Mn output Words)</option>
                                    <option className='font-bold'>$$50 (~25 Mn input words or 19 Mn output Words)</option>
                                    <option className='font-bold'>$100 (~50 Mn input words or 38 Mn output Words)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex items-center justify-between md:w-[60%] w-[92%]'>
                            <button onClick={() => setSelector(1)} className={selector === 1 ? selected : non_selected}>Self</button>
                            <button onClick={() => setSelector(2)} className={selector === 2 ? selected : non_selected}>Request Administrator</button>
                        </div>
                    </div>
                    {selector === 2 ? <div className='flex justify-center mt-2'>
                        <div className='text-black mt-4 md:text-base text-xs'>
                            Send a request to your enterprise Intelliverse admin to purchase credits
                        </div>
                    </div> : null}
                    {selector === 1 ?
                        <div>
                            <div className='flex justify-center mt-7'>
                                <div className='grid grid-cols-4 md:w-[60%] w-[92%] gap-3'>
                                    <div className='w-full col-span-2'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Card Number</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="Enter your card number" />
                                        </div>
                                    </div>
                                    <div className='w-full col-span-1'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Expiry Date</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="Date" />
                                        </div>
                                    </div>
                                    <div className='w-full col-span-1'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">CVV</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="CVV" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center mt-4'>
                                <div className='md:w-[60%] w-[92%]'>
                                    <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Street Address</div>
                                    <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                        <input className="w-full focus:outline-none pl-2" placeholder="Enter your street address" />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center mt-4 '>
                                <div className='grid grid-cols-5 md:w-[60%] w-[92%] gap-3'>
                                    <div className='w-full col-span-2'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">City</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="City" />
                                        </div>
                                    </div>
                                    <div className='w-full col-span-2'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">State</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="State" />
                                        </div>
                                    </div>
                                    <div className='w-full col-span-1'>
                                        <div style={{ zIndex: '100px' }} className="text-[#084298] text-xs ml-2 absolute -mt-2 bg-white px-1 flex justify-center">Pincode</div>
                                        <div style={{ zIndex: '10px' }} className="px-2 py-2 w-full rounded-md border border-[#084298] h-14 flex items-center">
                                            <input className="w-full focus:outline-none pl-2" placeholder="Pincode" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                    <div className='flex justify-center mt-6'>
                        <button onClick={() => setSubmitted(true)} className='px-6 py-2 bg-[#084298] text-white rounded-md'>
                            Submit
                        </button>

                    </div>
                </div> : <div>
                    <div className='w-full flex justify-center mt-10'>
                        <img src="/query.svg" />
                    </div>
                    <div className='w-full flex justify-center'>
                        <p className='font-semibold text-2xl mt-4'>Thank you for the purchase!</p>
                    </div>

                    <div className='mt-5 w-full flex justify-center'>
                        <p className='px-10 font-light'>$5 has been added to your account!</p>
                    </div>
                    <div className='mt-10 w-full flex justify-center mb-40'>
                        <p className='px-10'>Return to <Link to="/community/advisor"><span className='text-blue-600 font-bold'>IntelliDoc</span></Link></p>
                    </div>

                </div>}
            </div>
        </div>
    )
}

export default CreditBuy