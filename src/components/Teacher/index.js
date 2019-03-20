import React from "react";
import { Table, Button, Input, Icon } from "antd";
import Highlighter from "react-highlight-words";
import DeleteModal from "./Delete";
import { deleteTeachers, updateTeacher, getTeachers } from "../../api/teacher";
import UpdateModal from "./Update";

class Teacher extends React.Component {
	_isMounted = false;
	state = {
		data: [],
		filteredInfo: null,
		searchText: "",
		loading: true,
		modalVisible: false,
		selectedRows: [],
		confirmDeleteLoading: false,
		confirmUpdateLoading: false,
		deleteError: "",
		updateError: "",
		updateModalVisible: false,
		selectedRowValues: ""
	};
	handleChange = (pagination, filters) => {
		this.setState({
			filteredInfo: filters
		});
	};
	clearFilters = () => {
		this.setState({ filteredInfo: null, searchText: "" });
	};
	componentDidMount() {
		this._isMounted = true;
		getTeachers().then(res => {
			if (this._isMounted) {
				this.setState({
					data: res.data.data,
					loading: false
				});
			}
		});
	}

	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
					style={{ width: 188, marginBottom: 8, display: "block" }}
				/>
				<Button
					type="primary"
					onClick={() => this.handleSearch(selectedKeys, confirm)}
					icon="search"
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button
					onClick={() => this.handleReset(clearFilters)}
					size="small"
					style={{ width: 90 }}
				>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: text => (
			<Highlighter
				highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
				searchWords={[this.state.searchText]}
				autoEscape
				textToHighlight={text.toString()}
			/>
		)
	});

	handleSearch = (selectedKeys, confirm) => {
		confirm();
		this.setState({ searchText: selectedKeys[0] });
	};

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: "" });
	};
	componentWillUnmount() {
		this._isMounted = false;
	}
	handleUpdate = () => {
		this.setState({
			updateModalVisible: true
		});
	};
	handleCancelUpdate = () => {
		this.setState({
			updateModalVisible: false,
			confirmUpdateLoading: false,
			updateError: ""
		});
	};
	handleDelete = () => {
		this.setState({
			modalVisible: true
		});
	};
	handleCancelDelete = () => {
		this.setState({
			confirmDeleteLoading: false,
			deleteError: "",
			modalVisible: false
		});
	};
	handleOk = () => {
		this.setState({
			confirmDeleteLoading: true,
			loading: true
		});
		deleteTeachers(this.state.selectedRows)
			.then(() => {
				this.setState(
					{
						deleteError: "",
						confirmDeleteLoading: false,
						modalVisible: false
					},
					() => {
						getTeachers().then(res => {
							this.setState({
								data: res.data.data,
								loading: false
							});
						});
					}
				);
			})
			.catch(err => {
				this.setState({
					deleteError: err.message,
					confirmDeleteLoading: false
				});
			});
	};
	handleUpdateModal = values => {
		values._id = this.state.selectedRows[0];
		this.setState(
			{
				confirmUpdateLoading: true,
				loading: true
			},
			() => {
				updateTeacher(values)
					.then(() => {
						this.setState(
							{
								updateError: "",
								confirmUpdateLoading: false,
								updateModalVisible: false
							},
							() => {
								getTeachers().then(res => {
									this.setState({
										updateError: "",
										data: res.data.data,
										loading: false,
										confirmUpdateLoading: false
									});
								});
							}
						);
					})
					.catch(err => {
						this.setState({
							updateError: err.message,
							confirmUpdateLoading: false
						});
					});
			}
		);
	};
	render() {
		const {
			data,
			loading,
			modalVisible,
			confirmDeleteLoading,
			confirmUpdateLoading,
			deleteError,
			updateError,
			updateModalVisible,
			selectedRows,
			selectedRowValues
		} = this.state;
		let { filteredInfo } = this.state;
		filteredInfo = filteredInfo || {};
		const columns = [
			{
				title: "Sr No.",
				dataIndex: "sr_num"
			},
			{
				title: "Reg Num",
				dataIndex: "reg_num",
				key: "reg_num",
				...this.getColumnSearchProps("reg_num")
			},
			{
				title: "First Name",
				dataIndex: "name",
				...this.getColumnSearchProps("name")
			},
			{
				title: "Last Name",
				dataIndex: "father_name",
				...this.getColumnSearchProps("father_name")
			},
			{
				title: "Gender",
				dataIndex: "gender",
				key: "gender",
				filters: [{ text: "M", value: "M" }, { text: "F", value: "F" }],
				filteredValue: filteredInfo.gender || null,
				onFilter: (value, record) => record.gender.includes(value)
			},
			{
				title: "Age",
				dataIndex: "age"
			},
			{
				title: "Subject",
				dataIndex: "subject",
				key: "subject",
				filters: [
					{ text: "Urdu", value: "Urdu" },
					{ text: "English", value: "English" },
					{ text: "Maths", value: "Maths" },
					{ text: "Chemistry", value: "Chemistry" },
					{ text: "Physics", value: "Physics" },
					{ text: "Biology", value: "Biology" },
					{ text: "Sindhi", value: "Sindhi" },
					{ text: "Science", value: "Science" },
					{ text: "Islamiat", value: "Islamiat" },
					{ text: "Pak Studies", value: "Pak Studies" },
					{ text: "PT", value: "PT" },
					{ text: "Library", value: "Library" }
				],
				filteredValue: filteredInfo.subject || null,
				onFilter: (value, record) => record.subject.includes(value)
			},
			{
				title: "Class Teacher",
				dataIndex: "class_teacher"
			},
			{
				title: "Address",
				dataIndex: "address",
				width: "170px"
			},
			{
				title: "Salary",
				dataIndex: "salary"
			}
		];
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRows: selectedRowKeys,
					selectedRowValues: selectedRows[0]
				});
			}
		};

		return (
			<div style={{ marginTop: "70px" }}>
				{updateModalVisible && (
					<UpdateModal
						error={updateError}
						confirmLoading={confirmUpdateLoading}
						onUpdate={this.handleUpdateModal}
						selectedRowValues={selectedRowValues}
						onCancel={this.handleCancelUpdate}
					/>
				)}
				<DeleteModal
					handleCancelDelete={this.handleCancelDelete}
					confirmLoading={confirmDeleteLoading}
					visible={modalVisible}
					handleOk={this.handleOk}
					error={deleteError}
				/>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						marginLeft: "100px",
						marginTop: "50px",
						flexDirection: "column",
						marginRight: "40px"
					}}
				>
					<div>
						<Button
							style={{ marginBottom: "10px" }}
							onClick={this.clearFilters}
						>
							Clear filters
						</Button>
						<Button
							disabled={selectedRows.length === 1 ? false : true}
							style={{ marginBottom: "10px", marginLeft: "10px" }}
							onClick={this.handleUpdate}
						>
							Update Teacher
						</Button>
						<Button
							disabled={selectedRows.length >= 1 ? false : true}
							style={{ marginBottom: "10px", marginLeft: "10px" }}
							onClick={this.handleDelete}
						>
							Delete Teacher
						</Button>
					</div>
					<Table
						columns={columns}
						rowSelection={rowSelection}
						onChange={this.handleChange}
						rowKey={record => record._id}
						loading={loading}
						style={{
							backgroundColor: "rgba(255,255,255,0.5)",
							cursor: "pointer"
						}}
						dataSource={data}
						pagination={{ pageSize: 10 }}
					/>
				</div>
			</div>
		);
	}
}

export default Teacher;
