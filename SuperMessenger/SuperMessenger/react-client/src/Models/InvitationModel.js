export default class InvitationModel {
  constructor(value, sendDate, simpleGroup, invitedUser, inviter) {
    this.Value = value;
    this.SendDate = sendDate;
    this.SimpleGroup = simpleGroup;
    this.InvitedUser = invitedUser;
    this.Inviter = inviter;
  }
}