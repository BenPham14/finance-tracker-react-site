import { useEffect, useRef, useState } from 'react';
import modalCSS from './modal.module.css';
import deleteCSS from '../../components/delete/delete.module.css';
import { IoMdClose } from 'react-icons/io';
import { FaTrash } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

const Modal = ({isOpen, close, cancel, editMode, setEditMode, deleteMode, setDeleteMode, deleteFn, title, submit, type, warning, content}) => {
    const modalRef = useRef(null);
    const [cancelColor, setCancelColor] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const onEscape = (e) => {
                if (e.code === "Escape") {
                    close();
                    setCancelColor(false);
                };
            };
            modalRef.current.showModal();
            window.addEventListener("keydown", onEscape);
            document.body.style.overflow = "hidden";
            return () => window.removeEventListener("keydown", onEscape);
        } else {
            modalRef.current.close();
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const cancelEdit = () => {
        cancel();
        setCancelColor(false);
    };

    const showEditModeButtons = () => {
        if (type === modalCSS.action) {
            return;
        };

        if (editMode) {
            if (!deleteMode) {
                return (
                    <>
                        {deleteMode != null && <FaTrash onClick={() => setDeleteMode(true)} id={modalCSS.deleteModal}/>}
                        <div className={`${modalCSS.modalSaveCancel} ${cancelColor && modalCSS.cancel}`}>
                            <p id={modalCSS.saveEdit} onClick={() => setEditMode(false)}>Save</p>
                            <p id={modalCSS.cancelEdit} onClick={cancelEdit} onMouseEnter={() => setCancelColor(true)} onMouseLeave={() => setCancelColor(false)}>Cancel</p>
                        </div>
                    </>
                );
            }
        } else {
            return <MdEdit id={modalCSS.headerIcon} onClick={() => setEditMode(true)}/>;
        };
    };

    return (
        <dialog ref={modalRef} className={`${modalCSS.modal} ${type}`}>
            <form onSubmit={submit}>
                <div className={modalCSS.modalHeader}>
                    <h3>{title}</h3>
                    <div className={modalCSS.modalHeaderButtons}>
                        {showEditModeButtons()}
                        <IoMdClose id={modalCSS.headerIcon} onClick={close}/>
                    </div>
                </div>
                {deleteMode ?
                    <div className={deleteCSS.deleteDialog}>
                        <div className={deleteCSS.deleteInfo}>
                            <p>Are you sure you want to delete: {title}?</p>
                            {warning > 0 && <p id={deleteCSS.warning}>WARNING: This will delete {warning} transactions connected to this account</p>}
                        </div>
                        <div className={deleteCSS.deleteCancelButtons}>
                            <button id={deleteCSS.delete} onClick={(e) => deleteFn(e)}>Delete</button>
                            <button id={deleteCSS.cancel} onClick={() => setDeleteMode(false)}>Cancel</button>
                        </div>
                    </div> :
                    content
                }
                {submit !== null && <input type='submit'/>}
            </form>
        </dialog>
    );
};

export default Modal;