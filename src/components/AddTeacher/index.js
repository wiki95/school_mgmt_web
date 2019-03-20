import React from "react";
import MyInput from "../Reusable/Input";
import { Form, Select, Button, Spin, message } from "antd";
import { addTeacher } from "../../api/teacher";

const { Option } = Select;

class AddTeacher extends React.Component {
	state = {
		loading: false
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			console.log(values);
			if (!err) {
				this.setState({ loading: true }, () => {
					addTeacher(values)
						.then(res => {
							this.setState({ loading: false }, () => {
								message.success("Record has been added", 5);
							});
						})
						.catch(err => {
							this.setState({ loading: false }, () => {
								message.error("Duplicate Registration may be", 5);
							});
						});
				});
			} else {
				message.error("Fill out all fields first");
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
						<h2 style={{ fontFamily: "sans-serif", fontWeight: "bolder" }}>
							Add Teacher
						</h2>
						<Form onSubmit={this.handleSubmit}>
							<div style={styles.inputContainer}>
								<MyInput
									label="Registration #"
									getFieldDecorator={getFieldDecorator}
									name="reg_num"
									required
									message="Please input Registration No."
									type="text"
									placeholder="Enter Registration #"
								/>
								<MyInput
									label="Salary"
									getFieldDecorator={getFieldDecorator}
									name="salary"
									required
									message="Please input Salary"
									type="number"
									placeholder="Enter Salary"
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
									{getFieldDecorator("gender")(
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
								<Form.Item label="Primary Subject">
									{getFieldDecorator("subject")(
										<Select>
											<Option value="Urdu">Urdu</Option>
											<Option value="English">English</Option>
											<Option value="Maths">Maths</Option>
											<Option value="Chemistry">Chemistry</Option>
											<Option value="Physics">Physics</Option>
											<Option value="Biology">Biology</Option>
											<Option value="Sindhi">Sindhi</Option>
											<Option value="Science">Science</Option>
											<Option value="Islamiat">Islamiat</Option>
											<Option value="Pak Studies">Pak Studies</Option>
											<Option value="PT">PT</Option>
											<Option value="Library">Library</Option>
										</Select>
									)}
								</Form.Item>
								<MyInput
									label="Teacher of Class"
									getFieldDecorator={getFieldDecorator}
									name="class_teacher"
									required
									message="Please Enter class Teacher"
									type="text"
									placeholder="Enter class Teacher"
								/>
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
									Add Teacher
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
		marginTop: "70px",
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
export default Form.create({ name: "addteacher" })(AddTeacher);
