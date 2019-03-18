import React from "react";
import { Form, Input, Icon } from "antd";

const myInput = props => (
	<Form.Item label={props.label && props.label}>
		{props.getFieldDecorator(props.name, {
			initialValue: props.initialValue !== undefined ? props.initialValue : "",
			rules: [{ required: props.required, message: props.message }]
		})(
			<Input
				addonBefore={props.addonBefore && props.addonBefore}
				type={props.type}
				prefix={
					props.iconType && (
						<Icon type={props.iconType} style={{ color: "rgba(0,0,0,.25)" }} />
					)
				}
				placeholder={props.placeholder}
			/>
		)}
	</Form.Item>
);

export default myInput;
