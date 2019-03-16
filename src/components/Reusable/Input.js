import React from "react";
import { Form, Input, Icon } from "antd";

const myInput = props => (
	<Form.Item>
		{props.getFieldDecorator(props.name, {
			rules: [{ required: props.required, message: props.message }]
		})(
			<Input
				type={props.type}
				prefix={
					<Icon type={props.iconType} style={{ color: "rgba(0,0,0,.25)" }} />
				}
				placeholder={props.placeholder}
			/>
		)}
	</Form.Item>
);

export default myInput;
