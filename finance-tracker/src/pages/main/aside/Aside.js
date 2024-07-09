import mainCSS from '../main.module.css';
import { FaBolt, FaLandmark, FaCalculator, FaPlus } from "react-icons/fa6";
import AddTransactions from '../actions/AddTransactions';
import { useEffect, useState } from 'react';
import AddAccount from '../actions/AddAccount';
import AddBudget from '../actions/AddBudget';
import Budget from './budgets/Budget';
import Account from './accounts/Account';
import { categories } from '../../../context/data.js';

const Aside = ({accounts, budgets, transactions, toast}) => {
    const [transactionsOpen, setTransactionsOpen] = useState(false);
    const [accountsOpen, setAccountsOpen] = useState(false);
    const [budgetsOpen, setBudgetsOpen] = useState(false);

    const [mobileActionsOpen, setMobileActionsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 599) {
                setMobileActionsOpen(false);
            };
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <aside>
                <div className={mainCSS.actions}>
                    <div className={mainCSS.sectionHeader}>
                        <FaBolt/>
                        <h3>Actions</h3>
                    </div>
                    <div className={`${mainCSS.actionsItems} ${mainCSS.items} ${!mobileActionsOpen && mainCSS.mobileActionsClosed}`}>
                        <button onClick={() => setTransactionsOpen(true)}>+ Transaction</button>
                        <AddTransactions 
                            accounts={accounts}
                            categories={categories} 
                            transactionsOpen={transactionsOpen}
                            setTransactionsOpen={setTransactionsOpen}
                            toast={toast}
                        />
                        <button onClick={() => setAccountsOpen(true)}>+ Account</button>
                        <AddAccount
                            accountsOpen={accountsOpen}
                            setAccountsOpen={setAccountsOpen}
                            toast={toast}
                        />
                        <button onClick={() => setBudgetsOpen(true)}>+ Budget</button>
                        <AddBudget
                            accounts={accounts}
                            categories={categories}
                            budgetsOpen={budgetsOpen}
                            setBudgetsOpen={setBudgetsOpen}
                            toast={toast}
                        />
                    </div>
                </div>
                <div className={mainCSS.accounts}>
                    <div className={mainCSS.sectionHeader}>
                        <FaLandmark/>
                        <h3>Accounts</h3>
                    </div>
                    <div className={`${mainCSS.accountsItems} ${mainCSS.items}`}>
                        {accounts.map((account, index) => (
                            <Account
                                key={index}
                                account={account}
                                accounts={accounts}
                                transactions={transactions}
                                toast={toast}
                            />
                        ))}
                    </div>
                </div>
                <div className={mainCSS.budgets}>
                    <div className={mainCSS.sectionHeader}>
                        <FaCalculator/>
                        <h3>Budgets</h3>
                    </div>
                    <div className={`${mainCSS.budgetsItems} ${mainCSS.items}`}>
                        {budgets.map((budget, index) => (
                            <Budget
                                key={index}
                                budget={budget}
                                accounts={accounts}
                                transactions={transactions}
                                toast={toast}
                            />
                        ))}
                    </div>
                </div>
            </aside>
            
            <div className={`${mainCSS.mobileActions} ${mobileActionsOpen && mainCSS.mobileActionsBkg}`}>
                <FaPlus 
                    id={mainCSS.mobileActionsIcon}
                    onClick={() => setMobileActionsOpen(!mobileActionsOpen)}
                />
            </div>
        </>
    );
};

export default Aside;