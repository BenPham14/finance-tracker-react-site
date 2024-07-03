import homeCSS from './home.module.css';
import Header from './header/Header';
import Login from './Login';
import Hero from './Hero';
import Features from './features/Features';
import FAQ from './FAQ';
import { useEffect, useRef, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { FaGithub } from "react-icons/fa6";

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

    const handleScrollToTop = () => {
        window.scrollTo({top: '0', behavior: 'smooth'})
    };

    return (
        <main className={homeCSS.home}>
            <Header
                setLoginOpen={setLoginOpen}
                featuresScroll={featuresScroll}
                faqScroll={faqScroll}
                setIsAuth={setIsAuth}
            />
            <Login 
                loginOpen={loginOpen} 
                setLoginOpen={setLoginOpen}
                setIsAuth={setIsAuth}
            />
            <Hero 
                setLoginOpen={setLoginOpen}
                setIsAuth={setIsAuth}
            />
            <Features featuresScroll={featuresScroll}/>
            {/* <FAQ faqScroll={faqScroll}/> */}
            <footer>
                <div>
                    <p>Benjamin Pham &copy; 2023</p>
                    <a href='https://github.com/BenPham14/finance-tracker-react-site' target="_blank">
                        <FaGithub id={homeCSS.github}/>
                    </a>
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