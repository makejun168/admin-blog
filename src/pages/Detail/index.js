import React, { useState, useEffect } from "react";
import { Form, Input, Modal, Button, Card } from "antd";
import { getOrderList, getOrderDetail } from "../../api";

class Detail extends React.Component {
	state = {
		orderInfo: {},
	};

	getOrderInfo = (orderId) => {
		getOrderDetail().then((res) => {
			console.log(res);
			this.setState({
				orderInfo: res.result,
			});
		});
	};

	componentDidMount() {
		let orderId = this.props.match.params.orderId;
		console.log(orderId);
		this.getOrderInfo(orderId);
	}

	render() {
		const { orderInfo } = this.state;
		return (
			<div>
				<div id="orderDetailMap"></div>
				<Card title="基础信息">
					<Form layout="horizontal" style={{margin: '10px'}}>
						<Form.Item label="车辆编号">{orderInfo.bike_sn}</Form.Item>
						<Form.Item label="用车模式">
							{orderInfo.mode === 1 ? "服务区" : "停车点"}
						</Form.Item>
						<Form.Item label="订单编号">{orderInfo.order_sn}</Form.Item>
						<Form.Item label="用户姓名">{orderInfo.user_name}</Form.Item>
						<Form.Item label="手机号码">{orderInfo.mobile}</Form.Item>
						{/* <Form.Item label="手机号码">
								{orderInfo.mobile}
							</Form.Item> */}
					</Form>
				</Card>
				<Card title="行程轨迹">
					<Form layout="horizontal">
						<Form.Item label="行程起点">{orderInfo.start_location}</Form.Item>
						<Form.Item label="行程终点">{orderInfo.end_location}</Form.Item>
						<Form.Item label="行程里程">
							{orderInfo.distance / 1000} 公里
						</Form.Item>
					</Form>
				</Card>
			</div>
		);
	}
}

export default Detail;
