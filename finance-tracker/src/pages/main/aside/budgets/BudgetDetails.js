import { useEffect, useState } from 'react';
import Modal from '../../../../components/modal/Modal.js';
import modalCSS from "../../../../components/modal/modal.module.css";
import Table from '../../../../components/table/Table.js';
import Multiselect from '../../../../components/multiselect/Multiselect.js';
import { calculateDates, displayAmounts, validateNumInput } from '../../../../context/helper.js';
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

            const limit = displayAmounts(parseFloat(form.limit));
            if ((limit !== data.limit && limit > 0)) {
                await updateDoc(budgetsRef, {
                    limit: limit
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
                        {editMode ?
                            <div className={modalCSS.budgetDetailsEdit}>
                                <p>Limit</p>
                                <input type="number" placeholder="Limit" min="0" step="0.01"
                                    value={form.limit} onChange={(e) => validateNumInput(e.target.value, form, setForm, "limit")}
                                    onKeyDown={(e) => {e.key === 'Enter' && e.preventDefault();}} // prevents error
                                />
                                <p>Period</p>
                                <select name="period" required value={form.period} onChange={(e) => setForm({...form, period: e.target.value})}
                                    onKeyDown={(e) => {e.key === 'Enter' && e.preventDefault();}} // prevents error
                                >
                                    <option value="" disabled>Period</option>
                                    {periodOptions.map((period, index) => {
                                        return Array.from({length: period.count}, (_, i) => i + 1).map((c) => {
                                            return <option key={index + '-' + c} value={`${c} ${period.name}`}>{c} {period.name}</option>
                                            })
                                            })}
                                </select>
                                <p>Categories</p>
                                <Multiselect
                                    data={categories}
                                    value={categoriesValue}
                                    setValue={setCategoriesValue}
                                    isOpen={categoriesOpen}
                                    setIsOpen={setCategoriesOpen}
                                    modalOpen={budgetDetailsOpen}
                                    hideLabel={true}
                                />
                            </div> :
                            <>
                                <div className={modalCSS.budgetDonut}>
                                    <div>
                                        <Donut 
                                            data={chartData}
                                            width={"90px"}
                                            options={chartOptions}
                                        />
                                    </div>
                                    <div className={modalCSS.budgetLegend}>
                                        <div id={modalCSS.remaining}>
                                            <span></span>
                                            <p>Remaining ({amount < 0 && '-'}${displayAmounts(Math.abs(amount))})</p>
                                        </div>
                                        <div id={modalCSS.spent}>
                                            <span></span>
                                            <p>Spent (${data.limit-amount})</p>
                                        </div>
                                        <div id={modalCSS.limit}>
                                            <span></span>
                                            <p>Limit (${data.limit})</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={modalCSS.budgetDetails}>
                                    <div className={modalCSS.detailsInfo}>
                                        <p id={modalCSS.label}>Categories</p>
                                        <p id={modalCSS.data}>{budgetCategories.join(', ')}</p>
                                    </div>
                                    <div className={modalCSS.detailsInfo}>
                                        <p id={modalCSS.label}>Ends in</p>
                                        <p id={modalCSS.data}>{resetDays}</p>
                                    </div>
                                </div>
                            </>
                        }
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