import React from "react";
import {
	DatePicker,
	Card,
	Form,
	Select,
	Button,
	Table,
	Modal,
	message,
} from "antd";
import { getOrderList, getBikeInfo, finishOrder } from "../../api";
import util from "../../utils/util";

const { Option } = Select;

export default class Order extends React.Component {
	state = {
		list: [],
		visible: false,
		orderInfo: {},
		selectedRowKeys: null,
		selectedRow: [],
	};

	params = {
		page: 1,
	};

	componentDidMount() {
		this.request();
	}

	// 打开结束订单模态框
	handleConfirm = () => {
		if (!this.state.selectedRow.length) {
			Modal.info({
				title: '提示',
				content: '请选择一条订单进行结束'
			})
			return;
			return;
		}
		const {id} = this.state.selectedRow[0];
		getBikeInfo({ orderId: id }).then((res) => {
			console.log(res);
			this.setState({
				orderInfo: res.result,
				visible: true,
			});
		});
	};

	// 订单结束确认
	handleFinishOrder = () => {
		const {id} = this.state.selectedRow[0];
		finishOrder({ orderId: id }).then((res) => {
			console.log(res);
			message.success("订单结束成功");
			this.setState({
				visible: false,
				selectedRow: null,
				selectedRowKeys: []
			});
			this.request();
		});
	};

	request = () => {
		getOrderList({ page: this.params.page }).then((res) => {
			// console.log(res);
			const { result } = res;
			if (result) {
				this.setState({
					list: result.item_list,
					pagination: util.pagination(res, (current) => {
						this.params.page = current;
						this.request();
					}),
				});
			}
		});
	};

	render() {
		const rowSelection = {
			// 'radio'
			type: "radio",
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowKeys: selectedRowKeys,
					selectedRow: selectedRows,
				}, () => {
					console.log(this.state.selectedRow);
					console.log(this.state.selectedRowKeys);
				});
			},
		};
		const columns = [
			{
				title: "订单编号",
				dataIndex: "order_sn",
			},
			{
				title: "车辆编号",
				dataIndex: "bike_cn",
			},
			{
				title: "用户名",
				dataIndex: "user_name",
			},
			{
				title: "手机号",
				dataIndex: "order_sn",
			},
			{
				title: "里程",
				dataIndex: "distance",
				render: (distance) => {
					return distance / 1000 + 'km'
				}
			},
			{
				title: "行驶时长",
				dataIndex: "total_time",
				render: (total_time) => {
					return distance / 1000 + 'km'
				}
			},
			{
				title: "状态",
				dataIndex: "status",
			},
			{
				title: "开始时间",
				dataIndex: "start_time",
			},
			{
				title: "结束时间",
				dataIndex: "end_time",
			},
			{
				title: "订单金额",
				dataIndex: "total_fee",
			},
			{
				title: "实付金额",
				dataIndex: "user_pay",
			},
		];
		return (
			<div style={{ width: "100%" }}>
				<Card className="card-wrap">
					<FilterForm></FilterForm>
				</Card>
				<Card>
					<Button>订单详情</Button>
					<Button type="danger" onClick={this.handleConfirm}>
						结束订单
					</Button>
				</Card>
				<Card>
					<Table
						rowSelection={rowSelection}
						rowKey={(record) => record.id}
						dataSource={this.state.list}
						columns={columns}
						pagination={this.state.pagination}
					></Table>
				</Card>
				<Modal
					onOk={this.handleFinishOrder}
					onCancel={() => {
						this.setState({
							visible: false,
						});
					}}
					title="结束订单"
					visible={this.state.visible}
				>
					<Form layout="horizontal">
						<Form.Item label="车辆编号">
							{this.state.orderInfo.bike_sn}
						</Form.Item>
						<Form.Item label="剩余电量">
							{this.state.orderInfo.battery + "%"}
						</Form.Item>
						<Form.Item label="行程开始时间">
							{this.state.orderInfo.start_time}
						</Form.Item>
						<Form.Item label="当前位置">
							{this.state.orderInfo.location}
						</Form.Item>
					</Form>
				</Modal>
			</div>
		);
	}
}

class FilterForm extends React.Component {
	formRef = React.createRef();

	onGenderChange = (value) => {
		this.formRef.current.setFieldsValue({
			// note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
		});
	};

	onFinish = (values) => {
		console.log(values);
	};

	getFormData = () => {
		console.log(this.formRef.current.getFieldValue());
	};

	onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	onFinish = (data) => {
		console.log(data);
	};

	render() {
		// const {}
		return (
			<Form
				layout="inline"
				name="search"
				ref={this.formRef}
				onFinish={this.onFinish}
			>
				<Form.Item label="城市" name="city_id">
					<Select placeholder="Select a option" style={{ width: 80 }}>
						<Option value="1">北京</Option>
						<Option value="2">深圳</Option>
						<Option value="3">上海</Option>
					</Select>
				</Form.Item>
				<Form.Item label="开始时间" name="start_time">
					<DatePicker
						showTime
						format="YYYY-MM-DD HH:mm:ss"
						onChange={this.onChange}
					/>
				</Form.Item>
				<Form.Item label="结束时间" name="end_time">
					<DatePicker
						showTime
						format="YYYY-MM-DD HH:mm:ss"
						onChange={this.onChange}
					/>
				</Form.Item>
				<Form.Item label="订单状态" name="status">
					<Select placeholder="全部" style={{ width: 120 }}>
						<Option value="1">全部</Option>
						<Option value="2">进行中</Option>
						<Option value="3">进行中（临时锁车）</Option>
						<Option value="4">关闭</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					{/* htmlType="submit"  */}
					<Button type="primary" htmlType="submit">
						查询
					</Button>
					<Button type="warning">重置</Button>
				</Form.Item>
			</Form>
		);
	}
}
