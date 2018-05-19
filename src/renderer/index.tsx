import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./app.global.css";
import configureStore from "./store/configureStore";
import generateMenuTemplate from "./utils/menu";
const { Menu } = require("electron").remote;

// Exporting Store to have access in nativeDialogs
export const store = configureStore();

// Generate and Render the Electron Native Menus
const template = generateMenuTemplate();
// @ts-ignore
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
