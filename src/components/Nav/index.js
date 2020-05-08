import React from "react";
import { NavLink } from "react-router-dom";
import menuList from "../../resource/menuConfig";
import "./index.css";
import { Menu } from "antd";
import { connect } from "react-redux";
import { switchMenu } from "../../redux/action";
// import { AppstoreOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTree: [],
      currentKeys: "",
    };
  }
  componentDidMount() {
    const tree = this.renderMenu(menuList)
    let currentKey = window.location.hash.replace(/#|\?.*$/g, "");
    this.setState({
      currentKey,
      menuTree: tree,
    });
  }

  handleClick = (item) => {
    console.log(item);
    const { dispatch } = this.props;
    const {title} = item.item.props;
    dispatch(switchMenu(title));
    this.setState({
      currentKey: item.key,
    });
  };

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
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };
  render() {
    return (
      <Menu
        selectedKeys={this.state.currentKey}
        onClick={this.handleClick}
        className="navContainer"
        theme="dark"
      >
        {this.state.menuTree}
      </Menu>
    );
  }
}

export default connect()(Nav);
