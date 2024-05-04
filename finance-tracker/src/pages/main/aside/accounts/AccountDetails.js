import modalCSS from "../../../../components/modal/modal.module.css";
import { useState } from 'react';
import Table from '../../../../components/table/Table.js';
import Modal from '../../../../components/modal/Modal.js';

const AccountDetails = ({data, amount, title, accountDetailsOpen, setAccountDetailsOpen}) => {
    const [editMode, setEditMode] = useState(false);

    const cancelEdit = () => {
        setEditMode(false);
    };

    const closeModal = () => {
        setAccountDetailsOpen(false);
        cancelEdit();
    };

    return (
        <Modal
            isOpen={accountDetailsOpen}
            close={closeModal}
            cancel={cancelEdit}
            editMode={editMode}
            setEditMode={setEditMode}
            title={title}
            submit={null}
            type={modalCSS.details}
            warning={`This will delete ${data.length} transactions connected to this account`}
            content={
                <>
                    <p>{amount < 0 && '-'}${Math.abs(amount)} available</p>
                    <Table 
                        data={data}
                        editMode={editMode}
                    />
                </>
            }
        />
    );
};

export default AccountDetails