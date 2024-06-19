import homeCSS from './home.module.css';
// import hero from '../../assets/undraw_investor_update_re_qnuu.svg';
import hero from '../../assets/main.png';

const Hero = ({setLoginOpen}) => {
    return (
        <section className={homeCSS.hero}>
            <div>
                <h1>Finances Made Easy</h1>
                <p>
                    Track your expenses effortlessly and save more money with Finance Tracker, 
                    the smart and simple app that helps you manage your finances.
                </p>
                <div className={homeCSS.heroBtns}>
                    <button id={homeCSS.login} onClick={() => setLoginOpen(true)}>Login</button>
                    <button id={homeCSS.demo}>Try demo</button>
                </div>
            </div>
            <img src={hero} alt="hero"/>
        </section>
    );
};

export default Hero;