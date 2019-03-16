import React from "react";
import MyInput from "../Reusable/Input";
import MyButton from "../Reusable/Button";
import { Form, Card, Alert } from "antd";

const myForgotForm = props => {
	function handleSubmit(e) {
		e.preventDefault();
		props.form.validateFields((err, { email }) => {
			if (!err) {
				props.sendMail(email);
			}
		});
	}
	const { getFieldDecorator } = props.form;
	const { switchCard, error, msg } = props;
	return (
		<div className="form-container">
			<Card title="Password Recovery" bordered={false} style={{ width: 350 }}>
				{error && (
					<div className="alert-div">
						<Alert
							className="alert"
							message="Error"
							description={error}
							type="error"
						/>
					</div>
				)}
				{msg && (
					<div className="alert-div">
						<Alert
							className="alert"
							message="Email Send"
							description={msg}
							type="success"
						/>
					</div>
				)}
				<Form onSubmit={handleSubmit.bind(this)} className="login-form">
					<MyInput
						getFieldDecorator={getFieldDecorator}
						name="email"
						required
						message="Please input your Email"
						iconType="user"
						type="email"
						placeholder="Email"
					/>

					<MyButton type="primary" htmlType="submit" text="Submit" />

					<div style={{ marginTop: "1rem" }}>
						<p
							style={{ color: "#1890ff", cursor: "pointer" }}
							onClick={() => switchCard("login")}
						>
							Goto Login
						</p>
					</div>
				</Form>
			</Card>
		</div>
	);
};

export default Form.create({ name: "forgot_password" })(myForgotForm);
