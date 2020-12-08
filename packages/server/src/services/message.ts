import Socket from "core/type/socket";
import {
  messageActionTypes,
  SendMessageAction,
  sentMessageAck,
  sendMessage,
  Owner,
  MessageStatus,
  StartTypingMessageAction,
  Phase,
  startTypingMessage,
  StopTypingMessageAction,
  stopTypingMessage,
  ReceivedMessageAckAction,
  receivedMessageAck,
  seenMessageAck,
  SeenMessageAckAction,
} from "@purple-messenger/core";
import { dispatch } from "core/helper/action";
import { io } from "core/server";

let savedMessageId = 1;

function message(socket: Socket) {
  socket.on(
    messageActionTypes.message.saga.sendMessage,
    ({ username: receiverUsername, message, phase }: SendMessageAction) => {
      const senderUsername = socket.session?.username;

      if (phase === Phase.Receive || !senderUsername) {
        return;
      }

      const msg = {
        ...message,
        id: savedMessageId++,
        sentAt: new Date(),
        status: MessageStatus.Sent,
      };

      dispatch(socket, sentMessageAck(receiverUsername, message.id, msg.id));

      dispatch(
        socket.to(senderUsername),
        sendMessage(
          receiverUsername,
          {
            ...msg,
            owner: Owner.Me,
          },
          Phase.Receive
        )
      );

      dispatch(
        io.to(receiverUsername),
        sendMessage(
          senderUsername,
          {
            ...msg,
            owner: Owner.Friend,
          },
          Phase.Receive
        )
      );
    }
  );

  socket.on(
    messageActionTypes.message.saga.startTypingMessage,
    ({ username: receiverUsername, phase }: StartTypingMessageAction) => {
      const senderUsername = socket.session?.username;
      if (phase === Phase.Send && senderUsername) {
        dispatch(
          io.to(receiverUsername),
          startTypingMessage(senderUsername, Phase.Receive)
        );
      }
    }
  );

  socket.on(
    messageActionTypes.message.saga.stopTypingMessage,
    ({ username: receiverUsername, phase }: StopTypingMessageAction) => {
      const senderUsername = socket.session?.username;
      if (phase === Phase.Send && senderUsername) {
        dispatch(
          io.to(receiverUsername),
          stopTypingMessage(senderUsername, Phase.Receive)
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
      if (phase === Phase.Send && senderUsername) {
        dispatch(
          io.to(receiverUsername),
          receivedMessageAck(senderUsername, messageId, Phase.Receive)
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
      if (phase === Phase.Send && senderUsername) {
        dispatch(
          io.to(receiverUsername),
          seenMessageAck(senderUsername, messageId, Phase.Receive)
        );
      }
    }
  );
}

export default message;
