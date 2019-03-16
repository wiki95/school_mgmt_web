import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
	handleLogout = () => {
		localStorage.removeItem("Token");
		this.props.history.push("/");
	};
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar
					style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
					position="static"
				>
					<Toolbar>
						<Typography variant="h6" color="inherit" className={classes.grow}>
							SCHOOL MANAGEMENT SYSTEM
						</Typography>
						<div>
							<IconButton
								aria-haspopup="true"
								color="inherit"
								onClick={() => alert("hello from icon")}
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
