import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Modal, Button } from "antd";

const styles = {
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

class MenuAppBar extends React.Component {
	state = {
		modalVisible: false,
		email: "Sorry Email Cannot be fetched something went wrong!"
	};
	componentDidMount() {
		this.setState({
			email: localStorage.getItem("Email")
				? localStorage.getItem("Email")
				: "Sorry Email Cannot be fetched something went wrong!"
		});
	}
	handleLogout = () => {
		localStorage.removeItem("Token");
		this.props.history.push("/");
	};
	handleShow = () => {
		this.setState({ modalVisible: true });
	};
	handleCancel = () => {
		this.setState({ modalVisible: false });
	};
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Modal
					title="Your Info"
					onCancel={this.handleCancel}
					visible={this.state.modalVisible}
					footer={[
						<Button onClick={this.handleCancel} key="back">
							Cancel
						</Button>
					]}
				>
					<Typography variant="h6" color="inherit" className={classes.grow}>
						Email: {this.state.email}
					</Typography>
				</Modal>
				<AppBar
					style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
					position="fixed"
				>
					<Toolbar>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							SCHOOL MANAGEMENT SYSTEM
						</Typography>
						<div>
							<IconButton
								aria-haspopup="true"
								color="inherit"
								onClick={this.handleShow}
							>
								<AccountCircle />
							</IconButton>
							<span
								style={{
									fontSize: "15px",
									cursor: "pointer",
									fontWeight: "bold"
								}}
								onClick={this.handleLogout}
							>
								Logout
							</span>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}
MenuAppBar.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
