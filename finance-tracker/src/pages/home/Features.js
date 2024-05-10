import homeCSS from './home.module.css';
import mainScreen from '../../assets/main-screen.png';
import { FaLandmark, FaBucket, FaCalculator, FaChartPie } from "react-icons/fa6";

const Features = ({featuresScroll}) => {
    const features = [
        {title: 'Track Accounts', subtitle: 'Accounts',icon: <FaLandmark/>, image: mainScreen, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {title: 'Create Budgets', subtitle: 'Budgets', icon: <FaCalculator/>, image: mainScreen, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {title: 'Categorize Expenses', subtitle: 'Categories', icon: <FaBucket/>, image: mainScreen, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {title: 'Summarize Spending', subtitle: 'Summary', icon: <FaChartPie/>, image: mainScreen, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
    ];

    return (
        <section className={homeCSS.features} ref={featuresScroll}>
            <div className={homeCSS.featuresContent}>
                {features.map((feature) => (
                    <>
                        <div>
                            <span>
                                {feature.icon}
                                <h4>{feature.subtitle}</h4>
                            </span>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                        <img src={feature.image} alt={feature.title} style={{width: '100%'}}/>  
                    </>
                ))}
            </div>
        </section>
    );
};

export default Features;