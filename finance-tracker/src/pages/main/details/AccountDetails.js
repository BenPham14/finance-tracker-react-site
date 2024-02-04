import { useEffect, useState } from 'react';
import Modal from '../../../components/modal/Modal.js';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../config/firebase.js';
import modalCSS from "../../../components/modal/modal.module.css";
import { convertTimestampToDate } from '../../../context/context.js';
import Table from '../../../components/table/Table.js';

const AccountDetails = ({data, setAccountDetailsData, accountDetailsOpen, setAccountDetailsOpen}) => {
    const transactionsRef = collection(db, 'transactions');
    const [transactions, setTransactions] = useState([]);

    const closeModal = () => {
        setAccountDetailsOpen(false);
        setAccountDetailsData({});
        setTransactions([]);
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
                transactions.push({...doc.data(), docId: doc.id, date: convertTimestampToDate(doc.data().date).toLocaleDateString()});
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
                    <Table data={transactions}/>
                </>
            }
        />
    );
};

export default AccountDetails