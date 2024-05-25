import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import modalCSS from "../../../components/modal/modal.module.css";
import Table from "../../../components/table/Table";

const TransactionDetails = ({data, total, income, expenses, accounts, transactionDetailsOpen, setTransactionDetailsOpen}) => {
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
            type={modalCSS.details}
            content={
                <>
                    <div className={modalCSS.transactionsInfo}>
                        <div className={modalCSS.detailsInfo}>
                            <p id={modalCSS.label}>Total</p>
                            <p id={modalCSS.data}>{total < 0 && '-'}${Math.abs(total)}</p>
                        </div>
                        <div style={{border: '0.5px solid gray', margin: '5px 0'}}></div>
                        <div className={modalCSS.detailsInfo}>
                            <p id={modalCSS.label}>Income</p>
                            <p id={modalCSS.data}>${income}</p>
                        </div>
                        <div className={modalCSS.detailsInfo}>
                            <p id={modalCSS.label}>Expenses</p>
                            <p id={modalCSS.data}>{expenses < 0 && '-'}${Math.abs(expenses)}</p>
                        </div>
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

export default TransactionDetails;