import deleteCSS from '../../components/delete/delete.module.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const DeleteTransaction = ({data, setIsOpen, setDeleteOpen}) => {
    const cancelDelete = (e) => {
        e.preventDefault();
        setDeleteOpen(false);
    };

    const deleteTranscation = async (e, docId) => {
        e.preventDefault();

        try {
            let docRef = doc(db, "transactions", docId);
            await deleteDoc(docRef);
        } catch (err) {
            console.error(err);
        };

        setDeleteOpen(false);
        setIsOpen(false);
    };

    return (
        <>
            <p>Are you sure you want to delete: {data.name} ({data.type === 'expense' && '-'}${data.amount})?</p>
            <div className={deleteCSS.deleteCancelButtons}>
                <button id={deleteCSS.cancel} onClick={cancelDelete}>Cancel</button>
                <button id={deleteCSS.delete} onClick={(e) => deleteTranscation(e, data.docId)}>Delete</button>
            </div>
        </> 
    );
};

export default DeleteTransaction;