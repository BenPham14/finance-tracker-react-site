import { useEffect, useState } from 'react';
import Modal from '../../../../components/modal/Modal.js';
import modalCSS from "../../../../components/modal/modal.module.css";
import Table from '../../../../components/table/Table.js';
import Multiselect from '../../../../components/multiselect/Multiselect.js';
import { calculateDates } from '../../../../context/helper.js';
import { categories, periodOptions } from '../../../../context/data.js';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../config/firebase.js';
import Donut from "../../../../components/charts/Donut";

const BudgetDetails = ({data, amount, accounts, transactions, resetDays, budgetCategories, budgetDetailsOpen, setBudgetDetailsOpen, toast}) => {
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [form, setForm] = useState({
        limit: data.limit,
        period: data.period
    });
    const [titleValue, setTitleValue] = useState(data.name);
    const [categoriesValue, setCategoriesValue] = useState(budgetCategories);
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
        setForm({
            limit: data.limit,
            period: data.period
        });
        setTitleValue(data.name);
        setCategoriesValue(budgetCategories);
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
        const dates = calculateDates(form.period);
        
        if (editMode === false) {
            updateBudget(dates);
            setCategoriesOpen(false);
        };
    }, [editMode]);

    const updateBudget = async (dates) => {
        try {
            const difference = categoriesValue.filter((e) => !budgetCategories.includes(e));
            const len = budgetCategories.length - categoriesValue.length;

            // Update categories in firestore if new value different from old value, and if new is not empty
            if ((titleValue !== data.name && titleValue !== '')) {
                await updateDoc(budgetsRef, {
                    name: titleValue
                });
            } else {
                setTitleValue(data.name);
            };

            if ((form.limit !== data.limit && form.limit > 0)) {
                await updateDoc(budgetsRef, {
                    limit: form.limit
                });
            } else {
                setForm({...form, limit: data.limit});
            };

            if ((len > 0 || difference.length > 0) && categoriesValue.length > 0) {
                await updateDoc(budgetsRef, {
                    categories: categoriesValue,
                });
            } else {
                setCategoriesValue(budgetCategories);
            };

            if (form.period !== "" && form.period !== data.period) {
                await updateDoc(budgetsRef, {
                    period: form.period,
                    periodStart: dates.startDate,
                    periodEnd: dates.endDate
                });
            };
        } catch (err) {
            console.error(err);
            if (err.code === "permission-denied") {
                cancelEdit();
                toast.error("Cannot make changes in demo mode");
            };
        };
    };

    const deleteBudget = async (e) => {
        e.preventDefault();

        try {
            let docRef = doc(db, "budgets", data.docId);
            await deleteDoc(docRef);
            toast.error("Budget deleted");
        } catch (err) {
            console.error(err);
            if (err.code === "permission-denied") {
                toast.error("Cannot make changes in demo mode");
            };
        };
        
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
            title={titleValue}
            changeTitle={setTitleValue}
            type={'budgets'}
            content={
                <>
                    <div className={modalCSS.budget}>
                        <div className={modalCSS.budgetDetails}>
                            {editMode ?
                                <>
                                    <p>{amount < 0 && '-'}${Math.abs(amount)} remaining of $
                                        <input type="number" placeholder="Limit" min="0"
                                            value={form.limit} onChange={(e) => setForm({...form, limit: e.target.value})}
                                            onKeyDown={(e) => {e.key === 'Enter' && e.preventDefault();}} // prevents error
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
                                        <select name="period" required style={{color: changePlaceholderColor(form.period)}}
                                            value={form.period} onChange={(e) => setForm({...form, period: e.target.value})}
                                            onKeyDown={(e) => {e.key === 'Enter' && e.preventDefault();}} // prevents error
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
                                    <p>{resetDays}</p>
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
                        accounts={accounts}
                        editMode={editMode}
                    />
                </>
            }
        />
    );
};

export default BudgetDetails;