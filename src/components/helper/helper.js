import axios from 'axios';

export const getData = async (id, setter, setError, setLoading) => {
	try {
		setLoading(true);
		const res = await axios.get(
			`https://sandbox.iexapis.com/stable/stock/${id}/quote?token=Tsk_678b4f8a0c3b4032b11c7568fb24dc17`
		);
		setter(res?.data);
		setLoading(false);
		if (res) {
			setter(res?.data);
			setError('');
		}
	} catch (error) {
		setLoading(false);
		setter({});
		setError(error.message);
	}
};
