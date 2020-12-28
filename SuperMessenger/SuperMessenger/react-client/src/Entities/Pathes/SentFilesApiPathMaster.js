require("dotenv").config();
export default class SentFilesApiPathMaster{
  getSentFilePath(groupId, fileId) {
    const path = new URL(process.env.REACT_APP_SENT_FILES_API, process.env.REACT_APP_BASE_URI);
    path.searchParams.append("groupId", groupId);
    path.searchParams.append("fileId", fileId);
    return path;
  }
}