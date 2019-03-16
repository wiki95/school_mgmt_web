import axios from "axios";
export const getStudents = async () => {
	let config = {
		method: "GET",
		url: `${process.env.REACT_APP_BACKEND}/student`
	};
	try {
		return await axios(config);
	} catch (err) {
		return false;
	}
};
