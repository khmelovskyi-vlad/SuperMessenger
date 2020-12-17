import * as signalR from "@microsoft/signalr"
import InvitationModel from "../../Models/InvitationModel";
import ReduceInvtationModel from "../../Models/ReduceInvtationModel";
import SimpleGroupModel from "../../Models/SimpleGroupModel";
import SimpleUserModel from "../../Models/SimpleUserModel";
import Start from "./Start";

require("dotenv").config();

export default class InvitationHub{
  constructor(appErrorHandler, onReceiveSendingResult) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler
    this.onReceiveSendingResult = onReceiveSendingResult;
  }
  async connect(accessToken,
    onReceiveInvitation,
    onReceiveMyInvitations,
    onReduceMyInvitations) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_SUPER_INVITATION_HUB_PATH, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 600000;

    this.receiveInvitation(connection, onReceiveInvitation);
    this.receiveMyInvitations(connection, onReceiveMyInvitations);

    this.reduceMyInvitations(connection, onReduceMyInvitations);
    await Start(connection);
    this.connection = connection;
  }

  receiveInvitation(connection, onReceiveInvitation) {
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
  }
  receiveMyInvitations(connection, onReceiveMyInvitations) {
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
  }
  reduceMyInvitations(connection, onReduceMyInvitations) {
    connection.on("ReduceMyInvitations", function (reduceInvtationModels) {
      const newReduceInvtationModels = reduceInvtationModels.map(reduceInvtationModel => new ReduceInvtationModel(
        reduceInvtationModel.GroupId,
        reduceInvtationModel.InvitedUserId,
        reduceInvtationModel.InviterId,
      ));
      onReduceMyInvitations(newReduceInvtationModels);
    });
  }
  

  sendMyInvitations() {
    const methodName = "SendMyInvitations";
    this.connection.invoke(methodName).catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  sendInvitation(invitation) {
    const methodName = "SendInvitation";
    this.connection.invoke(methodName, invitation)
      .then(() => this.onReceiveSendingResult("The invitation was successfully submitted"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  acceptInvitation(invitation) {
    const methodName = "AcceptInvitation";
    this.connection.invoke(methodName, invitation)
      .then(() => this.onReceiveSendingResult("The invitation was successfully accepted"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  declineInvitation(invitation) {
    const methodName = "DeclineInvitation";
    this.connection.invoke(methodName, invitation)
      .then(() => this.onReceiveSendingResult("The invitation was successfully declined"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
}