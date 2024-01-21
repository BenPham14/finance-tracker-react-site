import { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal.js';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebase.js';
import modalCSS from "../../../components/modal/modal.module.css";
import { convertDateFormat } from '../../../context/context.js';

const AccountDetails = ({data, setAccountDetailsData, accountDetailsOpen, setAccountDetailsOpen}) => {
    const transactionsRef = collection(db, 'transactions');
    const [transactions, setTransactions] = useState([]);

    const closeModal = () => {
        setAccountDetailsOpen(false);
        setAccountDetailsData({});
    };

    useEffect(() => {
        // query transactions that match data.id (account id)
        const queryTransactions = query(
            transactionsRef,
            where("accountId", "==", data.id === undefined ? "" : data.id)
        );
        const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
            let transactions = [];
            snapshot.forEach((doc) => {
                transactions.push({...doc.data(), docId: doc.id, date: convertDateFormat(doc.data().date)});
            });
            setTransactions(transactions);
        });
        return () => unsubscribe();
    }, [data.id]);

    return (
        <Modal
            isOpen={accountDetailsOpen}
            close={closeModal}
            title={data.title}
            submit={null}
            type={modalCSS.details}
            content={
                <>
                    <p>{data.amount < 0 && '-'}${Math.abs(data.amount)} remaining</p>
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

export default AccountDetails