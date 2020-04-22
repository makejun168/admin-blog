import React from "react";
import { Card, Button, Dropdown, Menu, Radio } from "antd";
import {
  SearchOutlined,
  PoweroffOutlined,
  DownOutlined,
} from "@ant-design/icons";
import "./ui.less";

export default class Buttons extends React.Component {
  state = {
    loading: false,
    size: "large",
  };

  handleMenuClick = (e) => {
    console.log(e);
  };
  menu = () => (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">1st item</Menu.Item>
      <Menu.Item key="2">2nd item</Menu.Item>
      <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
  );

  enterLoading = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 8000);
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
    setTimeout(() => {
      this.setState({ iconLoading: false });
    }, 8000);
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  render() {
    return (
      <div className="buttons">
        <Card title="Button" className="card-wrap">
          <Button type="primary">Click</Button>
          <Button>Click</Button>
          <Button type="dashed">Click</Button>
          <Button type="danger">Click</Button>
          <Button disabled>Click</Button>
        </Card>
        <Card title="Button Icon" className="card-wrap">
          <Button icon={<SearchOutlined />}>Click</Button>
          <Button icon={<SearchOutlined />} shape="circle"></Button>
          <Button type="dashed" icon={<PoweroffOutlined />}>
            Click
          </Button>
        </Card>

        <Card title="Button Icon" className="card-wrap">
          <Button icon={<SearchOutlined />}>Click</Button>
          <Button icon={<SearchOutlined />} shape="circle"></Button>
          <Button type="dashed" icon={<PoweroffOutlined />}>
            Click
          </Button>
        </Card>

        <Card title="Loading" className="card-wrap">
          <Button
            type="primary"
            loading={this.state.loading}
            onClick={this.enterLoading}
          >
            Click me!
          </Button>
          <Button
            type="danger"
            icon={<PoweroffOutlined />}
            loading={this.state.iconLoading}
            onClick={this.enterIconLoading}
          >
            Click me!
          </Button>
        </Card>

        <Card title="dropdown" className="card-wrap">
          <Dropdown overlay={this.menu}>
            <Button>
              Actions <DownOutlined />
            </Button>
          </Dropdown>
        </Card>

        <Card title="ghost" style={{ background: "gray" }} className="card-wrap">
          <Button type="primary" ghost>
            Click
          </Button>
          <Button ghost>Default</Button>
          <Button type="dashed" ghost>
            link
          </Button>
          <Button type="link" ghost>
            link
          </Button>
        </Card>

        <Card title="group" className="card-wrap">
          <Radio.Group value={this.state.size} onChange={this.handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
        </Card>
        <Card title="block" className="card-wrap">
          <Button type="primary" block>
            Primary
          </Button>
        </Card>
      </div>
    );
  }
}
