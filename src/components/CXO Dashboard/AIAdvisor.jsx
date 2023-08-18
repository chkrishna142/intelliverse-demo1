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

const AiAdvisor = () => {

    const [alert, setAlert] = useState(true)

    return (
        <div className='h-screen'>
            <div className='ml-36 mr-10 mt-6'>
                <div className='rounded-md border border-[#3A74CA] h-40 bg-white w-full'>
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

                </div>
                <div className='fixed bottom-52 ml-4'>
                    <div style={{ width: '85.5vw' }} className='flex gap-4' >
                        <div className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                            What are the recommended strategies and techniques for effectively mitigating scaffold build-up on the refractory lining of a blast furnace?

                        </div>
                        <div className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                            Ask me to generate test plans for the manufacturing of automobile axels including test cases, and acceptance criteria.

                        </div>
                    </div>
                </div>
                <div className='fixed bottom-32 ml-4'>
                    <div style={{ width: '85.5vw' }} className='flex gap-4' >
                        <div className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                            What are the recommended strategies and techniques for effectively mitigating scaffold build-up on the refractory lining of a blast furnace?

                        </div>
                        <div className='rounded-md border border-[#605D64] px-2 py-2 w-1/2 text-[#605D64] bg-white cursor-pointer hover:bg-gray-100 hover:transition duration-200'>
                            Ask me to generate test plans for the manufacturing of automobile axels including test cases, and acceptance criteria.

                        </div>
                    </div>

                </div>
                <div className='fixed bottom-10'>
                    <div style={{ width: '87.5vw' }} className='rounded-md border border-[#3A74CA] h-16 bg-white w-full px-5 py-2 flex gap-2 items-center'>
                        <input className='w-full px-2 py-2 select-none' placeholder='Send a message' />
                        <div>
                            <img src="/send.svg" />
                        </div>
                    </div>



                </div>
            </div>
        </div>
    );
};

export default AiAdvisor;
