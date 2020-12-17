import * as signalR from "@microsoft/signalr"
import ApplicationModel from "../../Models/ApplicationModel";
import SimpleUserModel from "../../Models/SimpleUserModel";
import Start from "./Start";

require("dotenv").config();

export default class ApplicationHub{
  constructor(appErrorHandler, onReceiveSendingResult) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler;
    this.onReceiveSendingResult = onReceiveSendingResult;
  }
  async connect(accessToken,
    onReceiveApplication,
    onReduceMyApplicationsCount,
    onReduceGroupApplication,
    onIncreaseMyApplicationsCount,) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_SUPER_APPLICATION_HUB_PATH, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 600000;
    
    this.receiveApplication(connection, onReceiveApplication);
    this.increaseMyApplicationsCount(connection, onIncreaseMyApplicationsCount);
    this.reduceMyApplicationsCount(connection, onReduceMyApplicationsCount);
    this.reduceGroupApplication(connection, onReduceGroupApplication);
    await Start(connection);
    this.connection = connection;
  }
  receiveApplication(connection, onReceiveApplication) {
    connection.on("ReceiveApplication", function (application) {
      const myApplication = new ApplicationModel(
        application.Value,
        new Date(application.SendDate),
        application.GroupId,
        new SimpleUserModel(application.User.Id,
          application.User.Email,
          application.User.ImageName));
      onReceiveApplication(myApplication);
    });
  }
  
  increaseMyApplicationsCount(connection, onIncreaseMyApplicationsCount) {
    connection.on("IncreaseMyApplicationsCount", function (applicationsCount) {
      onIncreaseMyApplicationsCount(applicationsCount);
    });
  }
  reduceMyApplicationsCount(connection, onReduceMyApplicationsCount) {
    connection.on("ReduceMyApplicationsCount", function (applicationsCount) {
      onReduceMyApplicationsCount(applicationsCount);
    });
  }
  reduceGroupApplication(connection, onReduceGroupApplication) {
    connection.on("ReduceGroupApplication", function (userId, groupId) {
      onReduceGroupApplication(userId, groupId);
    });
  }





  sendApplication(application) {
    const methodName = "SendApplication";
    this.connection.invoke(methodName, application)
      .then(() => this.onReceiveSendingResult("The application was successfully submitted"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  acceptApplication(application) {
    const methodName = "AcceptApplication";
    this.connection.invoke(methodName, application)
      .then(() => this.onReceiveSendingResult("The application was successfully accepted"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
  rejectApplication(application) {
    const methodName = "RejectApplication";
    this.connection.invoke(methodName, application)
      .then(() => this.onReceiveSendingResult("The application was successfully submitted"))
      .catch((err) => this.appErrorHandler.hubHandle(err, methodName));
  }
}