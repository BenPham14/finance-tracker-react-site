const categories = [
    {name: "Shopping", amount: "0.00"}, {name: "Restaurants", amount: "0.00"},
    {name: "Groceries", amount: "0.00"}, {name: "Entertainment", amount: "0.00"},
    {name: "Bills", amount: "0.00"}, {name: "Education", amount: "0.00"},
    {name: "Transportation", amount: "0.00"}, {name: "Investments", amount: "0.00"},
    {name: "Health", amount: "0.00"}, {name: "Pets", amount: "0.00"}
];

const convertDateFormat = (date) => {
    // convert date from "YYYY-MM-DD" to locale format. However, the date minused a day because it assumes we are UTC time: it shows "1/1/2024" as "12/31/2023", so we use getTimezoneOffet to add the day back
    return new Date(date + "Z" + new Date().getTimezoneOffset() * -1 / 60).toLocaleDateString();
};

const convertTimestampToDate = (date) => {
    // Since Timestamps are returned in seconds and nanoseconds, we have to convert to date
    return new Date(date.seconds * 1000 + date.seconds / 1000000);
};

export { categories, convertDateFormat, convertTimestampToDate };