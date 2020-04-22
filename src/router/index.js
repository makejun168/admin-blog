import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Admin from "../admin";
import Home from "../pages/Home";
import Detail from '../pages/Detail';
import Buttons from "../pages/UI/Buttons";
import LoadingContainer from "../pages/UI/Loading";
import ModalContainer from "../pages/UI/Modal";
import NoMatch from "../pages/NoMatch";
import Notice from "../pages/UI/Notification";

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
                    component={LoadingContainer}
                  />
                  <Route
                    exact={true}
                    path="/admin/ui/modal"
                    component={ModalContainer}
                  />
                  <Route
                    exact={true}
                    path="/admin/ui/notification"
                    component={Notice}
                  />
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            )}
          />
          <Route path="/order/detail" component={Detail} />
        </App>
      </Router>
    );
  }
}
