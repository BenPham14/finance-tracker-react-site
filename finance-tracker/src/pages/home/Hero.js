import hero from '../../assets/undraw_investor_update_re_qnuu.svg';
import homeCSS from './home.module.css';

const Hero = () => {
    return (
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
    );
};

export default Hero;