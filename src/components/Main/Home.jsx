import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import NewUseCaseModal from './NewUseCaseModal';
import { useWindowSize } from "@uidotdev/usehooks";
import { baseURL } from '../..';
import NavContext from '../NavContext';
import subscription from "../../util/subscription"

const Home = ({ state }) => {

    const [alert, setAlert] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const size = useWindowSize();
    const { auth } = useContext(NavContext)



    return (
        <div>
            <div>
                {alert ? <div className='w-full h-10 bg-red-100 rounded-md flex justify-between items-center mt-5'>
                    <div className='w-full text-[#DC362E] flex justify-center text-sm'>JSPL Steel Subscription expires on Aug 12, 2023. Renew now for uninterrupted service.</div>
                    <div className='mr-2'><img onClick={() => setAlert(false)} className='cursor-pointer' src="/cross.svg" /></div>
                </div> : null}
            </div>
            <div>
                {state === "vision" || state === "home" ? <div className='border shadow-md mt-6 px-4 py-4 pl-5 rounded-md bg-white '>
                    <div className='mt-2 mr-3 ml-3 flex justify-between'>
                        <img className='h-6 ' src="/vision.svg" />
                        <div onClick={() => setIsOpen(true)} className=' md:flex flex items-center gap-3 font-bold text-white bg-[#3182CE] md:mt-3 px-2 py-2 h-8 border rounded-md md:text-xs cursor-pointer hover:bg-[#024D87] hover:transition duration-200 text-[10px]  '><div className='ml-2 '>+</div><div className='mr-3 '>Add Use Case</div></div>
                    </div>
                    <div className=' w-full h-full mb-5'>
                        <div className='mt-10 md:mt-5 ml-0 md:ml-3 flex flex-wrap md:justify-start justify-center gap-8 text-sm items-center'>
                            <Link to="/vision/Sizing" style={{ textDecoration: 'none' }}>
                                <div>
                                    <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                        <div className='flex justify-end -mt-5'><div className="h-8 w-8 rounded-full bg-orange-500 flex justify-center items-center text-lg text-white">2</div></div>
                                        <div className='w-full flex justify-center '><img className='mt-1 h-20 w-20 p-3' src="/sizing1.svg" /></div>
                                        <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>5 Deployments</div></div>
                                    </div>
                                    <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87]'>Sizing Tool</p></div>
                                </div>
                            </Link>
                            <Link to="/vision/ProcessMonitoring"><div>
                                <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 bg-gray-200 hover:transition duration-200 cursor-pointer '>
                                    <div className='w-full flex justify-center '><img className='mt-4 h-20 w-24  p-2' src="/qty.svg" /></div>
                                    <div className='w-full flex justify-center text-white text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                </div>
                                <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Process Monitoring</p></div>
                            </div>
                            </Link>
                            <Link to="/bookdemo"><div>
                                <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 bg-gray-200 hover:transition duration-200 cursor-pointer '>
                                    <div className='w-full flex justify-center '><img className='mt-4 h-20 p-2' src="/pm.svg" /></div>
                                    <div className='w-full flex justify-center text-white text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                </div>
                                <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Quality Tracking/Monitoring</p></div>
                            </div>
                            </Link>
                            <Link to="/bookdemo"><div>
                                <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 bg-gray-200 hover:transition duration-200 cursor-pointer '>
                                    <div className='w-full flex justify-center '><img className='mt-4 h-20 w-24 p-2' src="/wm.svg" /></div>
                                    <div className='w-full flex justify-center text-white text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                </div>
                                <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Workforce Monitoring</p></div>
                            </div>
                            </Link>
                            <div>
                                <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                    <div className='w-full flex justify-center '><img className='mt-4 h-20 w-24 p-2' src="/automation.svg" /></div>
                                    <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>2 Deployments</div></div>
                                </div>
                                <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Automate Data Digitization </p></div>
                            </div>
                            <div className='invisible'>
                                <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                    <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/ocr.svg" /></div>
                                    <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>2 Deployments</div></div>
                                </div>
                                <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Automate Data Digitization </p></div>
                            </div>
                        </div>
                    </div>
                </div> : null}
                {state === "optimus" || state === "home" ?
                    <div className='border shadow-md px-4 py-4 md:pb-5 pl-5 rounded-md text-sm mt-6 bg-white'>
                        <div className='mt-0 mr-3 -ml-0 flex justify-between '>
                            <img className='md:h-8 h-6' src="/optimus.svg" />
                            <div onClick={() => setIsOpen(true)} className=' md:flex h-8 flex items-center gap-3 font-bold text-white bg-[#3182CE] md:mt-3 px-2 py-2  border rounded-md md:text-xs cursor-pointer hover:bg-[#024D87] hover:transition duration-200 text-[10px]  '><div className='ml-2 '>+</div><div className='mr-3 '>Add Use Case</div></div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 md:mt-0 mt-7'>
                            <div className='mt-2 border-r'>
                                <div className='w-full flex justify-start ml-3 text-gray-500 font-bold'>Scheduling</div>
                                <div className='mt-8 flex flex-wrap gap-8 mb-3 md:ml-3 ml-0 md:justify-start justify-center  items-center '>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            <div className='flex justify-end -mt-5'><div className="h-8 w-8 rounded-full bg-orange-500 flex justify-center items-center text-lg text-white">2</div></div>
                                            <div className='w-full flex justify-center '><img className='mt-1 h-20 w-24 p-2' src="/pp.svg" /></div>
                                            <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>5 Deployments</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-center text-[#024D87]'>Production Planning</p></div>
                                    </div>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            <div className='w-full flex justify-center '><img className='mt-4 h-20 w-24 p-2' src="/sch.svg" /></div>
                                            <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>2 Deployments</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>QC Scheduling </p></div>
                                    </div>
                                    <Link to="/Optimus/Manpower" style={{ textDecoration: 'none' }}>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            <div className='flex justify-end -mt-5'><div className="h-8 w-8 rounded-full bg-orange-500 flex justify-center items-center text-lg text-white">1</div></div>
                                            <div className='w-full flex justify-center '><img className='mt-1 h-20 w-24 p-2' src="/mp.svg" /></div>
                                            <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>5 Deployments</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-center text-[#024D87]'>Manpower Scheduling</p></div>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <div className='mt-2 flex flex-wrap gap-8 items-center ml-4'>
                                    <div className='w-full flex justify-start text-gray-500 font-bold'>Process Optimization</div>
                                    <Link to="/optimus/blastfurnace" style={{ textDecoration: 'none' }}>
                                        <div>
                                            <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer  '>
                                                <div className='w-full flex justify-center '><img className='mt-4 h-20 w-24 p-0' src="/bf.svg" /></div>
                                                <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>2 Deployments</div></div>
                                            </div>
                                            <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Blast Furnace </p></div>
                                        </div>
                                    </Link>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer bg-gray-200  '>
                                            <div className='w-full flex justify-center '><img className='mt-4 h-20 w-24 p-1' src="/cement_kiln.svg" /></div>
                                            <div className='w-full flex justify-center text-white  text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Kiln </p></div>
                                    </div>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer bg-gray-200 '>
                                            <div className='w-full flex justify-center '><img className='mt-4 h-20 w-24 p-2' src="/pot.svg" /></div>
                                            <div className='w-full flex justify-center text-white  text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Potline </p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
                {state === "community" || state === "home" ?
                    <div className='border shadow-md mt-4 px-4 py-4 pb-20 md:pb-5 pl-5 rounded-md text-sm mt-6 bg-white'>
                        <div className='mt-0 mr-3 -ml-0 flex justify-between '>
                            <img className='lg:h-14 h-10 ml-2' src="/community.svg" />
                            <div onClick={() => setIsOpen(true)} className=' md:flex md:mt-0 mt-3 flex h-8 items-center gap-3 font-bold text-white bg-[#3182CE] md:mt-3 px-2 py-2  border rounded-md md:text-xs cursor-pointer hover:bg-[#024D87] hover:transition duration-200 text-[10px]  '><div className='ml-2 '>+</div><div className='mr-3 '>Add Use Case</div></div>
                        </div>
                        <div>
                            <div className='md:mt-0 mt-10'>
                                <div className='mt-4 flex flex-wrap gap-8 mb-3 md:ml-3 ml-0 md:justify-start justify-center items-center '>
                                    <Link to="/community/askanexpert">
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            {/* <div className='flex justify-end -mt-5'><div className="h-8 w-8 rounded-full bg-orange-500 flex justify-center items-center text-lg text-white">2</div></div> */}
                                            <div className='w-full flex justify-center items-center '><img className='mt-0 ml-2 object-fit ' src="/askexpert.svg" /></div>
                                            {/* <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>5 Deployments</div></div> */}
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-center text-[#024D87]'>Ask An Expert</p></div>
                                    </Link>
                                    <Link to="/community/advisor">
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            <div className='w-full flex justify-center items-center '><img className='-mt-2 h-32 w-full -ml-7' src="/advisor.svg" /></div>
                                            {/* <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>2 Deployments</div></div> */}
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>AI Advisor </p></div>
                                    </Link>
                                    <a href="https://community.ripikintelliverse.com/" >
                                        <div>
                                            <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                                {/* <div className='flex justify-end -mt-5'><div className="h-8 w-8 rounded-full bg-orange-500 flex justify-center items-center text-lg text-white">1</div></div> */}
                                                <div className='w-full flex justify-center items-center '><img className='object-fit' src="/people.svg" /></div>
                                                {/* <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>5 Deployments</div></div> */}
                                            </div>
                                            <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-center text-[#024D87]'>Community</p></div>
                                        </div>
                                    </a>
                                    <div className='invisible'>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            {/* <div className='flex justify-end -mt-5'><div className="h-8 w-8 rounded-full bg-orange-500 flex justify-center items-center text-lg text-white">1</div></div> */}
                                            <div className='w-full flex justify-center items-center '><img className='object-fit' src="/people.svg" /></div>
                                            {/* <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>5 Deployments</div></div> */}
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-center text-[#024D87]'>Community</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
            </div>
            {size.width > 640 ? <NewUseCaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} size={"2xl"} /> : <NewUseCaseModal isOpen={isOpen} onClose={() => setIsOpen(false)} size={"xs"} />}
        </div>
    );
};

export default Home;
