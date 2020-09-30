import Socket from "core/type/socket";
import {
  messageActionTypes,
  SendMessageAction,
  sentMessageAck,
  sendMessage,
  MessageOwner,
  MessageStatus,
  StartTypingMessageAction,
  MessagePhase,
  startTypingMessage,
  StopTypingMessageAction,
  stopTypingMessage,
  ReceivedMessageAckAction,
  receivedMessageAck,
  seenMessageAck,
  SeenMessageAckAction,
} from "@purple-messenger/core";
import { dispatchQueue, clientDispatchQueue } from "./queue";
import { dispatch } from "core/helper/client";

let savedMessageId = 1;

function message(socket: Socket) {

  socket.on(
    messageActionTypes.message.saga.sendMessage,
    ({ username: receiverUsername, message, phase }: SendMessageAction) => {
      const senderUsername = socket.session?.username;

      if (phase === MessagePhase.Receive || !senderUsername) {
        return;
      }

      const msg = {
        ...message,
        id: savedMessageId++,
        sentAt: new Date(),
        status: MessageStatus.Sent,
      };

      dispatch(socket, sentMessageAck(receiverUsername, message.id, msg.id));

      clientDispatchQueue(
        socket,
        sendMessage(
          receiverUsername,
          {
            ...msg,
            owner: MessageOwner.Me,
          },
          MessagePhase.Receive
        )
      );

      dispatchQueue(
        receiverUsername,
        sendMessage(
          senderUsername,
          {
            ...msg,
            owner: MessageOwner.Friend,
          },
          MessagePhase.Receive
        )
      );
    }
  );

  socket.on(
    messageActionTypes.message.saga.startTypingMessage,
    ({ username: receiverUsername, phase }: StartTypingMessageAction) => {
      const senderUsername = socket.session?.username;
      if (phase === MessagePhase.Send && senderUsername) {
        dispatchQueue(
          receiverUsername,
          startTypingMessage(senderUsername, MessagePhase.Receive)
        );
      }
    }
  );

  socket.on(
    messageActionTypes.message.saga.stopTypingMessage,
    ({ username: receiverUsername, phase }: StopTypingMessageAction) => {
      const senderUsername = socket.session?.username;
      if (phase === MessagePhase.Send && senderUsername) {
        dispatchQueue(
          receiverUsername,
          stopTypingMessage(senderUsername, MessagePhase.Receive)
        );
      }
    }
  );

  socket.on(
    messageActionTypes.message.reducer.receivedMessageAck,
    ({
      username: receiverUsername,
      messageId,
      phase,
    }: ReceivedMessageAckAction) => {
      const senderUsername = socket.session?.username;
      if (phase === MessagePhase.Send && senderUsername) {
        dispatchQueue(
          receiverUsername,
          receivedMessageAck(senderUsername, messageId, MessagePhase.Receive)
        );
      }
    }
  );

  socket.on(
    messageActionTypes.message.reducer.seenMessageAck,
    ({
      username: receiverUsername,
      messageId,
      phase,
    }: SeenMessageAckAction) => {
      const senderUsername = socket.session?.username;
      if (phase === MessagePhase.Send && senderUsername) {
        dispatchQueue(
          receiverUsername,
          seenMessageAck(senderUsername, messageId, MessagePhase.Receive)
        );
      }
    }
  );
}

export default message;
