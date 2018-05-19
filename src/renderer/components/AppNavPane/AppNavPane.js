import React from "react";
import { View, Window, NavPane, NavPaneItem } from "react-desktop/windows";
import { withRouter } from "react-router-dom";
import PunchCard from "./components/PunchCard";
import Printout from "./components/Printout";
import Mainframe from "./components/Mainframe";
import Settings from "./components/Settings";

function AppNavPane({ color, history, theme }) {
  return (
    <NavPane
      canPaneToggle
      color={color}
      defaultIsPaneExpanded={false}
      paneCompactedLength={60}
      paneExpandedLength={125}
      theme={theme}
    >
      <NavPaneItem
        title="edit"
        icon={<PunchCard theme={theme} />}
        onSelect={() => history.push("/editor")}
      />
      <NavPaneItem
        title="results"
        icon={<Printout theme={theme} />}
        onSelect={() => history.push("/results")}
      />
      <NavPaneItem
        title="explorer"
        icon={<Mainframe theme={theme} />}
        onSelect={() => history.push("/explorer")}
      />
      <NavPaneItem
        title="config"
        icon={<Settings theme={theme} />}
        onSelect={() => history.push("/config")}
      />
    </NavPane>
  );
}
export default withRouter(AppNavPane);
