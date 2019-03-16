import { all, call } from "redux-saga/effects";
import signupWatcher from "./authSignup";
import loginWatcher from "./authLogin";
import forgotWatcher from "./authForgot";

/// watcher saga --> actions --> worker saga
function* rootSaga() {
	try {
		yield all([call(signupWatcher), call(loginWatcher), call(forgotWatcher)]);
	} catch (err) {
		console.log(err);
	}
}

export default rootSaga;
