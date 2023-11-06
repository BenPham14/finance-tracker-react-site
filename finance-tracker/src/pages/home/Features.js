import { TbPigMoney } from 'react-icons/tb';
import homeCSS from './home.module.css';

const Features = ({featuresScroll}) => {
    return (
        <section className={homeCSS.features} ref={featuresScroll}>
            <h2>What We Offer</h2>
            <div className={homeCSS.featuresContent}>
                <div>
                    <span>
                        <TbPigMoney/>
                        <h3>Feature 1</h3>
                    </span>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div>
                    <span>
                        <TbPigMoney/>
                        <h3>Feature 2</h3>
                    </span>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div>
                    <span>
                        <TbPigMoney/>
                        <h3>Feature 3</h3>
                    </span>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
        </section>
    );
};

export default Features;