import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase.js';
import {v4 as uuidv4} from 'uuid';
import Modal from './Modal.js';

const AddTransactions = ({buckets, transactionsOpen, setTransactionsOpen}) => {
    const [nameValue, setNameValue] = useState("");
    const [amountValue, setAmountValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const transactionsRef = collection(db, "transactions");

    const changeDateColor = () => {
        if (dateValue === "") {
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