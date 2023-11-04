import { useState } from 'react';
import hero from '../../assets/undraw_investor_update_re_qnuu.svg';
import homeCSS from './home.module.css';
import { HiMenuAlt3 } from 'react-icons/hi'

const DropDown = ({toggle}) => {
    if (!toggle) return;
    return (
        <nav className={homeCSS.dropDown}>
            <p>Features</p>
            <p>FAQ</p>
            <button>Login</button>
        </nav>
    );
};

const Home = () => {
    const [toggle, setToggle] = useState(false);

    return (
        <main className={homeCSS.home}>
            <header>
                <h2>FinTracker</h2>
                <HiMenuAlt3 className={homeCSS.menuIcon} onClick={() => setToggle(!toggle)}/>
                <nav className={homeCSS.rightLinks}>
                    <a>Features</a>
                    <a>FAQ</a>
                    <button>Login</button>
                </nav>
                <DropDown toggle={toggle}/>
            </header>
            <section className={homeCSS.hero}>
                    <div>
                        <h1>Finances Made Easy</h1>
                        <p>
                            Track your expenses effortlessly and save more money with FinTracker, 
                            the smart and simple app that helps you manage your finances.
                        </p>
                        <button>Login</button>
                    </div>
                    <img src={hero} alt="hero"/>
            </section>
            <section className={homeCSS.features}>
                <div>
                    Features section
                </div>
            </section>
            <section className={homeCSS.faq}>
                <div>
                    FAQ section
                </div>
            </section>
            <footer>
                Footer section
            </footer>
        </main>
    );
};

export default Home;