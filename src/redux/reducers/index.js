import { combineReducers } from "redux";
import signup from "./authSignup";
import login from "./authLogin";
import forgot from "./authForgot";
import auth from "./auth";

const reducers = combineReducers({
	auth: auth,
	signup: signup,
	login: login,
	forgot: forgot
});
export default reducers;
