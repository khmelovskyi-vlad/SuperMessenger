import * as signalR from "@microsoft/signalr"
import ApplicationModel from "../../Models/ApplicationModel";
import GroupModel from "../../Models/GroupModel";
import InvitationModel from "../../Models/InvitationModel";
import MessageModel from "../../Models/MessageModel";
import MessageFileModel from "../../Models/MessageFileModel";
import SimpleGroupModel from "../../Models/SimpleGroupModel";
import SimpleUserModel from "../../Models/SimpleUserModel";
import UserInGroup from "../../Models/UserInGroup";
import Start from "./Start";

require("dotenv").config();

export default class GroupHub{
  constructor(appErrorHandler, onReceiveSendingResult) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler
    this.onReceiveSendingResult = onReceiveSendingResult;
    this.createGroup = this.createGroup.bind(this);
  }
  async connect(
    accessToken,
    onReceiveGroupData,
    onReceiveNoMySearchedGroups,
    onReceiveCheckGroupNamePartResult,
    onReceiveSimpleGroup,) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_SUPER_GROUP_HUB_PATH, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 600000;
    this.receiveGroupData(connection, onReceiveGroupData);
    this.receiveNoMySearchedGroups(connection, onReceiveNoMySearchedGroups);
    this.receiveCheckGroupNamePartResult(connection, onReceiveCheckGroupNamePartResult);

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
      const messageFiles = data.MessageFiles.map(messageFile => new MessageFileModel(
        messageFile.Id,
        messageFile.Name,
        new Date(messageFile.SendDate),
        messageFile.GroupId,
        new SimpleUserModel(
          messageFile.User.Id,
          messageFile.User.Email,
          messageFile.User.ImageName
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
      const invitations = data.Invitations && data.Invitations.map(invitation => new InvitationModel(
        invitation.Value,
        new Date(invitation.SendDate),
        new SimpleGroupModel(invitation.Group.Id,
        invitation.Group.Name,
        invitation.Group.ImageName,
        invitation.Group.Type),
        new SimpleUserModel(invitation.InvitedUser.Id,
          invitation.InvitedUser.Email,
          invitation.InvitedUser.ImageName),
        new SimpleUserModel(invitation.Inviter.Id,
          invitation.Inviter.Email,
          invitation.Inviter.ImageName)));
      const applications = data.Applications && data.Applications.map(application => new ApplicationModel(
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
        messageFiles,
        messages,
        invitations,
        applications
      );
      onReceiveGroupData(groupData);
   })
  }
  receiveNoMySearchedGroups(connection, onReceiveNoMySearchedGroups) {
    connection.on("ReceiveNoMySearchedGroups", function (groups) {
      const newGroups =
        groups.map(group => new SimpleGroupModel(group.Id, group.Name, group.ImageName, group.Type, group.LastMessage));
      onReceiveNoMySearchedGroups(newGroups);
    });
  }
  receiveCheckGroupNamePartResult(connection, onReceiveCheckGroupNamePartResult) {
    connection.on("ReceiveCheckGroupNamePartResult", function (canUseGroupName) {
      onReceiveCheckGroupNamePartResult(canUseGroupName);
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
          true) : null);
      onReceiveSimpleGroup(simpleGroupModel);
    });
  }


  createGroup(group) {
    const methodName = "CreateGroup";
    this.connection.invoke(methodName, group)
      .then(() => this.onReceiveSendingResult("The group was successfully added"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  sendGroupData(groupId) {
    const methodName = "SendGroupData";
    this.connection.invoke(methodName, groupId).catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  searchNoMyGroups(groupNamePart) {
    const methodName = "SearchNoMyGroup";
    this.connection.invoke(methodName, groupNamePart).catch((err) => this.appErrorHandler.hubHandle(err, methodName))
  }
  checkGroupNamePart(groupNamePart) {
    const methodName = "CheckGroupNamePart";
    this.connection.invoke(methodName, groupNamePart).catch((err) => this.appErrorHandler.hubHandle(err, methodName))
  }
  leaveGroup(groupId) {
    const methodName = "LeaveGroup";
    this.connection.invoke(methodName, groupId)
      .then(() => this.onReceiveSendingResult("The group was successfully left"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  removeGroup(groupId) {
    const methodName = "RemoveGroup";
    this.connection.invoke(methodName, groupId)
      .then(() => this.onReceiveSendingResult("The application was successfully rejected"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
}