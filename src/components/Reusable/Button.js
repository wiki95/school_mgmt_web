import React from 'react'
import { Button } from 'antd'

const button = props =>(
    <Button
    htmlType={props.htmlType}
    style={styles.btn}
    type={props.type}
    onClick={props.onClick}
    >
    {props.text}
    </Button>
);

const styles = {
    btn:{
        width:'100%'
    }
}

export default button;