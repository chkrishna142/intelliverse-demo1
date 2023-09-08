import { useState } from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from '@mui/material/ClickAwayListener';

const AppNav = () => {

    const [bar, setBar] = useState(false)

    return (
        <>
            <ClickAwayListener onClickAway={()=>setBar(false)}><div><img onClick={() => setBar(!bar)} className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/bar.svg" />
                {bar === true ? <div className="absolute right-80 -mr-2 top-12 z-10 mt-2 w-[22vw]  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1 mx-3 h-[60vh] overflow-y-scroll" role="none">
                        <div className=' w-full h-full mb-5'>
                            <div className='mt-10 md:mt-5 ml-0 md:ml-3 flex flex-wrap md:justify-start justify-center gap-4 text-sm items-center'>
                                <Link to="/vision/Sizing" style={{ textDecoration: 'none' }}>
                                    <div onClick={() => setBar(false)}>
                                        <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/sizing1.svg" /></div>
                                        </div>
                                        <div className='mt-4 flex justify-center text-[10px]  h-10 '><p className='font-bold text-[#024D87]'>Sizing Tool</p></div>
                                    </div>
                                </Link>
                                <Link to="/bookdemo">
                                    <div onClick={() => setBar(false)}>
                                        <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                            <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/qty.svg" /></div>
                                        </div>
                                        <div className='mt-4 text-[10px] flex justify-center h-10 w-20'><p className='font-bold text-[#024D87] text-center'>Process Monitoring</p></div>
                                    </div>
                                </Link>
                                <Link to="/bookdemo">
                                    <div onClick={() => setBar(false)}>
                                        <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                            <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/pm.svg" /></div>

                                        </div>
                                        <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Quality Inspection</p></div>
                                    </div>
                                </Link>
                                <Link to="/bookdemo">
                                    <div onClick={() => setBar(false)}>
                                        <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                            <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/wm.svg" /></div>

                                        </div>
                                        <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Workforce Monitoring</p></div>
                                    </div>
                                </Link>
                                <div onClick={() => setBar(false)}>
                                    <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                        <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/automation.svg" /></div>

                                    </div>
                                    <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Automate Data Digitization</p></div>
                                </div>
                            </div>
                            <div className="mt-4 mb-4 w-full h-[1px] bg-[#AAC3D6] "></div>
                            <div className="text-md text-[#024D87] font-bold ml-3">Scheduling</div>
                            <div className='mt-10 md:mt-5 ml-0 md:ml-3 flex flex-wrap md:justify-start justify-center gap-4 text-sm items-center'>

                                <div onClick={() => setBar(false)}>
                                    <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                        <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/pp.svg" /></div>

                                    </div>
                                    <div className='mt-4 flex justify-center text-[10px] w-20 h-10 '><p className='font-bold text-center text-[#024D87]'>Production Planning</p></div>
                                </div>

                                <div onClick={() => setBar(false)}>
                                    <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                        <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/sch.svg" /></div>

                                    </div>
                                    <div className='mt-4 text-[10px] flex justify-center h-10 w-20'><p className='font-bold text-[#024D87] text-center'>QC Scheduling</p></div>
                                </div >

                                <div onClick={() => setBar(false)}>
                                    <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                        <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/mp.svg" /></div>

                                    </div>
                                    <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Manpower Scheduling</p></div>
                                </div>
                            </div>
                            <div className="mt-4 mb-4 w-full h-[1px] bg-[#AAC3D6] "></div>
                            <div className="text-md text-[#024D87] font-bold ml-3">Process Optimization</div>
                            <div className='mt-10 md:mt-5 ml-0 md:ml-3 flex flex-wrap md:justify-start justify-center gap-4 text-sm items-center'>
                                <Link to="/optimus/blastfurnace" >
                                    <div onClick={() => setBar(false)}>
                                        <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                            <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/bf.svg" /></div>

                                        </div>
                                        <div className='mt-4 flex justify-center text-[10px] w-20 h-10 '><p className='font-bold text-center text-[#024D87]'>Blast Furnace</p></div>
                                    </div>
                                </Link>

                                <div onClick={() => setBar(false)}>
                                    <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                        <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/cement_kiln.svg" /></div>
                                    </div>
                                    <div className='mt-4 text-[10px] flex justify-center h-10 w-20'><p className='font-bold text-[#024D87] text-center'>Kiln</p></div>
                                </div>
                                <div onClick={() => setBar(false)}>
                                    <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>
                                        <div className='w-full flex justify-center '><img className='mt-0 h-20 w-20 p-3 mt-1' src="/pot.svg" /></div>
                                    </div>
                                    <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Potline</p></div>
                                </div>
                            </div>
                            <div className="mt-4 mb-4 w-full h-[1px] bg-[#AAC3D6] "></div>
                            <div className='mt-10 md:mt-5 ml-0 md:ml-3 flex flex-wrap md:justify-start justify-center gap-4 text-sm items-center'>

                                <Link to="/community/askanexpert" >
                                    <div onClick={() => setBar(false)}>
                                        <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                            <div className='w-full flex justify-center '><img className='mt-2 h-20 w-20 p-0' src="/askexpert.svg" /></div>

                                        </div>
                                        <div className='mt-4 flex justify-center text-[10px] w-20 h-10 '><p className='font-bold text-center text-[#024D87]'>Ask An Expert</p></div>
                                    </div>
                                </Link>

                                <Link to="/community/advisor" >
                                    <div onClick={() => setBar(false)}>
                                        <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                            <div className='w-full flex justify-center '><img className=' h-full p-0 mt-0 -ml-4 mt-2' src="/advisor.svg" /></div>

                                        </div>
                                        <div className='mt-4 text-[10px] flex justify-center h-10 w-20'><p className='font-bold text-[#024D87] text-center'>AI Advisor</p></div>
                                    </div>
                                </Link>

                                <div onClick={() => setBar(false)}>
                                    <div className='w-20 h-24 rounded-xl shadow-md border border-gray-200 hover:bg-blue-100 hover:transition duration-200 cursor-pointer '>

                                        <div className='w-full flex justify-center '><img className='mt-2 h-20 w-20 p-0' src="/people.svg" /></div>

                                    </div>
                                    <div className='mt-4 flex text-[10px] justify-center h-10 w-20 '><p className='font-bold text-[#024D87] text-center'>Community</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null}
            </div>
            </ClickAwayListener>
        </>

    )
}

export default AppNav