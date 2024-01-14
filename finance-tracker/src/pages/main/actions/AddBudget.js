import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import Multiselect from "../../../components/multiselect/Multiselect";
import { auth, db } from "../../../config/firebase";
import {v4 as uuidv4} from 'uuid';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import modalCSS from "../../../components/modal/modal.module.css";

const AddBudget = ({categories, budgetsOpen, setBudgetsOpen}) => {
    const [nameValue, setNameValue] = useState("");
    const [limitValue, setLimitValue] = useState("");
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const budgetsRef = collection(db, "budgets");

    const closeModal = (e) => {
        setBudgetsOpen(false);
        setNameValue("");
        setLimitValue("");
        setCategoriesValue([]);
        setCategoriesOpen(false);
    };

    const submitBudget = async (e) => {
        e.preventDefault();
        await addDoc(budgetsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            createdAt: serverTimestamp(),
            name: nameValue,
            limit: limitValue,
            amount: '0',
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