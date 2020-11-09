import * as signalR from "@microsoft/signalr"
import React from 'react';
import Country from "./Country";
import SimpleGroup from "./SimpleGroup";
import MainPageData from "./MainPageData";
import Message from "./Message";
import GroupData from "./GroupData";
import UserInGroup from "./UserInGroup";
import SimpleUser from "./SimpleUser";
import SentFile from "./SentFile";
import Invitation from "./Invitation";
import Application from "./Application";
export default class Api { 
  constructor() {
    this.messengerConnection = undefined;
    this.groupConnection = undefined;
    this.messageConnection = undefined;
  }
  // get con() {
  //   return this.messengerConnection;
  // }
  async connectToHubs(accessToken, setMainPageData, setGroupData) {
    this.messengerConnection = await this.createMessengerConnection(accessToken, setMainPageData);
    this.groupConnection = await this.createGroupConnection(accessToken, setGroupData)
    this.messageConnection = await this.createMessageConnection(accessToken);
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
    return connection;
  }
  async createGroupConnection(accessToken, setGroupData) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/GroupHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    // this.receiveGroup(connection);
    this.receiveGroupData(connection, setGroupData);
    await this.start(connection);
    return connection;
  }
  async createMessageConnection(accessToken) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/MessageHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    await this.start(connection);
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
  // receiveGroup(connection) {
  //   connection.on("ReceiveFirstData", function (group) {
  //     console.log(group);
  //  })
  // }
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
          group.LastMesssage.GroupId,
          new SimpleUser(group.LastMesssage.User.Id,
          group.LastMesssage.User.Email,
          group.LastMesssage.User.ImageId)) : new Message(),
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
  sendGroupData(groupId) {
    this.groupConnection.invoke("SendGroupData", groupId).catch(function (err) {return console.error(err.toString())})
  }
  receiveGroupData(connection, setGroupData) {
    connection.on("ReceiveGroup", function (data) {
      const simpleUsers = data.Users.map(simpleUser => new UserInGroup(
        simpleUser.Id,
        simpleUser.Email,
        simpleUser.ImageId,
        simpleUser.IsCreator));
      const sentFiles = data.SentFiles.map(sentFiles => new SentFile(
        sentFiles.Id,
        sentFiles.Name,
        sentFiles.ContentId,
        sentFiles.SendDate,
        sentFiles.GroupId,
        new SimpleUser(sentFiles.User.Id,
          sentFiles.User.Email,
          sentFiles.User.ImageId)));
      const messages = data.Messages.map(message => new Message(
        message.Id,
        message.Value,
        message.SendDate,
        message.GroupId,
        new SimpleUser(message.User.Id,
          message.User.Email,
          message.User.ImageId)));
      const invitations = data.Invitations.map(invitation => new Invitation(
        invitation.Value,
        invitation.SendDate,
        invitation.GroupId,
        new SimpleUser(invitation.InvitedUser.Id,
          invitation.InvitedUser.Email,
          invitation.InvitedUser.ImageId),
        new SimpleUser(invitation.Inviter.Id,
          invitation.Inviter.Email,
          invitation.Inviter.ImageId)));
      
      const applications = data.Applications.map(application => new Application(
        application.Value,
        application.SendDate,
        application.GroupId,
        new SimpleUser(application.User.Id,
          application.User.Email,
          application.User.ImageId)));
      
      const groupData = new GroupData(
        data.Id,
        data.Name,
        data.CreationDate,
        data.ImageId,
        data.Type,
        data.IsCreator,
        simpleUsers,
        sentFiles,
        messages,
        invitations,
        applications
      );
      setGroupData(groupData);
      console.log("groupData");
      console.log(groupData);
   })
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
  sendMessage(message) {
    this.messageConnection.invoke("SendMessage", message).catch(function (err) {return console.error(err.toString())})
  }
}
