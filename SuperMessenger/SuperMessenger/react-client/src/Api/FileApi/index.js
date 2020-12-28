import axios from 'axios'
import NewFileModel from '../../Models/NewFileModel';
require("dotenv").config();

let appErrorHandler = null;
export function initializeData(_appErrorHandler) {
  appErrorHandler = _appErrorHandler;
}

export function postNewGroup(formData, newGroupModel, createGroup) {
  axios.post(process.env.REACT_APP_GROUPS_API, formData)
    .then(function (result) {
      newGroupModel.contentId = result.data
      createGroup(newGroupModel);
    })
    .catch(function(err){
      appErrorHandler.webApiHandle(err);
    });
}

export function postNewFiles(formData, addFiles, newFilesModel) {
  axios.post(process.env.REACT_APP_SENT_FILES_API, formData)
    .then(function (result) {
      for (let i = 0; i < newFilesModel.newFileModels.length; i++){
        newFilesModel.newFileModels[i] = new NewFileModel(
          newFilesModel.newFileModels[i].previousId,
          result.data[i].contentId,
          result.data[i].previousName,
        );
      }
      addFiles(newFilesModel);
    })
    .catch(function(err){
      appErrorHandler.webApiHandle(err);
    });
}
export function putProfile(formData, newProfileModel, changeProfile) {
  axios.put(process.env.REACT_APP_USERS_API, formData)
    .then(function (result) {
      newProfileModel.contentId = result.data
      changeProfile(newProfileModel);
    })
    .catch(function(err){
      appErrorHandler.webApiHandle(err);
    });
}
const FileApi = {
  initializeData,
  postNewGroup,
  postNewFiles,
  putProfile
}
export default FileApi;