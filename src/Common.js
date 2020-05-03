// 父组件
import React from "react";
// import logo from './logo.svg';
import { Row, Col } from "antd";
import Header from "./components/Header";
// import Footer from './components/Footer';

export default class Common extends React.Component {
	render() {
		return (
			<div style={{ width: "100%" }}>
				<Row className="container">
					<Col span="24" className="simple-page">
						<Header menuType="second" />
					</Col>
				</Row>
				<Row>
					<Col span="24">{this.props.children}</Col>
				</Row>
			</div>
		);
	}
}
