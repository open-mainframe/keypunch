import {
  SET_FTP_PASSWORD,
  SET_FTP_PORT,
  SET_FTP_USER_NAME,
  SET_HOST_NAME
} from "../constants";

export const setHostName = hostName => ({
  hostName,
  type: SET_HOST_NAME
});

export const setFtpPort = ftpPort => ({
  ftpPort,
  type: SET_FTP_PORT
});

export const setFtpUserName = ftpUserName => ({
  ftpUserName,
  type: SET_FTP_USER_NAME
});

export const setFtpPassword = ftpPassword => ({
  ftpPassword,
  type: SET_FTP_PASSWORD
});
