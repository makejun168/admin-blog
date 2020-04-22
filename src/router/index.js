import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Admin from "../admin";
import Home from "../pages/Home";
import Buttons from "../pages/UI/Buttons";
import Loading from "../pages/UI/Loading";
import Modal from "../pages/UI/Modal";
import NoMatch from "../pages/NoMatch";

export default class IRouter extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Route path="/login" component={Login} />
          <Route
            path="/admin"
            render={() => (
              <Admin>
                <Switch>
                  <Route
                    exact={true}
                    path="/admin/home"
                    component={Home}
                  />
                  <Route
                    exact={true}
                    path="/admin/ui/buttons"
                    component={Buttons}
                  />
                  <Route
                    exact={true}
                    path="/admin/ui/loading"
                    component={Loading}
                  />
                  <Route
                    exact={true}
                    path="/admin/ui/modal"
                    component={Modal}
                  />
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            )}
          />
          <Route path="/order/detail" component={Login} />
        </App>
      </Router>
    );
  }
}
