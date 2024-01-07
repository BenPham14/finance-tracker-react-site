import mainCSS from './main.module.css';
import { FaBucket } from "react-icons/fa6";

const BucketItem = ({name, amount}) => {
    return (
        <button>
            <p>{name}</p>
            <p>${amount}</p>
        </button>
    );
}

const Buckets = ({buckets, transactions}) => {
    const bucketAmount = (name) => {
        let amount = 0;
        transactions.forEach((transaction) => {
            if (transaction.category === name) {
                amount += parseInt(transaction.amount);
            };
        });
        return amount;
    };
    
    return (
        <section className={mainCSS.buckets}>
            <div className={mainCSS.sectionHeader}>
                <FaBucket/>
                <p>Buckets</p>
            </div>
            <div className={`${mainCSS.bucketItems} ${mainCSS.items}`}>
                {
                    buckets.map((bucket, index) => (
                        <BucketItem 
                            key={index}
                            name={bucket.name}
                            amount={bucketAmount(bucket.name)}
                        />
                    ))
                }
            </div>
        </section>
    );
};

export default Buckets;