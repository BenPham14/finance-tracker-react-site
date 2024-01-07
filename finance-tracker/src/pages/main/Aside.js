import mainCSS from './main.module.css';
import { FaBolt, FaLandmark, FaMoneyBillTransfer } from "react-icons/fa6";
import AddTransactions from './actions/AddTransactions';
import { useState } from 'react';
import AddAccount from './actions/AddAccount';
import AddBudget from './actions/AddBudget';
import AccountDetails from './details/AccountDetails';

const AccountItem = ({id, name, amount, openAccountDetails}) => {
    return (
        <button onClick={() => openAccountDetails(id, name, amount)}>
            <p>{name}</p>
            <p>${amount}</p>
        </button>
    );
};

const Aside = ({accounts, budgets, buckets, transactions}) => {
    const [transactionsOpen, setTransactionsOpen] = useState(false);
    const [accountsOpen, setAccountsOpen] = useState(false);
    const [budgetsOpen, setBudgetsOpen] = useState(false);
    const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);
    const [accountDetailsData, setAccountDetailsData] = useState({});

    const openAccountDetails = (id, title, amount) => {
        setAccountDetailsOpen(true);
        setAccountDetailsData({id: id, title: title, amount: amount});
    };

    const accountAmount = (id) => {
        let amount = 0;
        transactions.forEach((transaction) => {
            if (transaction.accountId === id) {
                amount += parseInt(transaction.amount);
            };
        });
        return amount;
    };

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
                        buckets={buckets} 
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
                            <>
                                <AccountItem
                                    key={index}
                                    id={account.id}
                                    name={account.name}
                                    amount={accountAmount(account.id)}
                                    openAccountDetails={openAccountDetails}
                                />
                                <AccountDetails
                                    data={accountDetailsData}
                                    setAccountDetailsData={setAccountDetailsData}
                                    accountDetailsOpen={accountDetailsOpen}
                                    setAccountDetailsOpen={setAccountDetailsOpen}
                                />
                            </>
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