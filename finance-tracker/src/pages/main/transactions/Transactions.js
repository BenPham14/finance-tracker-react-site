import { useState } from 'react';
import TransactionDetails from './TransactionDetails';
import mainCSS from '../main.module.css';
import { FaCreditCard } from "react-icons/fa6";

const Transactions = ({transactions}) => {
    const [transactionDetailsOpen, setTransactionDetailsOpen] = useState(false);
    
    return (
        <section className={mainCSS.transactions}>
            <div className={mainCSS.sectionHeader}>
                <FaCreditCard/>
                <p>Transactions</p>
            </div>
            <table id={mainCSS.homeTable} onClick={() => setTransactionDetailsOpen(true)}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th id={mainCSS.transactionCategory}>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {// limits table to 4 lines
                    transactions.slice(0,4).map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.name}</td>
                            <td id={mainCSS.transactionCategory}>{transaction.category}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.type === "expense" && "-"}${transaction.amount}</td>
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
                transactionDetailsOpen={transactionDetailsOpen}
                setTransactionDetailsOpen={setTransactionDetailsOpen}
            />
        </section>
    );
};

export default Transactions;