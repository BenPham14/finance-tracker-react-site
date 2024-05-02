import multiselectCSS from "./multiselect.module.css";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

const Checkbox = ({data, value, setValue, modalOpen}) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (value.includes(data.name)) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        };
    },[value])

    const onCheck = () => {
        if (value.includes(data.name)) {
            const result = value.filter((value) => value !== data.name);
            setValue(result);
        } else {
            setValue((oldArray) => [...oldArray, data.name]);
        };
    };

    return (
        <div className={multiselectCSS.checkbox} 
            onClick={onCheck} 
            onKeyDown={(e) => {e.key === 'Enter' && e.preventDefault();}} // prevents default
        >
            <input type="checkbox" value={data.name} id={data.name} name={data.name} checked={isChecked} readOnly/>
            <FaCheck style={{display: !isChecked && 'none'}}/>
        </div>
    );
};

export default Checkbox;