import _ from "lodash";
import { LOAD_JOB_RESULTS, REFRESH_JOBS } from "../constants";

const initialJobsState = {};

// State is a hashmap with a key of job ID and a value of an object literal containing all of the output
// of the ftp ls command while in filetype=jes mode.
// jobs[jobID] = {
//   owner: jobSplit[0],
//   status: jobSplit[2],
//   numberOfSpoolFiles: job.includes('Spool Files') ? jobSplit[3] : null,
//   jobID: jobID,
//   fullString: job.trim(),
//   results: ''
// };

export default function(state = initialJobsState, action) {
  let newState = { ...state };

  switch (action.type) {
    case REFRESH_JOBS:
      newState = _.merge(newState, action.jobsState);
      break;
    case LOAD_JOB_RESULTS:
      newState[action.jobID].results = action.results;
      break;
    default:
      return state;
  }
  return newState;
}
