import * as purpleMessengerCore from "@purple-messenger/core";

const mockedPurpleMessengerCore = jest.genMockFromModule<
  typeof purpleMessengerCore
>("@purple-messenger/core");

function mockedAction() {
  return jest.fn(() => ({ type: "" }));
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
};
