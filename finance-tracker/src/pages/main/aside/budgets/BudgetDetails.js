import { useEffect, useState } from 'react';
import Modal from '../../../../components/modal/Modal.js';
import modalCSS from "../../../../components/modal/modal.module.css";
import Table from '../../../../components/table/Table.js';
import Multiselect from '../../../../components/multiselect/Multiselect.js';
import { categories, periodOptions } from '../../../../context/context.js';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebase.js';

const BudgetDetails = ({data, amount, transactions, budgetCategories, budgetDetailsOpen, setBudgetDetailsOpen}) => {
    const [editMode, setEditMode] = useState(false);
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [periodValue, setPeriodValue] = useState("");
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const budgetsRef = doc(db, "budgets", data.docId);
    
    const closeModal = () => {
        setBudgetDetailsOpen(false);
        setCategoriesValue(budgetCategories);
        setPeriodValue(data.period);
        setCategoriesOpen(false);
        setEditMode(false);
    };

    const changePlaceholderColor = (value) => {
        if (value === "") {
            return "gray";
        };
    };

    useEffect(() => {
        setCategoriesValue(budgetCategories);
    }, [budgetCategories]);

    useEffect(() => {
        setPeriodValue(data.period);
    }, [data.period]);

    useEffect(() => {
        let startDate =  new Date();
        let endDate = new Date();
        let number = periodValue.replace(/[^0-9]/g, ''); // Keep only number value in string like 2 day(s) becomes 2

        if (periodValue.includes("day")) {
            endDate.setDate(startDate.getDate() + parseInt(number));
        } else if (periodValue.includes("week")) {
            endDate.setDate(startDate.getDate() + (parseInt(number)*7));
        } else if (periodValue.includes("month")) {
            endDate.setDate(startDate.getDate() + (parseInt(number)*30));
        } else if (periodValue.includes("year")) {
            endDate.setDate(startDate.getDate() + (parseInt(number)*365));
        };
        
        if (editMode === false) {
            const difference = categoriesValue.filter((e) => !budgetCategories.includes(e));
            const len = budgetCategories.length - categoriesValue.length;
            // Update categories in firestore if new value different from old value, and if new is not empty
            if ((len > 0 || difference.length > 0) && categoriesValue.length > 0) {
                updateDoc(budgetsRef, {
                    categories: categoriesValue,
                });
            };
            if (periodValue != "" && periodValue != data.period) {
                updateDoc(budgetsRef, {
                    period: periodValue,
                    periodStart: startDate,
                    periodEnd: endDate
                });
            };
        };
    }, [editMode]);

    return (
        <Modal
            isOpen={budgetDetailsOpen}
            close={closeModal}
            editMode={editMode}
            setEditMode={setEditMode}
            title={data.name}
            submit={null}
            type={modalCSS.details}
            content={
                <>
                    <p>{amount < 0 && '-'}${Math.abs(amount)} remaining of ${data.limit}</p>
                    {
                        editMode ?
                            <>
                                <div className={modalCSS.budgetCategories}>
                                    <Multiselect
                                        data={categories}
                                        value={categoriesValue}
                                        setValue={setCategoriesValue}
                                        isOpen={categoriesOpen}
                                        setIsOpen={setCategoriesOpen}
                                        modalOpen={budgetDetailsOpen}
                                    />
                                </div>
                                <div className={modalCSS.budgetPeriods}>
                                    <p>Resets every</p>
                                    <select name="period" required style={{color: changePlaceholderColor(periodValue)}}
                                        value={periodValue} onChange={(e) => setPeriodValue(e.target.value)}
                                    >
                                        <option value="" disabled>Period</option>
                                        {
                                            periodOptions.map((period, index) => {
                                                return Array.from({length: period.count}, (_, i) => i + 1).map((c) => {
                                                    return <option key={index + '-' + c} value={`${c} ${period.name}`}>{c} {period.name}</option>
                                                })
                                            })
                                        }
                                    </select>
                                </div>
                            </> :
                            <>
                                <p>Categories: {budgetCategories.join(', ')}</p>
                                <p>Resets every {periodValue}</p>
                            </>
                    }
                    <Table 
                        data={transactions}
                        editMode={editMode}
                    />
                </>
            }
        />
    );
};

export default BudgetDetails;