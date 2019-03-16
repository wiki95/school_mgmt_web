import React, { Fragment } from "react";
import SignUp from "./ZSignup.js";
import Login from "./ZLogin.js";
import Forgot from "./ZForgot.js";
import { connect } from "react-redux";
import {
	onSwitch,
	signup,
	signupLoaded,
	login,
	loginLoaded,
	sendMail
} from "../../redux/actions/auth";
import { bindActionCreators } from "redux";
import "./index.css";

const Auth = props => {
	const {
		render,
		signupLoading,
		signupError,
		loginLoading,
		loginError,
		forgotMsg,
		forgotError,
		user
	} = props;
	const {
		onSwitch,
		signup,
		signupLoaded,
		login,
		loginLoaded,
		sendMail
	} = props.actions;

	return (
		<Fragment>
			{render === "signup" && (
				<SignUp
					history={props.history}
					user={user}
					loaded={signupLoaded}
					switchCard={onSwitch}
					signup={signup}
					loading={signupLoading}
					error={signupError}
				/>
			)}
			{render === "login" && (
				<Login
					history={props.history}
					user={user}
					loaded={loginLoaded}
					switchCard={onSwitch}
					login={login}
					loading={loginLoading}
					error={loginError}
				/>
			)}
			{render === "forgot" && (
				<Forgot
					error={forgotError}
					msg={forgotMsg}
					sendMail={sendMail}
					switchCard={onSwitch}
				/>
			)}
		</Fragment>
	);
};
const mapStateToProps = state => {
	return {
		render: state.auth.render,
		signupLoading: state.signup.loading,
		signupError: state.signup.error,
		loginLoading: state.login.loading,
		loginError: state.login.error,
		forgotMsg: state.forgot.message,
		forgotError: state.forgot.error,
		user: state.auth.user
	};
};
const mapDispatchToProps = dispatch => {
	return {
		actions: {
			onSwitch: bindActionCreators(onSwitch, dispatch),
			signup: bindActionCreators(signup, dispatch),
			signupLoaded: bindActionCreators(signupLoaded, dispatch),
			login: bindActionCreators(login, dispatch),
			loginLoaded: bindActionCreators(loginLoaded, dispatch),
			sendMail: bindActionCreators(sendMail, dispatch)
		}
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Auth);
