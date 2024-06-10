import homeCSS from '../home.module.css';
import { FaLandmark, FaBucket, FaCalculator, FaChartPie } from "react-icons/fa6";
import accountBkg from '../../../assets/main-account-bkg.png';
import accountPopUp from '../../../assets/main-account-popup.png';
import budgetBkg from '../../../assets/main-budget-bkg.png';
import budgetPopUp from '../../../assets/main-budget-popup.png';
import categoriesBkg from '../../../assets/main-categories-bkg.png';
import categoriesPopUp from '../../../assets/main-categories-popup.png';
import summaryBkg from '../../../assets/main-summary-bkg.png';
import summaryPopUp from '../../../assets/main-summary-popup.png';
import Image from './Image';

const Features = ({featuresScroll}) => {
    const features = [
        {
            className: homeCSS.accountImg, 
            title: 'Track Accounts', 
            subtitle: 'Accounts', 
            icon: <FaLandmark/>, 
            image: {bkg: accountBkg, popup: accountPopUp}, 
            description: "Experience streamlined financial tracking with our account management feature and get a clear view of all your transactions from each of your accounts."
        },
        {
            className: homeCSS.budgetImg, 
            title: 'Create Budgets', 
            subtitle: 'Budgets', 
            icon: <FaCalculator/>, 
            image: {bkg: budgetBkg, popup: budgetPopUp}, 
            description: "Make budgeting intuitive and clear with our built-in budgeting tool, ensuring you're always in control of your budgeting goals."
        },
        {
            className: homeCSS.categoriesImg, 
            title: 'Categorize Expenses', 
            subtitle: 'Categories', 
            icon: <FaBucket/>, 
            image: {bkg: categoriesBkg, popup: categoriesPopUp}, 
            description: "Easily access and monitor your expenditures within each category, enabling you to get a clear view of the areas where you are spending your money."
        },
        {
            className: homeCSS.summaryImg, 
            title: 'Summarize Spending', 
            subtitle: 'Summary', 
            icon: <FaChartPie/>, 
            image: {bkg: summaryBkg, popup: summaryPopUp}, 
            description: "Elevate your financial awareness with our summary view which provides insights based on your transaction history on a daily, weekly, monthly, or yearly timeframe."
        }
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
                        <Image
                            id={feature.className}
                            bkgImage={feature.image.bkg}
                            popupImage={feature.image.popup}
                        />
                    </>
                ))}
            </div>
        </section>
    );
};

export default Features;