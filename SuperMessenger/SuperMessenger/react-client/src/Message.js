export default class Message{
  constructor(id, value, sendDate, userId, userEmail, groupId) {
    this.id = id;
    this.value = value;
    this.sendDate = sendDate;
    this.userId = userId;
    this.userEmail = userEmail;
    this.groupId = groupId;
  }
}