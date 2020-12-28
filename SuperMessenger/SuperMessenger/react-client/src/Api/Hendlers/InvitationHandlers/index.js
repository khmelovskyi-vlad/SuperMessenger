import InvitationModel from "../../../Models/InvitationModel";
import ReduceInvtationModel from "../../../Models/ReduceInvtationModel";
import SimpleGroupModel from "../../../Models/SimpleGroupModel";
import SimpleUserModel from "../../../Models/SimpleUserModel";

let connection = null;
let setConnectedMethods = null;

export function initializeData(_connection, _setConnectedMethods) {
  connection = _connection;
  setConnectedMethods = _setConnectedMethods;
}

export function receiveInvitation(onReceiveInvitation) {
  connection.on("ReceiveInvitation", function (invitation) {
    const myInvitation = new InvitationModel(
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
        invitation.Inviter.ImageName));
    onReceiveInvitation(myInvitation);
  });
  setConnectedMethods(prev => prev + 1);
}
export function receiveMyInvitations(onReceiveMyInvitations) {
  connection.on("ReceiveMyInvitations", function (invitations) {
    const myInvitations = invitations.map(invitation => new InvitationModel(
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
    onReceiveMyInvitations(myInvitations);
  });
  setConnectedMethods(prev => prev + 1);
}
export function reduceMyInvitations(onReduceMyInvitations) {
  connection.on("ReduceMyInvitations", function (reduceInvtationModels) {
    const newReduceInvtationModels = reduceInvtationModels.map(reduceInvtationModel => new ReduceInvtationModel(
      reduceInvtationModel.GroupId,
      reduceInvtationModel.InvitedUserId,
      reduceInvtationModel.InviterId,
    ));
    onReduceMyInvitations(newReduceInvtationModels);
  });
  setConnectedMethods(prev => prev + 1);
}
const InvitationHandlers = {
  initializeData,
  receiveInvitation,
  receiveMyInvitations,
  reduceMyInvitations
}
export default InvitationHandlers;