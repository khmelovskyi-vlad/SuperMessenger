let connection = null;
let onReceiveSendingResult = null;
let appErrorHandler = null;


export function initializeData(_connection, _onReceiveSendingResult, _appErrorHandler) {
  connection = _connection;
  onReceiveSendingResult = _onReceiveSendingResult;
  appErrorHandler = _appErrorHandler;
}

export function changeProfile(newProfile) {
  const methodName = "ChangeProfile";
  connection.invoke(methodName, newProfile)
    .then(() => onReceiveSendingResult("Profile was successfully changed"))
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function sendFirstData() {
  const methodName = "SendFirstData";
  connection.invoke(methodName).catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function sendMessage(message) {
  const methodName = "SendMessage";
  connection.invoke(methodName, message).catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function searchUsers(userEmailPart, userIds) {
  const methodName = "SearchUsers";
  connection.invoke(methodName, userEmailPart, userIds).catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function searchNoInvitedUsers(userEmailPart, groupId) {
  const methodName = "SearchNoInvitedUsers";
  connection.invoke(methodName, userEmailPart, groupId)
    .catch((err) => appErrorHandler.hubHandle(err, methodName));
}
export function addFiles(files) {
  const methodName = "AddFiles";
  connection.invoke(methodName, files).catch((err) => appErrorHandler.hubHandle(err, methodName));
}

const SuperMessengerServices = {
  initializeData,
  changeProfile,
  sendFirstData,
  sendMessage,
  searchUsers,
  searchNoInvitedUsers,
  addFiles
}
export default SuperMessengerServices;