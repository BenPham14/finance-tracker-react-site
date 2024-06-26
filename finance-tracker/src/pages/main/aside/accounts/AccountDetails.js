import modalCSS from "../../../../components/modal/modal.module.css";
import { useEffect, useState } from 'react';
import Table from '../../../../components/table/Table.js';
import Modal from '../../../../components/modal/Modal.js';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase.js";

const AccountDetails = ({data, accounts, amount, account, accountDetailsOpen, setAccountDetailsOpen, toast}) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [titleValue, setTitleValue] = useState(account.name);
    const accountsRef = doc(db, "accounts", account.docId);

    const cancelEdit = () => {
        setEditMode(false);
        setDeleteMode(false);
    };

    const closeModal = () => {
        setAccountDetailsOpen(false);
        cancelEdit();
    };

    useEffect(() => {
        if (editMode === false) {
            updateAccount();
        };
    }, [editMode]); 

    const updateAccount = async () => {
        try {
            if ((titleValue !== account.name && titleValue !== '')) {
                await updateDoc(accountsRef, {
                    name: titleValue
                });
            } else {
                setTitleValue(account.name);
            };
        } catch (err) {
            console.error(err);
            if (err.code == "permission-denied") {
                setTitleValue(account.name);
                toast.error("Cannot make changes in demo mode");
            };
        };
    };

    const deleteAccount = async (e) => {
        e.preventDefault();

        try {
            let accountsRef = doc(db, "accounts", account.docId);
            await deleteDoc(accountsRef);

            data.forEach((transaction) => {
                let transactionsRef = doc(db, "transactions", transaction.docId);
                deleteDoc(transactionsRef);
            });
            toast.error("Account deleted");
        } catch (err) {
            console.error(err);
            if (err.code == "permission-denied") {
                toast.error("Cannot make changes in demo mode");
            };
        };

        closeModal();
    };

    return (
        <Modal
            isOpen={accountDetailsOpen}
            close={closeModal}
            cancel={cancelEdit}
            editMode={editMode}
            setEditMode={setEditMode}
            deleteMode={deleteMode}
            setDeleteMode={setDeleteMode}
            deleteFn={deleteAccount}
            title={titleValue}
            changeTitle={setTitleValue}
            type={"accounts"}
            warning={data.length}
            content={
                <>
                    <div className={modalCSS.detailsInfo}>
                        <p id={modalCSS.label}>Available</p>
                        <p id={modalCSS.data}>{amount < 0 && '-'}${Math.abs(amount)}</p>
                    </div>
                    <Table 
                        data={data}
                        accounts={accounts}
                        editMode={editMode}
                    />
                </>
            }
        />
    );
};

export default AccountDetails