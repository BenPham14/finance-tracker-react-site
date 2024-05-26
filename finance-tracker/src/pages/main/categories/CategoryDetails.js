import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import modalCSS from "../../../components/modal/modal.module.css";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { convertTimestampToDate } from "../../../context/helper.js";
import Table from "../../../components/table/Table";

const CategoryDetails = ({data, accounts, setCategoryDetailsData, categoryDetailsOpen, setCategoryDetailsOpen}) => {
    const transactionsRef = collection(db, 'transactions');
    const [transactions, setTransactions] = useState([]);
    const [editMode, setEditMode] = useState(false);

    const cancelEdit = () => {
        setEditMode(false);
    };
    
    const closeModal = () => {
        setCategoryDetailsOpen(false);
        setCategoryDetailsData({});
        setTransactions([]);
        cancelEdit();
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
                        transactions.push({
                            ...doc.data(), 
                            docId: doc.id, 
                            date: convertTimestampToDate(doc.data().date).toLocaleDateString(),
                            timeStamp: doc.data().date
                        });
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
            cancel={cancelEdit}
            editMode={editMode}
            setEditMode={setEditMode}
            title={data.title}
            type={modalCSS.details}
            content={
                <>
                    <div className={modalCSS.detailsInfo}>
                        <p id={modalCSS.label}>Spent</p>
                        <p id={modalCSS.data}>${Math.abs(data.amount)}</p>
                    </div>
                    <Table 
                        data={transactions}
                        accounts={accounts}
                        editMode={editMode}
                    />
                </>
            } 
        />
    );
};

export default CategoryDetails;