import { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal.js';
import modalCSS from "../../../components/modal/modal.module.css";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { convertDateFormat } from '../../../context/context.js';
import Table from '../../../components/table/Table.js';

const BudgetDetails = ({data, setBudgetDetailsData, budgetDetailsOpen, setBudgetDetailsOpen}) => {
    const transactionsRef = collection(db, 'transactions');
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    
    const closeModal = () => {
        setBudgetDetailsOpen(false);
        setBudgetDetailsData({});
        setTransactions([]);
        setCategories([]);
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
                            setTransactions((oldArray) => [...oldArray, {...doc.data(), date: convertDateFormat(doc.data().date)}]);
                        });
                    });
                    setCategories((cat) => [...cat, category]);
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
                    <p>Categories: {categories.join(', ')}</p>
                    <p>Resets every {data.period}</p>
                    <Table data={transactions}/>
                </>
            }
        />
    );
};

export default BudgetDetails;