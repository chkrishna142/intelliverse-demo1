import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserRolesTable from './UserRolesTable'
import UserLogs from './UserLogs'
import AddNew from './AddNew'

const AdminHome = () => {

    const selected = "w-1/2 py-4 border-b-2 border-[#084298] text-[#084298] font-bold md:text-base text-xs"
    const non_selected = "w-1/2 py-4 border-b border-gray-600 text-gray-600 md:text-base text-xs"

    const [selector, setSelector] = useState(1)

    return (
        <>
            <p className="text-xl mt-[4vh] sm:text-3xl font-semibold text-[#024D87]">
                User Management
            </p>
            <div className='mt-4 bg-white border rounded-md shadow-md'>
                <div className=''>


                    <div className='flex items-center justify-between md:w-[60%] w-[92%] ml-2'>
                        <button onClick={() => setSelector(1)} className={selector === 1 ? selected : non_selected}>User Roles Table</button>
                        <button onClick={() => setSelector(2)} className={selector === 2 ? selected : non_selected}>Add New User</button>
                        <button onClick={() => setSelector(3)} className={selector === 3 ? selected : non_selected}>Detailed User Logs</button>
                    </div>
                    {selector === 1 ?
                        <div className='pb-4'>
                            <UserRolesTable />
                        </div>
                        :
                        null}
                    {selector === 2 ?
                        <div>
                            <AddNew />
                        </div>
                        :
                        null}
                    {selector === 3 ?
                        <div className='pb-4'>
                            <UserLogs />
                        </div>
                        :
                        null}
                </div>

            </div>
        </>
    )
}

export default AdminHome