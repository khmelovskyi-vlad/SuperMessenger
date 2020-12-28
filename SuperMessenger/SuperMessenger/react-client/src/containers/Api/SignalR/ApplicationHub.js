import * as signalR from "@microsoft/signalr"
import ApplicationModel from "../../../Models/ApplicationModel";
import SimpleUserModel from "../../../Models/SimpleUserModel";
import Start from "../../../Api/Start";

require("dotenv").config();

export default class ApplicationHub{
  constructor(appErrorHandler, onReceiveSendingResult) {
    this.connection = undefined;
    this.appErrorHandler = appErrorHandler;
    this.onReceiveSendingResult = onReceiveSendingResult;
    this.sendApplication = this.sendApplication.bind(this);
    this.acceptApplication = this.acceptApplication.bind(this);
    this.rejectApplication = this.rejectApplication.bind(this);
  }
  connect(accessToken) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl(process.env.REACT_APP_SUPER_APPLICATION_HUB_PATH, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 600000;
    this.connection = connection;
  }

  async handleStart() {
    await Start(this.connection);
  }
  receiveApplication(onReceiveApplication) {
    this.connection.on("ReceiveApplication", function (application) {
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
  increaseMyApplicationsCount(onIncreaseMyApplicationsCount) {
    this.connection.on("IncreaseMyApplicationsCount", function (applicationsCount) {
      onIncreaseMyApplicationsCount(applicationsCount);
    });
  }
  reduceMyApplicationsCount(onReduceMyApplicationsCount) {
    this.connection.on("ReduceMyApplicationsCount", function (applicationsCount) {
      onReduceMyApplicationsCount(applicationsCount);
    });
  }
  reduceGroupApplication(onReduceGroupApplication) {
    this.connection.on("ReduceGroupApplication", function (userId, groupId) {
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