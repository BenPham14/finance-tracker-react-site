import multiselectCSS from "./multiselect.module.css";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

const Checkbox = ({data, value, setValue, modalOpen}) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (!modalOpen) {
            setIsChecked(false);
        };
    },[modalOpen])

    const onCheck = () => {
        if (isChecked) {
            const result = value.filter((value) => value !== data.name);
            setValue(result);
            setIsChecked(false);
        } else {
            setValue([...value, data.name]);
            setIsChecked(true);
        };
    };

    return (
        <div className={multiselectCSS.checkbox} onClick={onCheck}>
            <input type="checkbox" value={data.name} id={data.name} name={data.name} checked={isChecked} readOnly/>
            <FaCheck style={{display: !isChecked && 'none'}}/>
        </div>
    );
};

export default Checkbox;