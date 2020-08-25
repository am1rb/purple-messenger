import * as purpleMessengerCore from "@purple-messenger/core";

const mockedPurpleMessengerCore = jest.genMockFromModule<
  typeof purpleMessengerCore
>("@purple-messenger/core");

export const sharedActionMock = jest.fn(() => ({ type: "" }));

module.exports = {
  ...mockedPurpleMessengerCore,
  loadConversationList: sharedActionMock,
  unloadConversationList: sharedActionMock,
  signOut: sharedActionMock,
};
