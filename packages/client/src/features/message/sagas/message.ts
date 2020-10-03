import { Action } from "redux";
import { select, put, call } from "redux-saga/effects";
import {
  SubmitMessageAction,
  decreaseLastMessageId,
  sendMessage,
  MessagePhase,
  MessageStatus,
  MessageOwner,
  receivedMessageAck,
  addMessage,
  SendMessageAction,
  ProfileInfo,
} from "@purple-messenger/core";
import { getLastMessageId } from "features/message/selectors";
import { send } from "features/socket/effects";
import { getCurrentConversationUsername } from "features/conversation/selectors";
import { getProfileInfo } from "features/profile/selectors";

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
      owner: MessageOwner.Me,
      sentAt: new Date(),
    })
  );
}

interface MessageWithSendPhaseAction extends Action {
  phase: MessagePhase;
}

export function* sendIfMessagePhaseIsSend(action: MessageWithSendPhaseAction) {
  if (action.phase === MessagePhase.Send) {
    yield call(send, action);
  }
}

export function* newMessage({ message, username }: SendMessageAction) {
  const selectedConversation: string | undefined = yield select(
    getCurrentConversationUsername
  );
  const profileInfo: ProfileInfo | undefined = yield select(getProfileInfo);
  const currentProfileUsername = profileInfo?.username;

  if (currentProfileUsername && selectedConversation === username) {
    // append to the list if the list is selected
    yield put(addMessage(message));

    // send the ack to the sender
    if (message.owner === MessageOwner.Friend) {
      yield call(send, receivedMessageAck(username, message.id));
    }
  }
}
