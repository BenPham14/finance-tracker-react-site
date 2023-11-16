import mainCSS from './main.module.css';

const Main = () => {
    return (
        <main className={mainCSS.main}>
            <header>
                <h1>FinTracker</h1>
            </header>
            <aside>
                <div>
                    <p>Accounts</p>
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
                    <p>Budgets</p>
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
                <p>Summary</p>
                <div className={mainCSS.summaryItems}>
                    <div>
                        <p>Today</p>
                    </div>
                    <div>
                        <p>This Week</p>
                    </div>
                    <div>
                        <p>This Month</p>
                    </div>
                    <div>
                        <p>This Year</p>
                    </div>
                </div>
            </section>
            <section className={mainCSS.transactions}>
                <p>Transactions</p>
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
                <p>Buckets</p>
                <div className={mainCSS.bucketItems}>
                    <div>
                        <p>Shopping</p>
                        <p>$0.00</p>
                    </div>
                    <div>
                        <p>Restuarants</p>
                        <p>$0.00</p>
                    </div>
                    <div>
                        <p>Groceries</p>
                        <p>$0.00</p>
                    </div>
                    <div>
                        <p>Entertainment</p>
                        <p>$0.00</p>
                    </div>
                    <div>
                        <p>Bills</p>
                        <p>$0.00</p>
                    </div>
                    <div>
                        <p>Education</p>
                        <p>$0.00</p>
                    </div>
                    <div>
                        <p>Transportation</p>
                        <p>$0.00</p>
                    </div>
                    <div>
                        <p>Investments</p>
                        <p>$0.00</p>
                    </div>
                    <div>
                        <p>Health</p>
                        <p>$0.00</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;