import { signInWithEmailAndPassword } from 'firebase/auth';
import { email, password } from '../../../config/demo-account';
import { auth } from '../../../config/firebase';
import homeCSS from '../home.module.css';
import Dropdown from './Dropdown';
import { useState } from 'react';
import { HiMenuAlt3 } from 'react-icons/hi';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Header = ({setLoginOpen, featuresScroll, faqScroll, setIsAuth}) => {
    const [toggle, setToggle] = useState(false);

    const scrollIntoFeatures = () => {
        featuresScroll.current.scrollIntoView({behavior: 'smooth'});
        setToggle(false);
    };

    const scrollIntoFAQ = () => {
        faqScroll.current.scrollIntoView({behavior: 'smooth'});
        setToggle(false);
    };

    const signIn = async () => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        cookies.set('auth-token', result.user.refreshToken);
        setIsAuth(true);
    };

    return (
        <header>
            <h2>Finance Tracker</h2>
            <div className={homeCSS.mobile}>
                <HiMenuAlt3 className={homeCSS.menuIcon} onClick={() => setToggle(!toggle)}/>
                <Dropdown 
                    toggle={toggle} 
                    scrollIntoFeatures={scrollIntoFeatures}
                    scrollIntoFAQ={scrollIntoFAQ}
                    signIn={signIn}
                />
                <button id={homeCSS.login} onClick={() => setLoginOpen(true)}>Login</button>
            </div>
            <nav className={homeCSS.rightLinks}>
                <button id={homeCSS.link} onClick={scrollIntoFeatures}>Features</button>
                {/* <button id={homeCSS.link} onClick={scrollIntoFAQ}>FAQ</button> */}
                <button id={homeCSS.demo} onClick={signIn}>Try demo</button>
                <button id={homeCSS.login} onClick={() => setLoginOpen(true)}>Login</button>
            </nav>
        </header>
    );
};

export default Header;