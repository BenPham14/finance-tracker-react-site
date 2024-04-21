import { useEffect, useRef, useState } from 'react';
import modalCSS from './modal.module.css';
import { IoMdClose} from 'react-icons/io';
import { MdEdit } from "react-icons/md";

const Modal = ({isOpen, close, cancel, editMode, setEditMode, title, submit, type, content}) => {
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
            return (
                <div className={`${modalCSS.modalSaveCancel} ${cancelColor && modalCSS.cancel}`}>
                    <p id={modalCSS.save} onClick={() => setEditMode(false)}>Save</p>
                    <p id={modalCSS.cancel} onClick={cancelEdit} onMouseEnter={() => setCancelColor(true)} onMouseLeave={() => setCancelColor(false)}>Cancel</p>
                </div>
            )
            
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
                {content}
                {
                    submit !== null && <input type='submit'/>
                }
            </form>
        </dialog>
    );
};

export default Modal;