import { useState } from "react";
import { Link } from "react-router-dom";
import ClickAwayListener from '@mui/material/ClickAwayListener';

const ProfileNav = ({ setLogin }) => {

    
    const [nav, setNav] = useState(false)

    const handleLogout = async () => {
        localStorage.removeItem("logged_in")
        setLogin(false)
    }


    return (
        <>
            <ClickAwayListener onClickAway={()=>setNav(false)}><div>
                <img onClick={() => setNav(!nav)} className="hover:scale-110 hover:transition duration-200 cursor-pointer" src="/profile.svg" />
                {nav === true ? <div className="absolute md:right-44 right-5 -mr-2 top-12 z-10 mt-2 w-40  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div className="py-1" role="none">
                        <Link to="/profile" onClick={() => setNav(false)} class="text-gray-700 block px-4 py-2 text-sm flex items-center hover:bg-gray-100 gap-3 hover:transition duration-200" role="menuitem" tabindex="-1" id="menu-item-0">
                            <img src="/profile_dropdown.svg" />
                            <p style={{ marginLeft: '1px' }}>Profile</p></Link>
                        <form method="POST" action="#" role="none">
                            <button onClick={handleLogout} type="submit" class="text-gray-700 block w-full px-4 py-2 text-left text-sm flex items-center hover:bg-gray-100 gap-2 hover:transition duration-200" role="menuitem" tabindex="-1" id="menu-item-3">
                                <img src="/logout.svg" />
                                Logout
                            </button>
                            
                        </form>
                    </div>
                </div> : null}
            </div>
            </ClickAwayListener>

        </>

    )
}

export default ProfileNav