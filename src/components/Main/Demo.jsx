import { Spinner } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

const Demo = () => {

    const [details, setDetails] = useState([])
    const [loader, setLoader] = useState(false)
    const [success, setSuccess] = useState(false)

    let param = useParams()

    useEffect(() => {
        getDemo()
    }, [])

    const getDemo = async () => {
        try {
            const data = await fetch(`https://backend-ripik.com/api/demo/get/${param.product}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const res = await data?.json()
            setDetails(res)
        } catch (error) {
            console.log(error)
        }
    }

    const book = () => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
            setSuccess(true)
        }, 2000)
    }

    return (
        <div className='w-full bg-white rounded-xl pb-10 border mt-6'>
            <div className='text-[#024D87] text-lg m-5 font-bold flex items-center gap-2'>
                <Link to="/home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M24.5 12.8333H7.96833L12.145 8.645L10.5 7L3.5 14L10.5 21L12.145 19.355L7.96833 15.1667H24.5V12.8333Z" fill="#084298" />
                </svg>
                </Link>
                <span>{details?.toolName} Demo</span>
            </div>
            <div className='mt-2 grid grid-cols-2 w-full gap-5'>
                {/* <div className='ml-2 mr-10'><div className='w-full rounded-md h-80 flex justify-center '>
                    <img className='w-full' src="/test_new.svg" />
                </div>
                </div> */}
                <div>
                    <div className='flex justify-center ml-14 mr-4 text-gray-600'>
                        {details?.toolDescription}
                    </div>
                    <div className='flex justify-center mt-7'>
                        <img className='w-1/3' src="/demo.svg" />
                    </div>
                    <div className='flex justify-center mt-[3vh] text-center mx-20 text-[#605D64]'>
                        Book a call with us for an in-depth demo and to know about the customization plans.
                    </div>
                    <div className='flex justify-center mt-[2vh] text-center text-[#FFC107] font-semibold'>
                        We will be happy to serve you!
                    </div>
                    <div className='flex justify-center mt-[3vh]'>
                        <button onClick={() => book()} style={{ background: success === false ? "#084298" : "#69B04B" }} className={`px-6 py-2 rounded-md text-lg text-white flex items-center`}>
                            {success === false && loader === false ? (<span>Book Live Demo</span>) : success === false && loader === true ? (<Spinner />) : (<span>Success</span>)}
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        {success === true ? <p className='font-light mt-[2vh]'>We will get back to you shortly!</p> : null}
                    </div>
                </div>
                <div className='mr-10'><div className='w-full border rounded-lg shadow-xl shadow-[#CBE3FB7A] '>
                    <div className='flex justify-center items-center'>
                        <a href={details?.demoLink} target="_blank" className='absolute mt-[45vh]'>
                            <img src="/youtube.svg" />
                        </a>
                    </div>
                    <img className='w-full mt-6 mb-6' src="/sample.svg" />
                </div>
                </div>
            </div>
            {/* <video
                crossOrigin="anonymous"
                controls
                muted
                autoPlay
                className="rounded-lg w-[45vw]"
            >
                <source src={details?.demoLink} type="video/mp4" />
            </video> */}
            {/* <div className='mt-10 font-bold text-black text-base flex justify-center mx-10'>
                {details?.toolDescription}
            </div> */}
            {/* <div className='mt-12 w-full flex justify-center'>
                <Link to="/contactus">
                <button className='px-6 py-2 rounded-md text-lg text-white bg-[#084298] flex items-center'>
                    Book Live Demo
                </button>
                </Link>
            </div> */}
        </div>
    );
};

export default Demo;
