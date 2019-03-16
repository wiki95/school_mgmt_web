import { takeLatest, put, call } from "redux-saga/effects";
import { login } from "../../api";

function* loginWorker(val) {
	try {
		const res = yield call(login, val.payload);
		if (res) {
			yield put({ type: "LOGIN_SUCCEED" });
			yield put({ type: "USER_FETCHED", payload: res.data });
			yield localStorage.setItem("Token", res.data.token);
			yield val.other.history.push("/home");
		}
	} catch (err) {
		if (err) {
			yield put({ type: "LOGIN_FAILED", payload: err });
		} else {
			yield put({ type: "LOGIN_FAILED_NOERROR", payload: "" });
		}
	}
}

function* loginWatcher() {
	yield takeLatest("LOGIN", loginWorker);
}

export default loginWatcher;
