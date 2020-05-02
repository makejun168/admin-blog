import React from "react";
import { Card, Form, Select, Button, Table, Modal, message } from "antd";

const { Option } = Select;

export default class Order extends React.Component {
	render() {
		return (
			<div style={{ width: "100%" }}>
				<Card className="card-wrap">
					<FilterForm></FilterForm>
				</Card>
				<Card>
					<Button>订单详情</Button>
					<Button>结束订单</Button>
				</Card>
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
				<Form.Item label="用车区域" name="mode">
					<Select placeholder="全部" style={{ width: 120 }}>
						<Option value="">全部</Option>
						<Option value="2">指定停车区域模式</Option>
						<Option value="3">禁停区模式</Option>
					</Select>
				</Form.Item>
				<Form.Item label="营运模式" name="op_mode">
					<Select placeholder="全部" style={{ width: 120 }}>
						<Option value="1">全部</Option>
						<Option value="2">自营</Option>
						<Option value="3">加盟</Option>
					</Select>
				</Form.Item>
				<Form.Item label="加盟商授权状态" name="status">
					<Select placeholder="全部" style={{ width: 120 }}>
						<Option value="1">全部</Option>
						<Option value="2">已授权</Option>
						<Option value="3">未授权</Option>
					</Select>
				</Form.Item>
				<Form.Item>
					{/* htmlType="submit"  */}
					<Button type="primary" onClick={this.getFormData}>
						查询
					</Button>
					<Button type="warning">重置</Button>
				</Form.Item>
			</Form>
		);
	}
}
