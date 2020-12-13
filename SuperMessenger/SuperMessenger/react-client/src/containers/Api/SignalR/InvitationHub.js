import * as signalR from "@microsoft/signalr"
import Invitation from "../../Models/Invitation";
import ReduceInvtationModel from "../../Models/ReduceInvtationModel";
import SimpleGroupModel from "../../Models/SimpleGroupModel";
import SimpleUserModel from "../../Models/SimpleUserModel";
import Start from "./Start";


export default class InvitationHub{
  constructor(appErrorHandler, onReceiveSendingResult) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler
    this.onReceiveSendingResult = onReceiveSendingResult;
  }
  async connect(accessToken,
    onReceiveInvitation,
    onReceiveMyInvitations,
    onReceiveSendingResultDeclineInvitation,
    onReceiveInvitationResultType,
    onReduceMyInvitations) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("/InvitationHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 600000;

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
          invitation.SimpleGroup.ImageName,
          invitation.SimpleGroup.Type),
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
      const myInvitations = invitations.map(invitation => new Invitation(
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
      onReceiveMyInvitations(myInvitations);
    });
  }
  receiveDeclineInvitationResult(connection, onReceiveSendingResultDeclineInvitation) {
    connection.on("ReceiveDeclineInvitationResult", function (result) {
      onReceiveSendingResultDeclineInvitation(result);
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
  receiveInvitationResultType(connection, onReceiveInvitationResultType) {
    connection.on("ReceiveInvitationResultType", function (resultType) {
      onReceiveInvitationResultType(resultType);
    })
  }
  

  sendMyInvitations() {
    const methodName = "SendMyInvitations";
    this.connection.invoke(methodName).catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  async sendInvitation(invitation) {
    const methodName = "SendInvitation";
    const result = await this.connection.invoke(methodName, invitation)
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
    switch (result) {
      case 200:
        this.onReceiveSendingResult("The invitation was successfully submitted");
        break;
    };
  }
  async acceptInvitation(invitation) {
    const methodName = "AcceptInvitation";
    const result = await this.connection.invoke(methodName, invitation)
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
    switch (result) {
      case 200:
        this.onReceiveSendingResult("The invitation was successfully accepted");
        break;
    };
  }
  async declineInvitation(invitation) {
    const methodName = "DeclineInvitation";
    const result = await this.connection.invoke(methodName, invitation)
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
    switch (result) {
      case 200:
        this.onReceiveSendingResult("The invitation was successfully declined");
        break;
    };
  }
}