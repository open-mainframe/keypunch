import React from "react";
import { Switch, Route } from "react-router";
import Editor from "./components/Editor";
import Explorer from "./components/Explorer";
import ConfigForm from "./components/ConfigForm";
import Results from "./components/Results";

function Main({ color, history, theme }) {
  return (
    <Switch>
      <Route path="/editor" component={Editor} />
      <Route path="/config" component={ConfigForm} />
      <Route path="/results" component={Results} />
      <Route path="/explorer" component={Explorer} />
    </Switch>
  );
}

export default Main;
