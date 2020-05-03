import React from "react";
import {
	HashRouter as Router,
	Route,
	Switch,
	// Redirect,
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
import Chart from "../pages/Chart";
import Common from "../Common";

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
									<Route
										exact={true}
										path="/admin/form/login"
										component={FormLogin}
									/>
									<Route
										exact={true}
										path="/admin/form/detail"
										component={FormLoginDetail}
									/>
									<Route
										exact={true}
										path="/admin/form/loginInline"
										component={FormLoginInLine}
									/>
									<Route
										exact={true}
										path="/admin/form/register"
										component={FormRegister}
									/>
									<Route
										exact={true}
										path="/admin/table/basic"
										component={BasicTable}
									/>
									<Route
										exact={true}
										path="/admin/table/hight"
										component={HightTable}
									/>
									<Route
										exact={true}
										path="/admin/editor"
										component={Editors}
									/>
									<Route exact={true} path="/admin/chart" component={Chart} />
									<Route exact={true} path="/admin/city" component={City} />
									<Route exact={true} path="/admin/order" component={Order} />
									<Route
										exact={true}
										path="/admin/employment"
										component={Employment}
									/>
									<Route
										exact={true}
										path="/admin/Bicycle"
										component={Bicycle}
									/>
									<Route
										exact={true}
										path="/admin/permissions"
										component={Permission}
									/>
									<Route component={NoMatch} />
								</Switch>
							</Admin>
						)}
					/>
					<Route
						path="/common"
						render={() => (
							<Common>
								<Route path="/common/order/detail/:orderId" component={Detail} />
							</Common>
						)}
					/>
					{/* <Redirect to={"/admin/home"} /> */}
				</App>
			</Router>
		);
	}
}
