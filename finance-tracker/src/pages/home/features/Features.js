import homeCSS from '../home.module.css';
import { FaLandmark, FaBucket, FaCalculator, FaChartPie } from "react-icons/fa6";
import AccountImage from './AccountImage';

const Features = ({featuresScroll}) => {
    const features = [
        {title: 'Track Accounts', subtitle: 'Accounts',icon: <FaLandmark/>, image: <AccountImage/>, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {title: 'Create Budgets', subtitle: 'Budgets', icon: <FaCalculator/>, image: '', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {title: 'Categorize Expenses', subtitle: 'Categories', icon: <FaBucket/>, image: '', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {title: 'Summarize Spending', subtitle: 'Summary', icon: <FaChartPie/>, image: '', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
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
                        {feature.image}
                    </>
                ))}
            </div>
        </section>
    );
};

export default Features;