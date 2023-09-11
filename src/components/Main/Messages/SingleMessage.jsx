import React from 'react'
import { Link } from 'react-router-dom'

const SingleMessage = () => {


    return (
        <div className='mt-8 w-full'>
             <p className="text-3xl mt-[4vh] sm:text-4xl font-semibold text-[#024D87]">
                Notifications
            </p>
            <div className='border bg-white rounded-md shadow-md bg-[#FDFDFD] mt-5'>
                <div className='h-14 bg-[#FDFDFD] w-full border rounded-t-md flex items-center gap-3'>
                    <Link to="/notifications"><div className='h-6 w-6 bg-[#BEE0FF] rounded-full ml-2 cursor-pointer flex justify-center items-center'> <img className='h-4 w-4' src="/go_back.svg" alt='back'/></div></Link>
                    <p className='text-[#024D87] font-semibold text-xl'>Luc Bonte has replied to your query</p>

                </div>
                <div className='mx-11 my-4'>
                    <div className='flex justify-between items-center text-sm'>
                        <div className='flex gap-2 items-center'>
                            <img src="/profile_mail.svg" alt="/profile"/>
                            <div className='flex flex-col gap-1'>
                                <p className='font-semibold'>Luc Bonte &lt;luc.bonte@ripik.ai&gt;</p>
                                <p>To me</p>
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-end mb-1'><img src="/forward.svg" alt='forward'/></div>
                            <p className='font-light'>Tue 05/09/2023 09:30</p>
                        </div>
                    </div>
                </div>
                <div className='text-[#141619] text-base font-light mx-11 mt-5'>
                    <p className='mb-2'>Dear Rakesh,</p>
                    <p className='mb-2'>Thank you for reaching out with your question regarding improving Blast Furnace efficiency in steel plants. I appreciate your dedication to operational excellence in the steelmaking industry. Based on my experience and expertise, I can offer you some insights and recommendations on this matter.</p>

                    <p className='mb-2'>Improving Blast Furnace efficiency is crucial for enhancing the overall performance and competitiveness of a steel plant. Here are some key considerations and strategies to achieve this:</p>

                    <p className='mb-2'>Maintenance Methodology: Implement a proactive and predictive maintenance approach for the Blast Furnace. Regular inspections, preventive maintenance, and addressing minor issues promptly can prevent costly breakdowns and downtime.</p>

                    <p className='mb-2'>Operational Excellence: Focus on optimizing operational processes within the Blast Furnace. This includes maintaining consistent charging, maintaining proper burden distribution, and closely monitoring key process parameters such as temperature, pressure, and gas flow.</p>

                    <p>Luc Bonte</p>
                    <p>PhD
                    </p>

                </div>
                <div className='mt-5 flex gap-5 items-center ml-11 mb-10'>
                    <button className='px-10 py-2 bg-[#084298] text-white rounded-md'>Reply</button>
                    <button className='px-10 py-2 bg-[#084298] text-white rounded-md'>Delete</button>

                </div>

            </div>

        </div>
    )
}

export default SingleMessage