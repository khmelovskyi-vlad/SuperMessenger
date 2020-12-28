import * as signalR from "@microsoft/signalr"
import Country from "../../../Models/Country";
import FileConfirmationModel from "../../../Models/FileConfirmationModel";
import MainPageModel from "../../../Models/MainPageModel";
import MessageConfirmationModel from "../../../Models/MessageConfirmationModel";
import MessageModel from "../../../Models/MessageModel";
import ProfileModel from "../../../Models/ProfileModel";
import MessageFileModel from "../../../Models/MessageFileModel";
import SimpleGroupModel from "../../../Models/SimpleGroupModel";
import SimpleUserModel from "../../../Models/SimpleUserModel";
import UserInGroup from "../../../Models/UserInGroup";
import Start from "../../../Api/Start";

require("dotenv").config();

export default class SuperMessengerHub{
  constructor(appErrorHandler, onReceiveSendingResult) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler;
    this.onReceiveSendingResult = onReceiveSendingResult.bind(this);
    this.changeProfile = this.changeProfile.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.sendFirstData = this.sendFirstData.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.searchNoInvitedUsers = this.searchNoInvitedUsers.bind(this);

    this.receiveFoundUsers = this.receiveFoundUsers.bind(this);
  }
  connect(accessToken) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_SUPER_MESSENGER_HUB_PATH, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 600000;
    this.connection = connection;
  }
  async handleStart() {
    await Start(this.connection);
  }
  receiveFirstData(onReceiveMainPageData) {
    this.connection.on("ReceiveFirstData", function (data) {
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
   })
  }
  receiveFoundUsers(onReceiveFoundUsers) {
    this.connection.on("ReceiveFoundUsers", function (users) {
      const res = users.map(user => new SimpleUserModel(user.Id, user.Email, user.ImageName));
      onReceiveFoundUsers(res);
    });
  }
  receiveMessage(onReceiveMessage) {
    this.connection.on("ReceiveMessage", function (message) {
      const newMessage = new MessageModel(message.Id,
        message.Value,
        new Date(message.SendDate),
        message.GroupId,
        new SimpleUserModel(message.User.Id,
          message.User.Email,
          message.User.ImageName),
        true);
      onReceiveMessage(newMessage);
    })
  }
  receiveNewProfile(onReceiveNewProfile) {
    this.connection.on("ReceiveNewProfile", function (profile) {
      const newProfile = new ProfileModel(profile.Id, profile.ImageName, profile.FirstName, profile.LastName);
      onReceiveNewProfile(newProfile);
    });
  }
  receiveNewUserData(onReceiveNewUserData) {
    this.connection.on("ReceiveNewUserData", function (simpleUser) {
      const user = new SimpleUserModel(simpleUser.Id, simpleUser.Email, simpleUser.ImageName);
      onReceiveNewUserData(user);
    });
  }
  receiveMessageConfirmation(onReceiveMessageConfirmation) {
    this.connection.on("ReceiveMessageConfirmation", function (messageConfirmation) {
      const newMessageConfirmation = new MessageConfirmationModel(
        messageConfirmation.Id,
        messageConfirmation.PreviousId,
        new Date(messageConfirmation.SendDate),
        messageConfirmation.GroupId,
      );
      onReceiveMessageConfirmation(newMessageConfirmation);
    })
  }
  receiveFileConfirmations(onReceiveFileConfirmations) {
    this.connection.on("ReceiveFileConfirmations", function (fileConfirmations) {
      const newFileConfirmations = fileConfirmations.map(fileConfirmation => new FileConfirmationModel(
        fileConfirmation.Id,
        fileConfirmation.PreviousId,
        new Date(fileConfirmation.SendDate),
        fileConfirmation.GroupId,
      ));
      onReceiveFileConfirmations(newFileConfirmations);
    })
  }
  receiveFiles(onReceiveFiles) {
    this.connection.on("ReceiveFiles", function (files) {
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
  }
  receiveNewOwnerUserId(onReceiveNewOwnerUserId) {
    this.connection.on("ReceiveNewOwnerUserId", function (userId, groupId) {
      onReceiveNewOwnerUserId(userId, groupId);
    });
  }
  receiveLeftGroupUserId(onReceiveLeftGroupUserId) {
    this.connection.on("ReceiveLeftGroupUserId", function (userId, groupId) {
      onReceiveLeftGroupUserId(userId, groupId);
    });
  }
  receiveRomevedGroup(onReceiveRomevedGroup) {
    onReceiveRomevedGroup = onReceiveRomevedGroup.bind(this);
    this.connection.on("ReceiveRomevedGroup", function (groupId, removalResult ) {
      onReceiveRomevedGroup(groupId, removalResult);
    });
  }
  receiveNewGroupUser(onReceiveNewGroupUser) {
    this.connection.on("ReceiveNewGroupUser", function (user, groupId) {
      const userInGroup = new UserInGroup(
        user.Id,
        user.Email,
        user.ImageName,
        user.IsCreator);
      onReceiveNewGroupUser(userInGroup, groupId);
    });
  }

  

  changeProfile(newProfile) {
    const methodName = "ChangeProfile";
    this.connection.invoke(methodName, newProfile)
      .then(() => this.onReceiveSendingResult("Profile was successfully changed"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  sendFirstData() {
    const methodName = "SendFirstData";
    this.connection.invoke(methodName).catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  sendMessage(message) {
    const methodName = "SendMessage";
    this.connection.invoke(methodName, message).catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  searchUsers(userEmailPart, userIds) {
    const methodName = "SearchUsers";
    this.connection.invoke(methodName, userEmailPart, userIds).catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  searchNoInvitedUsers(userEmailPart, groupId) {
    const methodName = "SearchNoInvitedUsers";
    this.connection.invoke(methodName, userEmailPart, groupId)
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  addFiles(files) {
    const methodName = "AddFiles";
    this.connection.invoke(methodName, files).catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
}