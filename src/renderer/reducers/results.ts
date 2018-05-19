import {
  SET_CURRENT_STEP,
  SET_IS_CONNECTED,
  SET_IS_CONNECTING,
  SET_IS_DISCONNECTED,
  SET_IS_DISCONNECTING,
  SET_IS_RETRIEVED,
  SET_IS_RETRIEVING,
  SET_IS_SUBMITTED,
  SET_IS_SUBMITTING,
  SET_JOB_STATUS,
  SET_RESULTS_CONTENT
} from "../constants";

const initialResultsState = {
  currentStep: "", // connect,submit,retrieve,disconnect
  isConnected: false,
  isConnecting: false,
  isDisconnected: false,
  isDisconnecting: false,
  isRetrieved: false,
  isRetrieving: false,
  isSubmitted: false,
  isSubmitting: false,
  jobStatus: "",
  resultsContent: "Not yet submitted to mainframe"
};

export default function(state = initialResultsState, action) {
  const newState = { ...state };

  switch (action.type) {
    case SET_RESULTS_CONTENT:
      newState.resultsContent = action.resultsContent;
      break;
    case SET_JOB_STATUS:
      newState.jobStatus = action.jobStatus;
      break;
    case SET_CURRENT_STEP:
      newState.currentStep = action.currentStep;
      break;
    case SET_IS_CONNECTED:
      newState.isConnected = action.isConnected;
      break;
    case SET_IS_CONNECTING:
      newState.isConnecting = action.isConnecting;
      break;
    case SET_IS_SUBMITTED:
      newState.isSubmitted = action.isSubmitted;
      break;
    case SET_IS_SUBMITTING:
      newState.isSubmitting = action.isSubmitting;
      break;
    case SET_IS_RETRIEVED:
      newState.isRetrieved = action.isRetrieved;
      break;
    case SET_IS_RETRIEVING:
      newState.isRetrieving = action.isRetrieving;
      break;
    case SET_IS_DISCONNECTED:
      newState.isDisconnected = action.isDisconnected;
      break;
    case SET_IS_DISCONNECTING:
      newState.isDisconnecting = action.isDisconnecting;
      break;
    default:
      return state;
  }
  return newState;
}
