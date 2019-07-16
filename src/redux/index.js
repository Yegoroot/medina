import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import history from "../common/history";
import createSagaMiddleware from "redux-saga";

import rootSaga from "./saga";

// REDUX TOOLS
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const sagaMiddleware = createSagaMiddleware();
// const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history), logger))
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, routerMiddleware(history), logger)
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
