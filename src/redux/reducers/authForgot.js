const INITIAL_STATE = {
	email: "",
	message: "",
	error: ""
};
const forgot = (state = INITIAL_STATE, action) => {
	// for textinputs component
	switch (action.type) {
		case "FORGOT":
			return { ...state, email: action.payload };
		case "MAIL_SEND":
			return { ...state, message: action.payload, error: "" };
		case "MAIL_FAILED":
			return {
				...state,
				error: "Mail not exist",
				message: ""
			};
		case "MAIL_FAILED_NOERROR":
			return {
				...state,
				error: action.payload,
				message: ""
			};

		default:
			return state;
	}
};

export default forgot;
