import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";

const Donut = ({data, width, options}) => {
    return (
        <Doughnut data={data} width={width} options={options}/>
    );
};

export default Donut;