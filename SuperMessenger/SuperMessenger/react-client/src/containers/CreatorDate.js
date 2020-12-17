export default class CreatorDate{
  static createStringDate(date) {
    const h = (date.getHours() < 10 ? '0' : '') + date.getHours();
    const m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return h + ':' + m;
  }
}