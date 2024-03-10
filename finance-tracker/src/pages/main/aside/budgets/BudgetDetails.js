import { useEffect, useState } from 'react';
import Modal from '../../../../components/modal/Modal.js';
import modalCSS from "../../../../components/modal/modal.module.css";
import Table from '../../../../components/table/Table.js';
import Multiselect from '../../../../components/multiselect/Multiselect.js';
import { categories } from '../../../../context/context.js';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebase.js';

const BudgetDetails = ({data, amount, transactions, budgetCategories, budgetDetailsOpen, setBudgetDetailsOpen}) => {
    const [editMode, setEditMode] = useState(false);
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const budgetsRef = doc(db, "budgets", data.docId);
    
    const closeModal = () => {
        setBudgetDetailsOpen(false);
        setCategoriesValue(budgetCategories);
        setCategoriesOpen(false);
        setEditMode(false);
    };

    useEffect(() => {
        setCategoriesValue(budgetCategories);
    }, [budgetCategories]);

    useEffect(() => {
        if (editMode === false) {
            const difference = categoriesValue.filter((e) => !budgetCategories.includes(e));
            const len = budgetCategories.length - categoriesValue.length;
            // Update categories in firestore if new value different from old value, and if new is not empty
            if ((len > 0 || difference.length > 0) && categoriesValue.length > 0) {
                updateDoc(budgetsRef, {
                    'categories': categoriesValue
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
                    <div className={modalCSS.budgetCategories}>
                        
                        {
                            editMode ?
                                <Multiselect
                                    data={categories}
                                    value={categoriesValue}
                                    setValue={setCategoriesValue}
                                    isOpen={categoriesOpen}
                                    setIsOpen={setCategoriesOpen}
                                    modalOpen={budgetDetailsOpen}
                                /> :
                                <>
                                    <p>Categories:</p>
                                    <p>{budgetCategories.join(', ')}</p> 
                                </>
                                
                        }
                    </div>
                    <p>Resets every {data.period}</p>
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