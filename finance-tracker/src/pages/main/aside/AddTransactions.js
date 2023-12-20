const AddTransactions = ({buckets, modalRef}) => {
    return (
        <dialog ref={modalRef}>
            <form>
                <p>Transactions</p>
                <input type='text' placeholder='Name'/>
                <input type='number' placeholder='Amount'/>
                <input type='date' placeholder='Date'/>
                <select name='buckets'>
                    {
                        buckets.map((bucket, index) => (
                            <option key={index} value={bucket.name}>{bucket.name}</option>
                        ))
                    }
                </select>
                <input type='submit'/>
            </form>
        </dialog>
    );
};

export default AddTransactions;