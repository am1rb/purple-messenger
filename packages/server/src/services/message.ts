import Socket from "core/type/socket";
import {
  messageActionTypes,
  SendMessageAction,
  sentMessageAck,
  newMessage,
  MessageOwner,
  MessageStatus,
  StartTypingMessageAction,
  TypingMessagePhase,
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
      const msg = {
        ...message,
        id: savedMessageId++,
        sentAt: new Date(),
        status: MessageStatus.Pending,
      };

      dispatch(socket, sentMessageAck(message.id, msg.id));

      clientDispatchQueue(
        socket,
        newMessage(receiverUsername, {
          ...msg,
          owner: MessageOwner.Me,
        })
      );
      dispatchQueue(
        receiverUsername,
        newMessage(receiverUsername, {
          ...msg,
          owner: MessageOwner.Friend,
        })
      );
    }
  );

  socket.on(
    messageActionTypes.message.reducer.startTypingMessage,
    ({ username: receiverUsername, phase }: StartTypingMessageAction) => {
      const senderUsername = socket.session?.username;
      if (phase === TypingMessagePhase.Send && senderUsername) {
        dispatchQueue(
          receiverUsername,
          startTypingMessage(senderUsername, TypingMessagePhase.Receive)
        );
      }
    }
  );

  socket.on(
    messageActionTypes.message.reducer.stopTypingMessage,
    ({ username: receiverUsername, phase }: StopTypingMessageAction) => {
      const senderUsername = socket.session?.username;
      if (phase === TypingMessagePhase.Send && senderUsername) {
        dispatchQueue(
          receiverUsername,
          stopTypingMessage(senderUsername, TypingMessagePhase.Receive)
        );
      }
    }
  );
}

export default message;