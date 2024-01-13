import newUserCSS from './newUserCSS.module.css';
import getStarted from '../../assets/undraw_start_building_re_xani.svg';
import account from '../../assets/undraw_online_payments_re_y8f2.svg';
import budget from '../../assets/undraw_transfer_money_re_6o1h.svg';
import allSet from '../../assets/undraw_done_re_oak4.svg';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import {v4 as uuidv4} from 'uuid';
import Multiselect from "../../components/multiselect/Multiselect";

const CarouselItem = ({id, title, image, text, custom, currentStep}) => {
    return (
        <div className={newUserCSS.carouselItem} style={{display: currentStep !== id && 'none'}}>
            <h2>{title}</h2>
            <img src={image} alt={title}/>
            {
                text !== "" && <p>{text}</p>
            }
            {custom}
        </div>
    );
};

const NewUser = ({setShowNewUser}) => {
    const accountId = uuidv4();
    const [accountValue, setAccountValue] = useState('');
    const [budgetValue, setBudgetValue] = useState('');
    const [limitValue, setLimitValue] = useState('');
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const categories = [
        {name: "Shopping", amount: "0.00"}, {name: "Restaurants", amount: "0.00"},
        {name: "Groceries", amount: "0.00"}, {name: "Entertainment", amount: "0.00"},
        {name: "Bills", amount: "0.00"}, {name: "Education", amount: "0.00"},
        {name: "Transportation", amount: "0.00"}, {name: "Investments", amount: "0.00"},
        {name: "Health", amount: "0.00"}, {name: "Pets", amount: "0.00"}
    ];

    const items = [
        {
            id: 1, 
            title: 'Get Started', 
            image: getStarted, text: "Hi, welcome to the Fintracker site! Let's get you set up. In the next steps, you will be creating your first account and budget.", 
            custom: ''
        },
        {
            id: 2, 
            title: 'Create Account', 
            image: account, text: "Enter a name for your first account:", 
            custom: <input placeholder="Name" value={accountValue} onChange={(e) => setAccountValue(e.target.value)}/>
        },
        {id: 3, 
            title: 'Create Budget', 
            image: budget, 
            text: "", 
            custom: 
                <div className={newUserCSS.budget}>
                    <input placeholder="Name" value={budgetValue} onChange={(e) => setBudgetValue(e.target.value)}/>
                    <input placeholder="Limit" type="number" min={1} value={limitValue} onChange={(e) => setLimitValue(e.target.value)}/>
                    <Multiselect
                        data={categories}
                        value={categoriesValue}
                        setValue={setCategoriesValue}
                        isOpen={categoriesOpen}
                        setIsOpen={setCategoriesOpen}
                        modalOpen={true}
                    />
                </div>
        },
        {
            id: 4, 
            title: 'All Set', 
            image: allSet, 
            text: 'You are all set! Let the budgeting begin!', 
            custom: ''
        },
    ];

    const [currentStep, setCurrentStep] = useState(1);

    const decrementStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        };
    };

    const incrementStep = () => {
        if ((currentStep === 2 && accountValue === '') || (currentStep === 3 && (budgetValue === '' || limitValue === '' || limitValue < 1))) {
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
        if ((currentStep === 2 && accountValue === '') || (currentStep === 3 && (budgetValue === '' || limitValue === '' || limitValue < 1))) {
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
            createdAt: serverTimestamp(),
            name: accountValue,
            amount: '0'
        });

        await addDoc(budgetsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            createdAt: serverTimestamp(),
            name: budgetValue,
            amount: '0',
            limit: limitValue,
            categories: categoriesValue
        });
        
        setShowNewUser(false);
        setAccountValue('');
        setBudgetValue('');
        setLimitValue('');
        setCategoriesValue([]);
        setCategoriesOpen(false);
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