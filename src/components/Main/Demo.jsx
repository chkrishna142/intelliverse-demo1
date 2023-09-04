import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Demo = () => {

    return (
        <div className='w-full bg-white rounded-xl pb-10 border mt-6'>
            <div className='text-[#024D87] text-lg m-5 font-bold'>
                Sizing Tool Demo
            </div>
            <div className='mt-2 grid grid-cols-2 w-full gap-4'>
                <div className='ml-5 mr-2'><div className='w-full h-80 '>
                    <img className='w-full h-80' src="/sample.svg" />
                </div>
                </div>
                <div className='ml-2 mr-10'><div className='w-full rounded-md h-80 flex justify-center '>
                    <img className='w-full' src="test_new.svg" />
                </div>
                </div>
            </div>
            <div className='mt-5 grid grid-cols-2 w-full gap-4'>
                <div className='flex w-full justify-end'>
                    <button className='px-4 py-2 rounded-full text-sm text-white bg-[#084298] flex gap-4 items-center'>
                        Watch Demo
                        <img src="/play.svg" />
                    </button>
                </div>
                <div className='flex w-full justify-end '>
                    <button className='px-4 py-2 rounded-full text-sm text-white bg-[#084298] flex gap-4 items-center mr-12'>
                        Try Tool
                        <img src="/try_tool.svg" />
                    </button>
                </div>
            </div>
            <div className='mt-10 font-bold text-black text-base flex justify-center mx-10'>
            Our Particle Sizing tool has helped some of the largest manufacturers in the world observe the particle size of Sinter, Coal, Coke, etc. in real time. Book a call with our team for an in-depth demo, customisation plans, and answer to your questions.

            </div>
            <div className='mt-12 w-full flex justify-center'>
                <Link to="/contactus"><button className='px-6 py-2 rounded-md text-lg text-white bg-[#084298] flex  items-center'>
                    Book Live Demo

                </button>
                </Link>


            </div>


        </div>
    );
};

export default Demo;
