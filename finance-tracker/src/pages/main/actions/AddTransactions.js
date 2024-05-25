import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase.js';
import {v4 as uuidv4} from 'uuid';
import Modal from '../../../components/modal/Modal.js';
import modalCSS from "../../../components/modal/modal.module.css";

const AddTransactions = ({accounts, categories, transactionsOpen, setTransactionsOpen, toast}) => {
    const [form, setForm] = useState({
        type: "expense",
        name: "",
        amount: "",
        date: "",
        account: "",
        category: ""
    });
    const transactionsRef = collection(db, "transactions");

    const changePlaceholderColor = (value) => {
        if (value === "") {
            return "gray";
        };
    };

    const changeRadioColor = (value) => {
        if (value !== form.type) {
            return "gray";
        };
    };

    const closeModal = () => {
        setTransactionsOpen(false);
        setForm({
            type: "expense",
            name: "",
            amount: "",
            date: "",
            account: "",
            category: ""
        });
    };

    const submitTransaction = async (e) => {
        e.preventDefault();
        await addDoc(transactionsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            type: form.type,
            name: form.name,
            amount: form.amount,
            date: new Date(form.date),
            accountId: form.account.split(',')[0],
            accountName: form.account.split(',')[1],
            category: form.type === 'expense' ? form.category : 'Income'
        });
        closeModal();
        toast.success("Transaction created");
    };

    return (
        <Modal
            isOpen={transactionsOpen}
            close={closeModal}
            title={"Transaction"}
            type={modalCSS.action}
            content={
                <form onSubmit={submitTransaction}>
                    <fieldset>
                        <div>
                            <input type='radio' id='expense' name='type' value='expense' checked={form.type === "expense" ? true : false} onChange={(e) => setForm({...form, type: e.target.value})}/>
                            <label htmlFor='expense' style={{color: changeRadioColor('expense')}}>Expense</label>
                        </div>
                        <div>
                            <input type='radio' id='income' name='type' value='income'  checked={form.type === "income" ? true : false} onChange={(e) => setForm({...form, type: e.target.value})}/>
                            <label htmlFor='income' style={{color: changeRadioColor('income')}}>Income</label>
                        </div>
                    </fieldset>
                    <input type='text' placeholder='Name' required 
                        value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input type='number' placeholder='Amount' required min="0"
                        value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})}
                    />
                    <input type='datetime-local' required style={{color: changePlaceholderColor(form.date)}} 
                        value={form.date} onChange={(e) => setForm({...form, date: e.target.value})}
                    />
                    <select name='accounts' required style={{color: changePlaceholderColor(form.account)}} 
                        value={form.account} onChange={(e) => setForm({...form, account: e.target.value})}
                    >
                        <option value="" disabled>Account</option>
                        {accounts.map((account, index) => (
                            <option key={index} value={[account.id, account.name]}>{account.name}</option>
                        ))}
                    </select>
                    <select name='categories' required={form.type === 'income' ? false : true} style={{color: changePlaceholderColor(form.category), display: form.type === 'income' && 'none'}} 
                        value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}
                    >
                        <option value="" disabled>Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                    <input type='submit'/>
                </form>
            }
        />
    );
};

export default AddTransactions;