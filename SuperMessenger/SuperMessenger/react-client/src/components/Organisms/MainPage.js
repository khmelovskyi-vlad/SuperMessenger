import React from 'react';
import SimpleGroupModel from '../../Models/SimpleGroup';
import SimpleUserModel from '../../Models/SimpleUserModel';
import AcceptInvitationModal from '../Modals/AcceptInvitationModal';
import AcceptInvitationsModal from '../Modals/AcceptInvitationsModal';
import AddInvitationModal from '../Modals/AddInvitationModal';
import NewMemberModal from '../Modals/NewMemberModal';
import SendingResultModal from '../Modals/SendingResultModal';
import AddInvitations from '../Molecules/AddInvitations';
import ChangeProfile from '../Molecules/ChangeProfile';
import Chat from '../Molecules/Chat';
import CreateGroupForm from '../Molecules/CreateGroupForm';
import GroupInfo from '../Molecules/GroupInfo';
import Groups from '../Molecules/Groups';
export default function MainPage(props) {
  return (
    <div className="row w-100 m-0">
      {/* <section>
        <button
          onClick={() => props.api.current.sendFirstData()}>
          get first data
        </button>
        { props.mainPageData.imageId &&
          <img src={`/avatars/${props.mainPageData.imageId}.jpg`} />
        }
      </section> */}
      {
        props.renderMyInvitation &&
        <AcceptInvitationModal
          selectedInvitation={props.selectedInvitation}
          onClickAccept={props.onClickAcceptInvitation}
          onClickDecline={props.onClickDeclineInvitation}
        />
      }
      {
        props.renderMyInvitations &&
        <AcceptInvitationsModal
          myInvitations={props.myInvitations}
          onClickOpenAcceptInvitation={props.onClickOpenAcceptInvitation}
        />
      }
      {
        props.renderSendingResult &&
        <SendingResultModal
          sendingResult={props.sendingResult}
          onClickBack={props.onClickBackFromInvitationSendingResult}
          onClickClose={props.onClickCloseFromInvitationSendingResult}
        />
      }
      {
        props.renderNewMemberModal &&
        <NewMemberModal
          foundUsers={props.foundUsers}
          onChangeNewMemberModal={props.onChangeNewMemberModal}
          onClickSelectedUser={props.onClickSelectedUser}
        />
      }
      {
        props.renderAddInvitationModal &&
        <AddInvitationModal
          onChangeNewMemberModal={props.onChangeNewMemberModal}
          onClickCloseModal={props.onClickRenderNewMemberModal}
          onSubmitAddInvitation={props.onSubmitAddInvitation}
          selectedUser={props.selectedUser}
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageId)}
          simpleGroup={new SimpleGroupModel(props.groupData.id,
            props.groupData.name,
            props.groupData.imageId,
            props.groupData.type)}
        />
      }
      <Groups groups={props.mainPageData.groups} onClickSelectedGroup={props.onClickSelectedGroup} />
      {
        props.groupData.id &&
        <Chat
          groupData={props.groupData}
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageId)}
          onSubmitSendMessage={props.onSubmitSendMessage}
          showGroupInfo={props.showGroupInfo}
          onClickShowGroupInfo={props.onClickShowGroupInfo}
        />
      }
      {
        props.showGroupInfo &&
        <GroupInfo
          groupData={props.groupData}
          onClickNewMember={props.onClickNewMember}
          onClickAddMember={props.onClickRenderNewMemberModal}
        />
      }
      {/*<ChangeProfile api={props.api} /> 
      <CreateGroupForm api={props.api} />*/}
      {/* <AddInvitations groups={props.mainPageData.groups}/> */}
    </div>
  );
}