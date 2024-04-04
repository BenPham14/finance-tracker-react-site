import Modal from '../../../components/modal/Modal';
import modalCSS from "../../../components/modal/modal.module.css";
import Table from '../../../components/table/Table';
import { convertTimestampToDate } from "../../../context/context";

const SummaryDetails = ({title, transactions, isOpen, setIsOpen, editMode, setEditMode}) => {
    const closeModal = () => {
        setIsOpen(false);
        setEditMode(false);
    };

    const filterTransactions = () => {
        let startDate = new Date();
        let endDate = new Date();
        let today = new Date();

        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);
        
        switch (title) {
            // Set end dates 1 day later to capture correct transactions
            case "Today":
                endDate.setDate(today.getDate() + 1);
                break;
            case "This Week":
                // Get day of week and minus start date back to Sunday
                startDate.setDate(today.getDate() - today.getDay());
                endDate.setDate(today.getDate() + (7 - today.getDate()));
                console.log(endDate);
                break;
            case "This Month":
                startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                endDate = new Date(today.getFullYear(), today.getMonth() + 1 , 1);
                break;
            case "This Year":
                startDate = new Date(today.getFullYear(), 0, 1);
                endDate = new Date(today.getFullYear() + 1, 0 , 1);
                break;
            default:
                break;
        };
        
        let t = [];
        transactions.forEach((transaction) => {
            if (convertTimestampToDate(transaction.timeStamp) >= startDate
            && convertTimestampToDate(transaction.timeStamp) < endDate) {
                t.push(transaction);
            };
        });
        return t;
    };

    return (
        <Modal
            isOpen={isOpen}
            close={closeModal}
            editMode={editMode}
            setEditMode={setEditMode}
            title={title}
            submit={null}
            type={modalCSS.details}
            content={
                <>
                    <p>Hello</p>
                    <Table
                        data={filterTransactions()}
                        editMode={editMode}
                    />
                </>
                
            }
        />
    );
};

export default SummaryDetails;