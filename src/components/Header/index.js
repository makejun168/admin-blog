import React from "react";
import { Row, Col } from "antd";
import './index.less';
import Util from '../../utils/until';
import Http from '../../common/Request';
// import Axios from "axios";
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      userName: "PoloMa",
      time: '',
      weather: '天气晴'
    };
  }

  getTime = () => {
    setInterval(() => {
      let time = Util.formateDate(new Date().getTime());
      this.setState({
        time
      })
    }, 1000)
  }

  getWeatherData() {
    // jsonp 需要后端配合使用
    Http.jsonp({
      url: 'http://api.map.baidu.com/weather/v1/?district_id=440100&data_type=all&ak=azXMfuFQMErXF6GjYEFnDnefakKjtis8'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount(){
    this.getTime();
    // this.getWeatherData();
  }

  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span="24">
            <span>welcome, {this.state.userName}</span>
            <a href="/#" >退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col className="breadcrumb-title" span="4">首页</Col>
          <Col span="20" className="weather">
            <span className="weather-detail">{this.state.weather}</span>
            <span className="date">{this.state.time}</span>
          </Col>
        </Row>
      </div>
    );
  }
}
