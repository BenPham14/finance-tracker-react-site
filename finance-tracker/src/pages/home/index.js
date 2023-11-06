import { useRef, useState } from 'react';
import homeCSS from './home.module.css';
import { HiMenuAlt3 } from 'react-icons/hi';
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
        </main>
    );
};

export default Home;