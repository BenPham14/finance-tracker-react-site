import { useState } from 'react';
import homeCSS from './home.module.css';

const Question = (data) => {
    const [isShowing, setIsShowing] = useState(false);
    return (
        <div className={homeCSS.faqQuestion} onClick={() => setIsShowing(!isShowing)}>
            <div>
                <h3>{data.question}</h3>
                {isShowing ? <h3>-</h3> : <h3>+</h3>}
            </div>
            {isShowing && <p>{data.answer}</p>}
        </div>
    );
};

const FAQ = ({faqScroll}) => {
    const content = [
        {question: "FAQ 1", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
        {question: "FAQ 2", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
        {question: "FAQ 3", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."},
        {question: "FAQ 4", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
    ];

    return (
        <section className={homeCSS.faq} ref={faqScroll}>
            <div className={homeCSS.faqContent}>
                {
                    content.map((question) => (
                        <Question {...question}/>
                    ))
                }
            </div>
        </section>
    );
};

export default FAQ;