import homeCSS from '../home.module.css';

const Dropdown = ({toggle, scrollIntoFeatures, scrollIntoFAQ, signIn}) => {
    if (!toggle) return;
    return (
        <nav className={homeCSS.dropDown}>
            <button id={homeCSS.link} onClick={scrollIntoFeatures}>Features</button>
            {/* <button id={homeCSS.link} onClick={scrollIntoFAQ}>FAQ</button> */}
            <button id={homeCSS.demo} onClick={signIn}>Try demo</button>
        </nav>
    );
};

export default Dropdown;