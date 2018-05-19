import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { hashHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

const router = routerMiddleware(hashHistory);

const middlewares = [thunk, router];
if (process.env.NODE_ENV !== "production") {
  const logger = createLogger({
    level: "info",
    collapsed: true
  });
  middlewares.push(logger);
}

const enhancer = applyMiddleware(thunk, router);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
