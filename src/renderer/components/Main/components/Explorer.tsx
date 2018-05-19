import "brace";
import "brace/theme/github";
import "brace/theme/twilight";
import React from "react";
import { View } from "react-desktop/windows";
import { connect } from "react-redux";
import { Treebeard } from "react-treebeard";

// Import AceEditor and Brace components needed to style and highlight syntax
import AceEditor from "react-ace";

import jesFtp from "../../../utils/jesFtp";

const lightTree = {
  tree: {
    base: {
      backgroundColor: "#F3F3F3",
      color: "#000000",
      fontFamily: "lucida grande ,tahoma,verdana,arial,sans-serif",
      fontSize: "14px",
      listStyle: "none",
      margin: 0,
      padding: 0
    },
    node: {
      activeLink: {
        background: "#ffffff"
      },
      base: {
        position: "relative"
      },
      header: {
        base: {
          color: "#000000",
          display: "inline-block",
          verticalAlign: "top"
        },
        connector: {
          borderBottom: "solid 2px white",
          borderLeft: "solid 2px white",
          height: "12px",
          left: "-21px",
          position: "absolute",
          top: "0px",
          width: "2px"
        },
        title: {
          lineHeight: "24px",
          verticalAlign: "middle"
        }
      },
      link: {
        cursor: "pointer",
        display: "block",
        padding: "0px 5px",
        position: "relative"
      },
      loading: {
        color: "#E2C089"
      },
      toggle: {
        arrow: {
          fill: "#000000",
          strokeWidth: 0
        },
        base: {
          display: "inline-block",
          height: "24px",
          marginLeft: "-5px",
          position: "relative",
          verticalAlign: "top",
          width: "24px"
        },
        height: 14,
        width: 14,
        wrapper: {
          height: "14px",
          left: "50%",
          margin: "-7px 0 0 -7px",
          position: "absolute",
          top: "50%"
        }
      },

      subtree: {
        listStyle: "none",
        paddingLeft: "19px"
      }
    }
  }
};

const darkTree = {
  tree: {
    base: {
      backgroundColor: "#21252B",
      color: "#9DA5AB",
      fontFamily: "lucida grande ,tahoma,verdana,arial,sans-serif",
      fontSize: "14px",
      listStyle: "none",
      margin: 0,
      padding: 0
    },
    node: {
      activeLink: {
        background: "#31363F"
      },
      base: {
        position: "relative"
      },
      header: {
        base: {
          color: "#9DA5AB",
          display: "inline-block",
          verticalAlign: "top"
        },
        connector: {
          borderBottom: "solid 2px black",
          borderLeft: "solid 2px black",
          height: "12px",
          left: "-21px",
          position: "absolute",
          top: "0px",
          width: "2px"
        },
        title: {
          lineHeight: "24px",
          verticalAlign: "middle"
        }
      },
      link: {
        cursor: "pointer",
        display: "block",
        padding: "0px 5px",
        position: "relative"
      },
      loading: {
        color: "#E2C089"
      },
      toggle: {
        arrow: {
          fill: "#9DA5AB",
          strokeWidth: 0
        },
        base: {
          display: "inline-block",
          height: "24px",
          marginLeft: "-5px",
          position: "relative",
          verticalAlign: "top",
          width: "24px"
        },
        height: 14,
        width: 14,
        wrapper: {
          height: "14px",
          left: "50%",
          margin: "-7px 0 0 -7px",
          position: "absolute",
          top: "50%"
        }
      },

      subtree: {
        listStyle: "none",
        paddingLeft: "19px"
      }
    }
  }
};

interface ExplorerProps {
  theme: string;
  explorerContent: any;
  datasets: any[];
}
interface ExplorerState {
  cursor?: any;
}

class Explorer extends React.Component<ExplorerProps, ExplorerState> {
  constructor(props) {
    super(props);
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }
  public onToggle(node, toggled) {
    console.log(`called onToggle on ${JSON.stringify(node)} with ${toggled}`);
    if (this.state.cursor) {
      this.state.cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    this.setState({ cursor: node });
    // Is this node a member?
    // Should not have a children attribute... needs to be enhanced to open things other than members in PDS
    if (!node.children) {
      console.log(`${node.name} is a member in ${node.attributes.dsname}`);
      jesFtp.retrieveMember(node.attributes.dsname, node.name);
    } else {
      console.log(`${node.name} is dataset`);
    }
  }
  public render() {
    return (
      <View width="100%" height="100%">
        <Treebeard
          style={this.props.theme === "dark" ? darkTree : lightTree}
          data={this.props.datasets}
          onToggle={this.onToggle}
        />
        <AceEditor
          fontSize={20}
          mode="java"
          width="100%"
          height="100%"
          value={this.props.explorerContent}
          theme={this.props.theme === "dark" ? "twilight" : "github"}
          name="EDITOR" // TODO: Change this to a generated value when we add multiple editors
          readOnly
          editorProps={{
            $blockScrolling: Infinity
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    color: state.uiStyle.color,
    datasets: state.datasets,
    explorerContent: state.explorer.explorerContent,
    theme: state.uiStyle.theme
  };
}

export default connect(mapStateToProps)(Explorer);
