import { State } from "./reducers";
import { createMatchSelector } from "connected-react-router";
import { RouterRootState } from "connected-react-router";
import { createSelector } from "reselect";

const matchSelector = createMatchSelector<
  RouterRootState,
  { username: string }
>("/conversation/@:username");

export function getCurrentConversationUsername(state: RouterRootState) {
  const match = matchSelector(state);
  return match?.params.username;
}

export const getConversationMap = (state: State) => state.conversation.list;

export const getConversationList = createSelector(getConversationMap, (list) =>
  list.toArray().map(([, conversation]) => conversation)
);

export const getHasUndeadMessage = createSelector(
  getConversationList,
  (list) => {
    for (let item of list) {
      const unreadCount = item.message?.unreadCount ?? 0;
      if (unreadCount > 0) {
        return true;
      }
    }
    return false;
  }
);
