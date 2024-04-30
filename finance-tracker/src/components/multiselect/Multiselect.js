import multiselectCSS from "./multiselect.module.css";
import Checkbox from "./Checkbox";
import { VscChevronDown } from "react-icons/vsc";

const Multiselect = ({data, value, setValue, isOpen, setIsOpen, modalOpen}) => {
    const changePlaceholderColor = (value) => {
        if (value === "" || value.length === 0) {
            return "gray";
        };
    };

    return (
        <div className={multiselectCSS.optionsDiv}>
            <div className={multiselectCSS.optionsSelected} onClick={() => setIsOpen(!isOpen)}>
                <p style={{color: changePlaceholderColor(value)}}>Categories: {value.length}</p>
                <VscChevronDown style={{color: changePlaceholderColor(value)}}/>
            </div>
            <div className={multiselectCSS.options}  style={{display: !isOpen && "none"}}>
                {data.map((dataValue, index) => (
                    <div key={index}>
                        <Checkbox 
                            data={dataValue} 
                            value={value}
                            setValue={setValue}
                            modalOpen={modalOpen}
                        />
                        <label htmlFor={dataValue.name}>{dataValue.name}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Multiselect;