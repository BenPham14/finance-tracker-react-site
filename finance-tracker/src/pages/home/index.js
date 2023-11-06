import { useRef, useState } from 'react';
import homeCSS from './home.module.css';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiFillGithub } from 'react-icons/ai';
import Hero from './Hero';
import Features from './Features';
import FAQ from './FAQ';

const DropDown = ({toggle, scrollIntoFeatures, scrollIntoFAQ}) => {
    if (!toggle) return;
    return (
        <nav className={homeCSS.dropDown}>
            <a onClick={scrollIntoFeatures}>Features</a>
            <a onClick={scrollIntoFAQ}>FAQ</a>
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
                    <button>Login</button>
                </div>
                <nav className={homeCSS.rightLinks}>
                    <a onClick={scrollIntoFeatures}>Features</a>
                    <a onClick={scrollIntoFAQ}>FAQ</a>
                    <button>Login</button>
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