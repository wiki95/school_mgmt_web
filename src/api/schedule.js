import axios from "axios";
export const getSchedules = async (clas, section) => {
	let config = {
		method: "GET",
		url: `${process.env.REACT_APP_BACKEND}/schedule/${clas}/${section}`
	};
	return await axios(config);
};
export const getAllSchedules = async () => {
	let config = {
		method: "GET",
		url: `${process.env.REACT_APP_BACKEND}/schedule`
	};
	return await axios(config);
};

export const addSchedule = async val => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/schedule`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: val,
		json: true
	};
	return await axios(config);
};

export const updateSchedule = async (clas, section, data) => {
	let config = {
		method: "POST",
		url: ` ${process.env.REACT_APP_BACKEND}/schedule/${clas}/${section}`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: data,
		json: true
	};
	return await axios(config);
};
