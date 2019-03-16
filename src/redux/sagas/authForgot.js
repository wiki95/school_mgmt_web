import { takeLatest, put, call } from "redux-saga/effects";
import { forgot } from "../../api";

function* forgotWorker(val) {
	try {
		const res = yield call(forgot, val.payload);
		if (res) {
			yield put({ type: "MAIL_SEND", payload: "Mail has been send" });
		}
	} catch (err) {
		if (err) {
			yield put({ type: "MAIL_FAILED", payload: err });
		} else {
			yield put({ type: "MAIL_FAILED_NOERROR", payload: "not send" });
		}
	}
}

function* forgotWatcher() {
	yield takeLatest("FORGOT", forgotWorker);
}

export default forgotWatcher;
