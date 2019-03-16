const INITIAL_STATE = {
	loading: false,
	error: ""
};
const signup = (state = INITIAL_STATE, action) => {
	// for textinputs component
	switch (action.type) {
		case "SIGNUP_LOADED":
			return { ...INITIAL_STATE };
		case "SIGNUP":
			return { ...state, error: "", loading: true };
		case "SIGNUP_FAILED":
			console.log(action.payload.response.data.message);
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message
			};
		case "SIGNUP_SUCCEED":
			return { ...state, error: "", loading: false };

		default:
			return state;
	}
};

export default signup;
