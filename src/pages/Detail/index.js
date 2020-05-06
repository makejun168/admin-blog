import React from "react";
import { Form, Card } from "antd";
import { getOrderDetail } from "../../api";

class Detail extends React.Component {
	state = {
		orderInfo: {},
	};

	getOrderInfo = (orderId) => {
		getOrderDetail().then((res) => {
			this.renderMap(res.result);
			this.setState({
				orderInfo: res.result,
			});
		});
	};

	componentDidMount() {
		let orderId = this.props.match.params.orderId;
		console.log("props.match.params", orderId);
		this.getOrderInfo(orderId);
	}

	// 添加地图控件
	addMapControl = () => {
		this.map.addControl(
			new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })
		);
		this.map.addControl(
			new window.BMap.NavigationControl({
				anchor: window.BMAP_ANCHOR_TOP_RIGHT,
			})
		);
	};

	renderMap = (result) => {
		this.map = new window.BMap.Map("orderDetailMap", { enableMapClick: false });
    this.addMapControl();
    console.log(result.position_list);
    this.drawBikeRoute(result.position_list);
    this.drawServiceArea(result.area);
	};

	// 绘制用户的行驶路线图
	drawBikeRoute = (positionList) => {
		let startPoint = "";
		let endPoint = "";
		if (positionList.length > 0) {
      let first = positionList[0];
      let last = positionList[positionList.length - 1];
      startPoint = new window.BMap.Point(first.lon, first.lat);
      endPoint = new window.BMap.Point(last.lon, last.lat);
			// let startIcon = new window.BMap.Icon("start.png", new window.BMap.Size(36, 42), {
			// 	imageSize: new window.BMap.Size(36, 42),
			// 	anchor: new window.BMap.Size(36, 42),
      // });
      // let endIcon = new window.BMap.Icon("end.png", new window.BMap.Size(36, 42), {
			// 	imageSize: new window.BMap.Size(36, 42),
			// 	anchor: new window.BMap.Size(36, 42),
      // });
      // 依赖于 marker
      // {icon: startIcon}
      // {icon: endIcon}
      let startMarker = new window.BMap.Marker(startPoint);
      let endMarker = new window.BMap.Marker(endPoint);
      this.map.addOverlay(startMarker);
      this.map.addOverlay(endMarker);

      // 连接路线图
      let trackPoint = [];
      positionList.forEach(point => {
        trackPoint.push(new window.BMap.Point(point.lon, point.lat));
      });
      let line = new window.BMap.Polyline(trackPoint, {
        strokeColor: '#1869AD',
        strokeWeight: 3,
        strokeOpacity: 1
      });
      this.map.addOverlay(line);
      this.map.centerAndZoom(endPoint, 11);
		}
  };
  
  // 绘制服务区
  // 绘制多边形
  drawServiceArea = (positionList) => {
    // 连接路线图
    let trackPoint = [];
    positionList.forEach(point => {
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));
    });

    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: '#1869AD',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: .4
    });
    
    this.map.addOverlay(polygon);
  }

	render() {
		const { orderInfo } = this.state;
		return (
			<div>
				<div id="orderDetailMap" className="orderMap"></div>
				<Card title="基础信息" style={{ marginBottom: "10px" }}>
					<Form layout="horizontal">
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
