import { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal.js';
import modalCSS from "../../../components/modal/modal.module.css";
import { collection, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebase.js';

const BudgetDetails = ({data, setBudgetDetailsData, budgetDetailsOpen, setBudgetDetailsOpen}) => {
    const transactionsRef = collection(db, 'transactions');
    const [transactions, setTransactions] = useState([]);
    
    const closeModal = () => {
        setBudgetDetailsOpen(false);
        setBudgetDetailsData({});
    };

    // useEffect(() => {
    //     const queryTransactions = query(
    //         transactionsRef, 
    //         // where uid == user id and category is in categories
    //     );
    // }, [])

    return (
        <Modal
            isOpen={budgetDetailsOpen}
            close={closeModal}
            title={data.title}
            submit={null}
            type={modalCSS.details}
            content={
                <>
                    <p>{data.amount < 0 && '-'}${Math.abs(data.amount)} remaining of ${data.limit}</p>
                    <p>{data.categories}</p>
                    {/* <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th id={modalCSS.transactionCategory}>Category</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                transactions.map((transaction) => (
                                    <tr key={transaction.id}>
                                        <td>{transaction.name}</td>
                                        <td id={modalCSS.transactionCategory}>{transaction.category}</td>
                                        <td>{transaction.date}</td>
                                        <td>{transaction.type === 'expense' && '-'}${transaction.amount}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table> */}
                </>
            }
        />
    );
};

export default BudgetDetails;