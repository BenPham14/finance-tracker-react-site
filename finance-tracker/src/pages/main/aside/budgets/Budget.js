import { useEffect, useState } from "react";
import { db } from "../../../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { convertTimestampToDate, displayAmounts } from "../../../../context/helper.js";
import BudgetDetails from "./BudgetDetails";
import mainCSS from "../../main.module.css";

const Budget = ({budget, accounts, transactions, toast}) => {
    const [budgetDetailsOpen, setBudgetDetailsOpen] = useState(false);
    const budgetsRef = doc(db, "budgets", budget.docId);

    const getDaysUntilReset = () => {
        const now = new Date();
        const end = new Date(budget.periodEnd.seconds * 1000);
        const difference = end.getTime() - now.getTime();
        return Math.ceil(difference / (1000 * 3600 * 24));
    };

    const endsIn = (getDaysUntilReset) => {
        return `${getDaysUntilReset} ${getDaysUntilReset < 2 ? "day" : "days"}`;
    };

    const budgetAmount = (limit, categories) => {
        let amount = limit;
        transactions.forEach((transaction) => {
            if (categories.includes(transaction.category)) {
                if (convertTimestampToDate(transaction.timeStamp) >= convertTimestampToDate(budget.periodStart) 
                && convertTimestampToDate(transaction.timeStamp) < convertTimestampToDate(budget.periodEnd)) {
                    if (transaction.type === 'expense') {
                        amount -= parseFloat(transaction.amount);
                    } else {
                        amount += parseFloat(transaction.amount);
                    };
                };
            };
        });
        return amount;
    };

    const filterTransactions = (categories) => {
        let t = [];
        transactions.forEach((transaction) => {
            if (categories.includes(transaction.category)) {
                if (convertTimestampToDate(transaction.timeStamp) >= convertTimestampToDate(budget.periodStart) 
                && convertTimestampToDate(transaction.timeStamp) < convertTimestampToDate(budget.periodEnd)) {
                    t.push(transaction);
                };
            };
        });
        return t;
    };

    // If days until reset is < 1 then updateDoc with new budget end date
    useEffect(() => {
        updatePeriod();
    }, [getDaysUntilReset()]);

    const updatePeriod = async () => {
        try {
            if (getDaysUntilReset() < 1) {
                let startDate = convertTimestampToDate(budget.periodEnd);
                let endDate = convertTimestampToDate(budget.periodEnd);
                let number = budget.period.replace(/[^0-9]/g, ''); // Keep only number value in string like 2 day(s) becomes 2
    
                if (budget.period.includes("day")) {
                    endDate.setDate(endDate.getDate() + parseInt(number));
                } else if (budget.period.includes("week")) {
                    endDate.setDate(endDate.getDate() + (parseInt(number)*7));
                } else if (budget.period.includes("month")) {
                    endDate.setDate(endDate.getDate() + (parseInt(number)*30));
                } else if (budget.period.includes("year")) {
                    endDate.setDate(endDate.getDate() + (parseInt(number)*365));
                };
    
                // Set time to 12:00AM
                startDate.setHours(0,0,0,0);
                endDate.setHours(0,0,0,0);
    
                await updateDoc(budgetsRef, {
                    periodStart: startDate,
                    periodEnd: endDate
                });
            };
        } catch (err) {
            console.error(err);
        };
    };

    return (
        <>
            <button onClick={() => setBudgetDetailsOpen(true)}>
                <p>{budget.name}</p>
                <div className={mainCSS.budgetDescription}>
                    <h5>{budgetAmount(budget.limit, budget.categories) < 0 && "-"}${displayAmounts(Math.abs(budgetAmount(budget.limit, budget.categories)))} remaining of ${budget.limit}</h5>
                    <h5>Ends in {endsIn(getDaysUntilReset())}</h5>
                </div>
            </button>
            <BudgetDetails
                data={budget}
                amount={budgetAmount(budget.limit, budget.categories)}
                accounts={accounts}
                transactions={filterTransactions(budget.categories)}
                resetDays={endsIn(getDaysUntilReset())}
                budgetCategories={budget.categories}
                budgetDetailsOpen={budgetDetailsOpen}
                setBudgetDetailsOpen={setBudgetDetailsOpen}
                toast={toast}
            />
        </>
    );
};

export default Budget;