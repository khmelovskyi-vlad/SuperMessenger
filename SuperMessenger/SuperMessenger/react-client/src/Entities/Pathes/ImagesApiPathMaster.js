require("dotenv").config();
export default class ImagesApiPathMaster{
  getImagePath(type, name) {
    if (!name) {
      name = process.env.REACT_APP_DEFAULT_IMAGE_NAME;
    }
    const path = new URL(process.env.REACT_APP_IMAGES_API, process.env.REACT_APP_BASE_URI);
    path.searchParams.append("type", type);
    path.searchParams.append("name", name);
    return path;
  }
}