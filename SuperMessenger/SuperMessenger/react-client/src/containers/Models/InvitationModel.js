export default class InvitationModel {
  constructor(value, sendDate, group, invitedUser, inviter) {
    this.value = value;
    this.sendDate = sendDate;
    this.group = group;
    this.invitedUser = invitedUser;
    this.inviter = inviter;
  }
}