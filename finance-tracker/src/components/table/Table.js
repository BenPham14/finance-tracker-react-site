import tableCSS from './table.module.css';

const Table = ({data}) => {
    return (
        <table className={tableCSS.table}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th id={tableCSS.category}>Category</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((value) => (
                        <tr key={value.id}>
                            <td>{value.name}</td>
                            <td id={tableCSS.category}>{value.category}</td>
                            <td>{value.date}</td>
                            <td>{value.type === 'expense' && '-'}${value.amount}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default Table;