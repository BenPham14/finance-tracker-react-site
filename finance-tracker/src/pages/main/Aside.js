import mainCSS from './main.module.css';
import { FaBolt, FaLandmark, FaMoneyBillTransfer } from "react-icons/fa6";
import AddTransactions from './actions/AddTransactions';
import { useState } from 'react';
import AddAccount from './actions/AddAccount';
import AddBudget from './actions/AddBudget';
import AccountDetails from './details/AccountDetails';
import BudgetDetails from './details/BudgetDetails';

const AccountItem = ({account, amount}) => {
    const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);
    const [accountDetailsData, setAccountDetailsData] = useState({});

    const openAccountDetails = (id, title, amount) => {
        setAccountDetailsOpen(true);
        // Since using same component in 'for loop', this will reset the data when we open up another details in the loop
        setAccountDetailsData({id, title, amount}); // Since parameter is same, no need for 'key: ' in array
    };

    return (
        <>
            <button onClick={() => openAccountDetails(account.id, account.name, amount)}>
                <p>{account.name}</p>
                <p>{amount < 0 && "-"}${Math.abs(amount)}</p>
            </button>
            <AccountDetails
                data={accountDetailsData}
                setAccountDetailsData={setAccountDetailsData}
                accountDetailsOpen={accountDetailsOpen}
                setAccountDetailsOpen={setAccountDetailsOpen}
            />
        </>
    );
};

const BudgetItem = ({budget, amount}) => {
    const [budgetDetailsOpen, setBudgetDetailsOpen] = useState(false);
    const [budgetDetailsData, setBudgetDetailsData] = useState({});

    const openBudgetDetails = (id, title, amount, limit, categories) => {
        setBudgetDetailsOpen(true);
        // Since using same component in 'for loop', this will reset the data when we open up another details in the loop
        setBudgetDetailsData({id, title, amount, limit, categories}); // Since parameter is same, no need for 'key: ' in array
    };

    const getDaysUntilReset = () => {
        const now = new Date();
        const end = new Date(budget.periodEnd.seconds * 1000);
        const difference = end.getTime() - now.getTime();

        return Math.ceil(difference / (1000 * 3600 * 24));
    };

    return (
        <>
            <button onClick={() => openBudgetDetails(budget.id, budget.name, amount, budget.limit, budget.categories)}>
                <p>{budget.name}</p>
                <div className={mainCSS.budgetDescription}>
                    <p>{amount < 0 && "-"}${Math.abs(amount)} remaining of ${budget.limit}</p>
                    <p>Resets in {getDaysUntilReset()} {getDaysUntilReset() < 2 ? "day" : "days"}</p>
                </div>
            </button>
            <BudgetDetails
                data={budgetDetailsData}
                setBudgetDetailsData={setBudgetDetailsData}
                budgetDetailsOpen={budgetDetailsOpen}
                setBudgetDetailsOpen={setBudgetDetailsOpen}
            />
        </>
    );
};

const Aside = ({accounts, budgets, categories, transactions}) => {
    const [transactionsOpen, setTransactionsOpen] = useState(false);
    const [accountsOpen, setAccountsOpen] = useState(false);
    const [budgetsOpen, setBudgetsOpen] = useState(false);

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
                            <AccountItem
                                key={index}
                                account={account}
                                amount={accountAmount(account.id)}
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
                            <BudgetItem 
                                key={index}
                                budget={budget}
                                amount={budgetAmount(budget.limit, budget.categories)}
                            />
                        ))
                    }
                </div>
            </div>
        </aside>
    );
};

export default Aside;