import mainCSS from './main.module.css';
import NewUser from '../new-user/NewUser.js';
import Aside from './aside/Aside.js';
import Summary from './summary/Summary.js';
import Transactions from './transactions/Transactions.js';
import Categories from './categories/Categories.js';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { convertTimestampToDate } from '../../context/helper.js';
import Cookies from 'universal-cookie';
import Profile from './profile/Profile.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

const Main = ({setIsAuth}) => {
    const [darkMode, setDarkMode] = useState(false);

    const [accounts, setAccounts] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const accountsRef = collection(db, 'accounts');
    const budgetsRef = collection(db, 'budgets');
    const transactionsRef = collection(db, "transactions");
    const usersRef = collection(db, "users");
    
    const [showNewUser, setShowNewUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isDemoUser, setIsDemoUser] = useState(false);

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
                });

                const queryUsers = query(
                    usersRef,
                    where("__name__", "==", user.uid)
                );
                const unsubscribe4 = onSnapshot(queryUsers, (snapshot) => {
                    snapshot.forEach((doc) => {
                        setIsDemoUser(true);
                    });
                });

                setIsLoading(false);
                return () => {
                    unsubscribe1();
                    unsubscribe2();
                    unsubscribe3();
                    unsubscribe4();
                };
            }
        })
    }, []);

    const signOutUser = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth(false);
    };

    const setTheme = () => {
        setDarkMode(!darkMode);
        localStorage.setItem("darkMode", !darkMode);
    };

    if (!isLoading && showNewUser) {
        return <NewUser setShowNewUser={setShowNewUser}/>;
    } else if (isLoading) {
        return <h1 className={mainCSS.loading} id={darkMode ? "dark" : "light"}>Loading...</h1>;
    };

    return (
        <div className={`${mainCSS.mainBkg} ${darkMode && "mainBkgDark"}`} id={darkMode ? "dark" : "light"}>
            <main className={mainCSS.main}>
                <header>
                    <h1>Finance Tracker</h1>
                    <div className={mainCSS.profileIcons}>
                        <Profile 
                            signOutUser={signOutUser} 
                            user={auth.currentUser}
                            darkMode={darkMode}
                            setTheme={setTheme}
                            isDemoUser={isDemoUser}
                        />
                    </div>
                </header>

                {isDemoUser &&
                    <div className={mainCSS.demoBanner}>
                        <p>You are currently in demo mode and will not be able to make changes. To make changes, <span onClick={signOutUser}>return to the home page</span> and log-in or create an account.</p>
                    </div>
                }

                <div className={mainCSS.body}>
                    <Aside accounts={accounts} budgets={budgets} transactions={transactions} toast={toast}/>

                    <div>
                        <Summary accounts={accounts} transactions={transactions}/>

                        <Transactions accounts={accounts} transactions={transactions}/>

                        <Categories accounts={accounts} transactions={transactions}/>
                    </div>
                </div>
            </main>
            <ToastContainer
                draggable
                theme='colored'
            />
        </div>
    );
};

export default Main;