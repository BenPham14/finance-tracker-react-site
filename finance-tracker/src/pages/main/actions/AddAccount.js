import { useState } from "react";
import Modal from "../../../components/modal/Modal";
import { auth, db } from "../../../config/firebase";
import {v4 as uuidv4} from 'uuid';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const AddAccount = ({accountsOpen, setAccountsOpen, toast}) => {
    const [nameValue, setNameValue] = useState("");
    const accountsRef = collection(db, "accounts");

    const closeModal = () => {
        setAccountsOpen(false);
        setNameValue("");
    };

    const submitAccount = async (e) => {
        e.preventDefault();
        
        try { 
            await addDoc(accountsRef, {
                uid: auth.currentUser.uid,
                id: uuidv4(),
                createdAt: serverTimestamp(),
                name: nameValue,
                amount: '0'
            });
            toast.success("Account created");
        } catch (err) {
            console.error(err);
            if (err.code === "permission-denied") {
                toast.error("Cannot make changes in demo mode");
            };
        };

        closeModal();
    };

    return (
        <Modal
            isOpen={accountsOpen}
            close={closeModal}
            title={"Account"}
            content={
                <form onSubmit={submitAccount}>
                    <input type="text" placeholder="Name" required
                        value={nameValue} onChange={(e) => setNameValue(e.target.value)}
                    />
                    <input type='submit'/>
                </form>
            }
        />
    );
};

export default AddAccount;