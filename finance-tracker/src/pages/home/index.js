import { useEffect, useRef, useState } from 'react';
import homeCSS from './home.module.css';
import { HiMenuAlt3 } from 'react-icons/hi';
import { FiArrowUp } from 'react-icons/fi';
import Hero from './Hero';
import Features from './features/Features';
import FAQ from './FAQ';
import Login from './Login';
import Cookies from 'universal-cookie';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebase';

const cookies = new Cookies();

const DropDown = ({toggle, scrollIntoFeatures, scrollIntoFAQ}) => {
    if (!toggle) return;
    return (
        <nav className={homeCSS.dropDown}>
            <button id={homeCSS.link} onClick={scrollIntoFeatures}>Features</button>
            <button id={homeCSS.link} onClick={scrollIntoFAQ}>FAQ</button>
        </nav>
    );
};

const Home = ({setIsAuth}) => {
    const [toggle, setToggle] = useState(false);
    const [showUpButton, setShowUpButton] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const featuresScroll = useRef(null);
    const faqScroll = useRef(null);

    useEffect(() => {
        // When the page is at a certain location, show return to top button
        const handleScollButtonVisibility = () => {
            window.scrollY > 300 ? setShowUpButton(true) : setShowUpButton(false);
        };
        window.addEventListener('scroll', handleScollButtonVisibility);
        return () => {
            window.removeEventListener('scroll', handleScollButtonVisibility);
        };
    }, []);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set('auth-token', result.user.refreshToken);
            setIsAuth(true);
        } catch(err) {
            console.log(err);
        };
    };

    const scrollIntoFeatures = () => {
        featuresScroll.current.scrollIntoView({behavior: 'smooth'});
        setToggle(false);
    };

    const scrollIntoFAQ = () => {
        faqScroll.current.scrollIntoView({behavior: 'smooth'});
        setToggle(false);
    };

    const handleScrollToTop = () => {
        window.scrollTo({top: '0', behavior: 'smooth'})
    };

    return (
        <main className={homeCSS.home}>
            <header>
                <h2>Finance Tracker</h2>
                <div className={homeCSS.mobile}>
                    <HiMenuAlt3 className={homeCSS.menuIcon} onClick={() => setToggle(!toggle)}/>
                    <DropDown 
                        toggle={toggle} 
                        scrollIntoFeatures={scrollIntoFeatures}
                        scrollIntoFAQ={scrollIntoFAQ}
                    />
                    <button id={homeCSS.login} onClick={() => setLoginOpen(true)}>Login</button>
                </div>
                <nav className={homeCSS.rightLinks}>
                    <button id={homeCSS.link} onClick={scrollIntoFeatures}>Features</button>
                    <button id={homeCSS.link} onClick={scrollIntoFAQ}>FAQ</button>
                    <button id={homeCSS.login} onClick={() => setLoginOpen(true)}>Login</button>
                </nav>
            </header>
            <Login 
                loginOpen={loginOpen} 
                setLoginOpen={setLoginOpen}
                signInWithGoogle={signInWithGoogle}
            />
            <Hero setLoginOpen={setLoginOpen}/>
            <Features featuresScroll={featuresScroll}/>
            <FAQ faqScroll={faqScroll}/>
            <footer>
                <div>
                    Footer
                </div>
            </footer>
            <FiArrowUp 
                type='button' 
                id={homeCSS.upButton} 
                style={{display: !showUpButton && 'none'}}
                onClick={handleScrollToTop}
            />
        </main>
    );
};

export default Home;