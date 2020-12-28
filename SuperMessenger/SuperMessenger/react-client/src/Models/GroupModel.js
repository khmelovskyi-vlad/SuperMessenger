export default class GroupModel { 
  constructor(id, name, creationDate, imageName, type, isCreator, usersInGroup, messageFiles, messages, invitations, applications) {
    this.id = id;
    this.name = name;
    this.creationDate = creationDate;
    this.imageName = imageName;
    this.type = type;
    this.isCreator = isCreator;
    this.usersInGroup = usersInGroup;
    this.messageFiles = messageFiles;
    this.messages = messages;
    this.invitations = invitations;
    this.applications = applications;
  }
}