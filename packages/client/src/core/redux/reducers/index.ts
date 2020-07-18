import { combineReducers } from "redux";
import { connectRouter, RouterRootState } from "connected-react-router";
import { History } from "history";

import authReducers, { State as AuthState } from "features/auth/reducers";
import socketReducers, { State as SocketState } from "features/socket/reducers";
import profileReducers, {
  State as ProfileState,
} from "features/profile/reducers";
import conversationReducers, {
  State as ConversationState,
} from "features/conversation/reducers";
import messageReducers, {
  State as MessageState,
} from "features/message/reducers";

export type State = RouterRootState &
  AuthState &
  SocketState &
  ProfileState &
  ConversationState &
  MessageState;

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    ...authReducers,
    ...socketReducers,
    ...profileReducers,
    ...conversationReducers,
    ...messageReducers,
  });

export default createRootReducer;
