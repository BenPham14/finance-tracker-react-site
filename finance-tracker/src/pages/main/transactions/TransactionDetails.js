import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import modalCSS from "../../../components/modal/modal.module.css";
import Table from "../../../components/table/Table";

const TransactionDetails = ({data, transactionDetailsOpen, setTransactionDetailsOpen}) => {
    const [editMode, setEditMode] = useState(false);
    
    const closeModal = () => {
        setTransactionDetailsOpen(false);
    };
    
    return (
        <Modal 
            isOpen={transactionDetailsOpen}
            close={closeModal}
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