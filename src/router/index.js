import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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
import FormLogin from "../pages/Form/FormLogin";
import FormRegister from "../pages/Form/FormRegister";
import FormLoginDetail from "../pages/Form/FormLoginDetail";
import FormLoginInLine from "../pages/Form/FormLoginInline";
import BasicTable from "../pages/Table/BasicTable";
import HightTable from "../pages/Table/HightTable";
import City from "../pages/City";
import Order from "../pages/Order";
import Permission from "../pages/Permission";
import Bicycle from "../pages/Bicycle";
import Employment from "../pages/Employment";
import Editors from "../pages/Editors";
import Common from "../Common";
import Bar from "../pages/Chart/Bar";
import Cake from "../pages/Chart/Cake";
import List from "../pages/Chart/List";

export default class IRouter extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/common"
              render={() => (
                <Common>
                  <Route
                    exact
                    path="/common/order/detail/:orderId"
                    component={Detail}
                  />
                </Common>
              )}
            />
            <Route
              path="/"
              render={() => (
                <Admin>
                  <Switch>
                    <Route exact={true} path="/home" component={Home} />
                    <Route
                      exact={true}
                      path="/ui/buttons"
                      component={Buttons}
                    />
                    <Route
                      exact={true}
                      path="/ui/loadings"
                      component={LoadingContainer}
                    />
                    <Route
                      exact={true}
                      path="/ui/modals"
                      component={ModalContainer}
                    />
                    <Route
                      exact={true}
                      path="/ui/notification"
                      component={Notice}
                    />
                    <Route
                      exact={true}
                      path="/ui/messages"
                      component={Message}
                    />
                    <Route exact={true} path="/ui/tabs" component={Tab}/>
                    <Route
                      exact={true}
                      path="/ui/gallery"
                      component={Gallery}
                    />
                    <Route
                      exact={true}
                      path="/ui/carousel"
                      component={Carousels}
                    />
                    <Route
                      exact={true}
                      path="/form/login"
                      component={FormLogin}
                    />
                    <Route
                      exact={true}
                      path="/form/detail"
                      component={FormLoginDetail}
                    />
                    <Route
                      exact={true}
                      path="/form/loginInline"
                      component={FormLoginInLine}
                    />
                    <Route
                      exact={true}
                      path="/form/register"
                      component={FormRegister}
                    />
                    <Route
                      exact={true}
                      path="/table/basic"
                      component={BasicTable}
                    />
                    <Route
                      exact={true}
                      path="/table/hight"
                      component={HightTable}
                    />
                    <Route exact={true} path="/editor" component={Editors} />
                    <Route exact={true} path="/chart/bar" component={Bar} />
                    <Route exact={true} path="/chart/cake" component={Cake} />
                    <Route exact={true} path="/chart/list" component={List} />
                    <Route exact={true} path="/city" component={City} />
                    <Route exact={true} path="/order" component={Order} />
                    <Route
                      exact={true}
                      path="/employment"
                      component={Employment}
                    />
                    <Route exact={true} path="/Bicycle" component={Bicycle} />
                    <Route
                      exact={true}
                      path="/permissions"
                      component={Permission}
                    />
                    <Route component={NoMatch} />
                  </Switch>
                </Admin>
              )}
            />
          </Switch>
          <Redirect to="/home" />
        </App>
      </Router>
    );
  }
}
