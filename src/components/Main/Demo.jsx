import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

const Demo = () => {

    const [details, setDetails] = useState([])
    let param = useParams()

    useEffect(() => {
        getDemo()
    }, [])

    const getDemo = async () => {
        const data = await fetch(`https://backend-ripik.com/api/demo/get/${param.product}`, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
            }
        })
        const res = await data?.json()
        setDetails(res)
    }

    return (
        <div className='w-full bg-white rounded-xl pb-10 border mt-6'>
            <div className='text-[#024D87] text-lg m-5 font-bold'>
                {details?.toolName} Tool Demo
            </div>
            <div className='mt-2 grid grid-cols-2 w-full gap-4'>
                <div className='ml-5 mr-2'><div className='w-full h-80 '>
                    <img className='w-full h-80' src="/sample.svg" />
                </div>
                </div>
                <div className='ml-2 mr-10'><div className='w-full rounded-md h-80 flex justify-center '>
                    <img className='w-full' src="/test_new.svg" />
                </div>
                </div>
            </div>
            <div className='mt-5 grid grid-cols-2 w-full gap-4'>
                <div className='flex w-full justify-end'>
                    <a href={details?.demoLink} target='_blank' className='px-4 py-2 rounded-full text-sm text-white bg-[#084298] flex gap-4 items-center'>
                        Watch Demo
                        <img src="/play.svg" />
                    </a>
                </div>
                <div className='flex w-full justify-end '>
                    <button className='px-4 py-2 rounded-full text-sm text-white bg-[#084298] flex gap-4 items-center mr-12'>
                        Try Tool
                        <img src="/try_tool.svg" />
                    </button>
                </div>
            </div>
            <div className='mt-10 font-bold text-black text-base flex justify-center mx-10'>
                {details?.toolDescription}
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
