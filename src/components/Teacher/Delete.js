import React from "react";
import { Modal } from "antd";

export default class DeleteModal extends React.Component {
	render() {
		const {
			visible,
			handleCancelDelete,
			handleOk,
			confirmLoading,
			error
		} = this.props;
		return (
			<div>
				<Modal
					title={error ? "Error" : "Are You Sure?"}
					visible={visible}
					onOk={handleOk}
					confirmLoading={confirmLoading}
					onCancel={handleCancelDelete}
				>
					{error ? (
						<p>{error}</p>
					) : (
						<p>This will delete records you selected.</p>
					)}
				</Modal>
			</div>
		);
	}
}
