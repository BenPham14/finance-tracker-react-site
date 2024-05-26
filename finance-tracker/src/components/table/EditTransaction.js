import tableCSS from './table.module.css';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { categories } from '../../context/data.js';
import { changePlaceholderColor, changeRadioColor } from '../../context/helper.js';
import { useEffect, useState } from 'react';
import DeleteTransaction from './DeleteTransaction';

const EditTransaction = ({data, accounts, setIsOpen, deleteOpen, setDeleteOpen}) => {
    const [form, setForm] = useState({
        type: '',
        name: '',
        amount: '',
        timeStamp: '',
        accountId: '',
        accountName: '',
        category: ''
    });

    const convertTimestamp = (timestamp) => {
        if (timestamp !== undefined) {
            const miliseconds = (data.timeStamp.seconds + (data.timeStamp.nanoseconds)*0.00000001)*1000
            return new Date(new Date(miliseconds).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
        };
    };

    const setFormData = () => {
        setForm({
            type: data.type,
            name: data.name,
            amount: data.amount,
            timeStamp: convertTimestamp(data.timeStamp),
            accountId: data.accountId,
            accountName: data.accountName,
            category: data.category !== 'Income' ? data.category : ''
        });
    };

    useEffect(() => {
        if (data.id !== undefined) {
            setFormData();
        };
    }, [data])

    const closeEdit = (e) => {
        e.preventDefault();
        setFormData();
        setIsOpen(false);
    }

    const openDelete = (e) => {
        e.preventDefault();
        setDeleteOpen(true);
    };

    const updateTransaction = async (e) => {
        e.preventDefault();

        const transactionsRef = doc(db, "transactions", data.docId);
        let diff = {};

        Object.keys(form).forEach((key) => {
            if (form[key] !== data[key]) {
                diff[key] = form[key];
            };
        });

        // If type changes to income then set category to Income
        if (form.type === 'income' && data.type === 'income') {
            delete diff.category;
        } else if (diff.type === 'income') {
            diff.category = 'Income';
        };

        // Convert timestamp to date. If date changes then set new date in Firestore
        if (form.timeStamp !== convertTimestamp(data.timeStamp)) {
            diff.date = new Date(form.timeStamp);
        };
        delete diff.timeStamp;

        if (Object.keys(diff).length > 0) {
            await updateDoc(transactionsRef, diff);
        };

        closeEdit(e);
    };

    return (
        <div className={tableCSS.editTransactions}>
            <h3>Edit Transaction</h3>
            {!deleteOpen ?
                <>
                    <form className={tableCSS.transactionDetails} id='updateTransaction' onSubmit={updateTransaction}>
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
                        <input required type='text' placeholder='Name' value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
                        <input required type='text' placeholder='Amount' value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})}/>
                        <input required type='datetime-local'  style={{color: changePlaceholderColor(form.date)}} value={form.timeStamp} onChange={(e) => setForm({...form, timeStamp: e.target.value})}/>
                        <select required name='accounts' style={{color: changePlaceholderColor(form.accountId)}} 
                            value={[form.accountId, form.accountName]} onChange={(e) => setForm({...form, accountId: e.target.value.split(',')[0], accountName: e.target.value.split(',')[1]})}
                        >
                            <option value="" disabled>Account</option>
                            {accounts !== undefined &&
                                accounts.map((account, index) => (
                                    <option key={index} value={[account.id, account.name]}>{account.name}</option>
                                ))
                            }
                        </select>
                        {form.type === 'expense' && 
                            <select required name='categories' style={{color: changePlaceholderColor(form.category)}}
                                value={form.category} onChange={(e) => setForm({...form, category: e.target.value})}
                            >
                                <option value="" disabled>Category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        }
                    </form>

                    <div className={tableCSS.transactionBtns}>
                        <button id={tableCSS.delete} onClick={openDelete}>Delete</button>
                        <div>
                            <button id={tableCSS.cancel} onClick={closeEdit}>Cancel</button>
                            <button id={tableCSS.save} form='updateTransaction' type='submit'>Save</button>
                        </div>
                    </div>
                </> :
                <DeleteTransaction
                    data={data}
                    setIsOpen={setIsOpen}
                    setDeleteOpen={setDeleteOpen}
                />
            }
        </div>
    );
};

export default EditTransaction;