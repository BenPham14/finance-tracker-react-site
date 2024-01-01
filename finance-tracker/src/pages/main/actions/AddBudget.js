import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import { auth, db } from "../../../config/firebase";
import {v4 as uuidv4} from 'uuid';
import { addDoc, collection } from "firebase/firestore";

const AddBudget = ({accounts, budgetsOpen, setBudgetsOpen}) => {
    const [nameValue, setNameValue] = useState("");
    const [limitValue, setLimitValue] = useState("");
    const [accountValue, setAccountValue] = useState("");
    const budgetsRef = collection(db, "budgets");

    const changeAccountColor = () => {
        if (accountValue === "") {
            return "gray";
        };
    };

    const closeModal = (e) => {
        setBudgetsOpen(false);
        setNameValue("");
        setLimitValue("");
        setAccountValue("");
    };

    const submitBudget = async (e) => {
        e.preventDefault();
        await addDoc(budgetsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            accountId: accountValue.split(',')[0],
            accountName: accountValue.split(',')[1],
            name: nameValue,
            limit: limitValue,
            amount: '0'
        });
        closeModal();
    };

    return (
        <Modal
            isOpen={budgetsOpen}
            close={closeModal}
            title={"+ Budget"}
            submit={submitBudget}
            content={
                <>
                    <input type="text" placeholder="Name" required
                        value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                    />
                    <input type="number" placeholder="Limit" required min="0"
                        value={limitValue} onChange={(e) => setLimitValue(e.target.value)}
                    />
                    <select name="accounts" required style={{color: changeAccountColor()}}
                        value={accountValue} 
                        onChange={(e) => setAccountValue(e.target.value)}
                    >
                        <option value="" disabled>Account</option>
                        {
                            accounts.map((account, index) => (
                                <option key={index} value={[account.id, account.name]}>{account.name}</option>
                            ))
                        }
                    </select>
                </>
            }
        />
    );
};

export default AddBudget;