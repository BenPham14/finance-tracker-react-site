import { useState } from 'react';
import TransactionDetails from './TransactionDetails';
import mainCSS from '../main.module.css';
import { FaCreditCard } from "react-icons/fa6";

const Transactions = ({accounts, transactions}) => {
    const [transactionDetailsOpen, setTransactionDetailsOpen] = useState(false);

    const total = () => {
        let amount = 0;
        transactions.forEach((transaction) => {
            if (transaction.type === 'expense') {
                amount -= parseFloat(transaction.amount);
            } else {
                amount += parseFloat(transaction.amount);
            };
        });
        return amount;
    };

    const income = () => {
        let amount = 0;
        transactions.forEach((transaction) => {
            if (transaction.type === 'income') {
                amount += parseFloat(transaction.amount);
            };
        });
        return amount;
    };

    const expenses = () => {
        let amount = 0;
        transactions.forEach((transaction) => {
            if (transaction.type === 'expense') {
                amount -= parseFloat(transaction.amount);
            };
        });
        return amount;
    };
    
    return (
        <section className={mainCSS.transactions}>
            <div className={mainCSS.sectionHeader}>
                <FaCreditCard/>
                <h3>Transactions</h3>
            </div>
            <table id={mainCSS.homeTable} onClick={() => setTransactionDetailsOpen(true)}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th id={mainCSS.transactionCategory}>Category</th>
                        <th>Date</th>
                        <th style={{textAlign: 'center'}}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {// limits table to 4 lines
                    transactions.slice(0,4).map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.name}</td>
                            <td id={mainCSS.transactionCategory}>{transaction.category}</td>
                            <td>{transaction.date}</td>
                            <td id={transaction.type === 'expense' ? mainCSS.redCell : mainCSS.greenCell}>{transaction.type === "expense" && "-"}${transaction.amount}</td>
                        </tr>
                    ))}
                    {transactions.length === 0 &&
                        <tr>
                            <td style={{color: "gray"}}>No Transactions</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    }
                </tbody>
            </table>
            <TransactionDetails
                data={transactions}
                total={total()}
                income={income()}
                expenses={expenses()}
                accounts={accounts}
                transactionDetailsOpen={transactionDetailsOpen}
                setTransactionDetailsOpen={setTransactionDetailsOpen}
            />
        </section>
    );
};

export default Transactions;