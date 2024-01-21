import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import modalCSS from "../../../components/modal/modal.module.css";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { convertDateFormat } from "../../../context/context";
import Table from "../../../components/table/Table";

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
                    <Table data={transactions}/>
                </>
            } 
        />
    );
};

export default CategoryDetails;