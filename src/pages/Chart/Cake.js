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

export default class Cake extends React.Component {
  componentWillMount() {
    echarts.registerTheme("Kobe", echartTheme);
  }

  getOptions = () => ({
    title: {
      text: "用户订单",
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/><b>:{c}({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: 20,
      bottom: 20,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    // xAxis: {
    //   data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    // },
    // yAxis: {
    //   type: "value",
    // },
    series: [
      {
        name: "订单量",
        type: "pie",
        data: [
          {
            value: 1000,
            name: "周一",
          },
          {
            value: 1500,
            name: "周二",
          },
          {
            value: 2000,
            name: "周三",
          },
          {
            value: 3000,
            name: "周四",
          },
          {
            value: 4000,
            name: "周五",
          },
          {
            value: 10000,
            name: "周六",
          },
          {
            value: 1000,
            name: "周日",
          },
        ],
      },
    ],
  });

  getOptions2 = () => ({
    title: {
      text: "用户订单",
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/><b>:{c}({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: 20,
      bottom: 20,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    // xAxis: {
    //   data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    // },
    // yAxis: {
    //   type: "value",
    // },
    series: [
      {
        name: "订单量",
        type: "pie",
        radius: ["50%", "60%"],
        // center: ['50%', '50%']
        data: [
          {
            value: 1000,
            name: "周一",
          },
          {
            value: 1500,
            name: "周二",
          },
          {
            value: 2000,
            name: "周三",
          },
          {
            value: 3000,
            name: "周四",
          },
          {
            value: 4000,
            name: "周五",
          },
          {
            value: 10000,
            name: "周六",
          },
          {
            value: 1000,
            name: "周日",
          },
        ],
      },
    ],
  });

  getOptions3 = () => ({
    title: {
      text: "用户订单",
      x: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/><b>:{c}({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: 20,
      bottom: 20,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    },
    // xAxis: {
    //   data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    // },
    // yAxis: {
    //   type: "value",
    // },
    series: [
      {
        name: "订单量",
        type: "pie",
        data: [
          {
            value: 1000,
            name: "周一",
          },
          {
            value: 1500,
            name: "周二",
          },
          {
            value: 2000,
            name: "周三",
          },
          {
            value: 3000,
            name: "周四",
          },
          {
            value: 4000,
            name: "周五",
          },
          {
            value: 5000,
            name: "周六",
          },
          {
            value: 1000,
            name: "周日",
          },
        ].sort((a, b) => a.value - b.value),
        roseType: "radius",
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
          return Math.random() * 200;
        },
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
        <Card className="card-wrap">
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
