import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createHashHistory } from "history";
import { HashRouter as Router } from "react-router-dom";
import configureStore from "./store/configureStore";
import generateMenuTemplate from "./utils/menu";
import App from "./App";
import "./app.global.css";
const { app, Menu } = require("electron").remote;

// Hack: Exporting Store to have access in nativeDialogs
export const store = configureStore();

// Generate and Render the Electron Native Menus
const template = generateMenuTemplate();
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
