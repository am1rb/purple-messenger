import * as purpleMessengerCore from "@purple-messenger/core";

const mockedPurpleMessengerCore = jest.genMockFromModule<
  typeof purpleMessengerCore
>("@purple-messenger/core");

function mockedAction(action = () => ({ type: "" })) {
  return jest.fn(action);
}

module.exports = {
  ...mockedPurpleMessengerCore,
  loadConversationList: mockedAction(),
  unloadConversationList: mockedAction(),
  signOut: mockedAction(),
  clearMessageList: mockedAction(),
  seenMessageAck: mockedAction(),
  start: mockedAction(),
  shutdown: mockedAction(),
  submitMessage: mockedAction(),
  startTypingMessage: mockedAction(),
  stopTypingMessage: mockedAction(),
  signIn: mockedAction(),
  setAuthError: mockedAction(),
  verifyToken: mockedAction(),
  connected: mockedAction(purpleMessengerCore.connected),
  disconnected: mockedAction(purpleMessengerCore.disconnected),
};
