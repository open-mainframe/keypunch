import React from "react";
import { Route, Switch } from "react-router";
import ConfigForm from "./components/ConfigForm";
import Editor from "./components/Editor";
import Explorer from "./components/Explorer";
import Results from "./components/Results";

function Main() {
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
