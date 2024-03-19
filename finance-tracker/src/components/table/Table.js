import tableCSS from './table.module.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from 'react';

const Table = ({data, editMode}) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteDocValue, setDeleteDocValue] = useState("");

    useEffect(() => {
        if (editMode === false) {
            setDeleteOpen(false);
            setDeleteDocValue("");
        };
    }, [editMode]);

    const showDelete = (value) => {
        setDeleteOpen(true);
        setDeleteDocValue(value);
    };

    const closeDelete = (e) => {
        e.preventDefault();
        setDeleteOpen(false);
    }

    const deleteTranscation = async (e, docId) => {
        e.preventDefault();
        let docRef = doc(db, "transactions", docId);
        await deleteDoc(docRef);
        setDeleteOpen(false);
    };

    return (
        <>
            <table className={tableCSS.table} style={{display: deleteOpen ? "none" : ""}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th id={tableCSS.category}>Category</th>
                        <th>Date</th>
                        <th>Amount</th>
                        {
                            editMode && 
                                <th></th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((value) => (
                            <tr key={value.id}>
                                <td>{value.name}</td>
                                <td id={tableCSS.category}>{value.category}</td>
                                <td>{value.date}</td>
                                <td>{value.type === 'expense' && '-'}${value.amount}</td>
                                {
                                    editMode &&
                                        <td id={tableCSS.editButton} onClick={() => showDelete(value)}><FaTrash/></td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <div className={tableCSS.deleteDialog} style={{display: deleteOpen ? "" : "none"}}>
                <p>Are you sure you want to delete: {deleteDocValue.name} ({deleteDocValue.type === 'expense' && '-'}${deleteDocValue.amount})?</p>
                <div>
                    <button onClick={(e) => deleteTranscation(e, deleteDocValue.docId)}>Delete</button>
                    <button onClick={closeDelete}>Cancel</button>
                </div>
            </div>
        </>
    );
};

export default Table;