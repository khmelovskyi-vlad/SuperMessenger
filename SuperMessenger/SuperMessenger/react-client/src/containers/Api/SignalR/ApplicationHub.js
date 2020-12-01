import * as signalR from "@microsoft/signalr"
import Application from "../../Models/Application";
import Invitation from "../../Models/Invitation";
import SimpleUserModel from "../../Models/SimpleUserModel";
import Start from "./Start";


export default class ApplicationHub{
  constructor() {
    this.connection = undefined;
  }
  async connect(accessToken,
    onReceiveApplication,
    onReceiveMyApplications,
    onReceiveSendingResultDeclineApplication,
    onReceiveApplicationResultType,
    onReduceMyApplicationsCount,
    onReduceGroupApplication,
    onIncreaseMyApplicationsCount,) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/ApplicationHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    
    this.receiveApplication(connection, onReceiveApplication);
    this.receiveMyApplications(connection, onReceiveMyApplications);
    this.receiveRejectApplicationResult(connection, onReceiveSendingResultDeclineApplication);
    this.increaseMyApplicationsCount(connection, onIncreaseMyApplicationsCount);
    this.reduceMyApplicationsCount(connection, onReduceMyApplicationsCount);
    this.reduceGroupApplication(connection, onReduceGroupApplication);
    this.receiveApplicationResultType(connection, onReceiveApplicationResultType);
    await Start(connection);
    this.connection = connection;
  }
  receiveApplication(connection, onReceiveApplication) {
    connection.on("ReceiveApplication", function (application) {
      const myApplication = new Application(
        application.Value,
        new Date(application.SendDate),
        application.GroupId,
        new SimpleUserModel(application.User.Id,
          application.User.Email,
          application.User.ImageId));
      onReceiveApplication(myApplication);
    });
  }
  receiveMyApplications(connection, onReceiveMyApplications) {
    connection.on("ReceiveMyApplications", function (applications) {
      const myApplications = applications.map(application => new Invitation(
        application.Value,
        new Date(application.SendDate),
        application.GroupId,
        new SimpleUserModel(application.InvitedUser.Id,
          application.InvitedUser.Email,
          application.InvitedUser.ImageId)));
      onReceiveMyApplications(myApplications);
    });
  }
  receiveRejectApplicationResult(connection, onReceiveSendingResultRejectApplication) {
    connection.on("ReceiveRejectApplicationResult", function (result) {
      onReceiveSendingResultRejectApplication(result);
    });
  }
  increaseMyApplicationsCount(connection, onIncreaseMyApplicationsCount) {
    connection.on("IncreaseMyApplicationsCount", function (applicationsCount) {
      onIncreaseMyApplicationsCount(applicationsCount);
    });
  }
  reduceMyApplicationsCount(connection, onReduceMyApplicationsCount) {
    connection.on("ReduceMyApplicationCount", function (applicationsCount) {
      onReduceMyApplicationsCount(applicationsCount);
    });
  }
  reduceGroupApplication(connection, onReduceGroupApplication) {
    connection.on("ReduceGroupApplication", function (userId, groupId) {
      onReduceGroupApplication(userId, groupId);
    });
  }
  receiveApplicationResultType(connection, onReceiveApplicationResultType) {
    connection.on("ReceiveApplicationResultType", function (resultType) {
      onReceiveApplicationResultType(resultType);
    })
  }
  sendApplication(application) {
    this.connection.invoke("SendApplication", application).catch(function (err) {return console.error(err.toString())})
  }
  acceptApplication(application) {
    this.connection.invoke("AcceptApplication", application).catch(function (err) {return console.error(err.toString())})
  }
  rejectApplication(application) {
    this.connection.invoke("RejectApplication", application).catch(function (err) {return console.error(err.toString())})
  }
  










  reduceMyApplications(connection, onReduceMyApplications) {
    connection.on("ReduceMyApplications", function (applicationModels) {
      //////////////////////////////////////change
      onReduceMyApplications(applicationModels);
    });
  }
}