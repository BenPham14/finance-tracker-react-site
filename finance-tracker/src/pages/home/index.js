import hero from '../../assets/undraw_investor_update_re_qnuu.svg';
import homeCSS from './home.module.css';

const Home = () => {
    return(
        <main className={homeCSS.home}>
            <header>
                <p>FinTracker</p>
                <div>
                    <p>Features</p>
                    <p>FAQ</p>
                    <button>Login</button>
                </div>
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
                <img src={hero} alt="hero"></img>
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