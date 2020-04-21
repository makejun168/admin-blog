import React from "react";
import { Link } from "react-router-dom";
export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/main">router2</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/topic">topic</Link>
          </li>
        </ul>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
