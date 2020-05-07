import React from "react";
import { Card } from "antd";
import echartTheme from "../../common/theme";

// 使用百度 echarts 图标库 渲染图表
// 按需导入
import echarts from "echarts/lib/echarts";
// 导入柱形图
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";

export default class List extends React.Component {
  componentWillMount() {
    echarts.registerTheme("Kobe", echartTheme);
  }

  getOptions = () => ({
    title: {
      text: "用户订单",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "订单量",
        type: "line",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  });

  getOptions2 = () => ({
    title: {
      text: "用户订单",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ['A', "B"]
    },
    xAxis: {
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "A",
        type: "line",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
      {
        name: "B",
        type: "line",
        data: [100, 520, 200, 134, 190, 30, 20],
      },
    ],
  });

  getOptions3 = () => ({
    title: {
      text: "用户订单",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        areaStyle: {},
        type: "line",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  });

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Card className="card-wrap" title="折线图①">
          <ReactEcharts
            style={{ height: "400px" }}
            option={this.getOptions()}
            theme="Kobe"
          />
        </Card>
        <Card className="card-wrap" title="折线图②">
          <ReactEcharts
            style={{ height: "400px" }}
            option={this.getOptions2()}
            theme="Kobe"
          />
        </Card>
        <Card title="折线图③">
        <ReactEcharts
            style={{ height: "400px" }}
            option={this.getOptions3()}
            theme="Kobe"
          />
        </Card>
      </div>
    );
  }
}
