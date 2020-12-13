import * as signalR from "@microsoft/signalr"
import Country from "../../Models/Country";
import FileConfirmationModel from "../../Models/FileConfirmationModel";
import MainPageModel from "../../Models/MainPageModel";
import MessageConfirmationModel from "../../Models/MessageConfirmationModel";
import MessageModel from "../../Models/MessageModel";
import ProfileModel from "../../Models/ProfileModel";
import MessageFileModel from "../../Models/MessageFileModel";
import SimpleGroupModel from "../../Models/SimpleGroupModel";
import SimpleUserModel from "../../Models/SimpleUserModel";
import UserInGroup from "../../Models/UserInGroup";
import Start from "./Start";

export default class SuperMessengerHub{
  constructor(appErrorHandler, onReceiveSendingResult) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler;
    this.onReceiveSendingResult = onReceiveSendingResult;
    this.changeProfile = this.changeProfile.bind(this);
    this.addFiles = this.addFiles.bind(this);
  }
  async connect(
    accessToken,
    onReceiveMainPageData,
    onReceiveFoundUsers,
    onReceiveMessage,
    onReceiveNewProfile,
    onReceiveNewUserData,
    onReceiveMessageConfirmation,
    onReceiveFileConfirmations,
    onReceiveFiles,
    onReceiveLeftGroupUserId,
    onReceiveRomevedGroup,
    onReceiveNewGroupUser,) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("/SuperMessengerHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 600000;
      console.log("ok");
    this.receiveFirstData(connection, onReceiveMainPageData);
      console.log("ok");
    this.receiveFoundUsers(connection, onReceiveFoundUsers);
    this.receiveMessage(connection, onReceiveMessage);
    this.receiveNewProfile(connection, onReceiveNewProfile);
    this.receiveNewUserData(connection, onReceiveNewUserData);
    this.receiveMessageConfirmation(connection, onReceiveMessageConfirmation);
    this.receiveFileConfirmations(connection, onReceiveFileConfirmations);
    this.receiveFiles(connection, onReceiveFiles);

    this.receiveLeftGroupUserId(connection, onReceiveLeftGroupUserId);
    this.receiveRomevedGroup(connection, onReceiveRomevedGroup)
    this.receiveNewGroupUser(connection, onReceiveNewGroupUser);
    await Start(connection);
    this.connection = connection;
  }
  receiveFirstData(connection, onReceiveMainPageData) {
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
          true) : new MessageModel()));
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
  receiveFoundUsers(connection, onReceiveFoundUsers) {
    connection.on("ReceiveFoundUsers", function (users) {
      const res = users.map(user => new SimpleUserModel(user.Id, user.Email, user.ImageName));
      onReceiveFoundUsers(res);
    });
  }
  receiveMessage(connection, onReceiveMessage) {
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
    })
  }
  receiveNewProfile(connection, onReceiveNewProfile) {
    connection.on("ReceiveNewProfile", function (profile) {
      const newProfile = new ProfileModel(profile.Id, profile.ImageName, profile.FirstName, profile.LastName);
      onReceiveNewProfile(newProfile);
    });
  }
  receiveNewUserData(connection, onReceiveNewUserData) {
    connection.on("ReceiveNewUserData", function (simpleUser) {
      const user = new SimpleUserModel(simpleUser.Id, simpleUser.Email, simpleUser.ImageName);
      onReceiveNewUserData(user);
    });
  }
  receiveMessageConfirmation(connection, onReceiveMessageConfirmation) {
    connection.on("ReceiveMessageConfirmation", function (messageConfirmation) {
      const newMessageConfirmation = new MessageConfirmationModel(
        messageConfirmation.Id,
        messageConfirmation.PreviousId,
        new Date(messageConfirmation.SendDate),
        messageConfirmation.GroupId,
      );
      onReceiveMessageConfirmation(newMessageConfirmation);
    })
  }
  receiveFileConfirmations(connection, onReceiveFileConfirmations) {
    connection.on("ReceiveFileConfirmations", function (fileConfirmations) {
      console.log("receiveFileConfirmations");
      const newFileConfirmations = fileConfirmations.map(fileConfirmation => new FileConfirmationModel(
        fileConfirmation.Id,
        fileConfirmation.PreviousId,
        new Date(fileConfirmation.SendDate),
        fileConfirmation.GroupId,
      ));
      onReceiveFileConfirmations(newFileConfirmations);
    })
  }
  receiveFiles(connection, onReceiveFiles) {
    connection.on("ReceiveFiles", function (files) {
      const sentFiles = files.map(sentFile => 
         new MessageModel(sentFile.Id,
          sentFile.Value,
          new Date(sentFile.SendDate),
          sentFile.GroupId,
          new SimpleUserModel(
          sentFile.User.Id,
          sentFile.User.Email,
          sentFile.User.ImageName
        ),
           true)
      );
      onReceiveFiles(sentFiles);
    });
  }
  receiveLeftGroupUserId(connection, onReceiveLeftGroupUserId) {
    connection.on("ReceiveLeftGroupUserId", function (userId, groupId) {
      onReceiveLeftGroupUserId(userId, groupId);
    });
  }
  receiveRomevedGroup(connection, onReceiveRomevedGroup) {
    connection.on("ReceiveRomevedGroup", function (groupId, removalResult ) {
      onReceiveRomevedGroup(groupId, removalResult);
    });
  }
  receiveNewGroupUser(connection, onReceiveNewGroupUser) {
    connection.on("ReceiveNewGroupUser", function (user, groupId) {
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
  // removeFromGroup(groupId) {
  //   const methodName = "RemoveFromGroup";
  //   this.connection.invoke(methodName, groupId).catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  // }
  addFiles(files) {
    const methodName = "AddFiles";
    this.connection.invoke(methodName, files).catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
}