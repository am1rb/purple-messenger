import { State } from "./reducers";
import { createMatchSelector } from "connected-react-router";
import { RouterRootState } from "connected-react-router";
import { createSelector } from "reselect";

const matchSelector = createMatchSelector<
  RouterRootState,
  { username: string }
>("/conversation/@:username");

export function getCurrentConversationUsername(state: RouterRootState) {
  // @TODO: the above match selector does not work correctly
  const match = window.location.pathname.match(/\/conversation\/@(.*)$/i);
  return match ? match[1] : undefined;
}

export const getConversationMap = (state: State) => state.conversation.list;

export const getConversationList = createSelector(getConversationMap, (list) =>
  list.toArray().map(([, conversation]) => conversation)
);
