import Modal from "../../../components/modal/Modal";
import modalCSS from "../../../components/modal/modal.module.css";
import Table from "../../../components/table/Table";

const TransactionDetails = ({data, transactionDetailsOpen, setTransactionDetailsOpen}) => {
    const closeModal = () => {
        setTransactionDetailsOpen(false);
    };
    
    return (
        <Modal 
            isOpen={transactionDetailsOpen}
            close={closeModal}
            title={"Transactions"}
            submit={null}
            type={modalCSS.details}
            content={
                <Table data={data}/>
            }
        />
    );
};

export default TransactionDetails;