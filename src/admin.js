import React from 'react';
// import logo from './logo.svg';
import {Row, Col} from 'antd';
import Header from './components/Header'
import Footer from './components/Footer';
import Nav from './components/Nav';

export default class Admin extends React.Component {
  handleClick = () => {
    console.log(123)
  }

  // 栅格系统对应是 24列 一行 有 24列表
  render() {
    return (
      <Row className="container">
        <Col span="4" className="nav-left">
          <Nav/>
        </Col>
        <Col span="20" className="main">
          <Header/>
          <Row className="content">

          </Row>
          <Footer/>
        </Col>
      </Row>
    )
  }
}
