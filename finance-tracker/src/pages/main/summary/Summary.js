import mainCSS from '../main.module.css';
import { FaChartPie } from "react-icons/fa6";

const Summary = () => {
    return (
        <section className={mainCSS.summary}>
            <div className={mainCSS.sectionHeader}>
                <FaChartPie/>
                <p>Summary</p>
            </div>
            <div className={`${mainCSS.summaryItems} ${mainCSS.items}`}>
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
    );
};

export default Summary;