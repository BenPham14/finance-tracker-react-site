import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase.js';
import {v4 as uuidv4} from 'uuid';
import Modal from '../../../components/modal/Modal.js';

const AddTransactions = ({accounts, buckets, transactionsOpen, setTransactionsOpen}) => {
    const [nameValue, setNameValue] = useState("");
    const [amountValue, setAmountValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [accountValue, setAccountValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const transactionsRef = collection(db, "transactions");

    const changeDateColor = () => {
        if (dateValue === "") {
            return "gray";
        };
    };

    const changeAccountColor = () => {
        if (accountValue === "") {
            return "gray";
        };
    };

    const changeCategoryColor = () => {
        if (categoryValue === "") {
            return "gray";
        };
    };

    const closeModal = () => {
        setTransactionsOpen(false);
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
            name: nameValue,
            amount: amountValue,
            date: dateValue,
            accountId: accountValue.split(',')[0],
            accountName: accountValue.split(',')[1],
            category: categoryValue
        });
        closeModal();
    };

    return (
        <Modal
            isOpen={transactionsOpen}
            close={closeModal}
            title={"+ Transaction"}
            submit={submitTransaction}
            content={
                <>
                    <input type='text' placeholder='Name' required 
                        value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                    />
                    <input type='number' placeholder='Amount' required min="0"
                        value={amountValue} onChange={(e) => setAmountValue(e.target.value)}
                    />
                    <input type='date' placeholder='Date' required style={{color: changeDateColor()}} 
                        value={dateValue} onChange={(e) => setDateValue(e.target.value)}
                    />
                    <select name='accounts' required style={{color: changeAccountColor()}} 
                        value={accountValue} onChange={(e) => setAccountValue(e.target.value)}
                    >
                        <option value="" disabled>Account</option>
                        {
                            accounts.map((account, index) => (
                                <option key={index} value={[account.id, account.name]}>{account.name}</option>
                            ))
                        }
                    </select>
                    <select name='buckets' required style={{color: changeCategoryColor()}} 
                        value={categoryValue} onChange={(e) => setCategoryValue(e.target.value)}
                    >
                        <option value="" disabled>Category</option>
                        {
                            buckets.map((bucket, index) => (
                                <option key={index} value={bucket.name}>{bucket.name}</option>
                            ))
                        }
                    </select>
                </>
            }
        />
    );
};

export default AddTransactions;