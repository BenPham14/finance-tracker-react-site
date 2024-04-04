import mainCSS from '../main.module.css';
import SummaryDetails from "./SummaryDetails.js";
import { useState } from 'react';
import { FaChartPie } from "react-icons/fa6";

const Summary = ({transactions}) => {
    const [todayDetailsOpen, setTodayDetailsOpen] = useState(false);
    const [todayEditMode, setTodayEditMode] = useState(false);

    const [weekDetailsOpen, setWeekDetailsOpen] = useState(false);
    const [weekEditMode, setWeekEditMode] = useState(false);

    const [monthDetailsOpen, setMonthDetailsOpen] = useState(false);
    const [monthEditMode, setMonthEditMode] = useState(false);

    const [yearDetailsOpen, setYearDetailsOpen] = useState(false);
    const [yearEditMode, setYearEditMode] = useState(false);

    const data = [
        {title: "Today", isOpen: [todayDetailsOpen, setTodayDetailsOpen], editMode: [todayEditMode, setTodayEditMode]},
        {title: "This Week", isOpen: [weekDetailsOpen, setWeekDetailsOpen], editMode: [weekEditMode, setWeekEditMode]},
        {title: "This Month", isOpen: [monthDetailsOpen, setMonthDetailsOpen], editMode: [monthEditMode, setMonthEditMode]},
        {title: "This Year", isOpen: [yearDetailsOpen, setYearDetailsOpen], editMode: [yearEditMode, setYearEditMode]},
    ]

    return (
        <section className={mainCSS.summary}>
            <div className={mainCSS.sectionHeader}>
                <FaChartPie/>
                <p>Summary</p>
            </div>
            <div className={`${mainCSS.summaryItems} ${mainCSS.items}`}>
                {
                    data.map((value) => (
                        <>
                            <button onClick={() => value.isOpen[1](true)}>
                                <p>{value.title}</p>
                            </button>
                            <SummaryDetails
                                title={value.title}
                                transactions={transactions}
                                isOpen={value.isOpen[0]}
                                setIsOpen={value.isOpen[1]}
                                editMode={value.editMode[0]}
                                setEditMode={value.editMode[1]}
                            />
                        </>
                    ))
                }
            </div>
        </section>
    );
};

export default Summary;