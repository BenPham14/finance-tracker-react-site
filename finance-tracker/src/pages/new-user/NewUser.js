import newUserCSS from './newUser.module.css';
import Item from './Item';
import NavButtons from './NavButtons';
import getStarted from '../../assets/undraw_start_building_re_xani.svg';
import account from '../../assets/undraw_online_payments_re_y8f2.svg';
import budget from '../../assets/undraw_transfer_money_re_6o1h.svg';
import allSet from '../../assets/undraw_done_re_oak4.svg';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import {v4 as uuidv4} from 'uuid';
import Multiselect from "../../components/multiselect/Multiselect";
import { calculateDates, changePlaceholderColor, displayAmounts, validateNumInput } from '../../context/helper.js';
import { categories, periodOptions } from '../../context/data.js';

const NewUser = ({setShowNewUser, signOutUser}) => {
    const accountId = uuidv4();
    const [data, setData] = useState({
        account: "",
        budget: "",
        limit: "",
        period: ""
    });
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const items = [
        {
            id: 1, 
            title: 'Get Started', 
            image: getStarted, text: "Hi, welcome to the Finance Tracker site! Let's get you set up. In the next steps, you will be creating your first account and budget.", 
            custom: ''
        },
        {
            id: 2, 
            title: 'Create Account', 
            image: account, text: "Enter a name for your first account:", 
            custom: <input placeholder="Name" value={data.account} onChange={(e) => setData({...data, account: e.target.value})}/>
        },
        {id: 3, 
            title: 'Create Budget', 
            image: budget, 
            text: "", 
            custom: 
                <div className={newUserCSS.budget}>
                    <input placeholder="Name" value={data.budget} onChange={(e) => setData({...data, budget: e.target.value})}/>
                    <input placeholder="Limit" type="number" min={1} step="0.01"
                        value={data.limit} onChange={(e) => validateNumInput(e.target.value, data, setData, "limit")}
                    />
                    <select name="period" required style={{color: changePlaceholderColor(data.period)}}
                        value={data.period} onChange={(e) => setData({...data, period: e.target.value})}
                    >
                        <option value="" disabled>Period</option>
                        {periodOptions.map((period, index) => {
                            return Array.from({length: period.count}, (_, i) => i + 1).map((c) => {
                                return <option key={index + '-' + c} value={`${c} ${period.name}`}>{c} {period.name}</option>
                            })
                        })}
                    </select>
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

    const accountsRef = collection(db, "accounts");
    const budgetsRef = collection(db, "budgets");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dates = calculateDates(data.period);

        await addDoc(accountsRef, {
            uid: auth.currentUser.uid,
            id: accountId,
            createdAt: serverTimestamp(),
            name: data.account,
            amount: '0'
        });

        await addDoc(budgetsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            createdAt: serverTimestamp(),
            name: data.budget,
            limit: displayAmounts(parseFloat(data.limit)),
            amount: '0',
            period: data.period,
            periodStart: dates.startDate,
            periodEnd: dates.endDate,
            categories: categoriesValue
        });
        
        setShowNewUser(false);
        setData({
            account: "",
            budget: "",
            limit: "",
            period: ""
        });
        setCategoriesValue([]);
        setCategoriesOpen(false);
    };

    return (
        <main className={newUserCSS.newUser}>
            <div className={newUserCSS.steps}>
                {items.map((item) => (
                    <>
                        <p id={item.id} style={{backgroundColor: currentStep >= item.id && '#6C63FF', color: currentStep >= item.id && 'white'}}>{item.id}</p>
                        <hr/>
                    </>
                ))}
            </div>
            <form id='new-user' className={newUserCSS.carousel} onSubmit={handleSubmit}>
                {items.map((item) => (
                    <Item key={item.id}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        text={item.text}
                        custom={item.custom}
                        currentStep={currentStep}
                    />
                ))}
            </form>
            <NavButtons
                data={data}
                items={items}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                signOutUser={signOutUser}
            />
        </main>
    );
};

export default NewUser;