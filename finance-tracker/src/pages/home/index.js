import { useEffect, useRef, useState } from 'react';
import homeCSS from './home.module.css';
import { HiMenuAlt3 } from 'react-icons/hi';
import { FiArrowUp } from 'react-icons/fi';
import Hero from './Hero';
import Features from './Features';
import FAQ from './FAQ';

const DropDown = ({toggle, scrollIntoFeatures, scrollIntoFAQ}) => {
    if (!toggle) return;
    return (
        <nav className={homeCSS.dropDown}>
            <button id={homeCSS.link} onClick={scrollIntoFeatures}>Features</button>
            <button id={homeCSS.link} onClick={scrollIntoFAQ}>FAQ</button>
        </nav>
    );
};

const Home = () => {
    const [toggle, setToggle] = useState(false);
    const [showUpButton, setShowUpButton] = useState(false);
    const featuresScroll = useRef(null);
    const faqScroll = useRef(null);

    const scrollIntoFeatures = () => {
        featuresScroll.current.scrollIntoView({behavior: 'smooth'});
        setToggle(false);
    };

    const scrollIntoFAQ = () => {
        faqScroll.current.scrollIntoView({behavior: 'smooth'});
        setToggle(false);
    };

    useEffect(() => {
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
            <header>
                <h2>FinTracker</h2>
                <div className={homeCSS.mobile}>
                    <HiMenuAlt3 className={homeCSS.menuIcon} onClick={() => setToggle(!toggle)}/>
                    <DropDown 
                        toggle={toggle} 
                        scrollIntoFeatures={scrollIntoFeatures}
                        scrollIntoFAQ={scrollIntoFAQ}
                    />
                    <button id={homeCSS.login}>Login</button>
                </div>
                <nav className={homeCSS.rightLinks}>
                    <button id={homeCSS.link} onClick={scrollIntoFeatures}>Features</button>
                    <button id={homeCSS.link} onClick={scrollIntoFAQ}>FAQ</button>
                    <button id={homeCSS.login}>Login</button>
                </nav>
            </header>
            <Hero/>
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