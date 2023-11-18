import mainCSS from './main.module.css';
import { FaBucket, FaLandmark, FaCreditCard, FaCalendar, FaMoneyBillTransfer } from "react-icons/fa6";


const Main = () => {
    return (
        <main className={mainCSS.main}>
            <header>
                <h1>FinTracker</h1>
                <img src='' alt='Profile'/>
            </header>

            <aside>
                <div>
                    <div className={mainCSS.sectionHeader}>
                        <FaLandmark/>
                        <p>Accounts</p>
                    </div>
                    <button>
                        <p>Account 1</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Account 2</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Account 3</p>
                        <p>$0.00</p>
                    </button>
                </div>
                <div>
                    <div className={mainCSS.sectionHeader}>
                        <FaMoneyBillTransfer/>
                        <p>Budgets</p>
                    </div>
                    <button>
                        <p>Budget 1</p>
                        <p>$0.00 out of $0.00</p>
                    </button>
                    <button>
                        <p>Budget 2</p>
                        <p>$0.00 out of $0.00</p>
                    </button>
                </div>
            </aside>

            <section className={mainCSS.summary}>
                <div className={mainCSS.sectionHeader}>
                    <FaCalendar/>
                    <p>Summary</p>
                </div>
                <div className={mainCSS.summaryItems}>
                    <button>
                        <p>Today</p>
                    </button>
                    <button>
                        <p>This Week</p>
                    </button>
                    <button>
                        <p>This Month</p>
                    </button>
                    <button>
                        <p>This Year</p>
                    </button>
                </div>
            </section>

            <section className={mainCSS.transactions}>
                <div className={mainCSS.sectionHeader}>
                    <FaCreditCard/>
                    <p>Transactions</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Example</td>
                            <td>1/1/2023</td>
                            <td>$0.00</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className={mainCSS.buckets}>
                <div className={mainCSS.sectionHeader}>
                    <FaBucket/>
                    <p>Buckets</p>
                </div>
                <div className={mainCSS.bucketItems}>
                    <button>
                        <p>Shopping</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Restuarants</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Groceries</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Entertainment</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Bills</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Education</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Transportation</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Investments</p>
                        <p>$0.00</p>
                    </button>
                    <button>
                        <p>Health</p>
                        <p>$0.00</p>
                    </button>
                </div>
            </section>
        </main>
    );
};

export default Main;