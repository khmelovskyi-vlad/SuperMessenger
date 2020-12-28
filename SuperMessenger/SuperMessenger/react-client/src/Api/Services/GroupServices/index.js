let connection = null;
let onReceiveSendingResult = null;
let appErrorHandler = null;


export function initializeData(_connection, _onReceiveSendingResult, _appErrorHandler) {
  connection = _connection;
  onReceiveSendingResult = _onReceiveSendingResult;
  appErrorHandler = _appErrorHandler;
}

  
export function createGroup(group) {
  const methodName = "CreateGroup";
  connection.invoke(methodName, group)
    .then(() => onReceiveSendingResult("The group was successfully added"))
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function sendGroupData(groupId) {
  const methodName = "SendGroupData";
  connection.invoke(methodName, groupId).catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function searchNoMyGroups(groupNamePart) {
  const methodName = "SearchNoMyGroup";
  connection.invoke(methodName, groupNamePart).catch((err) => appErrorHandler.hubHandle(err, methodName))
}
export function checkGroupNamePart(groupNamePart) {
  const methodName = "CheckGroupNamePart";
  connection.invoke(methodName, groupNamePart).catch((err) => appErrorHandler.hubHandle(err, methodName))
}
export function leaveGroup(groupId) {
  const methodName = "LeaveGroup";
  connection.invoke(methodName, groupId)
    .then(() => onReceiveSendingResult("The group was successfully left"))
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function removeGroup(groupId) {
  const methodName = "RemoveGroup";
  connection.invoke(methodName, groupId)
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
const GroupServices = {
  initializeData,
  createGroup,
  sendGroupData,
  searchNoMyGroups,
  checkGroupNamePart,
  leaveGroup,
  removeGroup
}
export default GroupServices;