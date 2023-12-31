import { useState } from "react";
import Modal from "./Modal";
import { auth, db } from "../../../config/firebase";
import {v4 as uuidv4} from 'uuid';
import { addDoc, collection } from "firebase/firestore";

const AddAccount = ({accountsOpen, setAccountsOpen}) => {
    const [nameValue, setNameValue] = useState("");
    const accountsRef = collection(db, "accounts");

    const closeModal = () => {
        setAccountsOpen(false);
        setNameValue("");
    };

    const submitAccount = async (e) => {
        e.preventDefault();
        await addDoc(accountsRef, {
            uid: auth.currentUser.uid,
            id: uuidv4(),
            name: nameValue,
            amount: '0'
        });
        closeModal();
    };

    return (
        <Modal
            isOpen={accountsOpen}
            close={closeModal}
            title={"+ Account"}
            submit={submitAccount}
            content={
                <>
                    <input type="text" placeholder="Name" required
                        value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                    />
                </>
            }
        />
    );
};

export default AddAccount;