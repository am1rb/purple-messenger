import { State } from "./reducers";

export const getProfileInfo = (state: State) => state.profile;

export const getProfileInfoImage = (state: State) =>
  getProfileInfo(state)?.image;
