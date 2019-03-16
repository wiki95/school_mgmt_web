import React, { Component } from "react";
import MyInput from "../Reusable/Input";
import MyButton from "../Reusable/Button";
import MyCheckBox from "../Reusable/CheckBox";
import { Form, Card, Spin, Alert } from "antd";
import { verify } from "../../api/";

class MyForm extends Component {
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.login(values, this.props.history);
			} else {
				console.log(err);
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
		const { switchCard, loading, error } = this.props;
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
				<Card title="Login" bordered={false} style={{ width: 350 }}>
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
								message="Please input your username!"
								iconType="user"
								type="email"
								placeholder="Email"
							/>
							<MyInput
								getFieldDecorator={getFieldDecorator}
								name="pwd"
								required
								message="Please input your Password!"
								iconType="lock"
								type="password"
								placeholder="Password"
							/>
							<div className="remember-forgot">
								<MyCheckBox
									getFieldDecorator={getFieldDecorator}
									name="check"
									message="Remember?"
									valuePropName="checked"
									initialValue
								/>
								<div
									className="login-form-forgot"
									style={{ color: "#1890ff", cursor: "pointer" }}
									onClick={() => switchCard("forgot")}
								>
									Forgot Password
								</div>
							</div>
							<MyButton type="primary" htmlType="submit" text="Login" />
							<div style={{ padding: "5px" }}>
								Or{" "}
								<span
									style={{ color: "#1890ff", cursor: "pointer" }}
									onClick={() => switchCard("signup")}
								>
									Signup
								</span>
							</div>
						</Form>
					)}
				</Card>
			</div>
		);
	}
}

export default Form.create({ name: "normal_login" })(MyForm);
