export default class MessageConfirmationModel{
  constructor(id, previousId, sendDate, groupId ) {
    this.id = id;
    this.previousId = previousId;
    this.sendDate = sendDate;
    this.groupId = groupId;
  }
}