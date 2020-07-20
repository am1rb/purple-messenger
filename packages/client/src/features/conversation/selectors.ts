import { State } from "./reducers";
import { createMatchSelector } from "connected-react-router";
import { RouterRootState } from "connected-react-router";

export const getConversationList = (state: State) => state.conversation.list;

const matchSelector = createMatchSelector<
  RouterRootState,
  { username: string }
>("/conversation/@:username");

export function getCurrentConversationUsername(state: RouterRootState) {
  const match = matchSelector(state);
  console.log('match', match)
  return match?.params.username;
}
