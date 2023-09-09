import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { baseURL } from "../..";

const ProfileNav = ({ setLogin }) => {

    const [nav, setNav] = useState(false)
    const [authToken, setAuthToken] = useState("")

    useEffect(()=>{
       setAuthToken(localStorage.getItem('auth_token'))
    },[])

    const handleLogout = async () => {
        
        try {
            const data = await fetch(baseURL + 'logout', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "X-Auth-Token": authToken
                },
            })
            if (data.status === 200) {
                setLogin(false)
                localStorage.removeItem("logged_in")
                localStorage.removeItem("auth_token")
            } 
        } catch (e) {
            console.log(e);         
        }
    };

    return (
        <>
            <ClickAwayListener onClickAway={() => setNav(false)}><div>
                <img onClick={() => setNav(!nav)} className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/profile.svg" />
                {nav === true ? <div className="absolute md:right-44 right-5 -mr-2 top-12 z-10 mt-2 w-40  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1" role="none">
                        <Link to="/profile" onClick={() => setNav(false)} class="text-gray-700 block px-4 py-2 text-sm flex items-center hover:bg-gray-100 gap-3 hover:transition duration-200" role="menuitem" tabindex="-1" id="menu-item-0">
                            <img src="/profile_dropdown.svg" />
                            <p style={{ marginLeft: '1px' }}>Profile</p></Link>              
                            <button onClick={handleLogout} className="text-gray-700 block w-full px-4 py-2 text-left text-sm flex items-center hover:bg-gray-100 gap-2 hover:transition duration-200" role="menuitem" tabindex="-1" id="menu-item-3">
                                <img src="/logout.svg" />
                                Logout
                            </button>       
                    </div>
                </div> : null}
            </div>
            </ClickAwayListener>
        </>
    )
}

export default ProfileNav