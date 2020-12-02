import * as signalR from "@microsoft/signalr"
import Invitation from "../../Models/Invitation";
import SimpleGroupModel from "../../Models/SimpleGroupModel";
import SimpleUserModel from "../../Models/SimpleUserModel";
import Start from "./Start";


export default class InvitationHub{
  constructor(appErrorHandler) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler
  }
  async connect(accessToken,
    onReceiveInvitation,
    onReceiveMyInvitations,
    onReceiveSendingResultDeclineInvitation,
    onReceiveInvitationResultType,
    onReduceMyInvitations) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/InvitationHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;

    this.receiveInvitation(connection, onReceiveInvitation);
    this.receiveMyInvitations(connection, onReceiveMyInvitations);
    this.receiveDeclineInvitationResult(connection, onReceiveSendingResultDeclineInvitation);

    this.reduceMyInvitations(connection, onReduceMyInvitations);
    this.receiveInvitationResultType(connection, onReceiveInvitationResultType);
    await Start(connection);
    this.connection = connection;
  }

  receiveInvitation(connection, onReceiveInvitation) {
    connection.on("ReceiveInvitation", function (invitation) {
      // console.log(invitation);
      const myInvitation = new Invitation(
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
          invitation.Inviter.ImageId));
      onReceiveInvitation(myInvitation);
    });
  }
  receiveMyInvitations(connection, onReceiveMyInvitations) {
    connection.on("ReceiveMyInvitations", function (invitations) {
      const myInvitations = invitations.map(invitation => new Invitation(
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
      onReceiveMyInvitations(myInvitations);
    });
  }
  receiveDeclineInvitationResult(connection, onReceiveSendingResultDeclineInvitation) {
    connection.on("ReceiveDeclineInvitationResult", function (result) {
      onReceiveSendingResultDeclineInvitation(result);
    });
  }
  reduceMyInvitations(connection, onReduceMyInvitations) {
    connection.on("ReduceMyInvitations", function (invitationModels) {
      //////////////////////////////////////change
      const invitations = invitationModels.map(invitation => new Invitation(
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
      console.log(invitations);
      onReduceMyInvitations(invitations);
    });
  }
  receiveInvitationResultType(connection, onReceiveInvitationResultType) {
    connection.on("ReceiveInvitationResultType", function (resultType) {
      onReceiveInvitationResultType(resultType);
    })
  }
  

  sendMyInvitations() {
    this.connection.invoke("SendMyInvitations").catch(this.appErrorHandler.handling)
  }
  sendInvitation(invitation) {
    this.connection.invoke("SendInvitation", invitation).catch(this.appErrorHandler.handling)
  }
  acceptInvitation(invitation) {
    this.connection.invoke("AcceptInvitation", invitation).catch(this.appErrorHandler.handling)
  }
  declineInvitation(invitation) {
    this.connection.invoke("DeclineInvitation", invitation).catch(this.appErrorHandler.handling)
  }
}