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
            <p>{amount < 0 && "-"}${Math.abs(amount)}</p>
        </button>
    );
};

const BudgetItem = ({name, amount, limit}) => {
    return (
        <button>
            <p>{name}</p>
            <p>{amount < 0 && "-"}${Math.abs(amount)} remaining of ${limit}</p>
        </button>
    );
};

const Aside = ({accounts, budgets, categories, transactions}) => {
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
                if (transaction.type === 'expense') {
                    amount -= parseInt(transaction.amount);
                } else {
                    amount += parseInt(transaction.amount);
                };
            };
        });
        return amount;
    };

    const budgetAmount = (limit, categories) => {
        let amount = limit;
        transactions.forEach((transaction) => {
            if (categories.includes(transaction.category)) {
                if (transaction.type === 'expense') {
                    amount -= parseInt(transaction.amount);
                } else {
                    amount += parseInt(transaction.amount);
                };
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
                            <BudgetItem 
                                key={index}
                                name={budget.name}
                                amount={budgetAmount(budget.limit, budget.categories)}
                                limit={budget.limit}
                            />
                        ))
                    }
                </div>
            </div>
        </aside>
    );
};

export default Aside;