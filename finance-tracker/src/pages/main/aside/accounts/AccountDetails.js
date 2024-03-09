import modalCSS from "../../../../components/modal/modal.module.css";
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../../config/firebase.js';
import { convertTimestampToDate } from '../../../../context/context.js';
import Table from '../../../../components/table/Table.js';
import Modal from '../../../../components/modal/Modal.js';

const AccountDetails = ({data, setAccountDetailsData, accountDetailsOpen, setAccountDetailsOpen}) => {
    const transactionsRef = collection(db, 'transactions');
    const [transactions, setTransactions] = useState([]);
    const [transactionsTotal, setTransactionsTotal] = useState(0);
    const [editMode, setEditMode] = useState(false);

    const closeModal = () => {
        setAccountDetailsOpen(false);
        setAccountDetailsData({});
        setTransactions([]);
        setEditMode(false);
    };

    useEffect(() => {
        // query transactions that match data.id (account id)
        const queryTransactions = query(
            transactionsRef,
            where("accountId", "==", data.id === undefined ? "" : data.id), 
            orderBy("date", "desc")
        );
        const unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
            let transactions = [];
            let total = 0;
            snapshot.forEach((doc) => {
                transactions.push({...doc.data(), docId: doc.id, date: convertTimestampToDate(doc.data().date).toLocaleDateString()});
                if (doc.data().type === 'expense') {
                    total -= parseInt(doc.data().amount);
                } else {
                    total += parseInt(doc.data().amount);
                };
            });
            setTransactions(transactions);
            setTransactionsTotal(total);
        });
        return () => unsubscribe();
    }, [data.id]);

    return (
        <Modal
            isOpen={accountDetailsOpen}
            close={closeModal}
            editMode={editMode}
            setEditMode={setEditMode}
            title={data.name}
            submit={null}
            type={modalCSS.details}
            content={
                <>
                    <p>{transactionsTotal < 0 && '-'}${Math.abs(transactionsTotal)} available</p>
                    <Table 
                        data={transactions}
                        editMode={editMode}
                    />
                </>
            }
        />
    );
};

export default AccountDetails