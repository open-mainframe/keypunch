import React from "react";

// Import AceEditor and Brace components needed to style and highlight syntax
import AceEditor from "react-ace";
import brace from "brace"; // Need this I think
import "brace/mode/java";
import "brace/theme/github";
import "brace/theme/twilight";

export default props => (
  <AceEditor
    mode="java"
    theme={props.theme === "dark" ? "twilight" : "github"}
    name="RESULTS2" // TODO: Change this to a generated value when we add multiple editors
    value={props.value}
    readOnly
    editorProps={{
      $blockScrolling: Infinity,
      readOnly: true
    }}
    width="100%"
    height="95vh"
    fontSize={20}
  />
);
