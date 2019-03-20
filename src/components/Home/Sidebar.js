import React from "react";
import { Menu, Icon, Button } from "antd";

const SubMenu = Menu.SubMenu;

class SideBar extends React.Component {
	state = {
		collapsed: true
	};
	handleClick = e => {
		if (e.keyPath[0] === "1") {
			this.props.history.push("/home/students");
		}
		if (e.keyPath[0] === "2") {
			this.props.history.push("/home/teachers");
		}
		if (e.keyPath[0] === "3") {
			this.props.history.push("/home/addstudent");
		}
		if (e.keyPath[0] === "4") {
			this.props.history.push("/home/addteacher");
		}
		if (e.keyPath[0] === "5") {
			this.props.history.push("/home/schedule");
		}
	};
	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};
	render() {
		return (
			<div
				style={{
					marginTop: "70px",
					width: !this.state.collapsed && 256,
					position: "fixed",
					zIndex: 1
				}}
			>
				<Button
					type="secondary"
					onClick={this.toggleCollapsed}
					style={{ marginBottom: 16 }}
				>
					<Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
				</Button>
				<Menu
					style={{ zIndex: 1 }}
					theme="dark"
					inlineCollapsed={this.state.collapsed}
					onClick={this.handleClick}
					mode="inline"
				>
					<SubMenu
						key="sub1"
						title={
							<span>
								<Icon type="file-search" />
								<span>View And Edit Record</span>
							</span>
						}
					>
						<Menu.Item key="1">Student</Menu.Item>
						<Menu.Item key="2">Teacher</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub2"
						title={
							<span>
								<Icon type="plus" />
								<span>Add Record</span>
							</span>
						}
					>
						<Menu.Item key="3">Student</Menu.Item>
						<Menu.Item key="4">Teacher</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub3"
						title={
							<span>
								<Icon type="calendar" />
								<span>Daily Schedule</span>
							</span>
						}
					>
						<Menu.Item key="5">View</Menu.Item>
						<Menu.Item key="6">Set</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub4"
						title={
							<span>
								<Icon type="calendar" />
								<span>Set Schedule</span>
							</span>
						}
					/>
					<SubMenu
						key="sub5"
						title={
							<span>
								<Icon type="dollar" />
								<span>Fee Record</span>
							</span>
						}
					/>
				</Menu>
			</div>
		);
	}
}

export default SideBar;
