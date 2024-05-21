import tableCSS from './table.module.css';
import deleteCSS from '../../components/delete/delete.module.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { categories, convertTimestampToDate } from '../../context/context';
import { useEffect, useState } from 'react';

const EditTransaction = ({data, isOpen, setIsOpen, deleteOpen, setDeleteOpen}) => {
    const [form, setForm] = useState({
        type: data.type,
        name: data.name,
        amount: data.amount,
        date: data.timeStamp,
        account: data.accountName,
        category: data.category
    });

    useEffect(() => {
        setForm({
            type: data.type,
            name: data.name,
            amount: data.amount,
            date: data.timeStamp,
            account: data.accountName,
            category: data.category
        });
    }, [data])

    const closeEdit = (e) => {
        e.preventDefault();
        setForm({
            type: data.type,
            name: data.name,
            amount: data.amount,
            date: data.timeStamp,
            account: data.accountName,
            category: data.category
        });
        setIsOpen(false);
    }

    const deleteTranscation = async (e, docId) => {
        e.preventDefault();
        let docRef = doc(db, "transactions", docId);
        await deleteDoc(docRef);
        setIsOpen(false);
    };

    const changePlaceholderColor = (value) => {
        if (value === "") {
            return "gray";
        };
    };

    const preventEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        };
    };

    return (
        <div className={tableCSS.editTransactions} style={{display: isOpen ? "" : "none"}}>
            {!deleteOpen ?
                <>
                    <h3>Edit Transaction</h3>
                    <div className={tableCSS.transactionDetails}>
                        <input type='text' placeholder='Name' value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} onKeyDown={preventEnter}/>
                        <input type='text' placeholder='Amount' value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} onKeyDown={preventEnter}/>
                        <input type='datetime-local'  style={{color: changePlaceholderColor(form.date)}} value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} onKeyDown={preventEnter}/>
                        <input type='text' placeholder='Type' value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} onKeyDown={preventEnter}/>
                        <select name='categories' 
                            value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} 
                            onKeyDown={preventEnter}
                        >
                            <option value="" disabled>Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                        <select name='accounts' required style={{color: changePlaceholderColor(form.account)}} 
                            value={form.account} onChange={(e) => setForm({...form, account: e.target.value})}
                            onKeyDown={preventEnter}
                        >
                            <option value="" disabled>Account</option>
                            {/* {accounts.map((account, index) => (
                                <option key={index} value={[account.id, account.name]}>{account.name}</option>
                            ))} */}
                            <option value='Checking'>Checking</option>
                        </select>
                    </div>
                    <div className={tableCSS.transactionBtns}>
                        <button id={deleteCSS.delete} onClick={(e) => setDeleteOpen(true)}>Delete</button>
                        <div>
                            <button id={tableCSS.cancel} onClick={closeEdit}>Cancel</button>
                            <button id={tableCSS.save} onClick={closeEdit}>Save</button>
                        </div>
                    </div>
                </> :
                <>
                    <p>Are you sure you want to delete: {data.name} ({data.type === 'expense' && '-'}${data.amount})?</p>
                    <div className={deleteCSS.deleteCancelButtons}>
                        <button id={deleteCSS.cancel} onClick={() => setDeleteOpen(false)}>Cancel</button>
                        <button id={deleteCSS.delete} onClick={(e) => deleteTranscation(e, data.docId)}>Delete</button>
                    </div>
                </> 
            }
        </div>
    );
};

export default EditTransaction;