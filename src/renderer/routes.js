import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/App";
import Editor from "./components/Editor";
import Explorer from "./components/Explorer";
import ConfigForm from "./components/ConfigForm";
import Results from "./components/Results";
// import JES from "./utils/jesFtp";

export default (
  <Route path="/" component={App}>
    <Route path="/editor" component={Editor} />
    <Route path="/config" component={ConfigForm} />
    <Route path="/results" component={Results} />
    <Route path="/explorer" component={Explorer} />
    <IndexRoute component={Editor} />
  </Route>
);

// Commented out routes with old onEnter logic
{
  /* <Route path="/results" component={Results} onEnter={JES.pollJobStatus} />
    <Route path="/explorer" component={Explorer} onEnter={JES.listDatasets} /> */
}
