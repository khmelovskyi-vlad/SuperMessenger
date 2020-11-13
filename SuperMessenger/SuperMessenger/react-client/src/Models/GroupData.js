export default class GroupData { 
  constructor(id, name, creationDate, imageId, type, isCreator, usersInGroup, sentFiles, messages, invitations, applications) {
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.imageId = imageId;
    this.type = type;
    this.isCreator = isCreator;
    this.usersInGroup = usersInGroup;
    this.sentFiles = sentFiles;
    this.messages = messages;
    this.invitations = invitations;
    this.applications = applications;
  }
}