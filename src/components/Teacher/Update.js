import React from "react";
import { Modal } from "antd";
import MyInput from "../Reusable/Input";
import { Form, Select, Button, message } from "antd";

const { Option } = Select;

class UpdateModal extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.onUpdate(values);
			} else {
				message.error("Please fill all values");
			}
		});
	};

	render() {
		const { onCancel, selectedRowValues, confirmLoading } = this.props;
		const { getFieldDecorator } = this.props.form;
		return (
			<div>
				<Modal
					confirmLoading={confirmLoading}
					width={800}
					onCancel={onCancel}
					title="Update"
					visible={true}
					footer={[
						<Button onClick={onCancel} key="back">
							Cancel
						</Button>,
						<Button
							onClick={this.handleSubmit}
							key="submit"
							type="primary"
							loading={false}
						>
							Update
						</Button>
					]}
				>
					<Form onSubmit={this.handleSubmit}>
						<div style={styles.inputContainer}>
							<MyInput
								label="Regisration #"
								getFieldDecorator={getFieldDecorator}
								name="reg_num"
								required
								message="Please input Reg No."
								type="text"
								placeholder="Enter Reg #"
								initialValue={selectedRowValues && selectedRowValues.reg_num}
							/>
							<MyInput
								label="Salary"
								getFieldDecorator={getFieldDecorator}
								name="salary"
								required
								message="Please input Salary"
								type="number"
								placeholder="Enter salary"
								initialValue={selectedRowValues && selectedRowValues.salary}
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
								initialValue={selectedRowValues && selectedRowValues.name}
							/>
							<MyInput
								label="Last Name"
								getFieldDecorator={getFieldDecorator}
								name="father_name"
								required
								message="Please input Last Name"
								type="text"
								placeholder="Enter Last Name"
								initialValue={
									selectedRowValues && selectedRowValues.father_name
								}
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
									initialValue: selectedRowValues && selectedRowValues.gender
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
								initialValue={selectedRowValues && selectedRowValues.age}
							/>
							<Form.Item label="Primary Subject">
								{getFieldDecorator("subject", {
									initialValue: selectedRowValues && selectedRowValues.subject
								})(
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
								message="Please Enter class"
								type="text"
								placeholder="Enter Class "
								initialValue={
									selectedRowValues && selectedRowValues.class_teacher
								}
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
								initialValue={selectedRowValues && selectedRowValues.address}
							/>
						</div>

						<Button style={{ display: "none" }} htmlType="submit" />
					</Form>
				</Modal>
			</div>
		);
	}
}
const styles = {
	inputContainer: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gridGap: "20px"
	}
};
export default Form.create({ name: "update_teacher" })(UpdateModal);
