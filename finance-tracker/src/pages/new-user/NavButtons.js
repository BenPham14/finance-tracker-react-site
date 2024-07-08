import newUserCSS from './newUser.module.css';
import { IoMdExit } from "react-icons/io";

const NavButtons = ({data, items, currentStep, setCurrentStep, signOutUser}) => {
    const decrementStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        };
    };

    const incrementStep = () => {
        if ((currentStep === 2 && data.account === '') || (currentStep === 3 && (data.budget === '' || data.limit === '' || data.limit < 1 || data.period === ''))) {
            return
        } else if (currentStep < items.length) {
            setCurrentStep(currentStep + 1);
        };
    };

    const fadeBackButton = () => {
        if (currentStep === 1) {
            return '#6b63ff80';
        };
    };

    const fadeNextButton = () => {
        if ((currentStep === 2 && data.account === '') || (currentStep === 3 && (data.budget === '' || data.limit === '' || data.limit < 1 || data.period === ''))) {
            return '#6b63ff80';
        };
    };

    const hideNextButton = () => {
        if (currentStep === 4) {
            return 'none';
        };
    };

    const showFinishButton = () => {
        if (currentStep !== 4) {
            return 'none';
        };
    };
    return (
        <div className={newUserCSS.carouselNav}>
            <IoMdExit id={newUserCSS.signOut} onClick={signOutUser}/>
            <button onClick={decrementStep} style={{backgroundColor: fadeBackButton()}}>Back</button>
            <button onClick={incrementStep} style={{backgroundColor: fadeNextButton(), display: hideNextButton()}}>Next</button>
            <button type='submit' form='new-user' style={{display: showFinishButton()}}>Finish</button>
        </div>
    );
};

export default NavButtons;