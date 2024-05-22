import modalCSS from "../../../../components/modal/modal.module.css";
import { useState } from 'react';
import Table from '../../../../components/table/Table.js';
import Modal from '../../../../components/modal/Modal.js';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../config/firebase.js";

const AccountDetails = ({data, accounts, amount, account, accountDetailsOpen, setAccountDetailsOpen, toast}) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);

    const cancelEdit = () => {
        setEditMode(false);
        setDeleteMode(false);
    };

    const closeModal = () => {
        setAccountDetailsOpen(false);
        cancelEdit();
    };

    const deleteAccount = async (e) => {
        e.preventDefault();
        closeModal();

        let accountsRef = doc(db, "accounts", account.docId);
        await deleteDoc(accountsRef);

        data.forEach((transaction) => {
            let transactionsRef = doc(db, "transactions", transaction.docId);
            deleteDoc(transactionsRef);
        });
        toast.error("Account deleted");
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
            title={account.name}
            submit={null}
            type={modalCSS.details}
            warning={data.length}
            content={
                <>
                    {/* <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}> */}
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