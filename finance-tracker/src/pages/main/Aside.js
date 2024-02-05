import mainCSS from './main.module.css';
import { FaBolt, FaLandmark, FaMoneyBillTransfer } from "react-icons/fa6";
import AddTransactions from './actions/AddTransactions';
import { useState } from 'react';
import AddAccount from './actions/AddAccount';
import AddBudget from './actions/AddBudget';
import Budget from './aside/Budget';
import Account from './aside/Account';

const Aside = ({accounts, budgets, categories, transactions}) => {
    const [transactionsOpen, setTransactionsOpen] = useState(false);
    const [accountsOpen, setAccountsOpen] = useState(false);
    const [budgetsOpen, setBudgetsOpen] = useState(false);

    return (
        <aside>
            <div>
                <div className={mainCSS.sectionHeader}>
                    <FaBolt/>
                    <p>Actions</p>
                </div>
                <div className={`${mainCSS.actionsItems} ${mainCSS.items}`}>
                    <button onClick={() => setTransactionsOpen(true)}>+ Transaction</button>
                    <AddTransactions 
                        accounts={accounts}
                        categories={categories} 
                        transactionsOpen={transactionsOpen}
                        setTransactionsOpen={setTransactionsOpen}
                    />
                    <button onClick={() => setAccountsOpen(true)}>+ Account</button>
                    <AddAccount
                        accountsOpen={accountsOpen}
                        setAccountsOpen={setAccountsOpen}
                    />
                    <button onClick={() => setBudgetsOpen(true)}>+ Budget</button>
                    <AddBudget
                        accounts={accounts}
                        categories={categories}
                        budgetsOpen={budgetsOpen}
                        setBudgetsOpen={setBudgetsOpen}
                    />
                </div>
            </div>
            <div className={mainCSS.accounts}>
                <div className={mainCSS.sectionHeader}>
                    <FaLandmark/>
                    <p>Accounts</p>
                </div>
                <div className={`${mainCSS.accountsItems} ${mainCSS.items}`}>
                    {
                        accounts.map((account, index) => (
                            <Account
                                key={index}
                                account={account}
                                transactions={transactions}
                            />
                        ))
                    }
                </div>
            </div>
            <div className={mainCSS.budgets}>
                <div className={mainCSS.sectionHeader}>
                    <FaMoneyBillTransfer/>
                    <p>Budgets</p>
                </div>
                <div className={`${mainCSS.budgetsItems} ${mainCSS.items}`}>
                    {
                        budgets.map((budget, index) => (
                            <Budget
                                key={index}
                                budget={budget}
                            />
                        ))
                    }
                </div>
            </div>
        </aside>
    );
};

export default Aside;