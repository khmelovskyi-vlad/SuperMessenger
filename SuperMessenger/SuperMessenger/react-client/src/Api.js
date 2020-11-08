import * as signalR from "@microsoft/signalr"
import React from 'react';
import Country from "./Country";
import SimpleGroup from "./SimpleGroup";
import MainPageData from "./MainPageData";
import Message from "./Message";
export default class Api { 
  constructor() {
    this.messengerConnection = undefined;
    this.groupConnection = undefined;
  }
  // get con() {
  //   return this.messengerConnection;
  // }
  async connectToHubs(accessToken, setMainPageData) {
    this.messengerConnection = await this.createMessengerConnection(accessToken, setMainPageData);
    this.groupConnection = await this.createGroupConnection(accessToken)
  }
  async createMessengerConnection(accessToken, setMainPageData) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/SuperMessengerHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    this.receiveFirstData(connection, setMainPageData);
    await this.start(connection);
    console.log(connection);
    return connection;
  }
  async createGroupConnection(accessToken) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/GroupHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    this.receiveGroup(connection);
    await this.start(connection);
    console.log(connection);
    return connection;
  }
  async start(connection) {
      await connection.start().catch(function (e) {
    });;
  }
  async stop(connection) {
      await connection.stop().catch(function (e) {
    });;
  }
  receiveGroup(connection) {
    connection.on("ReceiveFirstData", function (group) {
      console.log(group);
   })
  }
  createGroup(groupType, groupName, formData) {
    // console.log(group);
    this.groupConnection.invoke("CreateGroup", groupType, groupName, formData).catch(function (err) {return console.error(err.toString())})
  }
  // receiveMessage() {
  //     this.messengerConnection.on("ReceiveMessage", function (message) {
  //         console.log(message);
  //   })
  // }
  receiveFirstData(connection, setMainPageData) {
    connection.on("ReceiveFirstData", function (data) {
      const countries = data.Countries.map(country => new Country(country.Id, country.Value));
      const simpleGroupModel = data.Groups.map(group => new SimpleGroup(group.Id,
        group.Name,
        group.ImageId,
        group.Type,
        group.LastMesssage ? new Message(group.LastMesssage.Id,
          group.LastMesssage.Value,
          group.LastMesssage.SendDate,
          group.LastMesssage.UserId,
          group.LastMesssage.UserEmail,
          group.LastMesssage.GroupId) : new Message(),
        /*group.CreationDate,
        group.IsCreator*/));
      const mainPageData = new MainPageData(
        data.Id,
        data.Email,
        data.FirstName,
        data.LastName,
        data.ImageId,
        data.InvitationCount,
        data.ApplicationCount,
        countries,
        simpleGroupModel,
      );
      setMainPageData(mainPageData);
      console.log("mainPageData");
      console.log(mainPageData);
   })
  }
  sendFirstData() {
    this.messengerConnection.invoke("SendFirstData").catch(function (err) {return console.error(err.toString())})
  }
  sendNewGroup(newGroup) {
    let req = new XMLHttpRequest();                            
    req.open("POST", 'https://localhost:44370/api/Groups');
    req.send(newGroup);
  }
  changeProfile(profile) {
    let req = new XMLHttpRequest();                            
    req.open("PUT", 'https://localhost:44370/api/Users');
    console.log(profile);
    req.send(profile);
    // req.send("2");
  }
}
