import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";

const Donut = ({data}) => {
    return (
        <Doughnut data={data}/>
    );
};

export default Donut;