import conversation, { ConversationState } from "./conversation";

export interface State {
  conversation: ConversationState;
}

const reducers = {
  conversation,
};

export default reducers;
