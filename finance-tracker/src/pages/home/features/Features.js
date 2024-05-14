import homeCSS from '../home.module.css';
import { FaLandmark, FaBucket, FaCalculator, FaChartPie } from "react-icons/fa6";
import accountBkg from '../../../assets/main-account-bkg.png';
import accountPopUp from '../../../assets/main-account.png';
import budgetBkg from '../../../assets/main-budget-bkg.png';
import budgetPopUp from '../../../assets/main-budget-popup.png';
import categoriesBkg from '../../../assets/main-categories-bkg.png';
import categoriesPopUp from '../../../assets/main-categories-popup.png';
import summaryBkg from '../../../assets/main-summary-bkg.png';
import summaryPopUp from '../../../assets/main-summary-popup.png';
import Image from './Image';

const Features = ({featuresScroll}) => {
    const features = [
        {className: homeCSS.accountImg, title: 'Track Accounts', subtitle: 'Accounts', icon: <FaLandmark/>, image: {bkg: accountBkg, popup: accountPopUp}, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {className: homeCSS.budgetImg, title: 'Create Budgets', subtitle: 'Budgets', icon: <FaCalculator/>, image: {bkg: budgetBkg, popup: budgetPopUp}, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {className: homeCSS.categoriesImg, title: 'Categorize Expenses', subtitle: 'Categories', icon: <FaBucket/>, image: {bkg: categoriesBkg, popup: categoriesPopUp}, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
        {className: homeCSS.summaryImg, title: 'Summarize Spending', subtitle: 'Summary', icon: <FaChartPie/>, image: {bkg: summaryBkg, popup: summaryPopUp}, description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
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