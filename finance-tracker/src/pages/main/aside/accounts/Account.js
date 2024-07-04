import { useState } from "react";
import AccountDetails from "./AccountDetails";
import { displayAmounts } from "../../../../context/helper";

const Account = ({account, accounts, transactions, toast}) => {
    const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);

    const accountAmount = (id) => {
        let amount = 0;
        transactions.forEach((transaction) => {
            if (transaction.accountId === id) {
                if (transaction.type === 'expense') {
                    amount -= parseFloat(transaction.amount);
                } else {
                    amount += parseFloat(transaction.amount);
                };
            };
        });
        return amount;
    };

    const filterTransactions = (id) => {
        let t = [];
        transactions.forEach((transaction) => {
            if (transaction.accountId === id) {
                t.push(transaction);
            };
        });
        return t;
    };

    return (
        <>
            <button onClick={() => setAccountDetailsOpen(true)}>
                <p>{account.name}</p>
                <h5>{accountAmount(account.id) < 0 && "-"}${displayAmounts(accountAmount(account.id))}</h5>
            </button>
            <AccountDetails
                data={filterTransactions(account.id)}
                accounts={accounts}
                amount={accountAmount(account.id)}
                account={account}
                accountDetailsOpen={accountDetailsOpen}
                setAccountDetailsOpen={setAccountDetailsOpen}
                toast={toast}
            />
        </>
    );
};

export default Account;