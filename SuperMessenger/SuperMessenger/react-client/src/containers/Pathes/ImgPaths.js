const path = require('path');
require("dotenv").config();
export default class ImgPaths{
  getMessageSubImageName(isMyMessage, isConfirmed) {
    if (isMyMessage) {
      if (isConfirmed) {
        return process.env.REACT_APP_MY_CHECK_MARK;
      }
      return process.env.REACT_APP_UNCONFIRMED_MESSAGE;
    }
    return process.env.REACT_APP_NO_MY_CHECK_MARK;
  }
  createPath(...args) {
    return path.join(process.env.REACT_APP_IMG_PATH, ...args);
  }


  getMessageSubPath(isMyMessage, isConfirmed) {
    return this.createPath(this.getMessageSubImageName(isMyMessage, isConfirmed));
  }
  getSendFileButtonPath() {
    return this.createPath(process.env.REACT_APP_SEND_FILE_BUTTON_IMG);
  }
  getLogoPath() {
    return this.createPath(process.env.REACT_APP_LOGO);
  }
  getCreatorPath() {
    return this.createPath(process.env.REACT_APP_CREATOR);
  }
}