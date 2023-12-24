import { useEffect, useState, useRef } from 'react';
import mainCSS from '../main.module.css';
import { IoMdCloseCircle } from 'react-icons/io';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../config/firebase.js';
import {v4 as uuidv4} from 'uuid';

const AddTransactions = ({buckets, transactionsOpen, setTransactionsOpen}) => {
    const transactionsModalRef = useRef(null);
    const [nameValue, setNameValue] = useState("");
    const [amountValue, setAmountValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const transactionsRef = collection(db, "transactions");

    useEffect(() => {
        if (transactionsOpen) {
            const onEscape = (e) => {
                if (e.code === "Escape") {
                    setTransactionsOpen(false);
                };
            };
            transactionsModalRef.current.showModal();
            window.addEventListener("keydown", onEscape);
            document.body.style.overflow = "hidden";
            return () => window.removeEventListener("keydown", onEscape);
        } else {
            transactionsModalRef.current.close();
            document.body.style.overflow = "auto";
        };
    }, [transactionsOpen]);

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
        <dialog ref={transactionsModalRef} className={mainCSS.modal}>
            <form onSubmit={submitTransaction}>
                <div className={mainCSS.modalHeader}>
                    <p>Transactions</p>
                    <IoMdCloseCircle onClick={closeModal}/>
                </div>
                <input type='text' placeholder='Name' required 
                    value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                />
                <input type='number' placeholder='Amount' required 
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
                <input type='submit'/>
            </form>
        </dialog>
    );
};

export default AddTransactions;