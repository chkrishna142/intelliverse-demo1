import React, { useState } from 'react';
import { Link } from "react-router-dom";


const Home = ({ state }) => {

    const [alert, setAlert] = useState(false)

    return (
        <div className='h-screen'>
            <div>
                {alert ? <div className='w-full h-10 bg-red-100 rounded-md flex justify-between items-center mt-5'>
                    <div className='w-full text-[#DC362E] flex justify-center text-sm'>JSPL Steel Subscription expires on Aug 12, 2023. Renew now for uninterrupted service.</div>
                    <div className='mr-2'><img onClick={() => setAlert(false)} className='cursor-pointer' src="/cross.svg" /></div>
                </div> : null}
            </div>
            <div>
                {state === "vision" || state === "home" ? <div className='border shadow-md mt-5 px-4 py-4 pl-5 rounded-md'>
                    <div className='mt-2 mr-3 ml-3 flex justify-between  '>
                        <img className='h-6' src="/vision.svg" />
                        <div className='flex items-center gap-3 font-bold  text-white bg-[#3182CE] mt-3 px-2 py-2  border rounded-md text-xs cursor-pointer hover:bg-[#024D87] hover:transition duration-200'><div className='ml-2 '>+</div><div className='mr-3'>Add Use Case</div></div>
                    </div>
                    <div className=' w-full h-full ml-3 mb-5'>
                        <div className='mt-5 flex flex-wrap gap-8 text-sm items-center'>
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
                            <Link to="/bookdemo"><div>
                                <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 bg-gray-200 hover:transition duration-200 cursor-pointer '>
                                    <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/process.svg" /></div>
                                    <div className='w-full flex justify-center text-white text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                </div>
                                <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Process Monitoring</p></div>
                            </div>
                            </Link>
                            <Link to="/bookdemo"><div>
                                <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 bg-gray-200 hover:transition duration-200 cursor-pointer '>
                                    <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/quality.svg" /></div>
                                    <div className='w-full flex justify-center text-white text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                </div>
                                <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Quality/Tracking Inspection</p></div>
                            </div>
                            </Link>
                            <Link to="/bookdemo"><div>
                                <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 bg-gray-200 hover:transition duration-200 cursor-pointer '>
                                    <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/wf.svg" /></div>
                                    <div className='w-full flex justify-center text-white text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                </div>
                                <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Workforce Monitoring</p></div>
                            </div>
                            </Link>
                            <div>
                                <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                    <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/ocr.svg" /></div>
                                    <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>2 Deployments</div></div>
                                </div>
                                <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Automate Data Digitization </p></div>
                            </div>
                            {/* <div>
                            <div className='w-32 h-36 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-24 w-24 p-3' src="/ocr.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-1 py-1 rounded-md font-bold '>3 Deployments</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Automate Data Digitization </p></div>
                        </div> */}

                            {/* <div>
                            <div className='w-32 h-36 rounded-xl shadow-md border border-gray-200 hover:bg-gray-100 hover:transition duration-200 cursor-pointer bg-gray-200 '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-24 w-24 p-3' src="/wf.svg" /></div>
                                <div className='w-full flex justify-center text-white mt-0 text-xs'><div className='bg-[#79767D] px-1 py-1 rounded-md font-bold '>Not Subscribed</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Workforce Monitoring</p></div>
                        </div> */}


                            {/* <div>
                            <div className='w-32 h-40 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/add.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10'><p className='font-bold text-[#024D87]'>Add Use Case</p></div>
                        </div> */}
                        </div>
                    </div>
                </div> : null}
                {/* <div className='mt-8 mb-8'>
                    <div style={{ height: '2px' }} className='w-full bg-gray-200 rounded-md'></div>
                </div> */}
                {state === "optimus" || state === "home" ?
                    <div className='border shadow-md mt-4 px-4 py-4 pb-10 pl-5 rounded-md text-sm'>
                        <div className='mt-0 mr-3 -ml-0 flex justify-between '>
                            <img className='h-8' src="/optimus.svg" />
                            <div className='flex items-center gap-3 font-bold text-white bg-[#3182CE] mt-3 px-2 py-2 pr-4 border rounded-md text-xs cursor-pointer hover:bg-[#024D87] hover:transition duration-200'><div className='ml-2 '>+</div><div className='mr-3'>Add Use Case</div></div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='mt-2 border-r'>
                                <div className='w-full flex justify-center text-gray-500 font-bold'>Scheduling</div>
                                <div className='mt-8 flex flex-wrap gap-8 mb-3 ml-3  items-center '>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            <div className='flex justify-end -mt-5'><div className="h-8 w-8 rounded-full bg-orange-500 flex justify-center items-center text-lg text-white">2</div></div>
                                            <div className='w-full flex justify-center '><img className='mt-1 h-20 w-20 p-3' src="/production.svg" /></div>
                                            <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>5 Deployments</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-center text-[#024D87]'>Production Planning</p></div>
                                    </div>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/qc.svg" /></div>
                                            <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>2 Deployments</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>QC Scheduling </p></div>
                                    </div>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            <div className='flex justify-end -mt-5'><div className="h-8 w-8 rounded-full bg-orange-500 flex justify-center items-center text-lg text-white">1</div></div>
                                            <div className='w-full flex justify-center '><img className='mt-1 h-20 w-20 p-3' src="/man.svg" /></div>
                                            <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>5 Deployments</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-center text-[#024D87]'>Manpower Scheduling</p></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='mt-2 flex flex-wrap gap-8 items-center ml-4'>
                                    <div className='w-full flex justify-center text-gray-500 font-bold'>Process Optimization</div>
                                    <Link to="/optimus/blastfurnace" style={{ textDecoration: 'none' }}>
                                        <div>
                                            <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer  '>
                                                <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/furnace.svg" /></div>
                                                <div className='w-full flex justify-center text-[#024D87]  text-xs'><div className='bg-[#CCEAFF] px-2 py-1 w-full font-bold text-xs'>2 Deployments</div></div>
                                            </div>
                                            <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Blast Furnace </p></div>
                                        </div>
                                    </Link>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer bg-gray-200  '>
                                            <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/kiln.svg" /></div>
                                            <div className='w-full flex justify-center text-white  text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Kiln </p></div>
                                    </div>
                                    <div>
                                        <div className='w-28 h-32 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer bg-gray-200 '>
                                            <div className='w-full flex justify-center '><img className='mt-4 h-20 w-20 p-3' src="/potline.svg" /></div>
                                            <div className='w-full flex justify-center text-white  text-xs'><div className='bg-[#79767D] px-2 py-1 w-full font-bold text-xs'>Not Subscribed</div></div>
                                        </div>
                                        <div className='mt-4 flex justify-center h-10 w-28'><p className='font-bold text-[#024D87] text-center'>Potline </p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null}
                {/* <div className='w-full text-lg font-semibold mt-5 flex justify-center bg-[#CCEAFF] rounded-md shadow-md text-[#024D87]'>Scheduling</div> */}
                {/* <div className='w-full text-lg font-bold'>Process Optimization</div> */}
                {/* <div className=' w-full h-full mt-8 '>
                    <div className='mt-4 flex flex-wrap gap-10 items-center'>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='flex justify-end -mt-5'><div className="h-10 w-10 rounded-full bg-orange-500 flex justify-center items-center text-xl text-white">2</div></div>
                                <div className='w-full flex justify-center '><img className='-mt-1 h-36 w-36 p-3' src="/production.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-6 py-2 rounded-md font-bold '>5 Deployments</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg'>Production Planning</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                <div className='w-full flex justify-center '><img className='mt-4 h-36 w-36 p-3' src="/qc.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-6 py-2 rounded-md font-bold '>2 Deployments</div></div>
                            </div>
                            <div className='mt-4 flex justify-center h-10 w-44'><p className='font-bold text-[#024D87] text-lg'>QC Scheduling</p></div>
                        </div>
                        <div>
                            <div className='w-44 h-52 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer'>
                                <div className='w-full flex justify-center  '><img className='mt-4 h-36 w-36 p-3' src="/man.svg" /></div>
                                <div className='w-full flex justify-center text-[#024D87] mt-0 text-xs'><div className='bg-[#CCEAFF] px-6 py-2 rounded-md font-bold '>3 Deployments</div></div>
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
                </div> */}
                {/* <div className='mt-3 mb-3'>
                    <div className='h-1 w-full bg-gray-200 rounded-md '></div>
                </div> */}
            </div>
        </div>
    );
};

export default Home;
