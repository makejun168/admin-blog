import React from "react";
import { Card } from "antd";
import echartTheme from "../../common/theme";

// 使用百度 echarts 图标库 渲染图表
// 按需导入
import echarts from "echarts/lib/echarts";
// 导入柱形图
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";

export default class Chart extends React.Component {
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
        type: "bar",
        data: [10, 52, 200, 334, 390, 330, 220],
      },
    ],
  });

  getOptions2 = () => ({
    title: {
      text: "分配比例",
    },
    legend: {
      data: ["A", "B", "C"],
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
        name: "A",
        type: "bar",
        data: [1000, 2000, 3000, 6000, 7000, 10000, 12000],
      },
      {
        name: "B",
        type: "bar",
        data: [1500, 2500, 3500, 5500, 7500, 10500, 10000],
      },
      {
        name: "C",
        type: "bar",
        data: [3000, 1500, 4000, 4500, 7500, 11500, 9000],
      },
    ],
  });

  render() {
    return (
      <div style={{ width: "100%" }}>
        <Card className="card-wrap">
          <ReactEcharts
            style={{ height: "400px" }}
            option={this.getOptions()}
            theme="Kobe"
          />
        </Card>
        <Card className="card-wrap">
          <ReactEcharts
            style={{ height: "400px" }}
            option={this.getOptions2()}
            theme="Kobe"
          />
        </Card>
      </div>
    );
  }
}
