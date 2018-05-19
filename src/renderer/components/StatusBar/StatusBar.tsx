import React from "react";
import { View } from "react-desktop/windows";
import { connect } from "react-redux";

import { store } from "../../index";
import jes from "../../utils/jesFtp";
import { testIndicators } from "../../utils/nativeDialogs";
import Indicator from "./components/Indicator";

const { dialog } = require("electron").remote;

function StatusBar(props: any) {
  return (
    <View
      style={{
        bottom: "0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        zIndex: "10"
      }}
      background="#aaa"
      width="100%"
      height="50px"
      overflow="hidden"
    >
      <button
        style={{
          backgroundColor: "orange",
          border: "none",
          color: "white",
          margin: "4px",
          width: "90px"
        }}
        onClick={props.testIndicators}
      >
        TEST
      </button>
      {!props.isConnected ? (
        <button
          style={{
            backgroundColor: "green",
            border: "none",
            color: "white",
            margin: "4px",
            width: "90px"
          }}
          onClick={props.jesConnect}
        >
          CONNECT
        </button>
      ) : (
        <button
          style={{
            backgroundColor: "#C0101D",
            border: "none",
            color: "white",
            margin: "4px",
            width: "90px"
          }}
          onClick={props.disconnect}
        >
          INTERRUPT
        </button>
      )}

      <div
        style={{
          color: "black",
          fontSize: "10px",
          marginLeft: "10px",
          marginTop: "8px",
          width: "30px"
        }}
      >
        CONN
        <br />
        <div
          style={{
            marginLeft: "10px",
            marginTop: "3px"
          }}
        >
          <Indicator
            isBlinking={props.isConnecting}
            isLit={props.isConnected}
          />
        </div>
      </div>

      <div
        style={{
          color: "black",
          fontSize: "10px",
          marginLeft: "10px",
          marginTop: "8px",
          width: "30px"
        }}
      >
        SENT
        <br />
        <div
          style={{
            marginLeft: "9px",
            marginTop: "3px"
          }}
        >
          <Indicator
            isBlinking={props.isSubmitting}
            isLit={props.isSubmitted}
          />
        </div>
      </div>

      <div
        style={{
          color: "black",
          fontSize: "10px",
          marginLeft: "10px",
          marginTop: "8px",
          width: "30px"
        }}
      >
        RETR
        <br />
        <div
          style={{
            marginLeft: "9px",
            marginTop: "3px"
          }}
        >
          <Indicator
            isBlinking={props.isRetrieving}
            isLit={props.isRetrieved}
          />
        </div>
      </div>

      <div
        style={{
          color: "black",
          fontSize: "10px",
          marginLeft: "10px",
          marginTop: "8px",
          width: "30px"
        }}
      >
        DISC
        <br />
        <div
          style={{
            marginLeft: "7px",
            marginTop: "3px"
          }}
        >
          <Indicator
            isBlinking={props.isDisconnecting}
            isLit={props.isDisconnected}
          />
        </div>
      </div>

      <button
        style={{
          backgroundColor: "#195DAE",
          border: "none",
          color: "white",
          margin: "4px",
          marginLeft: "10px",
          width: "90px"
        }}
        onClick={props.submitJob}
      >
        LOAD
      </button>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    currentStep: state.results.currentStep,
    isConnected: state.results.isConnected,
    isConnecting: state.results.isConnecting,
    isDisconnected: state.results.isDisconnected,
    isDisconnecting: state.results.isDisconnecting,
    isRetrieved: state.results.isRetrieved,
    isRetrieving: state.results.isRetrieving,
    isSubmitted: state.results.isSubmitted,
    isSubmitting: state.results.isSubmitting
  };
}

function mapDispatchToProps(dispatch) {
  return {
    disconnect: evt => {
      evt.preventDefault();
      dispatch(jes.disconnect);
    },
    jesConnect: evt => {
      evt.preventDefault();
      dispatch(jes.connect);
    },
    submitJob: evt => {
      evt.preventDefault();
      dialog.showMessageBox(
        {
          buttons: ["Cancel", "Submit"],
          defaultId: 0,
          message: "Are you sure that you want to submit your batch job?",
          noLink: true,
          title: "Confirm Job Submission",
          type: "question"
        },
        response => {
          console.log("Button chosen was:", response);
          if (response === 1) {
            console.log("Job Submission was confirmed");
            jes.submitJob(Buffer.from(store.getState().editor.editorContent));
          }
        }
      );
    },
    testIndicators: evt => {
      evt.preventDefault();
      dispatch(testIndicators);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
