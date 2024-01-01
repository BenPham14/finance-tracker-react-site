import { useEffect, useRef } from 'react';
import modalCSS from './modal.module.css';
import { IoMdCloseCircle } from 'react-icons/io';

const Modal = ({isOpen, close, title, submit, content}) => {
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
        <dialog ref={modalRef} className={modalCSS.modal}>
            <form onSubmit={submit}>
                <div className={modalCSS.modalHeader}>
                    <p>{title}</p>
                    <IoMdCloseCircle onClick={close}/>
                </div>
                {content}
                <input type='submit'/>
            </form>
        </dialog>
    );
};

export default Modal;