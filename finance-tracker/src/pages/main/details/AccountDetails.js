import Modal from '../../../components/modal/Modal.js';

const AccountDetails = ({title, amount, accountDetailsOpen, setAccountDetailsOpen}) => {
    const closeModal = () => {
        setAccountDetailsOpen(false);
    };

    return (
        <Modal
            isOpen={accountDetailsOpen}
            close={closeModal}
            title={title}
            submit={""}
            content={
                <>
                    <p>${amount}</p>
                    <p>Recent transactions</p>
                </>
            }
        />
    );
};

export default AccountDetails