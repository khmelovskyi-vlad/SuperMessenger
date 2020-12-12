import * as signalR from "@microsoft/signalr"
import Application from "../../Models/Application";
import GroupModel from "../../Models/GroupModel";
import Invitation from "../../Models/Invitation";
import MessageModel from "../../Models/MessageModel";
import MessageFileModel from "../../Models/MessageFileModel";
import SimpleGroupModel from "../../Models/SimpleGroupModel";
import SimpleUserModel from "../../Models/SimpleUserModel";
import UserInGroup from "../../Models/UserInGroup";
import Start from "./Start";

export default class GroupHub{
  constructor(appErrorHandler, onReceiveSendingResult) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler
    this.onReceiveSendingResult = onReceiveSendingResult;
  }
  async connect(
    accessToken,
    onReceiveGroupData,
    onReceiveFoundGroups,
    onReceiveCheckGroupNamePartResult,
    onReceiveSimpleGroup,
    onReceiveGroupResultType,
    onSendGroupImage,) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/GroupHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    this.receiveGroupData(connection, onReceiveGroupData);
    this.receiveFoundGroups(connection, onReceiveFoundGroups);
    this.receiveCheckGroupNamePartResult(connection, onReceiveCheckGroupNamePartResult);
    

    this.sendGroupImage(connection, onSendGroupImage);
    this.receiveGroupResultType(connection, onReceiveGroupResultType);
    this.receiveSimpleGroup(connection, onReceiveSimpleGroup);
    await Start(connection);
    this.connection = connection;
  }
  receiveGroupData(connection, onReceiveGroupData) {
    connection.on("ReceiveGroupData", function (data) {
      const simpleUsers = data.Users.map(simpleUser => new UserInGroup(
        simpleUser.Id,
        simpleUser.Email,
        simpleUser.ImageName,
        simpleUser.IsCreator));
      const sentFiles = data.SentFiles.map(sentFile => new MessageFileModel(
        sentFile.Id,
        sentFile.Name,
        sentFile.ContentName,
        new Date(sentFile.SendDate),
        sentFile.GroupId,
        new SimpleUserModel(
          sentFile.User.Id,
          sentFile.User.Email,
          sentFile.User.ImageName
        ),
        true));
      const messages = data.Messages.map(message => new MessageModel(
        message.Id,
        message.Value,
        new Date(message.SendDate),
        message.GroupId,
        new SimpleUserModel(message.User.Id,
          message.User.Email,
          message.User.ImageName),
        true));
      const invitations = data.Invitations && data.Invitations.map(invitation => new Invitation(
        invitation.Value,
        new Date(invitation.SendDate),
        new SimpleGroupModel(invitation.SimpleGroup.Id,
        invitation.SimpleGroup.Name,
        invitation.SimpleGroup.ImageName,
        invitation.SimpleGroup.Type),
        new SimpleUserModel(invitation.InvitedUser.Id,
          invitation.InvitedUser.Email,
          invitation.InvitedUser.ImageName),
        new SimpleUserModel(invitation.Inviter.Id,
          invitation.Inviter.Email,
          invitation.Inviter.ImageName)));
      const applications = data.Applications && data.Applications.map(application => new Application(
        application.Value,
        new Date(application.SendDate),
        application.GroupId,
        new SimpleUserModel(application.User.Id,
          application.User.Email,
          application.User.ImageName)));
      
      const groupData = new GroupModel(
        data.Id,
        data.Name,
        new Date(data.CreationDate),
        data.ImageName,
        data.Type,
        data.IsCreator,
        simpleUsers,
        sentFiles,
        messages,
        invitations,
        applications
      );
      onReceiveGroupData(groupData);
   })
  }
  receiveFoundGroups(connection, onReceiveFoundGroups) {
    connection.on("ReceiveNoMySearchedGroups", function (groups) {
      const res =
        groups.map(group => new SimpleGroupModel(group.Id, group.Name, group.ImageName, group.Type, group.LastMessage));
      onReceiveFoundGroups(res);
    });
  }
  receiveCheckGroupNamePartResult(connection, onReceiveCheckGroupNamePartResult) {
    connection.on("ReceiveCheckGroupNamePartResult", function (canUseGroupName) {
      onReceiveCheckGroupNamePartResult(canUseGroupName);
    });
  }
  sendGroupImage(connection, onSendGroupImage) {
    connection.on("SendGroupImage", function (newImageId, previousImageId) {
      onSendGroupImage(newImageId, previousImageId);
    })
  }

  receiveGroupResultType(connection, onReceiveGroupResultType) {
    connection.on("ReceiveGroupResultType", function (resultType) {
      onReceiveGroupResultType(resultType);
    });
  }

  receiveSimpleGroup(connection, onReceiveSimpleGroup) {
    connection.on("ReceiveSimpleGroup", function (group) {
      const simpleGroupModel = new SimpleGroupModel(group.Id,
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
          true) : new MessageModel());
      onReceiveSimpleGroup(simpleGroupModel);
    });
  }

  async createGroup(group) {
    const methodName = "CreateGroup";
    const result = await this.connection.invoke(methodName, group)
      .catch((err) => this.appErrorHandler.handling(err, methodName));
    switch (result) {
      case 200:
        this.onReceiveSendingResult("The group was successfully added");
        break;
    };
  }
  sendGroupData(groupId) {
    const methodName = "SendGroupData";
    this.connection.invoke(methodName, groupId).catch((err) => this.appErrorHandler.handling(err, methodName));
  }
  searchNoMyGroups(groupNamePart) {
    const methodName = "SearchNoMyGroup";
    this.connection.invoke(methodName, groupNamePart).catch((err) => this.appErrorHandler.handling(err, methodName))
  }
  checkGroupNamePart(groupNamePart) {
    const methodName = "CheckGroupNamePart";
    this.connection.invoke(methodName, groupNamePart).catch((err) => this.appErrorHandler.handling(err, methodName))
  }
  async leaveGroup(groupId) {
    const methodName = "LeaveGroup";
    const result = await this.connection.invoke(methodName, groupId)
      .catch((err) => this.appErrorHandler.handling(err, methodName));
    switch (result) {
      case 200:
        this.onReceiveSendingResult("The group was successfully left");
        break;
    };
  }
  async removeGroup(groupId) {
    const methodName = "RemoveGroup";
    const result = await this.connection.invoke(methodName, groupId)
      .catch((err) => this.appErrorHandler.handling(err, methodName));
    switch (result) {
      case 200:
        this.onReceiveSendingResult("The application was successfully rejected");
        break;
    };
  }
}