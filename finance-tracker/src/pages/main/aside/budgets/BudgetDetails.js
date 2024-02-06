import Modal from '../../../../components/modal/Modal.js';
import modalCSS from "../../../../components/modal/modal.module.css";
import Table from '../../../../components/table/Table.js';

const BudgetDetails = ({data, amount, transactions, categories, budgetDetailsOpen, setBudgetDetailsOpen}) => {
    const closeModal = () => {
        setBudgetDetailsOpen(false);
    };

    return (
        <Modal
            isOpen={budgetDetailsOpen}
            close={closeModal}
            title={data.name}
            submit={null}
            type={modalCSS.details}
            content={
                <>
                    <p>{amount < 0 && '-'}${Math.abs(amount)} remaining of ${data.limit}</p>
                    <p>Categories: {categories.join(', ')}</p>
                    <p>Resets every {data.period}</p>
                    <Table data={transactions}/>
                </>
            }
        />
    );
};

export default BudgetDetails;