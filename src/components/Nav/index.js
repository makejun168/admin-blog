import React from "react";

import menuList from "../../resource/menuConfig";
import "./index.css";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

export default class Nav extends React.Component {
  componentWillMount() {
    const tree = this.renderMenu(menuList);
    this.setState({
      menuTree: tree
    })
  }
  renderMenu = (data) => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
    })
  }
  render() {
    return (
      <Menu className="navContainer" theme="dark">
        {this.state.menuTree}
      </Menu>
    );
  }
}
