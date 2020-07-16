import {
  conversationActionTypes,
  Conversation,
  AccountStatus,
  setConversationList,
} from "@purple-messenger/core";
import Socket from "core/type/socket";
import { dispatch } from "core/helper/client";
import { sampleProfiles } from "./auth";

function conversation(socket: Socket) {
  socket.on(
    conversationActionTypes.conversation.saga.loadConversationList,
    () => {
      const conversations: Conversation[] = sampleProfiles
        .filter((u) => u.id !== socket.session!.id)
        .map<Conversation>((friendProfile) => ({
          id: socket.session!.id * friendProfile.id,
          isTyping: false,
          friend: { ...friendProfile, status: AccountStatus.Online },
        }));

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
