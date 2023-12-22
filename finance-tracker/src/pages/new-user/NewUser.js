import newUserCSS from './newUserCSS.module.css';
import getStarted from '../../assets/undraw_start_building_re_xani.svg';
import account from '../../assets/undraw_online_payments_re_y8f2.svg';
import budget from '../../assets/undraw_transfer_money_re_6o1h.svg';
import allSet from '../../assets/undraw_done_re_oak4.svg';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import {v4 as uuidv4} from 'uuid';

const CarouselItem = ({id, title, image, text, custom, currentStep}) => {
    return (
        <div className={newUserCSS.carouselItem} style={{display: currentStep !== id && 'none'}}>
            <h2>{title}</h2>
            <img src={image} alt={title}/>
            <p>{text}</p>
            {custom}
        </div>
    );
};

const NewUser = ({setShowNewUser}) => {
    const [accountValue, setAccountValue] = useState('');
    const accountId = uuidv4();
    const [budgetValue, setBudgetValue] = useState('');

    const items = [
        {id: 1, title: 'Get Started', image: getStarted, text: "Hi, welcome to the Fintracker site! Let's get you set up. In the next steps, you will be creating your first account and budget.", custom: ''},
        {id: 2, title: 'Create Account', image: account, text: "Enter a name for your first account:", custom: <input value={accountValue} onChange={(e) => setAccountValue(e.target.value)}/>},
        {id: 3, title: 'Create Budget', image: budget, text: "Enter a name for your first budget:", custom: <input value={budgetValue} onChange={(e) => setBudgetValue(e.target.value)}/>},
        {id: 4, title: 'All Set', image: allSet, text: 'You are all set! Let the budgeting begin!', custom: ''},
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const decrementStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        };
    };

    const incrementStep = () => {
        if ((currentStep === 2 && accountValue === '') || (currentStep === 3 && budgetValue === '')) {
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
        if ((currentStep === 2 && accountValue === '') || (currentStep === 3 && budgetValue === '')) {
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

    const accountsRef = collection(db, "accounts");
    const budgetsRef = collection(db, "budgets");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addDoc(accountsRef, {
            uid: auth.currentUser.uid,
            id: accountId,
            name: accountValue,
            amount: '0'
        });

        await addDoc(budgetsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            name: budgetValue,
            amount: '0',
            limit: '0',
            accountId: accountId,
            accountName: accountValue
        });
        
        setShowNewUser(false);
        setAccountValue('');
        setBudgetValue('');
    };

    return (
        <main className={newUserCSS.newUser}>
            <div className={newUserCSS.steps}>
                {
                    items.map((item) => (
                        <>
                            <p id={item.id} style={{backgroundColor: currentStep >= item.id && '#6C63FF', color: currentStep >= item.id && 'white'}}>{item.id}</p>
                            <hr/>
                        </>
                    ))
                }
            </div>
            <form id='new-user' className={newUserCSS.carousel} onSubmit={handleSubmit}>
                {
                    items.map((item) => (
                        <CarouselItem key={item.id}
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            text={item.text}
                            custom={item.custom}
                            currentStep={currentStep}
                        />
                    ))
                }
            </form>
            <div className={newUserCSS.carouselNav}>
                <button onClick={decrementStep} style={{backgroundColor: fadeBackButton()}}>Back</button>
                <button onClick={incrementStep} style={{backgroundColor: fadeNextButton(), display: hideNextButton()}}>Next</button>
                <button type='submit' form='new-user' style={{display: showFinishButton()}}>Finish</button>
            </div>
        </main>
    );
};

export default NewUser;