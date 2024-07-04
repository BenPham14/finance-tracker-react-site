const convertDateFormat = (date) => {
    // convert date from "YYYY-MM-DD" to locale format. However, the date minused a day because it assumes we are UTC time: it shows "1/1/2024" as "12/31/2023", so we use getTimezoneOffet to add the day back
    return new Date(date + "Z" + new Date().getTimezoneOffset() * -1 / 60);
};

const convertTimestampToDate = (date) => {
    // Since Timestamps are returned in seconds and nanoseconds, we have to convert to date
    return new Date(date.seconds * 1000 + date.seconds / 1000000);
};

const calculateDates = (periodValue) => {
    let startDate = new Date();
    let endDate = new Date();
    let number = periodValue.replace(/[^0-9]/g, ''); // Keep only number value in string like 2 day(s) becomes 2

    if (periodValue.includes("day")) {
        endDate.setDate(startDate.getDate() + parseInt(number));
    } else if (periodValue.includes("week")) {
        endDate.setDate(startDate.getDate() + (parseInt(number)*7));
    } else if (periodValue.includes("month")) {
        endDate.setDate(startDate.getDate() + (parseInt(number)*30));
    } else if (periodValue.includes("year")) {
        endDate.setDate(startDate.getDate() + (parseInt(number)*365));
    };

    // Set time to 12:00AM
    startDate.setHours(0,0,0,0);
    endDate.setHours(0,0,0,0);

    return {
        startDate: startDate,
        endDate: endDate
    };
};

const displayAmounts = (amount) => {
    return Math.abs(amount).toFixed(2).replace(/\.00$/, '');
};

const changePlaceholderColor = (value) => {
    if (value === "") {
        return "gray";
    };
};

const changeRadioColor = (value, type) => {
    if (value !== type) {
        return "gray";
    };
};

export { convertDateFormat, convertTimestampToDate, calculateDates, displayAmounts, changePlaceholderColor, changeRadioColor };