import React from "react";
import {
	Select,
	Switch,
	Icon,
	Input,
	Button,
	Modal,
	Spin,
	message
} from "antd";
import { getNotices, addNotice, deleteNotice } from "../../api/notice";

const Option = Select.Option;
const TextArea = Input.TextArea;

class Notice extends React.Component {
	state = {
		isSwitch: false,
		class: "One",
		section: "A",
		msg: "",
		loading: true,
		gr_num: "abcd1234",
		noticeList: [],
		modalVisible: false,
		modalConfirmLoading: false
	};
	getData = body => {
		this.setState(
			{
				loading: true
			},
			() => {
				getNotices(body)
					.then(res => {
						this.setState({
							loading: false,
							noticeList: res.data,
							msg: ""
						});
					})
					.catch(err => {
						this.setState({
							loading: false,
							noticeList: []
						});
					});
			}
		);
	};
	componentDidMount() {
		const body = {
			gr_num: this.state.gr_num
		};
		this.getData(body);
	}
	handleSwitch = () => {
		this.setState(
			{
				isSwitch: !this.state.isSwitch,
				noticeList: []
			},
			() => {
				let body = {
					gr_num: this.state.gr_num
				};
				if (this.state.isSwitch) {
					body = {
						class: this.state.class,
						section: this.state.section
					};
				}
				this.getData(body);
			}
		);
	};
	handleInputChange = e => {
		this.setState({
			gr_num: e.target.value
		});
	};
	handleAdd = e => {
		e.preventDefault();
		this.setState({ modalVisible: true });
	};
	handleGet = e => {
		e.preventDefault();
		let body = {};
		if (!this.state.isSwitch) {
			body = {
				gr_num: this.state.gr_num
			};
		}
		if (this.state.isSwitch) {
			body = {
				class: this.state.class,
				section: this.state.section
			};
		}
		this.getData(body);
	};
	handleModalCancel = () => {
		this.setState({
			modalVisible: false,
			msg: ""
		});
	};
	handleOnok = () => {
		let body = {};
		if (!this.state.isSwitch) {
			body = {
				gr_num: this.state.gr_num,
				message: this.state.msg
			};
		}
		if (this.state.isSwitch) {
			body = {
				class: this.state.class,
				section: this.state.section,
				message: this.state.msg
			};
		}
		this.setState(
			{
				modalConfirmLoading: true
			},
			() => {
				addNotice(body)
					.then(res => {
						message.success("Announcement Added", 5);
						this.setState(
							{ modalConfirmLoading: false, modalVisible: false },
							() => this.getData(body)
						);
					})
					.catch(err => {
						message.error(err.message, 5);
						this.setState({
							modalConfirmLoading: false
						});
						console.log(err);
					});
			}
		);
	};
	handleSelectClass = e => {
		this.setState(
			{
				class: e
			},
			() => {
				let body = {};
				if (!this.state.isSwitch) {
					body = {
						gr_num: this.state.gr_num
					};
				}
				if (this.state.isSwitch) {
					body = {
						class: this.state.class,
						section: this.state.section
					};
				}
				this.getData(body);
			}
		);
	};
	handleSelectSection = e => {
		this.setState(
			{
				section: e
			},
			() => {
				let body = {};
				if (!this.state.isSwitch) {
					body = {
						gr_num: this.state.gr_num
					};
				}
				if (this.state.isSwitch) {
					body = {
						class: this.state.class,
						section: this.state.section
					};
				}
				this.getData(body);
			}
		);
	};
	handleDelete = id => {
		this.setState(
			{
				loading: true
			},
			() => {
				deleteNotice(id)
					.then(() => {
						this.setState(
							{
								loading: false
							},
							() => {
								let body = {};
								if (!this.state.isSwitch) {
									body = {
										gr_num: this.state.gr_num
									};
								}
								if (this.state.isSwitch) {
									body = {
										class: this.state.class,
										section: this.state.section
									};
								}
								this.getData(body);
							}
						);
					})
					.catch(err => {
						this.setState({
							loading: false,
							noticeList: []
						});
					});
			}
		);
	};
	render() {
		const {
			gr_num,
			loading,
			isSwitch,
			modalConfirmLoading,
			modalVisible,
			noticeList
		} = this.state;
		return (
			<div style={styles.container}>
				<div style={{ width: "800px" }}>
					<h2
						style={{
							fontWeight: "bolder",
							color: "white"
						}}
					>
						Notice Board
					</h2>
					<div>
						<div>
							<Switch
								style={{ marginLeft: "-100px" }}
								checkedChildren="Class &nbsp;&nbsp;&nbsp;"
								unCheckedChildren="Student"
								defaultChecked={false}
								onChange={this.handleSwitch}
							/>
						</div>
						<div style={{ display: "flex" }}>
							<div
								style={{
									display: isSwitch ? "none" : "flex",
									flexDirection: "column"
								}}
							>
								<span>Gr # :</span>
								<Input
									type="text"
									value={gr_num}
									onChange={this.handleInputChange}
									placeholder="Enter Gr Num"
								/>
							</div>
							<div style={{ display: !isSwitch ? "none" : "flex" }}>
								<div style={{ display: "flex", flexDirection: "column" }}>
									<span>Class :</span>
									<Select
										onSelect={this.handleSelectClass}
										style={{ width: "100px" }}
										defaultValue="One"
									>
										<Option value="Nursery">Nursery</Option>
										<Option value="Prep">Prep</Option>
										<Option value="One">One</Option>
										<Option value="Two">Two</Option>
										<Option value="Three">Three</Option>
										<Option value="Four">Four</Option>
										<Option value="Five">Five</Option>
										<Option value="Six">Six</Option>
										<Option value="Seven">Seven</Option>
										<Option value="Eight">Eight</Option>
										<Option value="Nine">Nine</Option>
										<Option value="Matric">Matric</Option>
									</Select>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										marginLeft: "20px"
									}}
								>
									<span>Section :</span>
									<Select
										onSelect={this.handleSelectSection}
										style={{ width: "100px" }}
										defaultValue="A"
									>
										<Option value="A">A</Option>
										<Option value="B">B</Option>
										<Option value="C">C</Option>
									</Select>
								</div>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginLeft: "20px"
								}}
							>
								<span>&nbsp;</span>
								<Button type="primary" onClick={this.handleGet}>
									Search
								</Button>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									marginLeft: "20px"
								}}
							>
								<span>&nbsp;</span>
								<Button type="primary" onClick={this.handleAdd}>
									Add
								</Button>
							</div>
						</div>
						<Modal
							confirmLoading={modalConfirmLoading}
							width={800}
							onCancel={this.handleModalCancel}
							title="Add Message"
							visible={modalVisible}
							onOk={this.handleOnok}
						>
							<TextArea
								onChange={e => this.setState({ msg: e.target.value })}
								style={{ marginTop: "20px" }}
								placeholder="Enter your message!"
								autosize={{ minRows: 4, maxRows: 10 }}
								value={this.state.msg}
							/>
						</Modal>

						{loading ? (
							<div style={{ display: "flex", justifyContent: "center" }}>
								<Spin size="large" />
							</div>
						) : (
							<ul style={{ listStyleType: "none" }}>
								{noticeList &&
									noticeList.map(notice => {
										return (
											<li
												style={{ marginLeft: "-40px", marginTop: "10px" }}
												key={notice._id}
											>
												<div
													style={{
														display: "flex",
														justifyContent: "space-between",
														backgroundColor: "rgba(255,255,255,0.5)",
														padding: "10px",
														borderRadius: "4px"
													}}
												>
													{notice.message}
													<Icon
														onClick={() => this.handleDelete(notice._id)}
														style={{ cursor: "pointer" }}
														type="delete"
													/>
												</div>
												<div>{notice.date.substr(0, 10)}</div>
											</li>
										);
									})}
								{!noticeList && <h3>No Record Found</h3>}
							</ul>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	container: {
		marginTop: "70px",
		marginLeft: "150px",
		display: "flex",
		justifyContent: "center"
	}
};

export default Notice;
