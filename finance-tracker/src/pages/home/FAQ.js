import homeCSS from './home.module.css';
import { BiChevronDown } from 'react-icons/bi'

const FAQ = ({faqScroll}) => {
    const content = [
        {question: "FAQ 1", answer: ""},
        {question: "FAQ 2", answer: ""},
        {question: "FAQ 3", answer: ""},
        {question: "FAQ 4", answer: ""}
    ];

    return (
        <section className={homeCSS.faq} ref={faqScroll}>
            <div className={homeCSS.faqContent}>
                {
                    content.map((faq) => (
                        <div>
                            <p>{faq.question}</p>
                            <BiChevronDown/>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default FAQ;