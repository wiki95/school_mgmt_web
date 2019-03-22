import React from "react";
import { getSchedules, updateSchedule } from "../../api/schedule";
import { Select, Button, message } from "antd";

const Option = Select.Option;

const INITIAL_STATE = {
	class: "One",
	section: "A",
	loading: false,
	error: "",
	updateFields: []
};
class SetSchedule extends React.Component {
	state = INITIAL_STATE;
	fetchData = (c, s) => {
		let loading = { ...INITIAL_STATE, class: c, section: s, loading: true };
		this.setState(loading, () => {
			getSchedules(c, s)
				.then(res => {
					const schedules = res.data;
					if (schedules.length < 5) {
						let noRecord = {
							...INITIAL_STATE,
							class: c,
							section: s,
							error: "Please complete full week schedule of this class"
						};
						this.setState(noRecord);
					} else {
						let record = {
							...INITIAL_STATE,
							class: c,
							section: s,
							updateFields: schedules
						};
						this.setState(record);
					}
				})
				.catch(err => {
					let isError = {
						...INITIAL_STATE,
						class: c,
						section: s,
						err: err.message
					};
					this.setState(isError);
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
	changeSubject = (event, rowId, subjectId) => {
		let fields = this.state.updateFields;
		this.state.updateFields.forEach((row, index) => {
			if (row._id === rowId) {
				fields[index].subjects[subjectId] = event.target.value;
			}
		});
		this.setState({
			updateFields: fields
		});
	};
	handleUpdate = e => {
		e.preventDefault();
		this.setState(
			{
				loading: true,
				error: ""
			},
			() => {
				updateSchedule(
					this.state.class,
					this.state.section,
					this.state.updateFields
				)
					.then(res => {
						this.setState({
							loading: false
						});
						message.success("Schedule has been updated!", 5);
					})
					.catch(err => {
						this.setState({ error: err.message });
						message.error(err.message);
					});
			}
		);
	};
	handleDelete = (e, rowId, subjectId) => {
		e.preventDefault();
		let fields = this.state.updateFields;
		this.state.updateFields.forEach((row, index) => {
			if (row._id === rowId) {
				fields[index].subjects.splice(subjectId, 1);
			}
		});
		this.setState({
			updateFields: fields
		});
	};
	handleAdd = (e, rowId) => {
		e.preventDefault();
		let fields = this.state.updateFields;
		this.state.updateFields.forEach((row, index) => {
			if (row._id === rowId) {
				fields[index].subjects.push("");
			}
		});
		this.setState({
			updateFields: fields
		});
	};
	render() {
		return (
			<div style={styles.container}>
				<div style={styles.innerContainer}>
					<div style={styles.inputContainer}>
						<Select
							defaultValue="One"
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
							defaultValue="A"
							onSelect={this.selectSection}
							style={{ margin: "5px", width: "100px" }}
						>
							<Option value="A">A</Option>
							<Option value="B">B</Option>
							<Option value="C">C</Option>
						</Select>
						<Button type="primary" onClick={this.handleUpdate}>
							Update
						</Button>
					</div>
					<div>
						{this.state.error ? (
							<h3>{this.state.error}</h3>
						) : (
							<ul>
								{this.state.updateFields.map(sch => {
									return (
										<li style={{ color: "black" }} key={sch._id}>
											{sch.day}
											<ul>
												{sch.subjects.map((subj, index) => {
													return (
														<li key={index}>
															<input
																onFocus={() => console.log(index, sch._id)}
																onChange={e =>
																	this.changeSubject(e, sch._id, index)
																}
																type="text"
																value={subj}
															/>
															<Button
																onClick={e =>
																	this.handleDelete(e, sch._id, index)
																}
																type="danger"
															>
																Delete
															</Button>
														</li>
													);
												})}
											</ul>
											<Button
												onClick={e => this.handleAdd(e, sch._id)}
												type="secondary"
											>
												+
											</Button>
										</li>
									);
								})}
							</ul>
						)}
					</div>
				</div>
			</div>
		);
	}
}
const styles = {
	container: {
		marginTop: "70px",
		marginLeft: "130px",
		display: "flex",
		justifyContent: "center"
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

export default SetSchedule;
