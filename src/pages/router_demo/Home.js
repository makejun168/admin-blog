import React from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import About from "./About";
import Topic from "./Topic";
import Main from "./Main";

export default class MyHome extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">about</Link>
            </li>
            <li>
              <Link to="/topic">topic</Link>
            </li>
          </ul>
          <br />
          <Switch>
            <Route exact={true} path="/" component={Main}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topic" component={Topic}></Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
