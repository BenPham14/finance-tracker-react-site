import tableCSS from './table.module.css';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { FaTrash } from "react-icons/fa6";

const Table = ({data, editMode}) => {
    const deleteTranscation = async (docId) => {
        let docRef = doc(db, "transactions", docId);
        await deleteDoc(docRef);
    };

    return (
        <table className={tableCSS.table}>
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
                                    <td onClick={() => deleteTranscation(value.docId)}><FaTrash/></td>
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default Table;