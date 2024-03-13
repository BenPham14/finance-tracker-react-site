import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Multiselect from "../../../components/multiselect/Multiselect";
import { auth, db } from "../../../config/firebase";
import {v4 as uuidv4} from 'uuid';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import modalCSS from "../../../components/modal/modal.module.css";
import { periodOptions } from "../../../context/context";

const AddBudget = ({categories, budgetsOpen, setBudgetsOpen}) => {
    const [nameValue, setNameValue] = useState("");
    const [limitValue, setLimitValue] = useState("");
    const [periodValue, setPeriodValue] = useState("");
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
        setNameValue("");
        setLimitValue("");
        setPeriodValue("");
        setCategoriesValue([]);
        setCategoriesOpen(false);
    };

    const submitBudget = async (e) => {
        e.preventDefault();
        let startDate = new Date();
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

        await addDoc(budgetsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            createdAt: serverTimestamp(),
            name: nameValue,
            limit: limitValue,
            amount: '0',
            period: periodValue,
            periodStart: startDate,
            periodEnd: endDate,
            categories: categoriesValue
        });
        closeModal();
    };

    return (
        <Modal
            isOpen={budgetsOpen}
            close={closeModal}
            title={"+ Budget"}
            submit={submitBudget}
            type={modalCSS.action}
            content={
                <>
                    <input type="text" placeholder="Name" required
                        value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                    />
                    <input type="number" placeholder="Limit" required min="0"
                        value={limitValue} onChange={(e) => setLimitValue(e.target.value)}
                    />
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
                    <Multiselect
                        data={categories}
                        value={categoriesValue}
                        setValue={setCategoriesValue}
                        isOpen={categoriesOpen}
                        setIsOpen={setCategoriesOpen}
                        modalOpen={budgetsOpen}
                    />
                </>
            }
        />
    );
};

export default AddBudget;