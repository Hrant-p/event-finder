import { composeWithDevTools } from "redux-devtools-extension";
import middleware from "./middlewares/middleware";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import { Map } from "immutable";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  Map(),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(middleware);

export default store;

