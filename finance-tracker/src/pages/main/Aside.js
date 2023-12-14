import mainCSS from './main.module.css';
import { FaBolt, FaLandmark, FaMoneyBillTransfer } from "react-icons/fa6";

const Aside = ({accounts, budgets, buckets}) => {
    return (
        <aside>
            <div>
                <div className={mainCSS.sectionHeader}>
                    <FaBolt/>
                    <p>Actions</p>
                </div>
                <div className={`${mainCSS.actionsItems} ${mainCSS.items}`}>
                    <button>+ Transaction</button>
                    {/* <dialog open>
                        <p>Transactions</p>
                        <form>
                            <label htmlFor='buckets'>Choose a bucket:</label>
                            <select name='buckets'>
                                {
                                    buckets.map((bucket, index) => (
                                        <option key={index} value={bucket.name}>{bucket.name}</option>
                                    ))
                                }
                            </select>
                            <input type='text' placeholder='Name'/>
                            <input type='text' placeholder='Amount'/>
                            <input type='date' placeholder='Date'/>
                            <input type='submit'/>
                        </form>
                    </dialog> */}
                    <button>+ Account</button>
                    <button>+ Budget</button>
                </div>
            </div>
            <div className={mainCSS.accounts}>
                <div className={mainCSS.sectionHeader}>
                    <FaLandmark/>
                    <p>Accounts</p>
                </div>
                <div className={`${mainCSS.accountsItems} ${mainCSS.items}`}>
                    {
                        accounts.map((account, index) => (
                            <button key={index}>
                                <p>{account.name}</p>
                                <p>${account.amount}</p>
                            </button>
                        ))
                    }
                </div>
            </div>
            <div className={mainCSS.budgets}>
                <div className={mainCSS.sectionHeader}>
                    <FaMoneyBillTransfer/>
                    <p>Budgets</p>
                </div>
                <div className={`${mainCSS.budgetsItems} ${mainCSS.items}`}>
                    {
                        budgets.map((budget, index) => (
                            <button key={index}>
                                <p>{budget.name}</p>
                                <p>${budget.amount} out of ${budget.limit}</p>
                            </button>
                        ))
                    }
                </div>
            </div>
        </aside>
    );
};

export default Aside;