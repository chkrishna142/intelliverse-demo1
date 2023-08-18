import React, { useState, useMemo, useEffect } from 'react';
import CombRealCard from './CombRealCard';
import { Dropdown } from 'rsuite';
import Pagination from '../Pagination/Pagination';
import axios from 'axios';
import './CombReal.css';
import { Link } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { baseURL } from '../../index';
import { useSelector } from 'react-redux';
import { get_auth_status } from '../../redux/Auth/auth.selectors';

const IntelliVerse = () => {

    const [alert, setAlert] = useState(true)

    return (
        <div className='h-screen'>
            <div className='ml-36 mr-10'>
                {alert ? <div className='w-full h-10 bg-red-100 rounded-md flex justify-between items-center mt-5'>
                    <div className='w-full text-[#DC362E] flex justify-center'>JSPL Steel Subscription expires on Aug 12, 2023. Renew now for uninterrupted service.</div>
                    <div className='mr-2'><img onClick={() => setAlert(false)} className='cursor-pointer' src="/cross.svg" /></div>
                </div> : null}
            </div>
            <div className='ml-36 mr-10'>
                <div className='mt-7'>
                    <img src="/vision.svg" />
                </div>
                <div className=' w-full h-full '>
                    {/* <div className='w-full flex mt-10'>
        <div className='flex justify-center w-full'><img src="/vision.svg" /></div>
        <div className='flex justify-center w-full'><img src="/optimus.svg" /></div>
      </div> */}
                    <div className='mt-4 flex flex-wrap gap-10 items-center'>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='flex justify-end -mt-5'><div className="h-10 w-10 rounded-full bg-orange-500 flex justify-center items-center text-xl text-white">2</div></div>
                                <div className='w-full flex justify-center '><img className='-mt-1 h-36 w-36 p-3' src="/sizing1.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-6 py-2 rounded-md font-bold '>5 Deployements</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg'>Sizing Tool</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/counting.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-6 py-2 rounded-md font-bold '>2 Deployements</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg'>Tracking Tool</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/ocr.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-6 py-2 rounded-md font-bold '>3 Deployements</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg text-center'>Automate Data Digitization </p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 hover:transition duration-200 cursor-pointer bg-gray-200 '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/wf.svg" /></div>
                                <div className='w-full flex justify-center text-white mt-0 text-xs'><div className='bg-[#79767D] px-6 py-2 rounded-md font-bold '>Not Subscribed</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg text-center'>Workforce Monitoring</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 hover:transition duration-200 cursor-pointer bg-gray-200 '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/quality.svg" /></div>
                                <div className='w-full flex justify-center text-white mt-0 text-xs'><div className='bg-[#79767D] px-6 py-2 rounded-md font-bold '>Not Subscribed</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg text-center'>Quality Inspection</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 hover:transition duration-200 cursor-pointer bg-gray-200 '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/process.svg" /></div>
                                <div className='w-full flex justify-center text-white mt-0 text-xs'><div className='bg-[#79767D] px-6 py-2 rounded-md font-bold '>Not Subscribed</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44 '><p className='font-bold text-[#024D87] text-xl text-center'>Process Monitoring</p></div>
                        </div>
                    </div>
                    <div className='mt-10 flex gap-12 items-center'>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-44 w-36 p-3' src="/add.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10'><p className='font-bold text-[#024D87] text-xl'>Add Use Case</p></div>
                        </div>

                    </div>
                </div>
                <div className='mt-3 mb-3'>
                    <div className='h-1 w-full bg-gray-200 rounded-md'></div>
                </div>
                <div className='mt-7'>
                    <img src="/optimus.svg" />
                </div>

                <div className='w-full text-lg font-semibold mt-5 flex justify-center bg-[#CCEAFF] rounded-md shadow-md text-[#024D87]'>Scheduling</div>
                {/* <div className='w-full text-lg font-bold'>Process Optimization</div> */}
                <div className=' w-full h-full mt-8 '>

                    <div className='mt-4 flex flex-wrap gap-10 items-center'>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='flex justify-end -mt-5'><div className="h-10 w-10 rounded-full bg-orange-500 flex justify-center items-center text-xl text-white">2</div></div>
                                <div className='w-full flex justify-center '><img className='-mt-1 h-36 w-36 p-3' src="/production.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-6 py-2 rounded-md font-bold '>5 Deployements</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg'>Production Planning</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/qc.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-6 py-2 rounded-md font-bold '>2 Deployements</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg'>QC Scheduling</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer'>
                                <div className='w-full flex justify-center  '><img className='mt-4 h-36 w-36 p-3' src="/man.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-6 py-2 rounded-md font-bold '>3 Deployements</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg text-center'>Manpower Scheduling  </p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-44 w-36 p-3' src="/add.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-xl'>Add Use Case</p></div>
                        </div>
                        
                    </div>
                    <div className='w-full text-lg font-semibold mt-10 flex justify-center bg-[#CCEAFF] rounded-md shadow-md text-[#024D87]'>Process Optimisation</div>
                    <div className='mt-8 flex gap-10 flex-wrap items-center'>
                    <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 hover:transition duration-200 cursor-pointer bg-gray-200 '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/furnace.svg" /></div>
                                <div className='w-full flex justify-center text-white mt-0 text-xs'><div className='bg-[#79767D] px-6 py-2 rounded-md font-bold '>Not Subscribed</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg text-center'>Blast Furnace</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 hover:transition duration-200 cursor-pointer bg-gray-200 '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/kiln.svg" /></div>
                                <div className='w-full flex justify-center text-white mt-0 text-xs'><div className='bg-[#79767D] px-6 py-2 rounded-md font-bold '>Not Subscribed</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg text-center'>Kiln</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 hover:transition duration-200 cursor-pointer bg-gray-200 '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/potline.svg" /></div>
                                <div className='w-full flex justify-center text-white mt-0 text-xs'><div className='bg-[#79767D] px-6 py-2 rounded-md font-bold '>Not Subscribed</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44 '><p className='font-bold text-[#024D87] text-xl text-center'>Potline</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-44 w-36 p-3' src="/add.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-xl'>Add Use Case</p></div>
                        </div>

                    </div>
                    
                </div>
                <div className='mt-3 mb-3'>
                    <div className='h-1 w-full bg-gray-200 rounded-md '></div>
                </div>
            </div>
        </div>
    );
};

export default IntelliVerse;
