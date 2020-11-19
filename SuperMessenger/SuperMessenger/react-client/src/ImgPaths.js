const path = require('path');
export default class ImgPaths{
  constructor() {
    this.groupImgsPath = "/groupImgs";
    this.userAvatarsPath = "/avatars";
    this.imgs = "/img";
  }
  join(...args) {
    return path.join(...args);
  }
}