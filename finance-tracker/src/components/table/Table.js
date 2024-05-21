import tableCSS from './table.module.css';
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from 'react';
import EditTransaction from './EditTransaction';

const Table = ({data, editMode}) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteDocValue, setDeleteDocValue] = useState("");

    useEffect(() => {
        if (editMode === false) {
            setEditOpen(false);
            setDeleteOpen(false);
            setDeleteDocValue("");
        };
    }, [editMode]);

    const showDelete = (value) => {
        setEditOpen(true);
        setDeleteDocValue(value);
    };

    return (
        <>
            <table className={tableCSS.table} style={{display: editOpen ? "none" : ""}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th id={tableCSS.category}>Category</th>
                        <th>Date</th>
                        <th style={{textAlign: 'center'}}>Amount</th>
                        {(editMode && data.length > 0) && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((value) => (
                        <tr key={value.id}>
                            <td>{value.name}</td>
                            <td id={tableCSS.category}>{value.category}</td>
                            <td>{value.date}</td>
                            <td id={value.type === 'expense' ? tableCSS.redCell : tableCSS.greenCell}>{value.type === 'expense' && '-'}${value.amount}</td>
                            {editMode && <td id={tableCSS.editButton} onClick={() => showDelete(value)}><MdEdit/></td>}
                        </tr>
                    ))}
                    {data.length === 0 &&
                        <tr>
                            <td style={{color: "gray"}}>No Transactions</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    }
                </tbody>
            </table>

            <EditTransaction
                data={deleteDocValue}
                isOpen={editOpen}
                setIsOpen={setEditOpen}
                deleteOpen={deleteOpen}
                setDeleteOpen={setDeleteOpen}
            />
        </>
    );
};

export default Table;