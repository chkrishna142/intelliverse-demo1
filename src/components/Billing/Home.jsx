import React, { useState } from 'react'
import Summary from './Summary'
import Details from './Details'
import History from './History'


const BillingHome = () => {

    const selected = "w-1/2 py-4 border-b-2 border-[#084298] text-[#084298] font-bold md:text-base text-xs"
    const non_selected = "w-1/2 py-4 border-b border-gray-400 text-gray-400 md:text-base text-xs"
    const [selector, setSelector] = useState(1)

    return (
        <>
            <p className="text-xl mt-[4vh] sm:text-3xl font-semibold text-[#024D87]">
                Billing & Subscription
            </p>
            <div className='mt-4 bg-white border rounded-md shadow-md'>
                <div className=''>
                    <div className='flex items-center justify-between md:w-[60%] w-[92%] ml-2'>
                        <button onClick={() => setSelector(1)} className={selector === 1 ? selected : non_selected}>Subscription Summary</button>
                        <button onClick={() => setSelector(2)} className={selector === 2 ? selected : non_selected}>Subscription Details</button>
                        <button onClick={() => setSelector(3)} className={selector === 3 ? selected : non_selected}>Billing History</button>
                        <button onClick={() => setSelector(4)} className={selector === 4 ? selected : non_selected}>Recommendations</button>
                    </div>
                    {selector === 1 ?
                        <div className='pb-4'>
                            <Summary />
                        </div>
                        :
                        null}
                    {selector === 2 ?
                        <div className='pb-4'>
                            <Details />
                        </div>
                        :
                        null}
                    {selector === 3 ?
                        <div className='pb-4'>
                            <History />

                        </div>
                        :
                        null}
                </div>
            </div>
        </>
    )
}

export default BillingHome