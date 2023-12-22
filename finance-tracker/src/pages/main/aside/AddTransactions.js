import { useState } from 'react';
import mainCSS from '../main.module.css';
import { IoMdCloseCircle } from 'react-icons/io';

const AddTransactions = ({buckets, modalRef, setTransactionsOpen}) => {
    const [dateValue, setDateValue] = useState("");
    const [selectValue, setSelectValue] = useState("");

    const changeDateColor = () => {
        if (dateValue === "") {
            return "gray";
        };
    };

    const changeSelectColor = () => {
        if (selectValue === "") {
            return "gray";
        };
    };

    return (
        <dialog ref={modalRef} className={mainCSS.modal}>
            <form>
                <div className={mainCSS.modalHeader}>
                    <p>Transactions</p>
                    <IoMdCloseCircle onClick={() => setTransactionsOpen(false)}/>
                </div>
                <input type='text' placeholder='Name'/>
                <input type='number' placeholder='Amount'/>
                <input type='date' placeholder='Date' style={{color: changeDateColor()}} value={dateValue} onChange={(e) => setDateValue(e.target.value)}/>
                <select name='buckets' style={{color: changeSelectColor()}} value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
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