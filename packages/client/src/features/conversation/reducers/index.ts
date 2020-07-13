import conversation, { ConversationState } from "./conversation";

export interface State {
  conversation: ConversationState;
}

export default {
  conversation,
};
