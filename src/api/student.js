import axios from "axios";
export const getStudents = async () => {
	let config = {
		method: "GET",
		url: `${process.env.REACT_APP_BACKEND}/student`
	};
	return await axios(config);
};

export const deleteStudents = async val => {
	let config = {
		method: "DELETE",
		url: `${process.env.REACT_APP_BACKEND}/student`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: val,
		json: true
	};
	return await axios(config);
};

export const updateStudent = async val => {
	let config = {
		method: "PUT",
		url: `${process.env.REACT_APP_BACKEND}/student`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: val,
		json: true
	};
	return await axios(config);
};

export const addStudent = async val => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/student`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: val,
		json: true
	};
	return await axios(config);
};
