// Import AceEditor and Brace components needed to style and highlight syntax
import "brace";
import "brace/theme/github";
import "brace/theme/twilight";

import React from "react";
import AceEditor from "react-ace";
import { connect } from "react-redux";

import { setEditorContent } from "../../../actions/editor";

function Editor(props) {
  return (
    <AceEditor
      mode="java"
      theme={props.theme === "dark" ? "twilight" : "github"}
      onChange={props.setEditorContent}
      name="EDITOR" // TODO: Change this to a generated value when we add multiple editors
      editorProps={{ $blockScrolling: Infinity }}
      value={props.editorContent}
      width="100%"
      height="100%"
      fontSize={20}
    />
  );
}

function mapStateToProps(state) {
  return {
    color: state.uiStyle.color,
    editorContent: state.editor.editorContent,
    theme: state.uiStyle.theme
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEditorContent: newValue => dispatch(setEditorContent(newValue))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
