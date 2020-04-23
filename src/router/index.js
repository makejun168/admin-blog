import React from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Admin from "../admin";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Buttons from "../pages/UI/Buttons";
import LoadingContainer from "../pages/UI/Loading";
import ModalContainer from "../pages/UI/Modal";
import NoMatch from "../pages/NoMatch";
import Notice from "../pages/UI/Notification";
import Message from "../pages/UI/Message";
import Tab from "../pages/UI/Tab";
import Gallery from "../pages/UI/Gallery";
import Carousels from "../pages/UI/Carousel";

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
                  <Route exact={true} path="/admin/home" component={Home} />
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
                  <Route
                    exact={true}
                    path="/admin/ui/message"
                    component={Message}
                  />
                  <Route exact={true} path="/admin/ui/tab" component={Tab} />
                  <Route
                    exact={true}
                    path="/admin/ui/gallery"
                    component={Gallery}
                  />
                  <Route
                    exact={true}
                    path="/admin/ui/carousel"
                    component={Carousels}
                  />
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            )}
          />
          <Route path="/order/detail" component={Detail}/>
          <Redirect to={'/admin'}/>
        </App>
      </Router>
    );
  }
}
