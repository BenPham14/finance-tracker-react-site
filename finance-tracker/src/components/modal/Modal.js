import { useEffect, useRef } from 'react';
import modalCSS from './modal.module.css';
import { IoMdClose, IoMdCheckmark } from 'react-icons/io';
import { MdEdit } from "react-icons/md";

const Modal = ({isOpen, close, cancel, editMode, setEditMode, title, submit, type, content}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const onEscape = (e) => {
                if (e.code === "Escape") {
                    close();
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

    const showEditModeButtons = () => {
        if (type === modalCSS.action) {
            return;
        };

        if (editMode) {
            return <IoMdCheckmark id={modalCSS.headerIcon} onClick={() => setEditMode(false)}/>;
        } else {
            return <MdEdit id={modalCSS.headerIcon} onClick={() => setEditMode(true)}/>;
        };
    };

    return (
        <dialog ref={modalRef} className={`${modalCSS.modal} ${type}`}>
            <form onSubmit={submit}>
                <div className={modalCSS.modalHeader}>
                    <div className={modalCSS.modalTitle}>
                        <h3>{title}</h3>
                        {editMode && <p onClick={cancel}>Editing <IoMdClose/></p>}
                    </div>
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