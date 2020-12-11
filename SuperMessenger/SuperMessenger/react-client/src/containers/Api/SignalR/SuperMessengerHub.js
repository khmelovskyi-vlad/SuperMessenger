import * as signalR from "@microsoft/signalr"
import Country from "../../Models/Country";
import FileConfirmationModel from "../../Models/FileConfirmationModel";
import MainPageData from "../../Models/MainPageData";
import MessageConfirmationModel from "../../Models/MessageConfirmationModel";
import MessageModel from "../../Models/MessageModel";
import ProfileModel from "../../Models/ProfileModel";
import SentFileModel from "../../Models/SentFileModel";
import SimpleGroupModel from "../../Models/SimpleGroupModel";
import SimpleUserModel from "../../Models/SimpleUserModel";
import UserInGroup from "../../Models/UserInGroup";
import Start from "./Start";

export default class SuperMessengerHub{
  constructor(appErrorHandler, setSendingResult) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler;
    this.setSendingResult = setSendingResult;
  }
  async connect(
    accessToken,
    onReceiveMainPageData,
    onReceiveFoundUsers,
    onReceiveMessage,
    onReceiveNewProfile,
    onReceiveNewUserData,
    onReceiveUserResultType,
    onReceiveMessageConfirmation,
    onReceiveFileConfirmations,
    onReceiveFiles,
    onReceiveLeftGroupUserId,
    onReceiveRomevedGroup,
    onReceiveNewGroupUser,) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/SuperMessengerHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
      console.log("ok");
    this.receiveFirstData(connection, onReceiveMainPageData);
      console.log("ok");
    this.receiveFoundUsers(connection, onReceiveFoundUsers);
    this.receiveMessage(connection, onReceiveMessage);
    this.receiveNewProfile(connection, onReceiveNewProfile);
    this.receiveNewUserData(connection, onReceiveNewUserData);
    this.receiveUserResultType(connection, onReceiveUserResultType);
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
        group.ImageId,
        group.Type,
        group.LastMessage ? new MessageModel(group.LastMessage.Id,
          group.LastMessage.Value,
          new Date(group.LastMessage.SendDate),
          group.LastMessage.GroupId,
          new SimpleUserModel(group.LastMessage.User.Id,
          group.LastMessage.User.Email,
          group.LastMessage.User.ImageId),
          true) : new MessageModel()));
      const mainPageData = new MainPageData(
        data.Id,
        data.Email,
        data.FirstName,
        data.LastName,
        data.ImageId,
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
      const res = users.map(user => new SimpleUserModel(user.Id, user.Email, user.ImageId));
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
          message.User.ImageId),
        true);
      onReceiveMessage(newMessage);
    })
  }
  receiveNewProfile(connection, onReceiveNewProfile) {
    connection.on("ReceiveNewProfile", function (profile) {
      const newProfile = new ProfileModel(profile.Id, profile.ImageId, profile.FirstName, profile.LastName);
      onReceiveNewProfile(newProfile);
    });
  }
  receiveNewUserData(connection, onReceiveNewUserData) {
    connection.on("ReceiveNewUserData", function (simpleUser) {
      const user = new SimpleUserModel(simpleUser.Id, simpleUser.Email, simpleUser.ImageId);
      onReceiveNewUserData(user);
    });
  }
  receiveUserResultType(connection, onReceiveUserResultType) {
    connection.on("ReceiveUserResultType", function (resultType) {
      onReceiveUserResultType(resultType);
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
        fileConfirmation.ContentId
      ));
      onReceiveFileConfirmations(newFileConfirmations);
    })
  }
  receiveFiles(connection, onReceiveFiles) {
    connection.on("ReceiveFiles", function (files) {
      const sentFiles = files.map(sentFile => new SentFileModel(
        sentFile.Id,
        sentFile.Name,
        sentFile.ContentId,
        new Date(sentFile.SendDate),
        sentFile.GroupId,
        new SimpleUserModel(
          sentFile.User.Id,
          sentFile.User.Email,
          sentFile.User.ImageId
        ),
        true));
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
        user.ImageId,
        user.IsCreator);
      onReceiveNewGroupUser(userInGroup, groupId);
    });
  }

  


  sendFirstData() {
    const methodName = "SendFirstData";
    this.connection.invoke(methodName).catch((err) => this.appErrorHandler.handling(err, methodName));
  }
  sendMessage(message) {
    const methodName = "SendMessage";
    this.connection.invoke(methodName, message).catch((err) => this.appErrorHandler.handling(err, methodName));
  }
  searchUsers(userEmailPart, userIds) {
    const methodName = "SearchUsers";
    this.connection.invoke(methodName, userEmailPart, userIds).catch((err) => this.appErrorHandler.handling(err, methodName));
  }
  searchNoInvitedUsers(userEmailPart, groupId) {
    const methodName = "SearchNoInvitedUsers";
    this.connection.invoke(methodName, userEmailPart, groupId)
      .catch((err) => this.appErrorHandler.handling(err, methodName));
  }
  // removeFromGroup(groupId) {
  //   const methodName = "RemoveFromGroup";
  //   this.connection.invoke(methodName, groupId).catch((err) => this.appErrorHandler.handling(err, methodName));
  // }
  addFiles(files) {
    const methodName = "AddFile";
    this.connection.invoke(methodName, files).catch((err) => this.appErrorHandler.handling(err, methodName));
  }
}