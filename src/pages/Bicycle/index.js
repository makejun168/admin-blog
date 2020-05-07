import React from "react";
import { Card } from "antd";
import BaseForm from "../../components/BaseForm";
import { getBikeList } from "../../api";

export default class Bicycle extends React.Component {
  state = {
    total_count: 0,
  };
  formList = [
    {
      type: "SELECT",
      label: "城市",
      name: "city",
      placeholder: "全部",
      list: [
        { id: 0, value: "北京" },
        { id: 1, value: "深圳" },
        { id: 2, value: "广州" },
        { id: 3, value: "上海" },
        { id: 4, value: "杭州" },
      ],
    },
    {
      type: "时间查询",
    },
    {
      type: "SELECT",
      label: "订单状态",
      name: "status",
      placeholder: "全部",
      list: [
        { id: 0, value: "全部" },
        { id: 1, value: "行程中" },
        { id: 2, value: "行程结束" },
      ],
    },
  ];

  // 渲染地图数据
  renderMap = (res) => {
    let list = res.route_list;
    this.map = new window.BMap.Map("container");
    let gps1 = list[0].split(",");
    let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
    let bikeMarkerStart = new window.BMap.Marker(startPoint);
    this.map.addOverlay(bikeMarkerStart);
    let gps2 = list[list.length - 1].split(",");
    let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
    let bikeMarkerEnd = new window.BMap.Marker(endPoint);
    this.map.addOverlay(bikeMarkerEnd);
    this.map.centerAndZoom(endPoint, 11);

    // 绘制车辆行驶路线图
    let routeList = [];
    list.forEach((item) => {
      let p = item.split(",");
      routeList.push(new window.BMap.Point(p[0], p[1]));
    });
    let polyLine = new window.BMap.Polyline(routeList, {
      strokeColor: "#ef4136",
      strokeWeight: 2,
      strokeOpacity: 1,
    });
    this.map.addOverlay(polyLine);

    // 绘制服务区
    let servicePointList = [];
    let serviceList = res.service_list;
    serviceList.forEach((item) => {
      servicePointList.push(new window.BMap.Point(item.lon, item.lat));
    });
    let polyLineArea = new window.BMap.Polyline(servicePointList, {
      strokeColor: "#ef4136",
      strokeWeight: 2,
      strokeOpacity: 1,
    });
    this.map.addOverlay(polyLineArea);

    // 绘制车辆分布图标
    let bike_list = res.bike_list;
    let bike_icon = new window.BMap.Icon(
      "/bike.png",
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42),
      }
    );
    bike_list.forEach((item) => {
      let p = item.split(",");
      let point = new window.BMap.Point(p[0], p[1]);
      let bikeMarker = new window.BMap.Marker(point, { icon: bike_icon });
      this.map.addOverlay(bikeMarker);
    });
  };

  componentDidMount() {
    this.request();
  }

  handleSubmit = (data) => {
    console.log(data);
    this.request();
  };

  request = () => {
    getBikeList().then((res) => {
      console.log(res);
      // eslint-disable-next-line
      if (res.code == 0) {
        this.setState({
          total_count: res.result.total_count,
        });
        this.renderMap(res.result);
      }
    });
  };

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Card className="card-wrap">
          <BaseForm
            layout="inline"
            formList={this.formList}
            handleSubmit={this.handleSubmit}
          />
        </Card>
        <Card>
          <div style={{ textAlign: "left", marginBottom: "5px" }}>
            共有{this.state.total_count}辆自行车
          </div>
          <div id="container" style={{ height: "500px" }}></div>
        </Card>
      </div>
    );
  }
}
