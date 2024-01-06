import mainCSS from './main.module.css';
import NewUser from '../new-user/NewUser.js';
import Aside from './Aside.js';
import Summary from './Summary.js';
import Transactions from './Transactions.js';
import Buckets from './Buckets.js';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Loading = () => {
    return (
        <>
            <h1 style={{paddingTop: "40vh", textAlign: 'center'}}>Loading...</h1>
        </>
    );
}


const Main = () => {
    const buckets = [
        {name: "Shopping", amount: "0.00"}, {name: "Restaurants", amount: "0.00"},
        {name: "Groceries", amount: "0.00"}, {name: "Entertainment", amount: "0.00"},
        {name: "Bills", amount: "0.00"}, {name: "Education", amount: "0.00"},
        {name: "Transportation", amount: "0.00"}, {name: "Investments", amount: "0.00"},
        {name: "Health", amount: "0.00"}, {name: "Pets", amount: "0.00"}
    ];

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
                    where('uid', '==', user.uid)
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
                    where('uid', '==', user.uid)
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
                    where("uid", "==", user.uid)
                );
                const unsubscribe3 = onSnapshot(queryTransactions, (snapshot) => {
                    let transactions = [];
                    snapshot.forEach((doc) => {
                        transactions.push({...doc.data(), docId: doc.id});
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
                <img className={mainCSS.profile} src={auth.currentUser.photoURL} alt='Profile'/>
            </header>

            <Aside accounts={accounts} budgets={budgets} buckets={buckets}/>

            <Summary/>

            <Transactions transactions={transactions}/>

            <Buckets buckets={buckets} transactions={transactions}/>
        </main>
    );
};

export default Main;