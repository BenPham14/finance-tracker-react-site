import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase.js';
import {v4 as uuidv4} from 'uuid';
import Modal from '../../../components/modal/Modal.js';
import modalCSS from "../../../components/modal/modal.module.css";

const AddTransactions = ({accounts, categories, transactionsOpen, setTransactionsOpen}) => {
    const [typeValue, setTypeValue] = useState("expense");
    const [nameValue, setNameValue] = useState("");
    const [amountValue, setAmountValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [accountValue, setAccountValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const transactionsRef = collection(db, "transactions");

    const changePlaceholderColor = (value) => {
        if (value === "") {
            return "gray";
        };
    };

    const changeRadioColor = (value) => {
        if (value !== typeValue) {
            return "gray";
        };
    };

    const closeModal = () => {
        setTransactionsOpen(false);
        setTypeValue("expense");
        setNameValue("");
        setAmountValue("");
        setDateValue("");
        setAccountValue("");
        setCategoryValue("");
    };

    const submitTransaction = async (e) => {
        e.preventDefault();
        await addDoc(transactionsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            type: typeValue,
            name: nameValue,
            amount: amountValue,
            date: dateValue,
            accountId: accountValue.split(',')[0],
            accountName: accountValue.split(',')[1],
            category: typeValue === 'expense' ? categoryValue : 'Income'
        });
        closeModal();
    };

    return (
        <Modal
            isOpen={transactionsOpen}
            close={closeModal}
            title={"+ Transaction"}
            submit={submitTransaction}
            type={modalCSS.action}
            content={
                <>
                    <fieldset>
                        <div>
                            <input type='radio' id='expense' name='type' value='expense' checked={typeValue === "expense" ? true : false} onChange={(e) => setTypeValue(e.target.value)}/>
                            <label htmlFor='expense' style={{color: changeRadioColor('expense')}}>Expense</label>
                        </div>
                        <div>
                            <input type='radio' id='income' name='type' value='income'  checked={typeValue === "income" ? true : false} onChange={(e) => setTypeValue(e.target.value)}/>
                            <label htmlFor='income' style={{color: changeRadioColor('income')}}>Income</label>
                        </div>
                    </fieldset>
                    <input type='text' placeholder='Name' required 
                        value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                    />
                    <input type='number' placeholder='Amount' required min="0"
                        value={amountValue} onChange={(e) => setAmountValue(e.target.value)}
                    />
                    <input type='date' required style={{color: changePlaceholderColor(dateValue)}} 
                        value={dateValue} onChange={(e) => setDateValue(e.target.value)}
                    />
                    <select name='accounts' required style={{color: changePlaceholderColor(accountValue)}} 
                        value={accountValue} onChange={(e) => setAccountValue(e.target.value)}
                    >
                        <option value="" disabled>Account</option>
                        {
                            accounts.map((account, index) => (
                                <option key={index} value={[account.id, account.name]}>{account.name}</option>
                            ))
                        }
                    </select>
                    <select name='categories' required={typeValue === 'income' ? false : true} style={{color: changePlaceholderColor(categoryValue), display: typeValue === 'income' && 'none'}} 
                        value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)}
                    >
                        <option value="" disabled>Category</option>
                        {
                            categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))
                        }
                    </select>
                </>
            }
        />
    );
};

export default AddTransactions;