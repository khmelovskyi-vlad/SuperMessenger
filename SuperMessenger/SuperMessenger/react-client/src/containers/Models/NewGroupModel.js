export default class NewGroupModel {
  constructor(name, type, haveImage, invitations, contentId) {
    this.name = name;
    this.type = type;
    this.haveImage = haveImage;
    this.invitations = invitations;
    this.contentId = contentId;
  }
}