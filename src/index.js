import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/index.less';
// import Admin from './admin';
// import Home from './pages/router_demo/Home'
// import MyRouter from './pages/router_demo2/router'
import MyRouter from './pages/router_demo3/router'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <MyRouter />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
