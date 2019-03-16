const INITIAL_STATE = {
	loading: false,
	error: ""
};
const login = (state = INITIAL_STATE, action) => {
	// for textinputs component
	switch (action.type) {
		case "LOGIN_LOADED":
			return { ...INITIAL_STATE };
		case "LOGIN":
			return { ...state, error: "", loading: true };
		case "LOGIN_FAILED":
			return {
				...state,
				loading: false,
				error: action.payload.response.data.message
			};
		case "LOGIN_FAILED_NOERROR":
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case "LOGIN_SUCCEED":
			return { ...state, error: "", loading: false };
		default:
			return state;
	}
};

export default login;
