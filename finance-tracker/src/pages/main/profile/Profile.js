import { useState } from 'react';
import mainCSS from '../main.module.css';
import { IoMdExit } from "react-icons/io";
import { IoMoon, IoSunny } from "react-icons/io5";

const Profile = ({signOutUser, user, darkMode, setTheme}) => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    return (
        <div className={mainCSS.profile}>
            <img onClick={() => setProfileMenuOpen(!profileMenuOpen)} className={mainCSS.profileImage} src={user.photoURL} alt='Profile' referrerPolicy="no-referrer"/>
            {
                profileMenuOpen &&
                    <div className={mainCSS.profileMenu}>
                        <div className={mainCSS.profileInfo}>
                            <img onClick={signOutUser} className={mainCSS.profile} src={user.photoURL} alt='Profile' referrerPolicy="no-referrer"/>
                            <div>
                                <p>{user.displayName}</p>
                                <p>{user.email}</p>
                            </div>
                        </div>
                            {
                                darkMode ? 
                                    <div id={mainCSS.theme} onClick={setTheme}>
                                        <IoSunny/>
                                        <p>Light Mode</p>
                                    </div> :
                                    <div id={mainCSS.theme} onClick={setTheme}>
                                        <IoMoon/>
                                        <p>Dark Mode</p>
                                    </div> 
                            }
                        <div id={mainCSS.signOut} onClick={signOutUser}>
                            <IoMdExit/>
                            <p>Sign Out</p>
                        </div>
                    </div>
            }
        </div>
    );
};

export default Profile;