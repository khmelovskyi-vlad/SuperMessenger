import * as signalR from "@microsoft/signalr"
import React from 'react';
import Country from "./containers/Models/Country";
import SimpleGroup from "./containers/Models/SimpleGroupModel";
import MainPageModel from "./containers/Models/MainPageModel";
import MessageModel from "./containers/Models/MessageModel";
import GroupModel from "./containers/Models/GroupModel";
import UserInGroup from "./containers/Models/UserInGroup";
import SimpleUserModel from "./containers/Models/SimpleUserModel";
import MessageFileModel from "./containers/Models/MessageFileModel";
import InvitationModel from "./containers/Models/InvitationModel";
import ApplicationModel from "./containers/Models/ApplicationModel";
import ProfileModel from "./containers/Models/ProfileModel";
import MessageConfirmationModel from "./containers/Models/MessageConfirmationModel";
import FileConfirmationModel from "./containers/Models/FileConfirmationModel";
import axios from "axios";
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
    
    onReceiveApplicationResultType,
    onReceiveInvitationResultType,
    onReceiveSimpleGroup,
    onReceiveGroupResultType,
  
    onReceiveLeftGroupUserId,
    onReceiveNewProfile,
    onReceiveNewUserData,
    onReceiveUserResultType,
    onReceiveMessageConfirmation,
    onReceiveFileConfirmations,
    onReceiveFiles,
    onReduceMyInvitationsCount,
    onReduceMyApplicationsCount,
    onReduceGroupApplication,
    onIncreaseMyApplicationsCount,
    onReduceMyInvitations,
    onSendGroupImage) {
    
    
    
    //onReceiveSendingResultAddApplication
    //onReceiveApplication
    //onReceiveMyApplications
    //onReceiveSendingResultAcceptApplication
    //onReceiveSendingResultDeclineApplication
  }
  


  async start(connection) {
      await connection.start().catch(function (e) {
    });;
  }
  async stop(connection) {
      await connection.stop().catch(function (e) {
    });;
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

  
  receiveSimpleGroup(connection, onReceiveSimpleGroup) {
    connection.on("ReceiveSimpleGroup", function (group) {
      const simpleGroupModel = new SimpleGroup(group.Id,
        group.Name,
        group.ImageName,
        group.Type,
        group.LastMessage ? new MessageModel(group.LastMessage.Id,
          group.LastMessage.Value,
          new Date(group.LastMessage.SendDate),
          group.LastMessage.GroupId,
          new SimpleUserModel(group.LastMessage.User.Id,
          group.LastMessage.User.Email,
          group.LastMessage.User.ImageName),
          true) : new MessageModel());
      onReceiveSimpleGroup(simpleGroupModel);
    });
  }
}
