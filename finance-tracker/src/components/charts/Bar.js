import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js/auto";

ChartJS.register(
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Tooltip, 
    Legend
);

const Column = ({data, options}) => {
    return (
        <Bar data={data} options={options}/>
    );
};

export default Column;