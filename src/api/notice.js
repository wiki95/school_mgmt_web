import axios from "axios";
export const addNotice = async val => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/notice/add`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: val,
		json: true
	};
	return await axios(config);
};

export const getNotices = async val => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/notice`,
		headers: {
			"content-type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("Token")
		},
		data: val,
		json: true
	};
	return await axios(config);
};
export const deleteNotice = async val => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/notice/${val}`,
		headers: {
			Authorization: "Bearer " + localStorage.getItem("Token")
		}
	};
	return await axios(config);
};
