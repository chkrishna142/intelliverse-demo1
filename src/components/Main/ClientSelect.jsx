import { useEffect, useState } from "react";

const ClientSelect = () => {

    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        const data = await fetch(`https://intelliverse.backend-ripik.com/api/getClientIdList`, {
            method: 'POST',
            headers: {

                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    "email": 'test@ripik.in'
                }
            )
        })
        const res = await data.json()
        setClients(res?.clientIds)
    }

    return (
        <div className="h-full">
            <div className="bg-white rounded-xl shadow-md p-4 mt-5 border">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-start mt-3 ml-3 mr-3 mb-3 text-semibold text-2xl">
                        Please choose a client
                    </div>
                    <div className="flex w-full flex-wrap gap-4 ml-3 mb-5">
                        {clients?.map((item, index) => {
                            return (
                                <div>
                                    <div key={index} className="h-32 w-32 border items-center uppercase text-[#024D87] font-bold rounded-md flex justify-center shadow-md hover:bg-gray-100 hover:transition duration-200 cursor-pointer">
                                        {item}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientSelect;
