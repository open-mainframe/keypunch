import React from "react";
import { NavPane, NavPaneItem } from "react-desktop/windows";
import { withRouter } from "react-router-dom";
import Mainframe from "./components/Mainframe";
import Printout from "./components/Printout";
import PunchCard from "./components/PunchCard";
import Settings from "./components/Settings";

function AppNavPane({
  color,
  history,
  theme
}: {
  color: string;
  history: any;
  theme: string;
}) {
  return (
    <NavPane
      canPaneToggle
      color={color}
      defaultIsPaneExpanded={false}
      paneCompactedLength={80}
      paneExpandedLength={125}
      theme={theme}
    >
      <NavPaneItem
        horizontalAlignment="left"
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
        icon={<Mainframe />}
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
// @ts-ignore
export default withRouter(AppNavPane);
