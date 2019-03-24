import React from "react";
import { Select } from "antd";

const Option = Select.Option;

class Notice extends React.Component {
	render() {
		return (
			<div style={styles.container}>
				<div>
					<h2
						style={{
							textAlign: "left",
							fontWeight: "bolder"
						}}
					>
						Notice Board
					</h2>
					<div>
						<Select>
							<Option value="A">A</Option>
						</Select>
					</div>
				</div>
			</div>
		);
	}
}

const styles = {
	container: {
		marginTop: "70px",
		marginLeft: "150px",
		display: "flex",
		justifyContent: "center"
	}
};

export default Notice;
