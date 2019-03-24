import React from "react";
import { Select, Table } from "antd";
import { getSchedules } from "../../api/schedule";

/////////////this component is not using anywhere

const Option = Select.Option;

const columns = [
	{
		title: "Sr #",
		dataIndex: "sr_num"
	},
	{
		title: "Monday",
		dataIndex: "Monday"
	},
	{
		title: "Tuesday",
		dataIndex: "Tuesday"
	},
	{
		title: "Wednesday",
		dataIndex: "Wednesday"
	},
	{
		title: "Thursday",
		dataIndex: "Thursday"
	},
	{
		title: "Friday",
		dataIndex: "Friday"
	}
];
class Schedule extends React.Component {
	state = {
		class: "One",
		section: "A",
		loading: false,
		schedule: [],
		error: ""
	};
	fetchData = (c, s) => {
		this.setState({ loading: true }, () => {
			getSchedules(c, s)
				.then(res => {
					const schedules = res.data;

					let data = [];
					res.data.forEach(val => {
						if (val.day === "Monday")
							data[0] = { [val.day]: val.subjects, _id: val._id };
						if (val.day === "Tuesday")
							data[1] = { [val.day]: val.subjects, _id: val._id };
						if (val.day === "Wednesday")
							data[2] = { [val.day]: val.subjects, _id: val._id };
						if (val.day === "Thursday")
							data[3] = { [val.day]: val.subjects, _id: val._id };
						if (val.day === "Friday")
							data[4] = { [val.day]: val.subjects, _id: val._id };
					});
					let arrangedData = [];
					let maximumSubjectsOfSelectedClass = 0;
					for (let i = 0; i < schedules.length; i++) {
						if (schedules[i].subjects.length > maximumSubjectsOfSelectedClass) {
							maximumSubjectsOfSelectedClass = schedules[i].subjects.length;
						}
					}
					for (let j = 0; j < maximumSubjectsOfSelectedClass; j++) {
						arrangedData.push({
							_id: "",
							sr_num: "",
							Monday: "",
							Tuesday: "",
							Wednesday: "",
							Thursday: "",
							Friday: ""
						});
					}
					for (let j = 0; j < maximumSubjectsOfSelectedClass; j++) {
						arrangedData[j]._id !== undefined && (arrangedData[j]._id = j);
						arrangedData[j].sr_num !== undefined &&
							(arrangedData[j].sr_num = j + 1);
						arrangedData[j].Monday !== undefined &&
							(arrangedData[j].Monday =
								data[0].Monday[j] !== undefined ? data[0].Monday[j] : "");
						arrangedData[j].Tuesday !== undefined &&
							(arrangedData[j].Tuesday =
								data[1].Tuesday[j] !== undefined ? data[1].Tuesday[j] : "");
						arrangedData[j].Wednesday !== undefined &&
							(arrangedData[j].Wednesday =
								data[2].Wednesday[j] !== undefined ? data[2].Wednesday[j] : "");
						arrangedData[j].Thursday !== undefined &&
							(arrangedData[j].Thursday =
								data[3].Thursday[j] !== undefined ? data[3].Thursday[j] : "");
						arrangedData[j].Friday !== undefined &&
							(arrangedData[j].Friday =
								data[4].Friday[j] !== undefined ? data[4].Friday[j] : "");
					}
					this.setState({
						loading: false,
						schedule: arrangedData,
						error: ""
					});
				})
				.catch(err => {
					this.setState({ loading: false, error: err.message });
				});
		});
	};
	componentDidMount() {
		const clas = this.state.class;
		const section = this.state.section;

		this.fetchData(clas, section);
	}
	selectClass = e => {
		const section = this.state.section;
		this.fetchData(e, section);
	};
	selectSection = e => {
		const clas = this.state.class;
		this.fetchData(clas, e);
	};

	render() {
		const { schedule, loading } = this.state;
		return (
			<div style={styles.container}>
				<div style={styles.innerContainer}>
					<div style={styles.inputContainer}>
						<Select
							defaultValue={this.state.class}
							style={{ margin: "5px", width: "100px" }}
							onSelect={this.selectClass}
						>
							<Option value="Nursery">Nursery</Option>
							<Option value="Prep">Prep</Option>
							<Option value="One">One</Option>
							<Option value="Two">Two</Option>
							<Option value="Three">Three</Option>
							<Option value="Four">Four</Option>
							<Option value="Five">Five</Option>
							<Option value="Six">Six</Option>
							<Option value="Seven">Seven</Option>
							<Option value="Eight">Eight</Option>
							<Option value="Nine">Nine</Option>
							<Option value="Matric">Matric</Option>
						</Select>
						<Select
							defaultValue={this.state.section}
							onSelect={this.selectSection}
							style={{ margin: "5px", width: "100px" }}
						>
							<Option value="A">A</Option>
							<Option value="B">B</Option>
							<Option value="C">C</Option>
						</Select>
					</div>
					<Table
						rowKey={record => record._id}
						loading={loading}
						dataSource={schedule}
						columns={columns}
					/>
				</div>
			</div>
		);
	}
}

const styles = {
	container: {
		marginTop: "70px",
		overflow: "hidden",
		marginLeft: "100px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	innerContainer: {
		backgroundColor: "rgba(255,255,255)",
		padding: "20px",
		minWidth: "600px"
	},
	inputContainer: {
		display: "flex",
		justifyContent: "center"
	}
};
export default Schedule;
