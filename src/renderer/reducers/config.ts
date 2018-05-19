import {
  SET_FTP_PASSWORD,
  SET_FTP_PORT,
  SET_FTP_USER_NAME,
  SET_HOST_NAME
} from "../constants";

const initialConfigState = {
  ftpPassword: "",
  ftpPort: "21",
  ftpUserName: "",
  hostName: ""
};

export default function(state = initialConfigState, action) {
  const newState = { ...state };

  switch (action.type) {
    case SET_HOST_NAME:
      newState.hostName = action.hostName;
      break;
    case SET_FTP_PORT:
      newState.ftpPort = action.ftpPort;
      break;
    case SET_FTP_USER_NAME:
      newState.ftpUserName = action.ftpUserName;
      break;
    case SET_FTP_PASSWORD:
      newState.ftpPassword = action.ftpPassword;
      break;
    default:
      return state;
  }
  return newState;
}
