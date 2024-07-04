import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Multiselect from "../../../components/multiselect/Multiselect";
import { auth, db } from "../../../config/firebase";
import {v4 as uuidv4} from 'uuid';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { calculateDates } from "../../../context/helper.js";
import { periodOptions } from "../../../context/data.js";

const AddBudget = ({categories, budgetsOpen, setBudgetsOpen, toast}) => {
    const [form, setForm] = useState({
        name: "",
        limit: "",
        period: ""
    });
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const budgetsRef = collection(db, "budgets");

    const changePlaceholderColor = (value) => {
        if (value === "") {
            return "gray";
        };
    };

    const closeModal = (e) => {
        setBudgetsOpen(false);
        setForm({
            name: "",
            limit: "",
            period: ""
        });
        setCategoriesValue([]);
        setCategoriesOpen(false);
    };

    const submitBudget = async (e) => {
        e.preventDefault();

        try {
            const dates = calculateDates(form.period);
            await addDoc(budgetsRef, {
                uid: auth.currentUser.uid,
                id: uuidv4(),
                createdAt: serverTimestamp(),
                name: form.name,
                limit: parseFloat(form.limit).toFixed(2).replace(/\.00$/, ''),
                amount: '0',
                period: form.period,
                periodStart: dates.startDate,
                periodEnd: dates.endDate,
                categories: categoriesValue
            });
            toast.success("Budget created");
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
            isOpen={budgetsOpen}
            close={closeModal}
            title={"Budget"}
            content={
                <form onSubmit={submitBudget}>
                    <input type="text" placeholder="Name" required
                        value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input type="number" placeholder="Limit" required min="0" step="0.01"
                        value={form.limit} onChange={(e) => setForm({...form, limit: e.target.value})}
                    />
                    <select name="period" required style={{color: changePlaceholderColor(form.period)}}
                        value={form.period} onChange={(e) => setForm({...form, period: e.target.value})}
                    >
                        <option value="" disabled>Period</option>
                        {periodOptions.map((period, index) => {
                            return Array.from({length: period.count}, (_, i) => i + 1).map((c) => {
                                return <option key={index + '-' + c} value={`${c} ${period.name}`}>{c} {period.name}</option>
                            })
                        })}
                    </select>
                    <Multiselect
                        data={categories}
                        value={categoriesValue}
                        setValue={setCategoriesValue}
                        isOpen={categoriesOpen}
                        setIsOpen={setCategoriesOpen}
                        modalOpen={budgetsOpen}
                    />
                    <input type='submit'/>
                </form>
            }
        />
    );
};

export default AddBudget;