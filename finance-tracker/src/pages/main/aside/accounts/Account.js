import { useState } from "react";
import AccountDetails from "./AccountDetails";

const Account = ({account, transactions}) => {
    const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);
    const [accountDetailsData, setAccountDetailsData] = useState({});

    const openAccountDetails = (id, title, amount) => {
        setAccountDetailsOpen(true);
        // Since using same component in 'for loop', this will reset the data when we open up another details in the loop
        setAccountDetailsData({id, title, amount}); // Since parameter is same, no need for 'key: ' in array
    };

    const accountAmount = (id) => {
        let amount = 0;
        transactions.forEach((transaction) => {
            if (transaction.accountId === id) {
                if (transaction.type === 'expense') {
                    amount -= parseInt(transaction.amount);
                } else {
                    amount += parseInt(transaction.amount);
                };
            };
        });
        return amount;
    };

    return (
        <>
            <button onClick={() => openAccountDetails(account.id, account.name, accountAmount(account.id))}>
                <p>{account.name}</p>
                <p>{accountAmount(account.id) < 0 && "-"}${Math.abs(accountAmount(account.id))}</p>
            </button>
            <AccountDetails
                data={accountDetailsData}
                setAccountDetailsData={setAccountDetailsData}
                accountDetailsOpen={accountDetailsOpen}
                setAccountDetailsOpen={setAccountDetailsOpen}
            />
        </>
    );
};

export default Account;