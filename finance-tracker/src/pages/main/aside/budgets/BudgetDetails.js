import { useEffect, useState } from 'react';
import Modal from '../../../../components/modal/Modal.js';
import modalCSS from "../../../../components/modal/modal.module.css";
import Table from '../../../../components/table/Table.js';
import Multiselect from '../../../../components/multiselect/Multiselect.js';
import { categories } from '../../../../context/context.js';

const BudgetDetails = ({data, amount, transactions, budgetCategories, budgetDetailsOpen, setBudgetDetailsOpen}) => {
    const [editMode, setEditMode] = useState(false);
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    
    const closeModal = () => {
        setBudgetDetailsOpen(false);
        setCategoriesValue(budgetCategories);
        setCategoriesOpen(false);
        setEditMode(false);
    };

    useEffect(() => {
        setCategoriesValue(budgetCategories);
    }, [budgetCategories])

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