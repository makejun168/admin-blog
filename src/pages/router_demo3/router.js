import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Info from "./Info";
import Topic from "../router_demo/Topic";
import About from "../router_demo/About";
import Main from "./Main";
import Home from "./Home";
import NoMatch from './NoMatch'

export default class MyRouter extends React.Component {
  render() {
    return (
      <Router>
        <Home>
          <Switch>
            <Route
              path="/main"
              render={() => (
                <Main>
                  <Route path="/main/:value" component={Info}></Route>
                </Main>
              )}
            ></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/topic" component={Topic}></Route>
            <Route component={NoMatch}></Route>
          </Switch>
        </Home>
      </Router>
    );
  }
}
