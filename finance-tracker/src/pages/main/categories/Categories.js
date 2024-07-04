import { useState } from 'react';
import CategoryDetails from './CategoryDetails';
import mainCSS from '../main.module.css';
import { FaBoxes } from "react-icons/fa";
import { categories } from '../../../context/data.js';
import { displayAmounts } from '../../../context/helper.js';

const CategoriesItem = ({category, amount, accounts}) => {
    const [categoryDetailsOpen, setCategoryDetailsOpen] = useState(false);
    const [categoryDetailsData, setCategoryDetailsData] = useState({});

    const openCategoryDetails = (id, title, amount) => {
        setCategoryDetailsOpen(true);
        setCategoryDetailsData({id, title, amount})
    };

    return (
        <>
            <button onClick={() => openCategoryDetails(category.id, category.name, amount)}>
                <p>{category.name}</p>
                <h5>{amount < 0 && '-'}${displayAmounts(Math.abs(amount))}</h5>
            </button>
            <CategoryDetails
                data={categoryDetailsData}
                accounts={accounts}
                setCategoryDetailsData={setCategoryDetailsData}
                categoryDetailsOpen={categoryDetailsOpen}
                setCategoryDetailsOpen={setCategoryDetailsOpen}
            />
        </>
        
    );
}

const Categories = ({accounts, transactions}) => {
    const categoryAmount = (name) => {
        let amount = 0;
        transactions.forEach((transaction) => {
            if (transaction.category === name) {
                if (transaction.type === 'expense') {
                    amount -= parseFloat(transaction.amount);
                } else {
                    amount += parseFloat(transaction.amount);
                };
            };
        });
        return amount;
    };
    
    return (
        <section className={mainCSS.categories}>
            <div className={mainCSS.sectionHeader}>
                <FaBoxes/>
                <h3>Categories</h3>
            </div>
            <div className={`${mainCSS.categoryItems} ${mainCSS.items}`}>
                {categories.map((category, index) => (
                    <CategoriesItem 
                        key={index}
                        category={category}
                        amount={categoryAmount(category.name)}
                        accounts={accounts}
                    />
                ))}
            </div>
        </section>
    );
};

export default Categories;