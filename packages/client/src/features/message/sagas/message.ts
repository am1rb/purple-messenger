import { Action } from "redux";
import { select, put, call } from "redux-saga/effects";
import {
  SubmitMessageAction,
  decreaseLastMessageId,
  sendMessage,
  Phase,
  MessageStatus,
  Owner,
  receivedMessageAck,
  addMessage,
  SendMessageAction,
} from "@purple-messenger/core";
import { getLastMessageId } from "features/message/selectors";
import { send } from "features/socket/effects";
import { getCurrentConversationUsername } from "features/conversation/selectors";

export function* submitMessage({
  receiverUsername,
  message,
}: SubmitMessageAction) {
  const messageId = yield select(getLastMessageId);
  yield put(decreaseLastMessageId());

  yield put(
    sendMessage(receiverUsername, {
      id: messageId,
      body: message,
      status: MessageStatus.Pending,
      owner: Owner.Me,
      sentAt: new Date(),
    })
  );
}

interface MessageWithSendPhaseAction extends Action {
  phase: Phase;
}

export function* sendIfPhaseIsSend(action: MessageWithSendPhaseAction) {
  if (action.phase === Phase.Send) {
    yield call(send, action);
  }
}

export function* newMessage({ message, username }: SendMessageAction) {
  const selectedConversation: string | undefined = yield select(
    getCurrentConversationUsername
  );

  if (selectedConversation && selectedConversation === username) {
    // append to the list if the list is selected
    yield put(addMessage(message));

    // send the ack to the sender
    if (message.owner === Owner.Friend) {
      yield call(send, receivedMessageAck(username, message.id));
    }
  }
}
