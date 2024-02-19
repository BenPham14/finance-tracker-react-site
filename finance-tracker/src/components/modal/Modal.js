import { useEffect, useRef, useState } from 'react';
import modalCSS from './modal.module.css';
import { IoMdCloseCircle } from 'react-icons/io';
import { MdEdit } from "react-icons/md";

const Modal = ({isOpen, close, editMode, setEditMode, title, submit, type, content}) => {
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

    return (
        <dialog ref={modalRef} className={`${modalCSS.modal} ${type}`}>
            <form onSubmit={submit}>
                <div className={modalCSS.modalHeader}>
                    <p>{title}</p>
                    <div>
                        {
                            editMode ? 
                                <p id={modalCSS.editDone} onClick={() => setEditMode(false)}>Done</p> :
                                <MdEdit onClick={() => setEditMode(true)}/>
                        }
                        <IoMdCloseCircle onClick={close}/>
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