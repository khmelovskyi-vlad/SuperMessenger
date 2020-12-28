import * as signalR from "@microsoft/signalr"

require("dotenv").config();

export default function SignalRConnections(accessToken) {
  const groupHubConnection = createApplication(process.env.REACT_APP_SUPER_GROUP_HUB_PATH);
  const applicationHubConnection = createApplication(process.env.REACT_APP_SUPER_APPLICATION_HUB_PATH);
  const invitationHubConnection = createApplication(process.env.REACT_APP_SUPER_INVITATION_HUB_PATH);
  const superMessengerHubConnection = createApplication(process.env.REACT_APP_SUPER_MESSENGER_HUB_PATH);

  function createApplication(url) {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(url, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 600000;
    return connection;
  }
  return ({groupHubConnection, applicationHubConnection, invitationHubConnection, superMessengerHubConnection});
}