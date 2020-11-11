const path = require('path');
export default class ImgPaths{
  constructor() {
    this.groupImgsPath = "/groupImgs";
    this.userAvatarsPath = "/avatars";
  }
  join(...args) {
    return path.join(...args);
  }
}