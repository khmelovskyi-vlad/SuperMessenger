import Country from "../../../Models/Country";
import FileConfirmationModel from "../../../Models/FileConfirmationModel";
import MainPageModel from "../../../Models/MainPageModel";
import MessageConfirmationModel from "../../../Models/MessageConfirmationModel";
import MessageFileModel from "../../../Models/MessageFileModel";
import MessageModel from "../../../Models/MessageModel";
import ProfileModel from "../../../Models/ProfileModel";
import SimpleGroupModel from "../../../Models/SimpleGroupModel";
import SimpleUserModel from "../../../Models/SimpleUserModel";

let connection = null;
let setConnectedMethods = null;

export function initializeData(_connection, _setConnectedMethods) {
  connection = _connection;
  setConnectedMethods = _setConnectedMethods;
}

export function receiveFirstData(onReceiveMainPageData) {
  connection.on("ReceiveFirstData", function (data) {
    const countries = data.Countries.map(country => new Country(country.Id, country.Value));
    const simpleGroupModels = data.Groups.map(group => new SimpleGroupModel(group.Id,
      group.Name,
      group.ImageName,
      group.Type,
      group.LastMessage ? new MessageModel(group.LastMessage.Id,
        group.LastMessage.Value,
        new Date(group.LastMessage.SendDate),
        group.LastMessage.GroupId,
        new SimpleUserModel(group.LastMessage.User.Id,
          group.LastMessage.User.Email,
          group.LastMessage.User.ImageName),
        true) : null));
    const mainPageData = new MainPageModel(
      data.Id,
      data.Email,
      data.FirstName,
      data.LastName,
      data.ImageName,
      data.InvitationCount,
      data.ApplicationCount,
      countries,
      simpleGroupModels,
    );
    onReceiveMainPageData(mainPageData);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveFoundUsers(onReceiveFoundUsers) {
  connection.on("ReceiveFoundUsers", function (users) {
    const res = users.map(user => new SimpleUserModel(user.Id, user.Email, user.ImageName));
    onReceiveFoundUsers(res);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveMessage(onReceiveMessage) {
  connection.on("ReceiveMessage", function (message) {
    const newMessage = new MessageModel(message.Id,
      message.Value,
      new Date(message.SendDate),
      message.GroupId,
      new SimpleUserModel(message.User.Id,
        message.User.Email,
        message.User.ImageName),
      true);
    onReceiveMessage(newMessage);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveNewProfile(onReceiveNewProfile) {
  connection.on("ReceiveNewProfile", function (profile) {
    const newProfile = new ProfileModel(profile.Id, profile.ImageName, profile.FirstName, profile.LastName);
    onReceiveNewProfile(newProfile);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveNewUserData(onReceiveNewUserData) {
  connection.on("ReceiveNewUserData", function (simpleUser) {
    const user = new SimpleUserModel(simpleUser.Id, simpleUser.Email, simpleUser.ImageName);
    onReceiveNewUserData(user);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveMessageConfirmation(onReceiveMessageConfirmation) {
  connection.on("ReceiveMessageConfirmation", function (messageConfirmation) {
    const newMessageConfirmation = new MessageConfirmationModel(
      messageConfirmation.Id,
      messageConfirmation.PreviousId,
      new Date(messageConfirmation.SendDate),
      messageConfirmation.GroupId,
    );
    onReceiveMessageConfirmation(newMessageConfirmation);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveFileConfirmations(onReceiveFileConfirmations) {
  connection.on("ReceiveFileConfirmations", function (fileConfirmations) {
    const newFileConfirmations = fileConfirmations.map(fileConfirmation => new FileConfirmationModel(
      fileConfirmation.Id,
      fileConfirmation.PreviousId,
      new Date(fileConfirmation.SendDate),
      fileConfirmation.GroupId,
    ));
    onReceiveFileConfirmations(newFileConfirmations);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveFiles(onReceiveFiles) {
  connection.on("ReceiveFiles", function (files) {
    const messageFiles = files.map(messageFile => 
       new MessageFileModel(messageFile.Id,
        messageFile.Name,
        new Date(messageFile.SendDate),
        messageFile.GroupId,
        new SimpleUserModel(
        messageFile.User.Id,
        messageFile.User.Email,
        messageFile.User.ImageName
      ),
         true)
    );
    onReceiveFiles(messageFiles);
  });
  setConnectedMethods(prev => prev + 1);
}
const SuperMessengerHandlers = {
  initializeData,
  receiveFirstData,
  receiveFoundUsers,
  receiveMessage,
  receiveNewProfile,
  receiveNewUserData,
  receiveMessageConfirmation,
  receiveFileConfirmations,
  receiveFiles
}
export default SuperMessengerHandlers;