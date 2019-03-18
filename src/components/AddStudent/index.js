import React from "react";
import { Modal } from "antd";
import MyInput from "../Reusable/Input";
import { Form, Select, DatePicker, Button, Spin, message } from "antd";
import moment from "moment";
import { addStudent } from "../../api/student";

const { Option } = Select;

const dateFormat = "YYYY/MM/DD";

class AddStudent extends React.Component {
	state = {
		loading: false
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (values.nic.length === 15) {
					this.setState({ loading: true }, () => {
						addStudent(values)
							.then(res => {
								this.setState({ loading: false }, () => {
									message.success("Record has been added", 5);
								});
							})
							.catch(err => {
								this.setState({ loading: false }, () => {
									message.error("Duplicate Gr Number or NIC", 5);
								});
							});
					});
				} else {
					message.error("Enter Correct Nic with dashes");
				}
			} else {
				console.log(err);
			}
		});
	};
	handleReset = e => {
		e.preventDefault();
		this.props.form.resetFields();
	};

	render() {
		const { loading } = this.state;
		const { getFieldDecorator } = this.props.form;
		return (
			<div style={styles.container}>
				{loading ? (
					<Spin size="large" />
				) : (
					<div style={styles.innerContainer}>
						<Form onSubmit={this.handleSubmit}>
							<div style={styles.inputContainer}>
								<MyInput
									label="Gr #"
									getFieldDecorator={getFieldDecorator}
									name="gr_num"
									required
									message="Please input Gr No."
									type="text"
									placeholder="Enter Gr #"
								/>
								<MyInput
									label="Nic"
									getFieldDecorator={getFieldDecorator}
									name="nic"
									required
									message="Please input Nic number"
									type="text"
									placeholder="Enter nic"
								/>
							</div>
							<div style={styles.inputContainer}>
								<MyInput
									label="First Name"
									getFieldDecorator={getFieldDecorator}
									name="name"
									required
									message="Please input First Name"
									type="text"
									placeholder="Enter First Name"
								/>
								<MyInput
									label="Last Name"
									getFieldDecorator={getFieldDecorator}
									name="father_name"
									required
									message="Please input Last Name"
									type="text"
									placeholder="Enter Last Name"
								/>
							</div>
							<div
								style={{
									display: "grid",
									gridTemplateColumns: "1fr 1fr 1fr 1fr",
									gridGap: "20px"
								}}
							>
								<Form.Item label="Gender">
									{getFieldDecorator("gender", {
										initialValue: "M"
									})(
										<Select>
											<Option value="M">M</Option>
											<Option value="F">F</Option>
										</Select>
									)}
								</Form.Item>
								<MyInput
									label="Age"
									getFieldDecorator={getFieldDecorator}
									name="age"
									required
									message="Please input Age"
									type="Number"
									placeholder="Enter Age"
								/>
								<Form.Item label="Class">
									{getFieldDecorator("class", {
										initialValue: "One"
									})(
										<Select>
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
									)}
								</Form.Item>
								<Form.Item label="Section">
									{getFieldDecorator("section", {
										initialValue: "A"
									})(
										<Select>
											<Option value="A">A</Option>
											<Option value="B">B</Option>
											<Option value="C">C</Option>
										</Select>
									)}
								</Form.Item>
							</div>
							<div
								style={{
									display: "grid",
									gridGap: "20px",
									gridTemplateColumns: "1fr"
								}}
							>
								<MyInput
									label="Address"
									getFieldDecorator={getFieldDecorator}
									name="address"
									required
									message="Please Enter Address"
									type="text"
									placeholder="Enter Address"
								/>
							</div>
							<div style={styles.inputContainer}>
								<Form.Item label="Admission Date">
									{getFieldDecorator("admission_date", {
										initialValue: moment(new Date(), dateFormat)
									})(<DatePicker format={dateFormat} />)}
								</Form.Item>

								<MyInput
									label="New Password"
									getFieldDecorator={getFieldDecorator}
									name="password"
									required
									message="Please Enter Password"
									type="text"
									placeholder="Enter New Password"
								/>
							</div>
							<div
								style={{
									display: "flex",
									justifyContent: "flex-end",
									width: "100%"
								}}
							>
								<Button
									onClick={this.handleReset}
									style={{ marginRight: "20px" }}
									type="danger"
								>
									Reset Values
								</Button>
								<Button type="primary" htmlType="submit">
									Add Student
								</Button>
							</div>
						</Form>
					</div>
				)}
			</div>
		);
	}
}
const styles = {
	container: {
		overflow: "hidden",
		marginLeft: "100px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	innerContainer: {
		backgroundColor: "rgba(255,255,255)",
		padding: "20px"
	},
	inputContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridGap: "20px"
	}
};
export default Form.create({ name: "addstudent" })(AddStudent);
