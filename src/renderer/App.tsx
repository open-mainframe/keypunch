import React, { SFC } from "react";
import { View, Window } from "react-desktop/windows";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import StatusBar from "./components/StatusBar";

import AppNavPane from "./components/AppNavPane";
import Main from "./components/Main";

export const App: SFC<{ color: string; theme: string }> = ({
  color,
  theme
}) => (
  <Window color={color} theme={theme} height="100vh" width="100vw">
    <View
      // Main View - upper stuff and
      layout="vertical"
      height="100vh"
      width="100vw"
    >
      <View
        // action bar and content
        height="100vh"
        width="100%"
      >
        <AppNavPane color={color} theme={theme} />
        <Main />
      </View>
      <StatusBar />
    </View>
  </Window>
);

function mapStateToProps(state: any) {
  return {
    color: state.uiStyle.color,
    theme: state.uiStyle.theme
  };
}

// @ts-ignore
export default withRouter(connect(mapStateToProps)(App));

// Note: The old react-router v3 implementation used onEnter to trigger async ftp calls
// TODO: Refactor into React v16 friendly lifecycle hooks
// Commented out routes with old onEnter logic
// <Route path="/results" component={Results} onEnter={JES.pollJobStatus} />
// <Route path="/explorer" component={Explorer} onEnter={JES.listDatasets} />
