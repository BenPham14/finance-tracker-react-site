import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import modalCSS from "../../../components/modal/modal.module.css";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { convertDateFormat } from "../../../context/context";

const CategoryDetails = ({data, setCategoryDetailsData, categoryDetailsOpen, setCategoryDetailsOpen}) => {
    const transactionsRef = collection(db, 'transactions');
    const [transactions, setTransactions] = useState([]);
    
    const closeModal = () => {
        setCategoryDetailsOpen(false);
        setCategoryDetailsData({});
    };

    useEffect(() => {
        if (data.title === undefined) {
            return setTransactions([]);
        };

        onAuthStateChanged(auth, (user) => {
            if (user) {
                const queryTransactions = query(
                    transactionsRef,
                    where("uid", "==", user.uid),
                    where("category", "==", data.title)
                );
                const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                    let transactions = [];
                    snapshot.forEach((doc) => {
                        transactions.push({...doc.data(), docId: doc.id, date: convertDateFormat(doc.data().date)});
                    });
                    setTransactions(transactions);
                });
                return () => unsubscribe();
            };
        });
    }, [data.title]);

    return (
        <Modal
            isOpen={categoryDetailsOpen}
            close={closeModal}
            title={data.title}
            submit={null}
            type={modalCSS.details}
            content={
                <>
                    <p>${Math.abs(data.amount)} spent</p>
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

export default CategoryDetails;