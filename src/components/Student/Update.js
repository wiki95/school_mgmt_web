import React from "react";
import { Modal } from "antd";
import MyInput from "../Reusable/Input";
import { Form, Select, DatePicker, Button, message } from "antd";
import moment from "moment";

const { Option } = Select;

const dateFormat = "YYYY/MM/DD";

class UpdateModal extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if (values.nic.length === 15) {
					this.props.onUpdate(values);
				} else {
					message.error("Nic Should be 15 characters Write with dashes");
				}
			} else {
				console.log(err);
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
								label="Gr #"
								getFieldDecorator={getFieldDecorator}
								name="gr_num"
								required
								message="Please input Gr No."
								type="text"
								placeholder="Enter Gr #"
								initialValue={selectedRowValues && selectedRowValues.gr_num}
							/>
							<MyInput
								label="Nic"
								getFieldDecorator={getFieldDecorator}
								name="nic"
								required
								message="Please input Nic number"
								type="text"
								placeholder="Enter nic"
								initialValue={selectedRowValues && selectedRowValues.nic}
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
							<Form.Item label="Class">
								{getFieldDecorator("class", {
									initialValue: selectedRowValues && selectedRowValues.class
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
									initialValue: selectedRowValues && selectedRowValues.section
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
								initialValue={selectedRowValues && selectedRowValues.address}
							/>
						</div>
						<div style={styles.inputContainer}>
							<Form.Item label="Admission Date">
								{getFieldDecorator("admission_date", {
									initialValue:
										selectedRowValues &&
										moment(selectedRowValues.admission_date, dateFormat)
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
								initialValue={selectedRowValues && selectedRowValues.password}
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
export default Form.create({ name: "update" })(UpdateModal);
