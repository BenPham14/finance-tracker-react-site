import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import modalCSS from "../../../components/modal/modal.module.css";
import Table from "../../../components/table/Table";

const TransactionDetails = ({data, transactionDetailsOpen, setTransactionDetailsOpen}) => {
    const [editMode, setEditMode] = useState(false);
    
    const cancelEdit = () => {
        setEditMode(false);
    }

    const closeModal = () => {
        setTransactionDetailsOpen(false);
        cancelEdit();
    };
    
    return (
        <Modal 
            isOpen={transactionDetailsOpen}
            close={closeModal}
            cancel={cancelEdit}
            editMode={editMode}
            setEditMode={setEditMode}
            title={"Transactions"}
            submit={null}
            type={modalCSS.details}
            content={
                <Table 
                    data={data}
                    editMode={editMode}
                />
            }
        />
    );
};

export default TransactionDetails;