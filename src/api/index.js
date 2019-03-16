import axios from "axios";

export const signup = async val => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/auth/signup`,
		headers: {
			"content-type": "application/json"
		},
		data: val,
		json: true
	};

	return await axios(config);
};

export const login = async val => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/auth/login`,
		headers: {
			"content-type": "application/json"
		},
		data: val,
		json: true
	};

	return await axios(config);
};

export const verify = async () => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/auth/verify`,
		headers: {
			Authorization: "Bearer " + localStorage.getItem("Token")
		}
	};
	try {
		const res = await axios(config);
		if (res.status !== undefined) {
			if (res.status === 200) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
};

export const forgot = async val => {
	let config = {
		method: "POST",
		url: `${process.env.REACT_APP_BACKEND}/auth/forgot`,
		headers: {
			"content-type": "application/json"
		},
		data: val,
		json: true
	};
	return await axios(config);
};
