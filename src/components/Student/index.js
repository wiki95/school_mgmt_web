import React from "react";
import { Table } from "antd";
import { getStudents } from "../../api/student";

const columns = [
	{
		title: "Gr Num",
		dataIndex: "gr_num"
	},
	{
		title: "First Name",
		dataIndex: "name"
	},
	{
		title: "Last Name",
		dataIndex: "father_name"
	},
	{
		title: "Gender",
		dataIndex: "gender"
	},
	{
		title: "Age",
		dataIndex: "age"
	},
	{
		title: "Class",
		dataIndex: "class"
	},
	{
		title: "Section",
		dataIndex: "section"
	},
	{
		title: "Address",
		dataIndex: "address"
	},
	{
		title: "Admission Date",
		dataIndex: "admission_date"
	}
];

class Student extends React.Component {
	_isMounted = false;
	state = {
		data: []
	};
	componentDidMount() {
		this._isMounted = true;
		getStudents().then(res => {
			if (this._isMounted) {
				this.setState({
					data: res.data.data
				});
			}
		});
	}
	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const { data } = this.state;
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					marginLeft: "100px",
					marginTop: "50px"
				}}
			>
				<Table
					onSelect={e => console.log(e)}
					rowKey={record => record._id}
					style={{
						backgroundColor: "rgba(255,255,255,0.5)",
						cursor: "pointer"
					}}
					columns={columns}
					dataSource={data}
				/>
			</div>
		);
	}
}

export default Student;
