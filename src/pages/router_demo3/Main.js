import React from "react";
import { Link } from "react-router-dom";

export default class Main extends React.Component {
  render() {
    return (
      <div>
        Main
        <br/>
        <Link to='/main/test'>嵌套路由</Link>
        <br/>
        <Link to='/main/456'>456</Link>
        {this.props.children}
      </div>
    );
  }
}
