import mainCSS from '../main.module.css';
import { FaBolt, FaLandmark, FaMoneyBillTransfer } from "react-icons/fa6";
import AddTransactions from './AddTransactions';
import { useState } from 'react';
import AddAccount from './AddAccount';

const Aside = ({accounts, budgets, buckets}) => {
    const [transactionsOpen, setTransactionsOpen] = useState(false);
    const [accountsOpen, setAccountsOpen] = useState(false);

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
                        buckets={buckets} 
                        transactionsOpen={transactionsOpen}
                        setTransactionsOpen={setTransactionsOpen}
                    />
                    <button onClick={() => setAccountsOpen(true)}>+ Account</button>
                    <AddAccount
                        accountsOpen={accountsOpen}
                        setAccountsOpen={setAccountsOpen}
                    />
                    <button>+ Budget</button>
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
                <div className={`${mainCSS.budgetsItems} ${mainCSS.items}`}>
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
    );
};

export default Aside;