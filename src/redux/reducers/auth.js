const INITIAL_STATE = {
	render: "login",
	user: ""
};
const auth = (state = INITIAL_STATE, action) => {
	// for textinputs component
	switch (action.type) {
		case "SWITCH":
			return { ...state, render: action.payload };
		case "USER_FETCHED":
			return { ...state, user: action.payload };
		default:
			return state;
	}
};

export default auth;
