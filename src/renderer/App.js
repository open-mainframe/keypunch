import React from "react";
import { View, Window, NavPane, NavPaneItem } from "react-desktop/windows";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { renderIcon } from "./utils/renderIcon";
import StatusBar from "./components/StatusBar";
import { Switch, Route } from "react-router";
import Editor from "./components/Editor";
import Explorer from "./components/Explorer";
import ConfigForm from "./components/ConfigForm";
import Results from "./components/Results";

function App({ color, theme, editorContent, setEditorContent, history }) {
  return (
    <Window color={color} theme={theme} height="100vh" width="100vw">
      <View
        //Main View - upper stuff and
        layout="vertical"
        height="100vh"
        width="100vw"
      >
        <View
          //action bar and content
          height="100vh"
          width="100%"
        >
          <NavPane
            canPaneToggle // bool Sets whether the pane can be compacted.Default value "true".
            color={color} // string sets the main color of a component.
            defaultIsPaneExpanded={false} // string sets whether the pane is expanded by default. Default value "true".
            // onPaneToggle function Callback function when the pane is expanded or compacted.
            paneCompactedLength={60} // string, number sets the length of the pane when compacted. Default value "48px".
            paneExpandedLength="100px" // string, number sets the length of the pane when expanded. Default value "200px"
            // openLength='100px'
            // string, number sets the length of the pane when expanded. Default value "200px"
            theme={theme} // Sets the UI theme that is used by this component and its children elements. Property value "light", "dark"
            // push
            style={{
              flex: "0 0 0%"
            }}
          >
            <NavPaneItem
              title="edit"
              icon={renderIcon("punchCard", theme)}
              onSelect={() => history.push("/editor")}
              push
            />
            <NavPaneItem
              title="results"
              icon={renderIcon("printout", theme)}
              onSelect={() => history.push("/results")}
              push
            />
            <NavPaneItem
              title="explorer"
              icon={renderIcon("mainframe", theme)}
              onSelect={() => history.push("/explorer")}
              push
            />
            <NavPaneItem
              title="config"
              icon={renderIcon("settings", theme)}
              onSelect={() => history.push("/config")}
              push
            />
          </NavPane>
          <Switch>
            <Route path="/editor" component={Editor} />
            <Route path="/config" component={ConfigForm} />
            <Route path="/results" component={Results} />
            <Route path="/explorer" component={Explorer} />
          </Switch>
        </View>
        <StatusBar />
      </View>
    </Window>
  );
}

function mapStateToProps(state) {
  return {
    theme: state.uiStyle.theme,
    color: state.uiStyle.color
  };
}

export default withRouter(connect(mapStateToProps)(App));

// Note: The old react-router v3 implementation used onEnter to trigger async ftp calls
// TODO: Refactor into React v16 friendly lifecycle hooks
// Commented out routes with old onEnter logic
// <Route path="/results" component={Results} onEnter={JES.pollJobStatus} />
// <Route path="/explorer" component={Explorer} onEnter={JES.listDatasets} />
