import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase.js';
import {v4 as uuidv4} from 'uuid';
import Modal from '../../../components/modal/Modal.js';
import { changePlaceholderColor, changeRadioColor, displayAmounts } from '../../../context/helper.js';

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

        try {
            await addDoc(transactionsRef, {
                uid: auth.currentUser.uid,
                id: uuidv4(),
                type: form.type,
                name: form.name,
                amount: displayAmounts(parseFloat(form.amount)),
                date: new Date(form.date),
                accountId: form.account.split(',')[0],
                accountName: form.account.split(',')[1],
                category: form.type === 'expense' ? form.category : 'Income'
            });
            toast.success("Transaction created");
        } catch (err) {
            console.error(err);
            if (err.code === "permission-denied") {
                toast.error("Cannot make changes in demo mode");
            };
        };

        closeModal();
    };

    const validateNumInput = (text) => {
        const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/);
        if (validated) {
            setForm({...form, amount: text});
        };
    };

    return (
        <Modal
            isOpen={transactionsOpen}
            close={closeModal}
            title={"Transaction"}
            content={
                <form onSubmit={submitTransaction}>
                    <fieldset>
                        <div>
                            <input type='radio' id='expense' name='type' value='expense' checked={form.type === "expense" ? true : false} onChange={(e) => setForm({...form, type: e.target.value})}/>
                            <label htmlFor='expense' style={{color: changeRadioColor('expense', form.type)}}>Expense</label>
                        </div>
                        <div>
                            <input type='radio' id='income' name='type' value='income'  checked={form.type === "income" ? true : false} onChange={(e) => setForm({...form, type: e.target.value})}/>
                            <label htmlFor='income' style={{color: changeRadioColor('income', form.type)}}>Income</label>
                        </div>
                    </fieldset>
                    <input type='text' placeholder='Name' required 
                        value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input type='number' placeholder='Amount' required min="0" step="0.01"
                        value={form.amount} onChange={(e) => validateNumInput(e.target.value)}
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