import { useState } from "react";
import AccountDetails from "./AccountDetails";

const Account = ({account, accounts, transactions, toast}) => {
    const [accountDetailsOpen, setAccountDetailsOpen] = useState(false);

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
                <p>{accountAmount(account.id) < 0 && "-"}${Math.abs(accountAmount(account.id))}</p>
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