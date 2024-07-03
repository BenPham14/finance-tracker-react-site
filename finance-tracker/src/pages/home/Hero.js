import homeCSS from './home.module.css';
// import hero from '../../assets/undraw_investor_update_re_qnuu.svg';
import hero from '../../assets/main.png';
import mobile from '../../assets/main-mobile.png';
import { IoArrowForwardOutline } from "react-icons/io5";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import {email, password} from '../../config/demo-account.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Hero = ({setLoginOpen, setIsAuth}) => {
    const signIn = async () => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        cookies.set('auth-token', result.user.refreshToken);
        setIsAuth(true);
    };

    return (
        <section className={homeCSS.hero}>
            <div className={homeCSS.info}>
                <h1>Finances Made Easy</h1>
                <p>
                    Track your expenses effortlessly and save more money with Finance Tracker, 
                    the smart and simple app that helps you manage your finances.
                </p>
                <div className={homeCSS.heroBtns}>
                    <button id={homeCSS.login} onClick={() => setLoginOpen(true)}>Login</button>
                    <button id={homeCSS.demo} onClick={signIn}>
                        Try demo
                        <IoArrowForwardOutline />
                    </button>
                    
                </div>
            </div>
            <div className={homeCSS.images}>
                <img src={hero} alt="hero" id={homeCSS.desktop}/>
                <img src={mobile} alt="mobile" id={homeCSS.mobile}/>
            </div>
        </section>
    );
};

export default Hero;