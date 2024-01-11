import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import { auth, db } from "../../../config/firebase";
import {v4 as uuidv4} from 'uuid';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import modalCSS from '../../../components/modal/modal.module.css';
import { VscChevronDown } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa6";

const Checkbox = ({category, categoriesValue, setCategoriesValue}) => {
    const [isChecked, setIsChecked] = useState(false);

    const onCheck = () => {
        if (isChecked) {
            const result = categoriesValue.filter((value) => value !== category.name);
            setCategoriesValue(result);
            setIsChecked(false);
            
        } else {
            setCategoriesValue([...categoriesValue, category.name]);
            setIsChecked(true);
        };
    };

    return (
        <div className={modalCSS.checkbox} onClick={onCheck}>
            <input type="checkbox" value={category.name} id={category.name} name={category.name} checked={isChecked} readOnly/>
            <FaCheck style={{display: !isChecked && 'none'}}/>
        </div>
    );
};

const AddBudget = ({accounts, categories, budgetsOpen, setBudgetsOpen}) => {
    const [nameValue, setNameValue] = useState("");
    const [limitValue, setLimitValue] = useState("");
    const [accountValue, setAccountValue] = useState("");
    const [categoriesValue, setCategoriesValue] = useState([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const budgetsRef = collection(db, "budgets");

    const changePlaceholderColor = (value) => {
        if (value === "" || value.length === 0) {
            return "gray";
        };
    };

    const closeModal = (e) => {
        setBudgetsOpen(false);
        setNameValue("");
        setLimitValue("");
        setAccountValue("");
        setCategoriesValue([]);
        setCategoriesOpen(false);
    };

    const submitBudget = async (e) => {
        e.preventDefault();
        await addDoc(budgetsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            createdAt: serverTimestamp(),
            accountId: accountValue.split(',')[0],
            accountName: accountValue.split(',')[1],
            name: nameValue,
            limit: limitValue,
            amount: '0'
        });
        closeModal();
    };

    return (
        <Modal
            isOpen={budgetsOpen}
            close={closeModal}
            title={"+ Budget"}
            submit={submitBudget}
            content={
                <>
                    <input type="text" placeholder="Name" required
                        value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                    />
                    <input type="number" placeholder="Limit" required min="0"
                        value={limitValue} onChange={(e) => setLimitValue(e.target.value)}
                    />
                    <select name="accounts" required style={{color: changePlaceholderColor(accountValue)}}
                        value={accountValue} 
                        onChange={(e) => setAccountValue(e.target.value)}
                    >
                        <option value="" disabled>Account</option>
                        {
                            accounts.map((account, index) => (
                                <option key={index} value={[account.id, account.name]}>{account.name}</option>
                            ))
                        }
                    </select>
                    <div className={modalCSS.categories}>
                        <div className={modalCSS.categoriesSelected} onClick={() => setCategoriesOpen(!categoriesOpen)}>
                            <p style={{color: changePlaceholderColor(categoriesValue)}}>Categories: {categoriesValue.length}</p>
                            <VscChevronDown style={{color: changePlaceholderColor(categoriesValue)}}/>
                        </div>
                        <div className={modalCSS.categoryOptions}  style={{display: !categoriesOpen && "none"}}>
                            {
                                categories.map((category, index) => (
                                    <div key={index}>
                                        <Checkbox 
                                            category={category} 
                                            categoriesValue={categoriesValue}
                                            setCategoriesValue={setCategoriesValue}
                                        />
                                        <label htmlFor={category.name}>{category.name}</label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </>
            }
        />
    );
};

export default AddBudget;