import Socket from "core/type/socket";
import {
  messageActionTypes,
  SendMessageAction,
  sentMessageAck,
  newMessage,
  MessageOwner,
  MessageStatus,
  StartTypingMessageAction,
  MessagePhase,
  startTypingMessage,
  StopTypingMessageAction,
  stopTypingMessage,
} from "@purple-messenger/core";
import { dispatchQueue, clientDispatchQueue } from "./queue";
import { dispatch } from "core/helper/client";

function message(socket: Socket) {
  let savedMessageId = 1;

  socket.on(
    messageActionTypes.message.reducer.sendMessage,
    ({ receiverUsername, message }: SendMessageAction) => {
      const senderUsername = socket.session?.username;

      if (!senderUsername) {
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
        newMessage(senderUsername, receiverUsername, {
          ...msg,
          owner: MessageOwner.Me,
        })
      );
      dispatchQueue(
        receiverUsername,
        newMessage(senderUsername, receiverUsername, {
          ...msg,
          owner: MessageOwner.Friend,
        })
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
}

export default message;
