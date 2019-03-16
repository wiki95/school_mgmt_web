export const onSwitch = card => {
	return {
		type: "SWITCH",
		payload: card
	};
};

export const signup = (values, history) => {
	return {
		type: "SIGNUP",
		payload: { email: values.email, password: values.pwd },
		other: { history: history }
	};
};

export const signupLoaded = () => {
	return {
		type: "SIGNUP_LOADED"
	};
};

export const login = (values, history) => {
	return {
		type: "LOGIN",
		payload: { email: values.email, password: values.pwd },
		other: { history: history }
	};
};

export const loginLoaded = () => {
	return {
		type: "LOGIN_LOADED"
	};
};

export const sendMail = email => {
	return {
		type: "FORGOT",
		payload: { email: email }
	};
};
