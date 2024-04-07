import { useEffect, useState } from 'react';
import Column from '../../../components/charts/Bar';
import Modal from '../../../components/modal/Modal';
import modalCSS from "../../../components/modal/modal.module.css";
import Table from '../../../components/table/Table';
import { convertTimestampToDate } from "../../../context/context";
import { categories } from '../../../context/context';

const SummaryDetails = ({title, transactions, isOpen, setIsOpen, editMode, setEditMode}) => {
    const [categoryValues, setCategoryValues] = useState({});
    const [transactionValues, setTransactionValues] = useState([]);
    
    const closeModal = () => {
        setIsOpen(false);
        setEditMode(false);
    };
    //     let startDate = new Date();
    //     let endDate = new Date();
    //     let today = new Date();

    //     startDate.setHours(0,0,0,0);
    //     endDate.setHours(0,0,0,0);
        
    //     switch (title) {
    //         // Set end dates 1 day later to capture correct transactions
    //         case "Today":
    //             endDate.setDate(today.getDate() + 1);
    //             break;
    //         case "This Week":
    //             // Get day of week and minus start date back to Sunday
    //             startDate.setDate(today.getDate() - today.getDay());
    //             endDate.setDate(today.getDate() + (7 - today.getDate()));
    //             break;
    //         case "This Month":
    //             startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    //             endDate = new Date(today.getFullYear(), today.getMonth() + 1 , 1);
    //             break;
    //         case "This Year":
    //             startDate = new Date(today.getFullYear(), 0, 1);
    //             endDate = new Date(today.getFullYear() + 1, 0 , 1);
    //             break;
    //         default:
    //             break;
    //     };

    //     let t = [];
    //     transactions.forEach((transaction) => {
    //         if (convertTimestampToDate(transaction.timeStamp) >= startDate
    //         && convertTimestampToDate(transaction.timeStamp) < endDate) {
    //             t.push(transaction);
    //         };
    //     });
    //     return t;
    // };

    const data = {
        labels: categories.map((data) => data.name),
        datasets: [
            {
                label: 'Spent',
                data: categoryValues,
                backgroundColor: '#6C63FF',
                borderColor: 'black',
                borderWidth: 1,
            }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            }
        }
    };

    useEffect(() => {
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
                endDate.setDate(startDate.getDate() + 7);
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
        let c = {};
        categories.forEach((category) => {
            c[category.name] = 0;
        });
        transactions.forEach((transaction) => {
            if (convertTimestampToDate(transaction.timeStamp) >= startDate
            && convertTimestampToDate(transaction.timeStamp) < endDate) {
                // Set transaction values to display in table
                t.push(transaction);
                // Set category values to display in chart
                c[transaction.category] = parseInt(c[transaction.category]) + parseInt(transaction.amount);
            };
        });
        setTransactionValues(t);
        setCategoryValues(c);
    },[transactions]);

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
                    <Column data={data} options={chartOptions}/>
                    <Table
                        data={transactionValues}
                        editMode={editMode}
                    />
                </>
                
            }
        />
    );
};

export default SummaryDetails;