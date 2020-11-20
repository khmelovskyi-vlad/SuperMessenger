export default class MessageModel{
  constructor(id, value, sendDate, groupId, user ) {
    this.id = id;
    this.value = value;
    this.sendDate = sendDate;
    this.groupId = groupId;
    this.user = user;
  }
}