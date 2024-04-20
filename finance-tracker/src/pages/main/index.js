import mainCSS from './main.module.css';
import NewUser from '../new-user/NewUser.js';
import Aside from './aside/Aside.js';
import Summary from './summary/Summary.js';
import Transactions from './transactions/Transactions.js';
import Categories from './categories/Categories.js';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { convertTimestampToDate } from '../../context/context.js';
import { IoMoon, IoSunny } from "react-icons/io5";

const Loading = () => {
    return (
        <>
            <h1 style={{paddingTop: "40vh", textAlign: 'center'}}>Loading...</h1>
        </>
    );
}

const Main = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const accountsRef = collection(db, 'accounts');
    const [budgets, setBudgets] = useState([]);
    const budgetsRef = collection(db, 'budgets');
    const transactionsRef = collection(db, "transactions");
    const [transactions, setTransactions] = useState([]);
    const [showNewUser, setShowNewUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setDarkMode(JSON.parse(localStorage.getItem("darkMode")));
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const queryAccounts = query(
                    accountsRef, 
                    where('uid', '==', user.uid),
                    orderBy('createdAt')
                );
                const unsubscribe1 = onSnapshot(queryAccounts, (snapshot) => {
                    let accounts = [];
                    snapshot.forEach((doc) => {
                        accounts.push({...doc.data(), docId: doc.id});
                    });
                    setAccounts(accounts);
                    if (accounts.length === 0) {
                        setShowNewUser(true);
                    };
                });

                const queryBudgets = query(
                    budgetsRef,
                    where('uid', '==', user.uid),
                    orderBy('createdAt')
                );
                const unsubscribe2 = onSnapshot(queryBudgets, (snapshot) => {
                    let budgets = [];
                    snapshot.forEach((doc) => {
                        budgets.push({...doc.data(), docId: doc.id});
                    });
                    setBudgets(budgets);
                });

                const queryTransactions = query(
                    transactionsRef,
                    where("uid", "==", user.uid),
                    orderBy("date", "desc")
                );
                const unsubscribe3 = onSnapshot(queryTransactions, (snapshot) => {
                    let transactions = [];
                    snapshot.forEach((doc) => {
                        transactions.push({
                            ...doc.data(), 
                            docId: doc.id, 
                            date: convertTimestampToDate(doc.data().date).toLocaleDateString(), 
                            timeStamp: doc.data().date
                        });
                    });
                    setTransactions(transactions);
                })

                setIsLoading(false);
                return () => {
                    unsubscribe1();
                    unsubscribe2();
                    unsubscribe3();
                };
            }
        })
    }, []);

    const setTheme = (mode) => {
        setDarkMode(mode);
        localStorage.setItem("darkMode", mode);
    };

    if (!isLoading && showNewUser) {
        return <NewUser setShowNewUser={setShowNewUser}/>;
    } else if (isLoading) {
        return <Loading/>
    };

    return (
        <div className={mainCSS.mainBkg} id={darkMode ? "dark" : "light"}>
            <main className={mainCSS.main}>
                <header>
                    <h1>Finance Tracker</h1>
                    <div className={mainCSS.profileIcons}>
                        {
                            darkMode ? 
                                <IoSunny onClick={() => setTheme(false)}/> : 
                                <IoMoon onClick={() => setTheme(true)}/>
                        }
                        <img className={mainCSS.profile} src={auth.currentUser.photoURL} alt='Profile' referrerPolicy="no-referrer"/>
                    </div>
                </header>

                <div className={mainCSS.body}>
                    <Aside accounts={accounts} budgets={budgets} transactions={transactions}/>

                    <div>
                        <Summary transactions={transactions}/>

                        <Transactions transactions={transactions}/>

                        <Categories transactions={transactions}/>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Main;