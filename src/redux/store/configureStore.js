// 引入 createStore
import { createStore } from "redux";
import reducer from "../reducer";
// import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (preloadedState) => {
  const store = createStore(reducer, preloadedState);
  return store;
};

const store = configureStore();

export default store;
