import React from 'react';
import SimpleGroupModel from '../../Models/SimpleGroup';
import SimpleUserModel from '../../Models/SimpleUserModel';
import AcceptApplicationModal from '../Modals/AcceptApplicationModal';
import AcceptApplicationsModal from '../Modals/AcceptApplicationsModal';
import AcceptInvitationModal from '../Modals/AcceptInvitationModal';
import AcceptInvitationsModal from '../Modals/AcceptInvitationsModal';
import AddApplicationModal from '../Modals/AddApplicationModal';
import AddInvitationModal from '../Modals/AddInvitationModal';
import CreateGroupModal from '../Modals/CreateGroupModal';
import ChangeProfileModal from '../Modals/ChangeProfileModal';
import NewMemberModal from '../Modals/NewMemberModal';
import SearchGroupToApplicationModal from '../Modals/SearchGroupToApplicationModal';
import SendingResultModal from '../Modals/SendingResultModal';
import AddInvitations from '../Molecules/AddInvitations';
import ChangeProfile from '../Molecules/ChangeProfileForm';
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
        props.renderChangeProfile &&
        <ChangeProfileModal
          onSubmitChangeProfile={props.onSubmitChangeProfile}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderCreateGroup &&
        <CreateGroupModal
          // onChangeNewMemberModal={props.onChangeNewMemberModal}
          // onClickCloseModal={props.onClickRenderNewMemberModal}
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageId)}
          onCheckGroupName={props.onCheckGroupName}
          onSubmitCreateGroup={props.onSubmitCreateGroup}
          myId={props.myId}
          canUseGroupName={props.canUseGroupName}
          foundUsers={props.foundUsers}
          onChangeSearchUsers={props.onChangeNewMemberModal}
          // groupId={props.groupData.id}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderAddApplication &&
        <AddApplicationModal
          // onChangeNewMemberModal={props.onChangeNewMemberModal}
          // onClickCloseModal={props.onClickRenderNewMemberModal}
          onSubmitAddApplication={props.onSubmitAddApplication}
          selectedGroupId={props.selectedGroupId}
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageId)}
          // groupId={props.groupData.id}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderSearchGroupToApplicationModal &&
        <SearchGroupToApplicationModal
          foundGroups={props.foundGroups}
          onChangeSearchGroupToApplicationModal={props.onChangeSearchGroupToApplicationModal}
          onClickSelectedGroupModal={props.onClickSelectedGroupModal}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderMyInvitation &&
        <AcceptInvitationModal
          selectedInvitation={props.selectedInvitation}
          onClickAccept={props.onClickAcceptInvitation}
          onClickDecline={props.onClickDeclineInvitation}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderMyInvitations &&
        <AcceptInvitationsModal
          myInvitations={props.myInvitations}
          onClickOpenAcceptInvitation={props.onClickOpenAcceptInvitation}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderGroupApplications &&
        <AcceptApplicationsModal
          myApplications={props.myApplications}
          onClickOpenAcceptApplication={props.onClickOpenAcceptApplication}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderGroupApplication &&
        <AcceptApplicationModal
          selectedApplication={props.selectedApplication}
          onClickAccept={props.onClickAcceptApplication}
          onClickDecline={props.onClickDeclineApplication}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderSendingResult &&
        <SendingResultModal
          sendingResult={props.sendingResult}
          // onClickBack={props.onClickBackFromInvitationSendingResult}
          // onClickClose={props.onClickCloseFromInvitationSendingResult}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderNewMemberModal &&
        <NewMemberModal
          foundUsers={props.foundUsers}
          onChangeNewMemberModal={props.onChangeNewMemberModal}
          onClickSelectedUser={props.onClickSelectedUser}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
        />
      }
      {
        props.renderAddInvitationModal &&
        <AddInvitationModal
          // onChangeNewMemberModal={props.onChangeNewMemberModal}
          // onClickCloseModal={props.onClickRenderNewMemberModal}
          onSubmitAddInvitation={props.onSubmitAddInvitation}
          selectedUser={props.selectedUser}
          simpleMe={new SimpleUserModel(props.mainPageData.id, props.mainPageData.email, props.mainPageData.imageId)}
          simpleGroup={new SimpleGroupModel(props.groupData.id,
            props.groupData.name,
            props.groupData.imageId,
            props.groupData.type)}
          wrapperRef={props.wrapperRef}
          onClickBackModal={props.onClickBackModal}
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
          onSubmitSendFiles={props.onSubmitSendFiles}
        />
      }
      {
        props.showGroupInfo &&
        <GroupInfo
          groupData={props.groupData}
          onClickNewMember={props.onClickNewMember}
          onClickAddMember={props.onClickRenderNewMemberModal}
          onClickOpenAcceptApplications={props.onClickOpenAcceptApplications}
        />
      }
      {/*<ChangeProfile api={props.api} /> 
      <CreateGroupForm api={props.api} />*/}
      {/* <AddInvitations groups={props.mainPageData.groups}/> */}
    </div>
  );
}