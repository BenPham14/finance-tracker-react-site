import { useState } from 'react';
import mainCSS from '../main.module.css';
import { IoPersonCircle } from "react-icons/io5";
import ProfileMenu from './ProfileMenu.js';

const Profile = ({signOutUser, user, darkMode, setTheme, isDemoUser}) => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    return (
        <div className={mainCSS.profile}>
            {user.photoURL ?
                <img 
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)} 
                    className={mainCSS.profileImage} 
                    id={profileMenuOpen ? mainCSS.profileOpen : undefined} 
                    src={user.photoURL} 
                    alt='Profile' 
                    referrerPolicy="no-referrer"
                /> :
                <IoPersonCircle
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    id={profileMenuOpen ? mainCSS.profileOpen : undefined} 
                    className={mainCSS.profileImage} 
                />
            }
            <ProfileMenu
                profileMenuOpen={profileMenuOpen}
                signOutUser={signOutUser}
                user={user}
                darkMode={darkMode}
                setTheme={setTheme}
                isDemoUser={isDemoUser}
            />
        </div>
    );
};

export default Profile;