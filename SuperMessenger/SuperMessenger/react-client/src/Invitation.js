export default class Invitation {
  constructor(value, sendDate, groupId, invitedUser, inviter) {
    this.value = value;
    this.sendDate = sendDate;
    this.groupId = groupId;
    this.invitedUser = invitedUser;
    this.inviter = inviter;
  }
}