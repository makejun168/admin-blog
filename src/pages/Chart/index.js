import React from "react";
import { Card } from "antd";
import echartTheme from '../../common/theme';

// 使用百度 echarts 图标库 渲染图表
// 按需导入
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Chart extends React.Component {

  componentDidMount() {
    echarts.registerTheme('My', echartTheme);
  }

  render() {
    return <div style={{width: '100%'}}>
      <Card className="card-wrap">Chart</Card>
    </div>;
  }
}
