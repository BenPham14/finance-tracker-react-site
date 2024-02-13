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
import { categories, convertTimestampToDate } from '../../context/context.js';

const Loading = () => {
    return (
        <>
            <h1 style={{paddingTop: "40vh", textAlign: 'center'}}>Loading...</h1>
        </>
    );
}

const Main = () => {
    const [accounts, setAccounts] = useState([]);
    const accountsRef = collection(db, 'accounts');
    const [budgets, setBudgets] = useState([]);
    const budgetsRef = collection(db, 'budgets');
    const transactionsRef = collection(db, "transactions");
    const [transactions, setTransactions] = useState([]);
    const [showNewUser, setShowNewUser] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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

    if (!isLoading && showNewUser) {
        return <NewUser setShowNewUser={setShowNewUser}/>;
    } else if (isLoading) {
        return <Loading/>
    };

    return (
        <main className={mainCSS.main}>
            <header>
                <h1>FinTracker</h1>
                <img className={mainCSS.profile} src={auth.currentUser.photoURL} alt='Profile' referrerPolicy="no-referrer"/>
            </header>

            <Aside accounts={accounts} budgets={budgets} categories={categories} transactions={transactions}/>

            <Summary/>

            <Transactions transactions={transactions}/>

            <Categories categories={categories} transactions={transactions}/>
        </main>
    );
};

export default Main;