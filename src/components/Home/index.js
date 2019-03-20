import React from "react";
import { connect } from "react-redux";
//import { onSwitch, signup, signupLoaded } from "../../redux/actions/auth";
//import { bindActionCreators } from "redux";
import { verify } from "../../api";
import SideBar from "./Sidebar";
import MenuAppbar from "./Appbar";

class Home extends React.Component {
	componentDidMount() {
		verify().then(res => {
			if (!res) {
				this.props.history.push("/");
			}
		});
	}

	render() {
		const { history } = this.props;
		return (
			<React.Fragment>
				<MenuAppbar history={history} />
				<SideBar history={history} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	user: state.auth.user
});
export default connect(mapStateToProps)(Home);
