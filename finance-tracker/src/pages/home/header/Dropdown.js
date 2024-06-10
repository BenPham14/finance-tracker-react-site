import homeCSS from '../home.module.css';

const Dropdown = ({toggle, scrollIntoFeatures, scrollIntoFAQ}) => {
    if (!toggle) return;
    return (
        <nav className={homeCSS.dropDown}>
            <button id={homeCSS.link} onClick={scrollIntoFeatures}>Features</button>
            <button id={homeCSS.link} onClick={scrollIntoFAQ}>FAQ</button>
            <button id={homeCSS.demo}>Try demo</button>
        </nav>
    );
};

export default Dropdown;