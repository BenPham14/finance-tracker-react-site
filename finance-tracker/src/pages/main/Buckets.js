import mainCSS from './main.module.css';
import { FaBucket } from "react-icons/fa6";

const Buckets = ({buckets}) => {
    return (
        <section className={mainCSS.buckets}>
            <div className={mainCSS.sectionHeader}>
                <FaBucket/>
                <p>Buckets</p>
            </div>
            <div className={`${mainCSS.bucketItems} ${mainCSS.items}`}>
                {
                    buckets.map((bucket, index) => (
                        <button key={index}>
                            <p>{bucket.name}</p>
                            <p>${bucket.amount}</p>
                        </button>
                    ))
                }
            </div>
        </section>
    );
};

export default Buckets;