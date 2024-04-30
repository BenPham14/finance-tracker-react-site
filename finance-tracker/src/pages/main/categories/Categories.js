import { useState } from 'react';
import CategoryDetails from './CategoryDetails';
import mainCSS from '../main.module.css';
import { FaBucket } from "react-icons/fa6";
import { categories } from '../../../context/context.js';

const CategoriesItem = ({category, amount}) => {
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
                <p>{amount < 0 && '-'}${Math.abs(amount)}</p>
            </button>
            <CategoryDetails
                data={categoryDetailsData}
                setCategoryDetailsData={setCategoryDetailsData}
                categoryDetailsOpen={categoryDetailsOpen}
                setCategoryDetailsOpen={setCategoryDetailsOpen}
            />
        </>
        
    );
}

const Categories = ({transactions}) => {
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
                {categories.map((category, index) => (
                    <CategoriesItem 
                        key={index}
                        category={category}
                        amount={categoryAmount(category.name)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Categories;