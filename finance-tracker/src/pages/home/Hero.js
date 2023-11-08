import { useNavigate } from 'react-router-dom';
import hero from '../../assets/undraw_investor_update_re_qnuu.svg';
import homeCSS from './home.module.css';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className={homeCSS.hero}>
            <div>
                <h1>Finances Made Easy</h1>
                <p>
                    Track your expenses effortlessly and save more money with FinTracker, 
                    the smart and simple app that helps you manage your finances.
                </p>
                <button id={homeCSS.login} onClick={() => navigate('/login')}>Login</button>
            </div>
            <img src={hero} alt="hero"/>
        </section>
    );
};

export default Hero;