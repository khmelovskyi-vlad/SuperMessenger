export default class Invitation {
  constructor(value, sendDate, simpleGroup, invitedUser, inviter) {
    this.value = value;
    this.sendDate = sendDate;
    this.simpleGroup = simpleGroup;
    this.invitedUser = invitedUser;
    this.inviter = inviter;
  }
}