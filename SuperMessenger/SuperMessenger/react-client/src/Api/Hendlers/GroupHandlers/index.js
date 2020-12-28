import ApplicationModel from "../../../Models/ApplicationModel";
import GroupModel from "../../../Models/GroupModel";
import InvitationModel from "../../../Models/InvitationModel";
import MessageFileModel from "../../../Models/MessageFileModel";
import MessageModel from "../../../Models/MessageModel";
import SimpleGroupModel from "../../../Models/SimpleGroupModel";
import SimpleUserModel from "../../../Models/SimpleUserModel";
import UserInGroup from "../../../Models/UserInGroup";

let connection = null;
let setConnectedMethods = null;

export function initializeData(_connection, _setConnectedMethods) {
  connection = _connection;
  setConnectedMethods = _setConnectedMethods;
}

export function receiveGroupData(onReceiveGroupData) {
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
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveNoMySearchedGroups(onReceiveNoMySearchedGroups) {
  connection.on("ReceiveNoMySearchedGroups", function (groups) {
    const newGroups =
      groups.map(group => new SimpleGroupModel(group.Id, group.Name, group.ImageName, group.Type, group.LastMessage));
    onReceiveNoMySearchedGroups(newGroups);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveCheckGroupNamePartResult(onReceiveCheckGroupNamePartResult) {
  connection.on("ReceiveCheckGroupNamePartResult", function (canUseGroupName) {
    onReceiveCheckGroupNamePartResult(canUseGroupName);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveSimpleGroup(onReceiveSimpleGroup) {
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
  setConnectedMethods(prev => prev + 1);
}
export function receiveNewOwnerUserId(onReceiveNewOwnerUserId) {
  connection.on("ReceiveNewOwnerUserId", function (userId, groupId) {
    onReceiveNewOwnerUserId(userId, groupId);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveLeftGroupUserId(onReceiveLeftGroupUserId) {
  connection.on("ReceiveLeftGroupUserId", function (userId, groupId) {
    onReceiveLeftGroupUserId(userId, groupId);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveRomevedGroup(onReceiveRomevedGroup) {
  connection.on("ReceiveRomevedGroup", function (groupId, groupName) {
    onReceiveRomevedGroup(groupId, groupName);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveNewGroupUser(onReceiveNewGroupUser) {
  connection.on("ReceiveNewGroupUser", function (user, groupId) {
    const userInGroup = new UserInGroup(
      user.Id,
      user.Email,
      user.ImageName,
      user.IsCreator);
    onReceiveNewGroupUser(userInGroup, groupId);
  });
  setConnectedMethods(prev => prev + 1);
}
const GroupHandlers = {
  initializeData,
  receiveGroupData,
  receiveNoMySearchedGroups,
  receiveCheckGroupNamePartResult,
  receiveSimpleGroup,
  receiveNewOwnerUserId,
  receiveLeftGroupUserId,
  receiveRomevedGroup,
  receiveNewGroupUser
}
export default GroupHandlers;