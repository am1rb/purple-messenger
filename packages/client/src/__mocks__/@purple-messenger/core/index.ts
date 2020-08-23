import * as purpleMessengerCore from "@purple-messenger/core";

const mockedPurpleMessengerCore = jest.genMockFromModule<
  typeof purpleMessengerCore
>("@purple-messenger/core");

export const js = 1;

module.exports = {
  ...mockedPurpleMessengerCore,
  loadConversationList: jest.fn(() => ({ type: "" })),
  unloadConversationList: jest.fn(() => ({ type: "" })),
};
