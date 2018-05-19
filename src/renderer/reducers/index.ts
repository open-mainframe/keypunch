import { combineReducers } from "redux";
import config from "./config";
import datasets from "./datasets";
import editor from "./editor";
import explorer from "./explorer";
import jobs from "./jobs";
import results from "./results";
import uiStyle from "./uiStyle";

const rootReducer = combineReducers({
  config,
  datasets,
  editor,
  explorer,
  jobs,
  results,
  uiStyle
});

export default rootReducer;
