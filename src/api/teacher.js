import axios from "axios";

export const addTeacher = async val => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/teacher`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: val,
		json: true
	};
	return await axios(config);
};

export const getTeachers = async () => {
	let config = {
		method: "GET",
		url: `${process.env.REACT_APP_BACKEND}/teacher`
	};
	return await axios(config);
};

export const deleteTeachers = async val => {
	let config = {
		method: "DELETE",
		url: `${process.env.REACT_APP_BACKEND}/teacher`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: val,
		json: true
	};
	return await axios(config);
};

export const updateTeacher = async val => {
	let config = {
		method: "PUT",
		url: `${process.env.REACT_APP_BACKEND}/teacher`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: val,
		json: true
	};
	return await axios(config);
};
