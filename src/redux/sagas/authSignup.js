import { takeLatest, put, call } from "redux-saga/effects";
import { signup } from "../../api";

function* signupWorker(val) {
	try {
		const res = yield call(signup, val.payload);
		if (res) {
			yield put({ type: "SIGNUP_SUCCEED" });
			yield put({ type: "USER_FETCHED", payload: res.data });
			yield localStorage.setItem("Token", res.data.token);
			yield val.other.history.push("/home");
		}
	} catch (err) {
		yield put({ type: "SIGNUP_FAILED", payload: err });
	}
}

function* signupWatcher() {
	yield takeLatest("SIGNUP", signupWorker);
}

export default signupWatcher;
