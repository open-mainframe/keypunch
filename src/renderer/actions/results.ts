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

export const setResultsContent = resultsContent => ({
  resultsContent,
  type: SET_RESULTS_CONTENT
});

export const setJobStatus = jobStatus => ({
  jobStatus,
  type: SET_JOB_STATUS
});

export const setCurrentStep = currentStep => ({
  currentStep,
  type: SET_CURRENT_STEP
});

export const setIsConnected = isConnected => ({
  isConnected,
  type: SET_IS_CONNECTED
});

export const setIsConnecting = isConnecting => ({
  isConnecting,
  type: SET_IS_CONNECTING
});
export const setIsSubmitted = isSubmitted => ({
  isSubmitted,
  type: SET_IS_SUBMITTED
});
export const setIsSubmitting = isSubmitting => ({
  isSubmitting,
  type: SET_IS_SUBMITTING
});
export const setIsRetrieved = isRetrieved => ({
  isRetrieved,
  type: SET_IS_RETRIEVED
});
export const setIsRetrieving = isRetrieving => ({
  isRetrieving,
  type: SET_IS_RETRIEVING
});
export const setIsDisconnected = isDisconnected => ({
  isDisconnected,
  type: SET_IS_DISCONNECTED
});
export const setIsDisconnecting = isDisconnecting => ({
  isDisconnecting,
  type: SET_IS_DISCONNECTING
});
