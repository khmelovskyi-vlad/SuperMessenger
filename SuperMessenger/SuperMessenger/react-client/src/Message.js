export default class Message{
  constructor(id, value, sendDate, groupId, simpleUser ) {
    this.id = id;
    this.value = value;
    this.sendDate = sendDate;
    this.groupId = groupId;
    this.simpleUser = simpleUser;
  }
}