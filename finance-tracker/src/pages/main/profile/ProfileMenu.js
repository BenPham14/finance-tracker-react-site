import mainCSS from '../main.module.css';
import { IoMdExit } from "react-icons/io";
import { IoMoon, IoSunny, IoPersonCircle } from "react-icons/io5";

const ProfileMenu = ({profileMenuOpen, signOutUser, user, darkMode, setTheme, isDemoUser}) => {
    return (
        <>
            {profileMenuOpen &&
                <div className={mainCSS.profileMenu}>
                    <div className={mainCSS.profileInfo}>
                        {user.photoURL ?
                            <img onClick={signOutUser} src={user.photoURL} alt='Profile' referrerPolicy="no-referrer"/> :
                            <IoPersonCircle
                                className={mainCSS.defaultProfile}
                            />
                        }
                        <div>
                            {user.displayName && <p>{user.displayName}</p>}
                            {!isDemoUser && <p>{user.email}</p>}
                        </div>
                    </div>
                    {darkMode ? 
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
        </>
    );
};

export default ProfileMenu;