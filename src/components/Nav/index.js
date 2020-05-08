import React from "react";
import { NavLink } from "react-router-dom";
import menuList from "../../resource/menuConfig";
import "./index.css";
import { Menu } from "antd";
// import { AppstoreOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTree: [],
    };
  }
  componentDidMount() {
    const tree = this.renderMenu(menuList);
    this.setState({
      menuTree: tree,
    });
  }
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={`/admin${item.key}`}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };
  render() {
    return (
      <Menu className="navContainer" theme="dark">
        {this.state.menuTree}
      </Menu>
    );
  }
}
