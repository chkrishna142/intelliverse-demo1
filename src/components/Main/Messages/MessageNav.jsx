import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { baseURL } from "../../..";
import { timeSince } from "../../../util/utilFunctions";

const MessageNav = () => {

    const [text, setText] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        getNotifications()
    }, [])

    const getNotifications = async () => {
        try {
            const data = await fetch(`${baseURL}notifications/get/user`, {
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": localStorage.getItem('auth_token')
                }
            })
            const res = await data.json()
            setNotifications(res.reverse())
            
        } catch (error){
            console.log(error)
        }    
    }

    return (
        <>
            <ClickAwayListener onClickAway={() => setText(false)}><div >
                <img onClick={() => setText(!text)} className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/messages.svg" alt="message" />
                {text === true ? <div className="absolute right-[15vw] -mr-2 top-12 z-10 mt-2 w-80  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1 mx-3 h-[42vh] overflow-y-scroll" role="none">
                        {notifications?.map((item, index) => {
                            return (
                                <Link to="/notifications/singleMessage">
                                    <div key={index} onClick={() => setText(false)} className="text-xs px-2 py-3 border-b">
                                        {item?.message}
                                        <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">{timeSince(new Date(item?.localDateTime))}</div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                    <Link to="/notifications"><div onClick={() => setText(false)} className="w-full px-2 cursor-pointer py-2 bg-[#034D86] text-white text-xs font-bold flex justify-center rounded-b-md hover:transition duration-200"> View All</div></Link>
                </div> : null}
            </div>
            </ClickAwayListener>
        </>
    )
}

export default MessageNav