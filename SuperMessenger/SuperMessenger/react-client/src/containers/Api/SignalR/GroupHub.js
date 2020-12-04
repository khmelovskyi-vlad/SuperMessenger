import * as signalR from "@microsoft/signalr"
import Application from "../../Models/Application";
import GroupData from "../../Models/GroupData";
import Invitation from "../../Models/Invitation";
import MessageModel from "../../Models/MessageModel";
import SentFileModel from "../../Models/SentFileModel";
import SimpleGroupModel from "../../Models/SimpleGroupModel";
import SimpleUserModel from "../../Models/SimpleUserModel";
import UserInGroup from "../../Models/UserInGroup";
import Start from "./Start";

export default class GroupHub{
  constructor(appErrorHandler) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler
  }
  async connect(
    accessToken,
    onReceiveGroupData,
    onReceiveFoundGroups,
    onReceiveCheckGroupNamePartResult,
    onReceiveSimpleGroup,
    onReceiveGroupResultType,
    onReceiveLeftGroupUserId,
    onSendGroupImage,
    onReceiveNewGroupUser,
    onReceiveRomevedGroup) {
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
    this.receiveLeftGroupUserId(connection, onReceiveLeftGroupUserId);
    this.receiveGroupResultType(connection, onReceiveGroupResultType);
    this.receiveSimpleGroup(connection, onReceiveSimpleGroup);
    this.receiveNewGroupUser(connection, onReceiveNewGroupUser);
    this.receiveRomevedGroup(connection, onReceiveRomevedGroup)
    await Start(connection);
    this.connection = connection;
  }
  receiveGroupData(connection, onReceiveGroupData) {
    connection.on("ReceiveGroupData", function (data) {
      const simpleUsers = data.Users.map(simpleUser => new UserInGroup(
        simpleUser.Id,
        simpleUser.Email,
        simpleUser.ImageId,
        simpleUser.IsCreator));
      const sentFiles = data.SentFiles.map(sentFile => new SentFileModel(
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
      const messages = data.Messages.map(message => new MessageModel(
        message.Id,
        message.Value,
        new Date(message.SendDate),
        message.GroupId,
        new SimpleUserModel(message.User.Id,
          message.User.Email,
          message.User.ImageId),
        true));
      const invitations = data.Invitations && data.Invitations.map(invitation => new Invitation(
        invitation.Value,
        new Date(invitation.SendDate),
        new SimpleGroupModel(invitation.SimpleGroup.Id,
        invitation.SimpleGroup.Name,
        invitation.SimpleGroup.ImageId,
        invitation.SimpleGroup.Type),
        new SimpleUserModel(invitation.InvitedUser.Id,
          invitation.InvitedUser.Email,
          invitation.InvitedUser.ImageId),
        new SimpleUserModel(invitation.Inviter.Id,
          invitation.Inviter.Email,
          invitation.Inviter.ImageId)));
      const applications = data.Applications && data.Applications.map(application => new Application(
        application.Value,
        new Date(application.SendDate),
        application.GroupId,
        new SimpleUserModel(application.User.Id,
          application.User.Email,
          application.User.ImageId)));
      
      const groupData = new GroupData(
        data.Id,
        data.Name,
        new Date(data.CreationDate),
        data.ImageId,
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
      const res = groups.map(group => new SimpleGroupModel(group.Id, group.Name, group.ImageId, group.Type, group.LastMessage));
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
  receiveLeftGroupUserId(connection, onReceiveLeftGroupUserId) {
    connection.on("ReceiveLeftGroupUserId", function (userId, groupId) {
      onReceiveLeftGroupUserId(userId, groupId);
    });
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
        group.ImageId,
        group.Type,
        group.LastMessage ? new MessageModel(group.LastMessage.Id,
          group.LastMessage.Value,
          new Date(group.LastMessage.SendDate),
          group.LastMessage.GroupId,
          new SimpleUserModel(group.LastMessage.User.Id,
          group.LastMessage.User.Email,
          group.LastMessage.User.ImageId),
          true) : new MessageModel());
      onReceiveSimpleGroup(simpleGroupModel);
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
  receiveRomevedGroup(connection, onReceiveRomevedGroup) {
    connection.on("ReceiveRomevedGroup", function (groupId, removalResult ) {
      onReceiveRomevedGroup(groupId, removalResult);
    });
  }

  createGroup(group) {
    this.connection.invoke("CreateGroup", group).catch(this.appErrorHandler.handling);
  }
  sendGroupData(groupId) {
    this.connection.invoke("SendGroupData", groupId).catch(this.appErrorHandler.handling);
  }
  searchNoMyGroups(groupNamePart) {
    this.connection.invoke("SearchNoMyGroup", groupNamePart).catch(this.appErrorHandler.handling)
  }
  checkGroupNamePart(groupNamePart) {
    this.connection.invoke("CheckGroupNamePart", groupNamePart).catch(this.appErrorHandler.handling)
  }
  leaveGroup(groupId) {
    this.connection.invoke("LeaveGroup", groupId).catch(this.appErrorHandler.handling);
  }
  removeGroup(groupId) {
    this.connection.invoke("RemoveGroup", groupId).catch(this.appErrorHandler.handling);
  }
}