import mainCSS from './main.module.css';
import { FaCreditCard } from "react-icons/fa6";

const Transactions = ({transactions}) => {
    return (
        <section className={mainCSS.transactions}>
            <div className={mainCSS.sectionHeader}>
                <FaCreditCard/>
                <p>Transactions</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th id={mainCSS.transactionCategory}>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.slice(0,4).map((transaction, index) => (
                            <tr key={index}>
                                <td>{transaction.name}</td>
                                <td id={mainCSS.transactionCategory}>{transaction.category}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.type === "expense" && "-"}${transaction.amount}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    );
};

export default Transactions;