import { useEffect, useState } from "react";
import { auth, db } from "../../../config/firebase";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { convertTimestampToDate } from "../../../context/context";
import BudgetDetails from "../details/BudgetDetails";
import mainCSS from "../main.module.css";
import { onAuthStateChanged } from "firebase/auth";

const Budget = ({budget}) => {
    const [budgetDetailsOpen, setBudgetDetailsOpen] = useState(false);
    const [budgetDetailsData, setBudgetDetailsData] = useState({});
    const budgetsRef = doc(db, "budgets", budget.docId);

    const openBudgetDetails = (id, title, amount, limit, categories, period, start, end) => {
        setBudgetDetailsOpen(true);
        // Since using same component in 'for loop', this will reset the data when we open up another details in the loop
        setBudgetDetailsData({id, title, amount, limit, categories, period, start, end}); // Since parameter is same, no need for 'key: ' in array
    };

    const getDaysUntilReset = () => {
        const now = new Date();
        const end = new Date(budget.periodEnd.seconds * 1000);
        const difference = end.getTime() - now.getTime();

        return Math.ceil(difference / (1000 * 3600 * 24));
    };

    const transactionsRef = collection(db, 'transactions');
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [budgetCategories, setBudgetCategories] = useState([]);

    useEffect(() => {
        // copy query from budgetDetails and setTransactions()
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (budget.categories === undefined) {
                    // onClose modal, this will reset array so it doesn't stack results
                    return setTransactions([]);
                };

                setBudgetCategories(budget.categories);
                budgetCategories.forEach((category) => {
                    const queryTransactions = query(
                        transactionsRef, 
                        // where uid == user id and transaction category is in budget's categories
                        where("uid", "==", user.uid),
                        where("category", "==", category),
                        where("date", ">=", budget.periodStart),
                        where("date", "<", budget.periodEnd)
                    );
                    const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                        snapshot.forEach((doc) => {
                            setTransactions((oldArray) => [...oldArray, {...doc.data(), date: convertTimestampToDate(doc.data().date).toLocaleDateString()}]);
                        });
                    });
                    setCategories((cat) => [...cat, category]);
                    return () => unsubscribe();
                });
            };
        });
    }, [budgetCategories]);

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

    // If days until reset is < 1 then updateDoc with new budget end date
    useEffect(() => {
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

            updateDoc(budgetsRef, {
                periodStart: startDate,
                periodEnd: endDate
            });
        };
    }, [getDaysUntilReset()]);

    return (
        <>
            <button onClick={() => openBudgetDetails(budget.id, budget.name, budgetAmount(budget.limit, budget.categories), budget.limit, budget.categories, budget.period, budget.periodStart, budget.periodEnd)}>
                <p>{budget.name}</p>
                <div className={mainCSS.budgetDescription}>
                    <p>{budgetAmount(budget.limit, budget.categories) < 0 && "-"}${Math.abs(budgetAmount(budget.limit, budget.categories))} remaining of ${budget.limit}</p>
                    <p>Ends in {getDaysUntilReset()} {getDaysUntilReset() < 2 ? "day" : "days"}</p>
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

export default Budget;