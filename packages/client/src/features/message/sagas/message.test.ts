import { expectSaga, testSaga } from "redux-saga-test-plan";
import { select } from "redux-saga/effects";
import {
  addMessage,
  decreaseLastMessageId,
  Owner,
  Phase,
  MessageStatus,
  receivedMessageAck,
  sendMessage,
  submitMessage,
} from "@purple-messenger/core";
import { send } from "features/socket/effects";
import {
  submitMessage as submitMessageSaga,
  sendIfPhaseIsSend,
  newMessage,
} from "./message";
import { getLastMessageId } from "../selectors";
import { getIsReady } from "features/socket/selectors";
import { getCurrentConversationUsername } from "features/conversation/selectors";

describe("The message sagas tests", () => {
  let dateSpy: jest.SpyInstance;

  beforeAll(() => {
    const mockDate = new Date();
    dateSpy = jest
      .spyOn(global, "Date")
      .mockImplementation(() => mockDate.toString());
  });
  afterAll(() => dateSpy.mockRestore());

  it("Should send the message correctly", () => {
    const receiverName = "john.doe";
    const message = "The message text";
    const messageId = -1;

    return expectSaga(submitMessageSaga, submitMessage(receiverName, message))
      .provide([[select(getLastMessageId), messageId]])
      .put(decreaseLastMessageId())
      .put(
        sendMessage(receiverName, {
          id: messageId,
          body: message,
          status: MessageStatus.Pending,
          owner: Owner.Me,
          sentAt: new Date(),
        })
      )
      .run();
  });

  it("Should call the send effect", () => {
    const action = {
      type: "ActionType",
      phase: Phase.Send,
    };
    return expectSaga(sendIfPhaseIsSend, action)
      .provide([[select(getIsReady), true]])
      .call(send, action)
      .run();
  });

  it("Should not call the send effect", () => {
    const action = {
      type: "ActionType",
      phase: Phase.Receive,
    };
    testSaga(sendIfPhaseIsSend, action).next().finish().isDone();
  });

  it("Should add the message to the message box if the conversation is selected", () => {
    const receiverName = "john.doe";
    const message = {
      id: 1,
      body: "message body",
      status: MessageStatus.Pending,
      owner: Owner.Me,
      sentAt: new Date(),
    };
    const action = sendMessage(receiverName, message);
    return expectSaga(newMessage, action)
      .provide([
        [select(getCurrentConversationUsername), receiverName],
        [select(getIsReady), true],
      ])
      .put(addMessage(message))
      .run();
  });

  it("Should ignore the message if the conversation is not selected", () => {
    const receiverName = "john.doe";
    const message = {
      id: 1,
      body: "message body",
      status: MessageStatus.Pending,
      owner: Owner.Me,
      sentAt: new Date(),
    };
    const action = sendMessage(receiverName, message);

    testSaga(newMessage, action)
      .next()
      .select(getCurrentConversationUsername)
      .next("anotherConversation")
      .isDone();
  });

  it("Should send receive ack", () => {
    const receiverName = "john.doe";
    const message = {
      id: 1,
      body: "message body",
      status: MessageStatus.Pending,
      owner: Owner.Friend,
      sentAt: new Date(),
    };
    const action = sendMessage(receiverName, message);
    return expectSaga(newMessage, action)
      .provide([
        [select(getCurrentConversationUsername), receiverName],
        [select(getIsReady), true],
      ])
      .call(send, receivedMessageAck(receiverName, message.id))
      .run();
  });
});
