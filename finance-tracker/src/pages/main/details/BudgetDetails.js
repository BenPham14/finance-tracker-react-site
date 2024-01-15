import { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal.js';
import modalCSS from "../../../components/modal/modal.module.css";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';

const BudgetDetails = ({data, setBudgetDetailsData, budgetDetailsOpen, setBudgetDetailsOpen}) => {
    const transactionsRef = collection(db, 'transactions');
    const [transactions, setTransactions] = useState([]);
    
    const closeModal = () => {
        setBudgetDetailsOpen(false);
        setBudgetDetailsData({});
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (data.categories === undefined) {
                    // onClose modal, this will reset array so it doesn't stack results
                    return setTransactions([]);
                };
                data.categories.forEach((category) => {
                    const queryTransactions = query(
                        transactionsRef, 
                        // where uid == user id and transaction category is in budget's categories
                        where("uid", "==", user.uid),
                        where("category", "==", category)
                    );
                    const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                        snapshot.forEach((doc) => {
                            setTransactions((oldArray) => [...oldArray, doc.data()]);
                        });
                    });
                    return () => unsubscribe();
                });
            };
        });
    }, [data.categories]);

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
                    {/* <p>{data.categories}</p> */}
                    <table>
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
                    </table>
                </>
            }
        />
    );
};

export default BudgetDetails;