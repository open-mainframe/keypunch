import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

const middlewares = [thunk];
if (process.env.NODE_ENV !== "production") {
  const logger = createLogger({
    level: "info",
    collapsed: true
  });
  middlewares.push(logger);
}

const enhancer = applyMiddleware(thunk);

export default function configureStore(initialState?: any) {
  return createStore(rootReducer, initialState, enhancer);
}
