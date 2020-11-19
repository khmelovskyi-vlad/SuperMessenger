import * as signalR from "@microsoft/signalr"
import React from 'react';
import Country from "./Models/Country";
import SimpleGroup from "./Models/SimpleGroup";
import MainPageData from "./Models/MainPageData";
import MessageModel from "./Models/MessageModel";
import GroupData from "./Models/GroupData";
import UserInGroup from "./Models/UserInGroup";
import SimpleUserModel from "./Models/SimpleUserModel";
import SentFileModel from "./Models/SentFileModel";
import Invitation from "./Models/Invitation";
import Application from "./Models/Application";
export default class Api { 
  constructor() {
    this.messengerConnection = undefined;
    this.groupConnection = undefined;
    this.messageConnection = undefined;
  }
  // get con() {
  //   return this.messengerConnection;
  // }
  async connectToHubs(
    accessToken,
    onReceiveMainPageData,
    onReceiveFoundUsers,
    onReceiveGroupData,
    // onReceiveSendingResultAddInvitation,
    onReceiveInvitation,
    onReceiveMyInvitations,
    // onReceiveSendingResultAcceptInvitation,
    onReceiveSendingResultDeclineInvitation,
    onReceiveMessage,
  
    // onReceiveSendingResultAddApplication,
    onReceiveApplication,
    onReceiveMyApplications,
    // onReceiveSendingResultAcceptApplication,
    onReceiveSendingResultDeclineApplication,
    onReceiveFoundGroups,
    // onReceiveApplicationConfirmation,
    onReceiveNewGroupUser,
    onReceiveCheckGroupNamePartResult,
    // onReceiveGroup,
    
    onReceiveInvitationResultType,
    onReceiveApplicationResultType,
    onReceiveSimpleGroup,
    onReceiveGroupResultType) {
    
    this.messengerConnection = await this.createMessengerConnection(
      accessToken, 
      onReceiveMainPageData, 
      onReceiveFoundUsers, 
      onReceiveMessage);
    this.groupConnection = await this.createGroupConnection(
      accessToken,
      onReceiveGroupData,
      onReceiveFoundGroups,
      onReceiveCheckGroupNamePartResult,
      // onReceiveGroup,
      onReceiveInvitation,
      onReceiveSimpleGroup,
      onReceiveGroupResultType)
    this.messageConnection = await this.createMessageConnection(accessToken);
    this.invitationConnection = await this.createInvitationConnection(
      accessToken,
      // onReceiveSendingResultAddInvitation,
      onReceiveInvitation,
      onReceiveMyInvitations,
      // onReceiveSendingResultAcceptInvitation,
      onReceiveSendingResultDeclineInvitation,
      onReceiveInvitationResultType,
      onReceiveSimpleGroup);
    this.applicationConnection = await this.createApplicationConnection(
      accessToken,
      // onReceiveSendingResultAddApplication,
      onReceiveApplication,
      onReceiveMyApplications,
      // onReceiveSendingResultAcceptApplication,
      onReceiveSendingResultDeclineApplication,
      // onReceiveApplicationConfirmation,
      onReceiveNewGroupUser,
      onReceiveApplicationResultType,
      onReceiveSimpleGroup);
    //onReceiveSendingResultAddApplication
    //onReceiveApplication
    //onReceiveMyApplications
    //onReceiveSendingResultAcceptApplication
    //onReceiveSendingResultDeclineApplication
  }
  async createMessengerConnection(accessToken, onReceiveMainPageData, onReceiveFoundUsers, onReceiveMessage) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/SuperMessengerHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    this.receiveFirstData(connection, onReceiveMainPageData);
    this.receiveFoundUsers(connection, onReceiveFoundUsers);
    this.receiveMessage(connection, onReceiveMessage);
    await this.start(connection);
    return connection;
  }
  async createApplicationConnection(accessToken,
    // onReceiveSendingResultAddApplication,
    onReceiveApplication,
    onReceiveMyApplications,
    // onReceiveSendingResultAcceptApplication,
    onReceiveSendingResultDeclineApplication,
    // onReceiveApplicationConfirmation,
    onReceiveNewGroupUser,
    onReceiveApplicationResultType,
    onReceiveSimpleGroup) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/ApplicationHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    // this.receiveApplicationSendingResult(connection, onReceiveSendingResultAddApplication);
    this.receiveApplication(connection, onReceiveApplication);
    this.receiveMyApplications(connection, onReceiveMyApplications);
    // this.receiveAcceptApplicationResult(connection, onReceiveSendingResultAcceptApplication);
    this.receiveDeclineApplicationResult(connection, onReceiveSendingResultDeclineApplication);
    // this.receiveApplicationConfirmation(connection, onReceiveApplicationConfirmation);
    this.receiveNewGroupUser(connection, onReceiveNewGroupUser);

    this.receiveApplicationResultType(connection, onReceiveApplicationResultType);
    this.receiveSimpleGroup(connection, onReceiveSimpleGroup);
    await this.start(connection);
    return connection;
  }
  async createGroupConnection(
    accessToken,
    onReceiveGroupData,
    onReceiveFoundGroups,
    onReceiveCheckGroupNamePartResult,
    // onReceiveGroup,
    onReceiveInvitation,
    onReceiveSimpleGroup,
    onReceiveGroupResultType) {
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
    this.receiveGroupData(connection, onReceiveGroupData);
    this.receiveFoundGroups(connection, onReceiveFoundGroups);
    this.receiveCheckGroupNamePartResult(connection, onReceiveCheckGroupNamePartResult);
    // this.receiveGroup(connection, onReceiveGroup);
    this.receiveInvitation(connection, onReceiveInvitation);

    this.receiveGroupResultType(connection, onReceiveGroupResultType);
    this.receiveSimpleGroup(connection, onReceiveSimpleGroup);
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
  async createInvitationConnection(accessToken,
    // onReceiveSendingResultAddInvitation,
    onReceiveInvitation,
    onReceiveMyInvitations,
    // onReceiveSendingResultAcceptInvitation,
    onReceiveSendingResultDeclineInvitation,
    onReceiveInvitationResultType,
    onReceiveSimpleGroup) {
    let connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44370/InvitationHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => accessToken
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connection.serverTimeoutInMilliseconds = 120000;
    // this.receiveInvitationSendingResult(connection, onReceiveSendingResultAddInvitation);
    this.receiveInvitation(connection, onReceiveInvitation);
    this.receiveMyInvitations(connection, onReceiveMyInvitations);
    // this.receiveAcceptInvitationResult(connection, onReceiveSendingResultAcceptInvitation);
    this.receiveDeclineInvitationResult(connection, onReceiveSendingResultDeclineInvitation);

    this.receiveInvitationResultType(connection, onReceiveInvitationResultType);
    this.receiveSimpleGroup(connection, onReceiveSimpleGroup);
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
  receiveApplicationResultType(connection, onReceiveApplicationResultType) {
    connection.on("ReceiveApplicationResultType", function (resultType) {
      onReceiveApplicationResultType(resultType);
    })
  }
  receiveInvitationResultType(connection, onReceiveInvitationResultType) {
    connection.on("ReceiveInvitationResultType", function (resultType) {
      onReceiveInvitationResultType(resultType);
    })
  }
  receiveGroupResultType(connection, onReceiveGroupResultType) {
    connection.on("ReceiveGroupResultType", function (resultType) {
      onReceiveGroupResultType(resultType);
    });
  }
  createGroup(groupType, groupName, formData) {
    // console.log(group);
    this.groupConnection.invoke("CreateGroup", groupType, groupName, formData).catch(function (err) {return console.error(err.toString())})
  }
  receiveMessage(connection, onReceiveMessage) {
    connection.on("ReceiveMessage", function (message) {
      const newMessage = new MessageModel(message.Id,
          message.Value,
          new Date(message.SendDate),
          message.GroupId,
          new SimpleUserModel(message.User.Id,
          message.User.Email,
          message.User.ImageId))
      onReceiveMessage(newMessage);
    })
  }
  receiveFirstData(connection, onReceiveMainPageData) {
    connection.on("ReceiveFirstData", function (data) {
      const countries = data.Countries.map(country => new Country(country.Id, country.Value));
      const simpleGroupModel = data.Groups.map(group => new SimpleGroup(group.Id,
        group.Name,
        group.ImageId,
        group.Type,
        group.LastMessage ? new MessageModel(group.LastMessage.Id,
          group.LastMessage.Value,
          new Date(group.LastMessage.SendDate),
          group.LastMessage.GroupId,
          new SimpleUserModel(group.LastMessage.User.Id,
          group.LastMessage.User.Email,
          group.LastMessage.User.ImageId)) : new MessageModel(),
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
      onReceiveMainPageData(mainPageData);
   })
  }
  sendFirstData() {
    this.messengerConnection.invoke("SendFirstData").catch(function (err) {return console.error(err.toString())})
  }
  sendGroupData(groupId) {
    this.groupConnection.invoke("SendGroupData", groupId).catch(function (err) {return console.error(err.toString())})
  }
  receiveGroupData(connection, onReceiveGroupData) {
    connection.on("ReceiveGroupData", function (data) {
      const simpleUsers = data.Users.map(simpleUser => new UserInGroup(
        simpleUser.Id,
        simpleUser.Email,
        simpleUser.ImageId,
        simpleUser.IsCreator));
      const sentFiles = data.SentFiles.map(sentFile => new SentFileModel(
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
      const invitations = data.Invitations && data.Invitations.map(invitation => new Invitation(
        invitation.Value,
        new Date(invitation.SendDate),
        new SimpleGroup(invitation.SimpleGroup.Id,
        invitation.SimpleGroup.Name,
        invitation.SimpleGroup.ImageId,
        invitation.SimpleGroup.Type),
        // invitation.GroupId,
        new SimpleUserModel(invitation.InvitedUser.Id,
          invitation.InvitedUser.Email,
          invitation.InvitedUser.ImageId),
        new SimpleUserModel(invitation.Inviter.Id,
          invitation.Inviter.Email,
          invitation.Inviter.ImageId)));
      const applications = data.Applications && data.Applications.map(application => new Application(
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
      onReceiveGroupData(groupData);
   })
  }
  sendNewGroup(newGroup) {
    let req = new XMLHttpRequest();                            
    req.open("POST", 'https://localhost:44370/api/Groups');
    // req.setRequestHeader('Content-Type', 'application/json');
    // req.setRequestHeader(invitations2);
    // req.send(newGroup, invitations2);
    req.send(newGroup);
  }
  sendNewFiles(newFileModel) {
    let req = new XMLHttpRequest();                            
    req.open("POST", 'https://localhost:44370/api/SentFiles');
    // req.setRequestHeader('Content-Type', 'application/json');
    // req.setRequestHeader(invitations2);
    // req.send(newGroup, invitations2);
    req.send(newFileModel);
  }
  // downloadFile(path) {
  //   let req = new XMLHttpRequest();                            
  //   req.open("GET", 'https://localhost:44370/api/SentFiles');
  //   // req.setRequestHeader('Content-Type', 'application/json');
  //   // req.setRequestHeader(invitations2);
  //   // req.send(newGroup, invitations2);
  //   req.onload = function (data, status, headers) {
  //           console.log(data);
  //           console.log(status);
  //           console.log(headers);
  //     // if (req.status === 200) {
  //     //   // const blob = new Blob([res], { type: "application/octet-stream" });
  //     //   // const url = window.URL.createObjectURL(blob);
  //     //   // window.open(url);
  //     //       console.log("good");
  //     //       console.log(res);
  //     //   } else {
  //     //       console.log("bad");
  //     //       console.log(req.status);
  //     //   }
  //     };
  //   req.send();
  // }
  // sendNewGroupp(newGroup, invitations2) {
  //   console.log(JSON.stringify(invitations2));
  //     try{
  //       return fetch('https://localhost:44370/api/Groups', {
  //         method: "Post",
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(invitations2),
  //       });
  //     }
  //     catch (error) {
  //       console.error("Uneble to add item.", error);
  //     }
  // }
  changeProfile(profile) {
    let req = new XMLHttpRequest();                            
    req.open("PUT", 'https://localhost:44370/api/Users');
    console.log(profile);
    req.send(profile);
    // req.send("2");
  }
  sendMessage(message) {
    this.messengerConnection.invoke("SendMessage", message).catch(function (err) {return console.error(err.toString())})
  }
  receiveFoundUsers(connection, onReceiveFoundUsers) {
    connection.on("ReceiveFoundUsers", function (users) {
      const res = users.map(user => new SimpleUserModel(user.Id, user.Email, user.ImageId));
      onReceiveFoundUsers(res);
    });
  }
  receiveFoundGroups(connection, onReceiveFoundGroups) {
    connection.on("ReceiveNoMySearchedGroups", function (groups) {
      const res = groups.map(group => new SimpleGroup(group.Id, group.Name, group.ImageId, group.Type, group.LastMessage));
      onReceiveFoundGroups(res);
    });
  }
  // receiveInvitationSendingResult(connection, onReceiveSendingResultAddInvitation) {
  //   connection.on("ReceiveInvitationSendingResult", function (result) {
  //     // console.log(result);
  //     onReceiveSendingResultAddInvitation(result);
  //   });
  // }
  // receiveApplicationSendingResult(connection, onReceiveSendingResultAddApplication) {
  //   connection.on("ReceiveApplicationSendingResult", function (result) {
  //     onReceiveSendingResultAddApplication(result);
  //   });
  // }
  receiveInvitation(connection, onReceiveInvitation) {
    connection.on("ReceiveInvitation", function (invitation) {
      // console.log(invitation);
      const myInvitation = new Invitation(
        invitation.Value,
        new Date(invitation.SendDate),
        new SimpleGroup(invitation.SimpleGroup.Id,
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
  receiveMyInvitations(connection, onReceiveMyInvitations) {
    connection.on("ReceiveMyInvitations", function (invitations) {
      const myInvitations = invitations.map(invitation => new Invitation(
        invitation.Value,
        new Date(invitation.SendDate),
        new SimpleGroup(invitation.SimpleGroup.Id,
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
  sendMyInvitations() {
    this.invitationConnection.invoke("SendMyInvitations").catch(function (err) {return console.error(err.toString())})
  }
  sendInvitation(invitation) {
    this.invitationConnection.invoke("SendInvitation", invitation).catch(function (err) {return console.error(err.toString())})
  }
  sendApplication(application) {
    this.applicationConnection.invoke("SendApplication", application).catch(function (err) {return console.error(err.toString())})
  }
  searchUsers(userEmailPart) {
    this.messengerConnection.invoke("SearchUsers", userEmailPart).catch(function (err) {return console.error(err.toString())})
  }
  searchNoMyGroups(groupNamePart) {
    this.groupConnection.invoke("SearchNoMyGroup", groupNamePart).catch(function (err) {return console.error(err.toString())})
  }
  acceptInvitation(invitation) {
    this.invitationConnection.invoke("AcceptInvitation", invitation).catch(function (err) {return console.error(err.toString())})
  }
  acceptApplication(application) {
    this.applicationConnection.invoke("AcceptApplication", application).catch(function (err) {return console.error(err.toString())})
  }
  declineInvitation(invitation) {
    this.invitationConnection.invoke("DeclineInvitation", invitation).catch(function (err) {return console.error(err.toString())})
  }
  declineApplication(application) {
    this.applicationConnection.invoke("DeclineApplication", application).catch(function (err) {return console.error(err.toString())})
  }
  // receiveAcceptInvitationResult(connection, onReceiveSendingResultAcceptInvitation) {
  //   connection.on("ReceiveAcceptInvitationResult", function (result, group) {
  //     // console.log(result);
  //     const simpleGroupModel = new SimpleGroup(group.Id,
  //       group.Name,
  //       group.ImageId,
  //       group.Type,
  //       group.LastMessage ? new MessageModel(group.LastMessage.Id,
  //         group.LastMessage.Value,
  //         new Date(group.LastMessage.SendDate),
  //         group.LastMessage.GroupId,
  //         new SimpleUserModel(group.LastMessage.User.Id,
  //         group.LastMessage.User.Email,
  //         group.LastMessage.User.ImageId)) : new MessageModel());
  //     onReceiveSendingResultAcceptInvitation(result, simpleGroupModel);
  //   });
  // }
  // receiveAcceptApplicationResult(connection, onReceiveSendingResultAcceptApplication) {
  //   connection.on("ReceiveAcceptApplicationResult", function (result) {
  //     onReceiveSendingResultAcceptApplication(result);
  //   });
  // }
  // receiveApplicationConfirmation(connection, onReceiveApplicationConfirmation) {
  //   connection.on("ReceiveApplicationConfirmation", function (group) {
  //     const simpleGroupModel = new SimpleGroup(group.Id,
  //       group.Name,
  //       group.ImageId,
  //       group.Type,
  //       group.LastMessage ? new MessageModel(group.LastMessage.Id,
  //         group.LastMessage.Value,
  //         new Date(group.LastMessage.SendDate),
  //         group.LastMessage.GroupId,
  //         new SimpleUserModel(group.LastMessage.User.Id,
  //         group.LastMessage.User.Email,
  //         group.LastMessage.User.ImageId)) : new MessageModel());
  //     onReceiveApplicationConfirmation(simpleGroupModel);
  //   });
  // }
  receiveDeclineInvitationResult(connection, onReceiveSendingResultDeclineInvitation) {
    connection.on("ReceiveDeclineInvitationResult", function (result) {
      // console.log(result);
      onReceiveSendingResultDeclineInvitation(result);
    });
  }
  receiveDeclineApplicationResult(connection, onReceiveSendingResultDeclineApplication) {
    connection.on("ReceiveDeclineApplicationResult", function (result) {
      // console.log(result);
      onReceiveSendingResultDeclineApplication(result);
    });
  }
  receiveNewGroupUser(connection, onReceiveNewGroupUser) {
    connection.on("ReceiveNewGroupUser", function (user, groupId) {
      const simpleUser = new SimpleUserModel(
        user.Id,
        user.Email,
        user.ImageId);
      const userInGroup = new UserInGroup(
        user.Id,
        user.Email,
        user.ImageId,
        user.IsCreator);
      onReceiveNewGroupUser(simpleUser, userInGroup, groupId);
    });
  }
  checkGroupNamePart(groupNamePart) {
    this.groupConnection.invoke("CheckGroupNamePart", groupNamePart).catch(function (err) {return console.error(err.toString())})
  }
  receiveCheckGroupNamePartResult(connection, onReceiveCheckGroupNamePartResult) {
    connection.on("ReceiveCheckGroupNamePartResult", function (canUseGroupName) {
      onReceiveCheckGroupNamePartResult(canUseGroupName);
    });
  }
  // receiveGroup(connection, onReceiveGroup) {
  //   connection.on("ReceiveGroup", function (group) {
  //     onReceiveGroup(group);
  //   })
  // }
  receiveSimpleGroup(connection, onReceiveSimpleGroup) {
    connection.on("ReceiveSimpleGroup", function (group) {
      const simpleGroupModel = new SimpleGroup(group.Id,
        group.Name,
        group.ImageId,
        group.Type,
        group.LastMessage ? new MessageModel(group.LastMessage.Id,
          group.LastMessage.Value,
          new Date(group.LastMessage.SendDate),
          group.LastMessage.GroupId,
          new SimpleUserModel(group.LastMessage.User.Id,
          group.LastMessage.User.Email,
          group.LastMessage.User.ImageId)) : new MessageModel());
      onReceiveSimpleGroup(simpleGroupModel);
    });
  }
}
