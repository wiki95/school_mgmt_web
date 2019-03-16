import React from "react";
import { Menu, Icon, Button } from "antd";

const SubMenu = Menu.SubMenu;

class SideBar extends React.Component {
	state = {
		collapsed: true
	};
	handleClick = e => {
		console.log("click", e);
	};
	toggleCollapsed = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};
	render() {
		return (
			<div style={{ width: 256, position: "absolute" }}>
				<Button
					type="secondary"
					onClick={this.toggleCollapsed}
					style={{ marginBottom: 16 }}
				>
					<Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
				</Button>
				<Menu
					theme="dark"
					style={{
						backgroundColor: "rgba(255,255,255,0.1)"
					}}
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
						<Menu.Item key="1">Student</Menu.Item>
						<Menu.Item key="2">Teacher</Menu.Item>
					</SubMenu>
					<SubMenu
						key="sub3"
						title={
							<span>
								<Icon type="eye" />
								<span>View Attendance</span>
							</span>
						}
					>
						<Menu.Item key="1">Student</Menu.Item>
						<Menu.Item key="2">Teacher</Menu.Item>
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
