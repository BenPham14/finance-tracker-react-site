import mainCSS from './main.module.css';
import { FaBucket } from "react-icons/fa6";

const CategoriesItem = ({name, amount}) => {
    return (
        <button>
            <p>{name}</p>
            <p>{amount < 0 && '-'}${Math.abs(amount)}</p>
        </button>
    );
}

const Categories = ({categories, transactions}) => {
    const categoryAmount = (name) => {
        let amount = 0;
        transactions.forEach((transaction) => {
            if (transaction.category === name) {
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
        <section className={mainCSS.categories}>
            <div className={mainCSS.sectionHeader}>
                <FaBucket/>
                <p>Categories</p>
            </div>
            <div className={`${mainCSS.categoryItems} ${mainCSS.items}`}>
                {
                    categories.map((category, index) => (
                        <CategoriesItem 
                            key={index}
                            name={category.name}
                            amount={categoryAmount(category.name)}
                        />
                    ))
                }
            </div>
        </section>
    );
};

export default Categories;