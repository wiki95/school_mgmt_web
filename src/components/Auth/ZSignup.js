import React from "react";
import MyInput from "../Reusable/Input";
import MyButton from "../Reusable/Button";
import { Form, Card, message, Spin, Alert } from "antd";
import { verify } from "../../api";

class MyForgotForm extends React.Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			const { pwd, confirmPwd } = values;
			if (!err) {
				if (pwd === confirmPwd) {
					this.props.signup(values, this.props.history);
				} else {
					message.error("Password does not match", 3);
				}
			}
		});
	};
	componentDidMount() {
		this.props.loaded();
		verify().then(res => {
			if (res) {
				this.props.history.push("/home");
			}
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { loading, switchCard, error } = this.props;
		return (
			<div className="form-container">
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
				<Card title="Signup" bordered={false} style={{ width: 350 }}>
					{loading ? (
						<div className="spinner-div">
							<Spin size="large" />
						</div>
					) : (
						<Form onSubmit={this.handleSubmit} className="login-form">
							<MyInput
								getFieldDecorator={getFieldDecorator}
								name="email"
								required
								message="Please input your Email"
								iconType="user"
								type="email"
								placeholder="Email"
							/>
							<MyInput
								getFieldDecorator={getFieldDecorator}
								name="pwd"
								required
								message="Please input your Password"
								iconType="lock"
								type="password"
								placeholder="Re Enter your Password"
							/>
							<MyInput
								getFieldDecorator={getFieldDecorator}
								name="confirmPwd"
								required
								message="Please input your Email"
								iconType="lock"
								type="password"
								placeholder="Re Enter your Password"
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
					)}
				</Card>
			</div>
		);
	}
}

export default Form.create({ name: "forgot_password" })(MyForgotForm);
