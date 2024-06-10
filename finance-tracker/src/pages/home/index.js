import homeCSS from './home.module.css';
import Header from './header/Header';
import Login from './Login';
import Hero from './Hero';
import Features from './features/Features';
import FAQ from './FAQ';
import Cookies from 'universal-cookie';
import { useEffect, useRef, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebase';

const cookies = new Cookies();

const Home = ({setIsAuth}) => {
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

    const handleScrollToTop = () => {
        window.scrollTo({top: '0', behavior: 'smooth'})
    };

    return (
        <main className={homeCSS.home}>
            <Header
                setLoginOpen={setLoginOpen}
                featuresScroll={featuresScroll}
                faqScroll={faqScroll}
            />
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