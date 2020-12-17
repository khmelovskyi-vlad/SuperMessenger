import axios from 'axios'
import NewFileModel from '../Models/NewFileModel';

require("dotenv").config();

export default class FileApi{
  constructor(appErrorHandler) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler;
  }
  sendNewGroup(formData, newGroupModel, createGroup) {
    const appErrorHandler = this.appErrorHandler;
    axios.post(process.env.REACT_APP_GROUPS_API, formData)
      .then(function (result) {
        newGroupModel.contentId = result.data
        createGroup(newGroupModel);
      })
      .catch(function(err){
        appErrorHandler.webApiHandle(err);
      });
  }
  
  sendNewFiles(formData, addFiles, newFilesModel) {
    const appErrorHandler = this.appErrorHandler;
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
  changeProfile(formData, newProfileModel, changeProfile) {
    const appErrorHandler = this.appErrorHandler;
    axios.put(process.env.REACT_APP_USERS_API, formData)
      .then(function (result) {
        newProfileModel.contentId = result.data
        changeProfile(newProfileModel);
      })
      .catch(function(err){
        appErrorHandler.webApiHandle(err);
      });
  }
}