import React from "react";
import { Table, Button, Input, Icon } from "antd";
import Highlighter from "react-highlight-words";
import DeleteModal from "./Delete";
import { deleteStudents, updateStudent, getStudents } from "../../api/student";
import UpdateModal from "./Update";

class Student extends React.Component {
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
		getStudents().then(res => {
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
		deleteStudents(this.state.selectedRows)
			.then(() => {
				this.setState(
					{
						deleteError: "",
						confirmDeleteLoading: false,
						modalVisible: false
					},
					() => {
						getStudents().then(res => {
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
		values.admission_date = values.admission_date._d.toString().substr(0, 15);
		this.setState(
			{
				confirmUpdateLoading: true,
				loading: true
			},
			() => {
				updateStudent(values)
					.then(() => {
						this.setState(
							{
								updateError: "",
								confirmUpdateLoading: false,
								updateModalVisible: false
							},
							() => {
								getStudents().then(res => {
									this.forceUpdate();
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
				title: "Gr Num",
				dataIndex: "gr_num",
				key: "gr_num",
				...this.getColumnSearchProps("gr_num")
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
				title: "Class",
				dataIndex: "class",
				key: "class",
				filters: [
					{ text: "Nursery", value: "Nursery" },
					{ text: "Prep", value: "Prep" },
					{ text: "One", value: "One" },
					{ text: "Two", value: "Two" },
					{ text: "Three", value: "Three" },
					{ text: "Four", value: "Four" },
					{ text: "Five", value: "Five" },
					{ text: "Six", value: "Six" },
					{ text: "Seven", value: "Seven" },
					{ text: "Eight", value: "Eight" },
					{ text: "Nine", value: "Nine" },
					{ text: "Matric", value: "Matric" }
				],
				filteredValue: filteredInfo.class || null,
				onFilter: (value, record) => record.class.includes(value)
			},
			{
				title: "Section",
				dataIndex: "section",
				key: "section",
				filters: [
					{ text: "A", value: "A" },
					{ text: "B", value: "B" },
					{ text: "C", value: "C" }
				],
				filteredValue: filteredInfo.section || null,
				onFilter: (value, record) => record.section.includes(value)
			},
			{
				title: "Address",
				dataIndex: "address",
				width: "170px"
			},
			{
				title: "Admission Date",
				dataIndex: "admission_date"
			}
		];
		// rowSelection object indicates the need for row selection
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRows: selectedRowKeys,
					selectedRowValues: selectedRows[0]
				});
			}
		};

		return (
			<div>
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
							Update Selected
						</Button>
						<Button
							disabled={selectedRows.length >= 1 ? false : true}
							style={{ marginBottom: "10px", marginLeft: "10px" }}
							onClick={this.handleDelete}
						>
							Delete Selected
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

export default Student;
