import { useEffect, useState } from 'react';
import Modal from '../../../../components/modal/Modal.js';
import modalCSS from "../../../../components/modal/modal.module.css";
import Table from '../../../../components/table/Table.js';
import Multiselect from '../../../../components/multiselect/Multiselect.js';
import { calculateDates, categories, periodOptions } from '../../../../context/context.js';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebase.js';
import Donut from "../../../../components/charts/Donut";

const BudgetDetails = ({data, amount, transactions, budgetCategories, budgetDetailsOpen, setBudgetDetailsOpen}) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [limitValue, setLimitValue] = useState(data.limit);
    const [categoriesValue, setCategoriesValue] = useState(budgetCategories);
    const [periodValue, setPeriodValue] = useState(data.period);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const budgetsRef = doc(db, "budgets", data.docId);

    const [chartData, setChartData] = useState({
        labels: ["Spent", "Remaining"],
        datasets: [{
            label: "",
            data: [data.limit, 0],
            backgroundColor: ["black", "#6C63FF"]
        }]
    });

    const chartOptions = {
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    const cancelEdit = () => {
        setLimitValue(data.limit)
        setCategoriesValue(budgetCategories);
        setPeriodValue(data.period);
        setCategoriesOpen(false);
        setDeleteMode(false);
        setEditMode(false);
    };
    
    const closeModal = () => {
        setBudgetDetailsOpen(false);
        cancelEdit();
    };

    const changePlaceholderColor = (value) => {
        if (value === "") {
            return "gray";
        };
    };

    useEffect(() => {
        let limit = data.limit;
        let remaining = amount;
        let dataValue = [limit-remaining, remaining];
        let color = ["black", "#6C63FF"];

        if (remaining < 0) {
            dataValue = [0, remaining];
            color = ["black"]
        };

        setChartData(chartData => ({...chartData, 
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: dataValue,
                        backgroundColor: color
                    }
                ]
            })
        );
    }, [amount]);

    useEffect(() => {
        const dates = calculateDates(periodValue);
        
        if (editMode === false) {
            const difference = categoriesValue.filter((e) => !budgetCategories.includes(e));
            const len = budgetCategories.length - categoriesValue.length;
            // Update categories in firestore if new value different from old value, and if new is not empty
            if ((limitValue !== data.limit && limitValue > 0)) {
                updateDoc(budgetsRef, {
                    limit: limitValue
                })
            };
            if ((len > 0 || difference.length > 0) && categoriesValue.length > 0) {
                updateDoc(budgetsRef, {
                    categories: categoriesValue,
                });
            };
            if (periodValue !== "" && periodValue !== data.period) {
                updateDoc(budgetsRef, {
                    period: periodValue,
                    periodStart: dates.startDate,
                    periodEnd: dates.endDate
                });
            };
        };
    }, [editMode]);

    const deleteBudget = async (e) => {
        e.preventDefault();
        let docRef = doc(db, "budgets", data.docId);
        await deleteDoc(docRef);
        closeModal();
    };

    return (
        <Modal
            isOpen={budgetDetailsOpen}
            close={closeModal}
            cancel={cancelEdit}
            editMode={editMode}
            setEditMode={setEditMode}
            deleteMode={deleteMode}
            setDeleteMode={setDeleteMode}
            deleteFn={deleteBudget}
            title={data.name}
            submit={null}
            type={modalCSS.details}
            content={
                <>
                    <div className={modalCSS.budget}>
                        <div className={modalCSS.budgetDetails}>
                            {editMode ?
                                <>
                                    <p>{amount < 0 && '-'}${Math.abs(amount)} remaining of $
                                        <input type="number" placeholder="Limit" min="0"
                                            value={limitValue} onChange={(e) => setLimitValue(e.target.value)}
                                        />
                                    </p>
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
                                    <p>Resets every
                                    <select name="period" required style={{color: changePlaceholderColor(periodValue)}}
                                        value={periodValue} onChange={(e) => setPeriodValue(e.target.value)}
                                    >
                                        <option value="" disabled>Period</option>
                                        {periodOptions.map((period, index) => {
                                            return Array.from({length: period.count}, (_, i) => i + 1).map((c) => {
                                                return <option key={index + '-' + c} value={`${c} ${period.name}`}>{c} {period.name}</option>
                                            })
                                        })}
                                    </select>
                                    </p>
                                </> :
                                <>
                                    <p>{amount < 0 && '-'}${Math.abs(amount)} remaining of ${data.limit}</p>
                                    <p>Categories: {budgetCategories.join(', ')}</p>
                                    <p>Resets every {periodValue}</p>
                                </>
                            }
                        </div>
                        <div className={modalCSS.budgetDonut}>
                            <div>
                                <Donut 
                                    data={chartData}
                                    width={"90px"}
                                    options={chartOptions}
                                />
                            </div>
                            <div className={modalCSS.budgetLegend}>
                                <div id={modalCSS.remaining} style={{display: amount <= 0 && "none"}}>
                                    <span></span>
                                    <p>Remaining</p>
                                </div>
                                <div id={modalCSS.spent} style={{display: data.limit-amount <= 0 && "none"}}>
                                    <span></span>
                                    <p>Spent</p>
                                </div>
                            </div>
                        </div>
                    </div>
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