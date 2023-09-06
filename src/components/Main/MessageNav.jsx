import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from '@mui/material/ClickAwayListener';

const MessageNav = () => {

    
    const [text, setText] = useState(false)

   
    return (
        <>
              <ClickAwayListener onClickAway={()=>setText(false)}><div >
                <img onClick={() => setText(!text)} className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/messages.svg" />
                {text === true ? <div className="absolute right-52 -mr-2 top-12 z-10 mt-2 w-80  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1 mx-3 h-[42vh] overflow-y-scroll" role="none">
                        <div className="text-xs px-2 py-3 border-b">
                            Expert Luc Bonte has replied to your query
                            <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">1 hour ago</div>
                        </div>
                        <div className="text-xs px-2 py-3 border-b">
                            You have a new direct message from User_123.
                            <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">4 hours ago</div>
                        </div>
                        <div className="text-xs px-2 py-3 border-b">
                            User 546 replied to discussion in the community forum.
                            <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">Yesterday</div>
                        </div>
                        <div className="text-xs px-2 py-3 border-b">
                            Administrator has posted a new community notification in the JSPL group.
                            <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">2 Sep 2023</div>
                        </div>
                        <div className="text-xs px-2 py-3 border-b">
                            Expert Luc Bonte has replied to your query
                            <div className="flex justify-end w-full mr-3 mt-3 text-xs text-gray-500">1 Sep 2023</div>
                        </div>
                    </div>
                    <Link to="/notifications"><div onClick={() => setText(false)} className="w-full px-2 cursor-pointer py-2 bg-[#034D86] text-white text-xs font-bold flex justify-center rounded-b-md hover:transition duration-200"> View All</div></Link>
                </div> : null}
            </div>
            </ClickAwayListener>
        </>

    )
}

export default MessageNav