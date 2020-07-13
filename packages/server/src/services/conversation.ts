import {
  conversationActionTypes,
  Conversation,
  MessageOwner,
  MessageStatus,
  AccountStatus,
  setConversationList,
} from "@purple-messenger/core";
import Socket from "core/type/socket";
import { dispatch } from "core/helper/client";

function conversation(socket: Socket) {
  socket.on(
    conversationActionTypes.conversation.saga.loadConversationList,
    () => {
      const conversations: Conversation[] = [
        {
          id: 1,
          isTyping: false,
          message: {
            id: 1,
            body: "391 Ekve Manor 1762 Wikcu Manor 1798 Afda Boulevard",
            owner: MessageOwner.Friend,
            sentAt: new Date(),
            status: MessageStatus.Received,
            unreadCount: 0,
          },
          friend: {
            id: 2,
            email: "uve@dis.br",
            bio: "French Southern Territories Ireland",
            firstName: "Chad",
            lastName: "Laos",
            image: "https://picsum.photos/201",
            status: AccountStatus.Online,
          },
        },
        {
          id: 2,
          isTyping: false,
          message: {
            id: 1,
            body: "708 Guhhet Manor 784 Mopo Heights",
            owner: MessageOwner.Me,
            sentAt: new Date(),
            status: MessageStatus.Sent,
            unreadCount: 0,
          },
          friend: {
            id: 3,
            email: "ma@pazmiz.mt",
            bio: "Dominica Kazakhstan",
            firstName: "Equatorial",
            lastName: "Guinea",
            image: "https://picsum.photos/202",
            status: AccountStatus.Online,
          },
        },
      ];

      dispatch(socket, setConversationList(conversations));

      // register in the session channel
    }
  );

  socket.on(
    conversationActionTypes.conversation.saga.unloadConversationList,
    () => {
      console.log("unload conversation");
      // remove from the session channel
    }
  );
}

export default conversation;
