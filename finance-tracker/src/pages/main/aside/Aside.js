import mainCSS from '../main.module.css';
import { FaBolt, FaLandmark, FaMoneyBillTransfer, FaCalculator } from "react-icons/fa6";
import AddTransactions from '../actions/AddTransactions';
import { useState } from 'react';
import AddAccount from '../actions/AddAccount';
import AddBudget from '../actions/AddBudget';
import Budget from './budgets/Budget';
import Account from './accounts/Account';
import { categories } from '../../../context/data.js';

const Aside = ({accounts, budgets, transactions, toast}) => {
    const [transactionsOpen, setTransactionsOpen] = useState(false);
    const [accountsOpen, setAccountsOpen] = useState(false);
    const [budgetsOpen, setBudgetsOpen] = useState(false);

    return (
        <aside>
            <div>
                <div className={mainCSS.sectionHeader}>
                    <FaBolt/>
                    <h3>Actions</h3>
                </div>
                <div className={`${mainCSS.actionsItems} ${mainCSS.items}`}>
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
    );
};

export default Aside;