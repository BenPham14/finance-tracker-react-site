import tableCSS from './table.module.css';
import deleteCSS from '../../components/delete/delete.module.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { categories } from '../../context/context';
import { useEffect, useState } from 'react';

const EditTransaction = ({data, accounts, isOpen, setIsOpen, deleteOpen, setDeleteOpen}) => {
    const [form, setForm] = useState({
        type: '',
        name: '',
        amount: '',
        date: '',
        account: '',
        category: ''
    });

    const setFormData = () => {
        const convertTimestamp = (timestamp) => {
            if (timestamp !== undefined) {
                const miliseconds = (data.timeStamp.seconds + (data.timeStamp.nanoseconds)*0.00000001)*1000
                return new Date(new Date(miliseconds).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0];
            };
        };

        setForm({
            type: data.type,
            name: data.name,
            amount: data.amount,
            date: convertTimestamp(data.timeStamp),
            account: data.accountName,
            category: data.category
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

    const deleteTranscation = async (e, docId) => {
        e.preventDefault();
        let docRef = doc(db, "transactions", docId);
        await deleteDoc(docRef);
        setIsOpen(false);
    };

    const openDelete = (e) => {
        e.preventDefault();
        setDeleteOpen(true);
    };

    const cancelDelete = (e) => {
        e.preventDefault();
        setDeleteOpen(false);
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
            <h3>Edit Transaction</h3>
            {!deleteOpen ?
                <>
                    <div className={tableCSS.transactionDetails}>
                        <input type='text' placeholder='Name' value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} onKeyDown={preventEnter}/>
                        <input type='text' placeholder='Amount' value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} onKeyDown={preventEnter}/>
                        <input type='datetime-local'  style={{color: changePlaceholderColor(form.date)}} value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} onKeyDown={preventEnter}/>
                        <select name='type' 
                            value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} 
                            onKeyDown={preventEnter}
                        >
                            <option value="" disabled>Type</option>
                            <option value='income'>Income</option>
                            <option value='expense'>Expense</option>
                        </select>
                        <select name='accounts' required style={{color: changePlaceholderColor(form.account)}} 
                            value={form.account} onChange={(e) => setForm({...form, account: e.target.value})}
                            onKeyDown={preventEnter}
                        >
                            <option value="" disabled>Account</option>
                            {accounts !== undefined &&
                                accounts.map((account, index) => (
                                    <option key={index} value={[account.id, account.name]}>{account.name}</option>
                                ))
                            }
                        </select>
                        <select name='categories' 
                            value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} 
                            onKeyDown={preventEnter}
                        >
                            <option value="" disabled>Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={tableCSS.transactionBtns}>
                        <button id={deleteCSS.delete} onClick={openDelete}>Delete</button>
                        <div>
                            <button id={tableCSS.cancel} onClick={closeEdit}>Cancel</button>
                            <button id={tableCSS.save} onClick={closeEdit}>Save</button>
                        </div>
                    </div>
                </> :
                <>
                    <p>Are you sure you want to delete: {data.name} ({data.type === 'expense' && '-'}${data.amount})?</p>
                    <div className={deleteCSS.deleteCancelButtons}>
                        <button id={deleteCSS.cancel} onClick={cancelDelete}>Cancel</button>
                        <button id={deleteCSS.delete} onClick={(e) => deleteTranscation(e, data.docId)}>Delete</button>
                    </div>
                </> 
            }
        </div>
    );
};

export default EditTransaction;