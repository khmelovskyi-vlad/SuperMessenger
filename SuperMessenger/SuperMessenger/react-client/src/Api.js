import * as signalR from "@microsoft/signalr"
import React from 'react';
import Country from "./Country";
import SimpleGroup from "./SimpleGroup";
import MainPageData from "./MainPageData";
import MessageModel from "./MessageModel";
import GroupData from "./GroupData";
import UserInGroup from "./UserInGroup";
import SimpleUserModel from "./SimpleUserModel";
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
  async connectToHubs(accessToken, setMainPageData, setGroupData, setFoundUsers) {
    this.messengerConnection = await this.createMessengerConnection(accessToken, setMainPageData, setFoundUsers);
    this.groupConnection = await this.createGroupConnection(accessToken, setGroupData)
    this.messageConnection = await this.createMessageConnection(accessToken);
  }
  async createMessengerConnection(accessToken, setMainPageData, setFoundUsers) {
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
    this.receiveFoundUsers(connection, setFoundUsers);
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
        group.LastMesssage ? new MessageModel(group.LastMesssage.Id,
          group.LastMesssage.Value,
          new Date(group.LastMesssage.SendDate),
          group.LastMesssage.GroupId,
          new SimpleUserModel(group.LastMesssage.User.Id,
          group.LastMesssage.User.Email,
          group.LastMesssage.User.ImageId)) : new MessageModel(),
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
      const sentFiles = data.SentFiles.map(sentFile => new SentFile(
        sentFile.Id,
        sentFile.Name,
        sentFile.ContentId,
        new Date(sentFile.SendDate),
        sentFile.GroupId,
        new SimpleUserModel(sentFile.User.Id,
          sentFile.User.Email,
          sentFile.User.ImageId)));
      const messages = data.Messages.map(message => new MessageModel(
        message.Id,
        message.Value,
        // message.SendDate,
        // new Date(message.SendDate),
        new Date(message.SendDate),
        message.GroupId,
        new SimpleUserModel(message.User.Id,
          message.User.Email,
          message.User.ImageId)));
      // console.log("messages");
      // // const res =  messages[0].sendDate.getTime();
      // messages[0].sendDate= new Date(messages[0].sendDate);
      // console.log(typeof(messages[0].sendDate));
      const invitations = data.Invitations.map(invitation => new Invitation(
        invitation.Value,
        new Date(invitation.SendDate),
        invitation.GroupId,
        new SimpleUserModel(invitation.InvitedUser.Id,
          invitation.InvitedUser.Email,
          invitation.InvitedUser.ImageId),
        new SimpleUserModel(invitation.Inviter.Id,
          invitation.Inviter.Email,
          invitation.Inviter.ImageId)));
      const applications = data.Applications.map(application => new Application(
        application.Value,
        new Date(application.SendDate),
        application.GroupId,
        new SimpleUserModel(application.User.Id,
          application.User.Email,
          application.User.ImageId)));
      
      const groupData = new GroupData(
        data.Id,
        data.Name,
        new Date(data.CreationDate),
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
  receiveFoundUsers(connection, setFoundUsers) {
    connection.on("ReceiveFoundUsers", function (users) {
      const res = users.map(user => new SimpleUserModel(user.Id, user.Email, user.ImageId));
      setFoundUsers(res);
    });
  }
  searchUsers(userEmailPart) {
    this.messengerConnection.invoke("SearchUsers", userEmailPart).catch(function (err) {return console.error(err.toString())})
  }
}
