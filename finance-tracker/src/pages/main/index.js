import { collection, onSnapshot, query, where } from 'firebase/firestore';
import NewUser from './NewUser';
import mainCSS from './main.module.css';
import { FaBucket, FaLandmark, FaCreditCard, FaCalendar, FaMoneyBillTransfer } from "react-icons/fa6";
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';


const Main = () => {
    // const accounts = [
    //     {name: "Account", amount: "0.00"},
    //     {name: "Account", amount: "0.00"},
    //     {name: "Account", amount: "0.00"}
    // ];

    const budgets = [
        {name: "Budget", amount: "0.00", limit: "0.00"},
        {name: "Budget", amount: "0.00", limit: "0.00"}
    ];

    const transactions = [
        {name: "McDonald's", category: "Restaurants", date: "01/01/2023", amount: "0.00"},
        {name: "McDonald's", category: "Restaurants", date: "01/01/2023", amount: "0.00"},
        {name: "McDonald's", category: "Restaurants", date: "01/01/2023", amount: "0.00"},
        {name: "McDonald's", category: "Restaurants", date: "01/01/2023", amount: "0.00"}
    ];

    const buckets = [
        {name: "Shopping", amount: "0.00"}, {name: "Restaurants", amount: "0.00"},
        {name: "Groceries", amount: "0.00"}, {name: "Entertainment", amount: "0.00"},
        {name: "Bills", amount: "0.00"}, {name: "Education", amount: "0.00"},
        {name: "Transportation", amount: "0.00"}, {name: "Investments", amount: "0.00"},
        {name: "Health", amount: "0.00"}, {name: "Pets", amount: "0.00"}
    ];

    const [accounts, setAccounts] = useState([]);
    const accountsRef = collection(db, 'accounts');

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const queryAccounts = query(
                    accountsRef, 
                    where('uid', '==', user.uid)
                );
                const unsubscribe = onSnapshot(queryAccounts, (snapshot) => {
                    let accounts = [];
                    snapshot.forEach((doc) => {
                        accounts.push({...doc.data(), id: doc.id});
                    });
                    setAccounts(accounts);
                });
                return () => unsubscribe();
            }
        })
    }, []);

    if (accounts.length === 0) {
        return <NewUser/>;
    };

    return (
        <main className={mainCSS.main}>
            <header>
                <h1>FinTracker</h1>
                <img src='' alt='Profile'/>
            </header>

            <aside>
                <div className={mainCSS.accounts}>
                    <div className={mainCSS.sectionHeader}>
                        <FaLandmark/>
                        <p>Accounts</p>
                    </div>
                    <div className={mainCSS.accountsItems}>
                        {
                            accounts.map((account, index) => (
                                <button key={index}>
                                    <p>{account.name}</p>
                                    <p>${account.amount}</p>
                                </button>
                            ))
                        }
                    </div>
                    
                </div>
                <div className={mainCSS.budgets}>
                    <div className={mainCSS.sectionHeader}>
                        <FaMoneyBillTransfer/>
                        <p>Budgets</p>
                    </div>
                    <div className={mainCSS.budgetsItems}>
                        {
                            budgets.map((budget, index) => (
                                <button key={index}>
                                    <p>{budget.name}</p>
                                    <p>${budget.amount} out of ${budget.limit}</p>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </aside>

            <section className={mainCSS.summary}>
                <div className={mainCSS.sectionHeader}>
                    <FaCalendar/>
                    <p>Summary</p>
                </div>
                <div className={mainCSS.summaryItems}>
                    <button>
                        <p>Today</p>
                    </button>
                    <button>
                        <p>This Week</p>
                    </button>
                    <button>
                        <p>This Month</p>
                    </button>
                    <button>
                        <p>This Year</p>
                    </button>
                </div>
            </section>

            <section className={mainCSS.transactions}>
                <div className={mainCSS.sectionHeader}>
                    <FaCreditCard/>
                    <p>Transactions</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{transaction.name}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.date}</td>
                                    <td>${transaction.amount}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </section>

            <section className={mainCSS.buckets}>
                <div className={mainCSS.sectionHeader}>
                    <FaBucket/>
                    <p>Buckets</p>
                </div>
                <div className={mainCSS.bucketItems}>
                    {
                        buckets.map((bucket, index) => (
                            <button key={index}>
                                <p>{bucket.name}</p>
                                <p>${bucket.amount}</p>
                            </button>
                        ))
                    }
                </div>
            </section>
        </main>
    );
};

export default Main;