import React from 'react'
import { Form, Checkbox } from 'antd'

const checkBox = props=>(
        <Form.Item style={{ margin:0}}>
            {props.getFieldDecorator(props.name, {
                valuePropName: props.valuePropName,
                initialValue: props.initialValue,
            })(
                <Checkbox>{props.message}</Checkbox>
            )}
        </Form.Item>
);

export default checkBox;